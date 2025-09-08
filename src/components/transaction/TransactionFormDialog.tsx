import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { transactionSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { transactionApi } from "@/lib/api";
import { capitalizeFirstLetter } from "@/lib/utils";
import { transactionTypes } from "@/lib/types";
import type {
  Category,
  Wallet,
  TransactionType,
  TransactionFormData,
  Transaction,
} from "@/lib/types";

type Props = {
  transaction?: Transaction;
  wallets: Wallet[];
  categories: Category[];
  forType?: TransactionType;
};

const TransactionFormDialog = ({
  transaction,
  wallets,
  categories,
  forType,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: transaction?.type ?? forType ?? undefined,
      fromWalletId: transaction?.fromWalletId ?? undefined,
      toWalletId: transaction?.toWalletId ?? undefined,
      categoryId: transaction?.categoryId ?? undefined,
      title: transaction?.title ?? "",
      notes: transaction?.notes ?? "",
      amount: transaction?.amount ?? 0,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: TransactionFormData) => {
      if (transaction?.id) {
        return transactionApi.update(transaction.id, data);
      }
      return transactionApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    mutation.mutate(data);
  };

  const selectedType = form.watch("type");
  const fromWalletId = form.watch("fromWalletId");
  const toWalletId = form.watch("toWalletId");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{transaction ? "edit" : "add"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription className="sr-only">
            Add Transaction
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      form.setValue("fromWalletId", undefined);
                      form.setValue("toWalletId", undefined);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionTypes.map((type, i) => (
                        <SelectItem key={i} value={type}>
                          {capitalizeFirstLetter(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(selectedType === "EXPENSE" || selectedType == "TRANSFER") && (
              <FormField
                control={form.control}
                name="fromWalletId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Wallet</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={!!field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Wallet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wallets
                          .filter((w) => String(w.id) !== String(toWalletId))
                          .map((wallet) => (
                            <SelectItem
                              key={wallet.id}
                              value={String(wallet.id)}
                            >
                              {capitalizeFirstLetter(wallet.name)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(selectedType === "INCOME" || selectedType == "TRANSFER") && (
              <FormField
                control={form.control}
                name="toWalletId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Wallet</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={!!field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Wallet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wallets
                          .filter((w) => String(w.id) !== String(fromWalletId))
                          .map((wallet) => (
                            <SelectItem
                              key={wallet.id}
                              value={String(wallet.id)}
                            >
                              {capitalizeFirstLetter(wallet.name)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(selectedType === "EXPENSE" || selectedType === "INCOME") && (
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Category</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val === "" ? undefined : Number(val))
                      }
                      value={
                        field.value !== null && field.value !== undefined
                          ? String(field.value)
                          : ""
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          .filter((category) => category.type === selectedType)
                          .map((category) => (
                            <SelectItem
                              key={category.id}
                              value={String(category.id)}
                            >
                              {capitalizeFirstLetter(category.name)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={
                        selectedType === "INCOME"
                          ? "e.g. Salary, Gift, Bonus"
                          : selectedType === "EXPENSE"
                          ? "e.g. Groceries, Rent, Utilities"
                          : selectedType === "TRANSFER"
                          ? "e.g. Savings Transfer, Wallet Top-up"
                          : "Enter a title"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{transaction ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionFormDialog;
