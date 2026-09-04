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
import SelectField from "@/components/form-elements/select-field";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AssignLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
  onAssign: (userId: string) => void;
  isLoading?: boolean;
}

const AssignLeadDialog = ({
  open,
  onOpenChange,
  users,
  onAssign,
  isLoading = false,
}: AssignLeadDialogProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.username} — ${user.email}`,
  }));

  const handleAssign = () => {
    if (!selectedUserId) return;

    onAssign(selectedUserId);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      setSelectedUserId("");
    }

    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Lead</DialogTitle>

          <DialogDescription>
            Select a user to assign this lead to.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          {users.length > 0 ? (
            <SelectField
              name="assignedTo"
              label=""
              placeholder="Select a user"
              options={userOptions}
              value={selectedUserId}
              onValueChange={setSelectedUserId}
            />
          ) : (
            <div className="border border-dashed border-border p-6 text-center">
              <p className="text-sm font-medium">No users found</p>

              <p className="mt-1 text-xs text-muted-foreground">
                There are no users available to assign this lead.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleAssign}
            disabled={!selectedUserId || isLoading || users.length === 0}
          >
            {isLoading ? "Assigning..." : "Assign Lead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignLeadDialog;
