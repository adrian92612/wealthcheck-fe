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
import { categorySchema, transactionSchema } from "@/lib/schemas";
import type { Category, CategoryFormData } from "@/lib/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import IconPicker from "./CategoryIconPicker";
import type { categoryIcons } from "@/constants/categoryIcons";
import { categoryApi, transactionApi } from "@/lib/api";
import type { Transaction, TransactionFormData } from "@/lib/types/transaction";

type Props = {
  transaction?: Transaction;
};

const CategoryFormDialog = ({ transaction }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "all",
    defaultValues: {
      fromWalletId: transaction?.fromWalletId ?? undefined,
      toWalletId: transaction?.toWalletId ?? undefined,
      categoryId: transaction?.categoryId ?? undefined,
      title: transaction?.title ?? undefined,
      notes: transaction?.notes ?? undefined,
      amount: transaction?.amount ?? undefined,
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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    mutation.mutate(data);
  };
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="eg. Utilities, Mortgage, Rent, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-5 items-start">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the category type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <IconPicker
                        value={field.value as keyof typeof categoryIcons}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{category ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
