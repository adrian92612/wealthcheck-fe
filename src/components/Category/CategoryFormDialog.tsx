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
import { categorySchema } from "@/lib/schemas";
import {
  categoryTypes,
  type Category,
  type CategoryFormData,
} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import IconPicker from "./CategoryIconPicker";
import type { categoryIcons } from "@/constants/categoryIcons";
import { categoryApi } from "@/lib/api";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { qCacheKey } from "@/constants/queryKeys";

type Props = {
  category?: Category;
  closeDropDown?: () => void;
};

const CategoryFormDialog = ({ category, closeDropDown }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: "onBlur",
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      type: category?.type ?? undefined,
      icon: category?.icon ?? "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CategoryFormData) => {
      if (category?.id) {
        return categoryApi.update(category.id, data);
      }
      return categoryApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qCacheKey.categories });
      if (!category) form.reset();
      setOpen(false);
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

  const onSubmit = async (data: CategoryFormData) => {
    mutate(data);
  };

  const btnText = isPending
    ? category
      ? "Updating..."
      : "Submitting..."
    : category
    ? "Update"
    : "Submit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={category ? "ghost" : "default"}
          className={cn(category ? "w-full rounded-none" : "w-fit")}
        >
          {category ? (
            "Edit"
          ) : (
            <span className="inline-flex gap-1 items-center">
              <Plus /> Add Category
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription className="sr-only">
            Add Category
          </DialogDescription>
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
                          {categoryTypes.map((type, i) => (
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

export default CategoryFormDialog;
