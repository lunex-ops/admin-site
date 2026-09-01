"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: (rejectionReason: string) => void;
  onCancel?: () => void;

  isLoading?: boolean;
}

const RejectionDialog = ({
  open,
  onOpenChange,
  title = "Reject contact?",
  message,
  confirmText = "Reject",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}: RejectionDialogProps) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleCancel = () => {
    setRejectionReason("");

    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    const reason = rejectionReason.trim();

    if (!reason) return;

    onConfirm(reason);
  };

  const isSubmitDisabled = isLoading || rejectionReason.trim().length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label htmlFor="rejectionReason" className="text-sm font-medium">
            Rejection reason
          </label>

          <textarea
            id="rejectionReason"
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            placeholder="Enter the reason for rejecting this contact..."
            rows={4}
            disabled={isLoading}
            className="flex w-full resize-none border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          />

          <p className="text-xs text-muted-foreground">
            Please provide a reason so it can be recorded with the contact.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitDisabled}
          >
            {isLoading ? "Rejecting..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionDialog;
