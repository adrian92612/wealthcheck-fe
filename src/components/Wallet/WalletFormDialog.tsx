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
import { walletSchema } from "@/lib/schemas";
import { walletApi } from "@/lib/api";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { qCacheKey } from "@/constants/queryKeys";

type Props = {
  wallet?: Wallet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refreshUser: () => void;
  closeDropDown?: () => void;
};

const WalletFormDialog = ({
  wallet,
  open,
  onOpenChange,
  refreshUser,
  closeDropDown,
}: Props) => {
  const form = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    mode: "onBlur",
    defaultValues: {
      name: wallet?.name ?? "",
      balance: wallet?.balance ?? 0,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: WalletFormData) => {
      if (wallet?.id) {
        return walletApi.update(wallet.id, data);
      }
      return walletApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qCacheKey.wallets });
      form.reset();
      refreshUser();
      onOpenChange(false);
    },
    onSettled: (res) => {
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Something went wrong, try again later");
      }
      if (closeDropDown) closeDropDown();
    },
    throwOnError: true,
  });

  const onSubmit = async (data: WalletFormData) => {
    mutate(data);
  };

  const btnText = isPending
    ? wallet
      ? "Updating..."
      : "Submitting..."
    : wallet
    ? "Update"
    : "Submit";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset
              disabled={isPending}
              className="flex flex-col gap-4 disabled:opacity-70"
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
                        disabled={!!wallet}
                        type="number"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? 0 : Number(value));
                        }}
                        min={0}
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {btnText}
              </Button>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WalletFormDialog;
