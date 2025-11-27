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
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  id: string | number;
  label: string;
  name: string;
  restoreFn: (id: string | number) => Promise<ApiResponse<unknown>>;
  invalidateKeys: string[][];
  hasDeletedWallet?: boolean;
};

const RestoreBtn = ({
  id,
  label,
  name,
  restoreFn,
  invalidateKeys,
  hasDeletedWallet = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => restoreFn(id),
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
        <Button
          variant="ghost"
          disabled={hasDeletedWallet}
          className="w-full rounded-none"
        >
          Restore
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Restore this {label.toLowerCase()}?
            <br />
            <br />- {name}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestoreBtn;
