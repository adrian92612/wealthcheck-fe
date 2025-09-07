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
import { createWallet, updateWallet } from "@/services/walletApi";
import z from "zod";
import type { Wallet } from "@/types/wallet";
import { useState } from "react";

const walletSchema = z.object({
  name: z.string().min(1, { error: "Must be at least 1 character" }),
  balance: z.number().int().gt(0, "Balance must be greater than 0"),
});

type WalletSchema = z.infer<typeof walletSchema>;

type Props = {
  wallet?: Wallet;
};

const WalletFormDialog = ({ wallet }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<WalletSchema>({
    resolver: zodResolver(walletSchema),
    mode: "all",
    defaultValues: {
      name: wallet?.name ?? "",
      balance: wallet?.balance ?? 0,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: WalletSchema) => {
      if (wallet?.id) {
        return updateWallet(data, wallet.id);
      }
      return createWallet(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: WalletSchema) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{wallet ? "edit" : "add"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription className="sr-only">Add Wallet</DialogDescription>
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
                      placeholder="eg. Cash, Gcash, BPI, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="1,000,000"
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{wallet ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WalletFormDialog;
