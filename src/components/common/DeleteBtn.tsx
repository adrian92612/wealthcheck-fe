import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import type { ApiResponse } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTrash } from "@/hooks/useIsTrash";

type Props = {
  id: string | number;
  label: string;
  name: string;
  softDeleteFn: (id: number | string) => Promise<ApiResponse<unknown>>;
  deleteFn: (id: number | string) => Promise<ApiResponse<unknown>>;
  invalidateKeys: string[][];
};

const DeleteBtn = ({
  id,
  label,
  name,
  softDeleteFn,
  deleteFn,
  invalidateKeys,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { forSoftDeleted } = useTrash();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => (forSoftDeleted ? deleteFn(id) : softDeleteFn(id)),
    onSuccess: () => {
      invalidateKeys.forEach((key) => qc.invalidateQueries({ queryKey: key }));
      setOpen(false);
    },
    onSettled: (res) => {
      if (res?.success) toast.success(res.message);
      else toast.error(res?.message || "Something went wrong, try again later");
    },
    throwOnError: true,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full rounded-none">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.{" "}
            {forSoftDeleted ? (
              <span className="text-red-500">
                Permanently delete this {label}?
              </span>
            ) : (
              <span>Delete this {label}?</span>
            )}
            <br />
            <br />
            <span>- {name}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
