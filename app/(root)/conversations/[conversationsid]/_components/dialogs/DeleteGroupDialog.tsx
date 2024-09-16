"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  conversationId: string | string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteGroupDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: deleteGroup, isPending } = useMutationState(
    api.conversation.deleteGroup,
  );

  const handleDeleteGroup = async () => {
    deleteGroup({ conversationId })
      .then(() => {
        toast.success("Deleted group");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred",
        );
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All messages will be deleted and you
            will not be able to message this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDeleteGroup}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
