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
import type { Wallet, WalletFormData } from "@/lib/types";
import { useState } from "react";
import { walletSchema } from "@/lib/schemas";
import { walletApi } from "@/lib/api";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  wallet?: Wallet;
};

const WalletFormDialog = ({ wallet }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    mode: "all",
    defaultValues: {
      name: wallet?.name ?? "",
      balance: wallet?.balance ?? 0,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: WalletFormData) => {
      if (wallet?.id) {
        return walletApi.update(wallet.id, data);
      }
      return walletApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = async (data: WalletFormData) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={wallet ? "ghost" : "default"}
          className={cn(wallet ? "w-full rounded-none" : "w-fit")}
        >
          {wallet ? (
            "Edit"
          ) : (
            <span className="inline-flex gap-1 items-center">
              <Plus /> Add Wallet
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription className="sr-only">Add Wallet</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                        field.onChange(Number(e.target.value));
                      }}
                      value={field.value}
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
