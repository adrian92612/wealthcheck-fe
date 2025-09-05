import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toJSONSchema, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { apiFetch } from "@/lib/apiClient";
import { apiEndpoints } from "@/constants/apiEndpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWallet } from "@/services/walletApi";

const walletSchema = z.object({
  name: z.string().min(1, { error: "Must be at least 1 character" }),
  balance: z.number().int().gt(0, "Balance must be greater than 0"),
});

type WalletSchema = z.infer<typeof walletSchema>;

const WalletForm = () => {
  const form = useForm<WalletSchema>({
    resolver: zodResolver(walletSchema),
    mode: "all",
    defaultValues: {
      name: "",
      balance: 0,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWallet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
  });

  const onSubmit = async (data: WalletSchema) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. Cash, Gcash, BPI, etc." />
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
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value);
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default WalletForm;
