import { moneyBudgetSchema } from "@/lib/schemas";
import type {
  MoneyBudget,
  MoneyBudgetFormData,
  MoneyGoalFormData,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { overviewApi } from "@/lib/api";
import { qCacheKey } from "@/constants/queryKeys";
import { toast } from "sonner";

type Props = {
  moneyBudget?: MoneyBudget;
};

const BudgetFormDialog = ({ moneyBudget }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<MoneyBudgetFormData>({
    resolver: zodResolver(moneyBudgetSchema),
    mode: "onBlur",
    defaultValues: {
      name: moneyBudget?.name ?? "",
      amount: moneyBudget?.amount ?? 0,
    },
  });

  useEffect(() => {
    form.reset({
      name: moneyBudget?.name ?? "",
      amount: moneyBudget?.amount ?? 0,
    });
  }, [form, moneyBudget?.amount, moneyBudget?.name]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: MoneyBudgetFormData) =>
      overviewApi.updateMoneyBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qCacheKey.moneyBudget });
      if (!moneyBudget) form.reset();
      setOpen(false);
    },
    onSettled: (res) => {
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Something went wrong, try again later");
      }
    },
    throwOnError: true,
  });

  const onSubmit = async (data: MoneyGoalFormData) => {
    mutate(data);
  };

  const btnText = isPending
    ? moneyBudget
      ? "Updating..."
      : "Submitting..."
    : moneyBudget
    ? "Update"
    : "Submit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          {moneyBudget ? "Update" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Declare a Budget</DialogTitle>
          <DialogDescription className="sr-only">Add Budget</DialogDescription>
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
                    <FormLabel>Budget Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
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

export default BudgetFormDialog;
