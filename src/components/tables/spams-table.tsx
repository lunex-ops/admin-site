"use client";

import Link from "next/link";
import { useState } from "react";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

import { Eye, Trash2, RotateCcw } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ConfirmationDialog from "@/components/common/confirmation-dialog";

import { useDeleteSpam, useRestoreSpam } from "@/hooks/apis/useSpams";

import { toast } from "@/components/ui/toast";
import { Contact } from "@/types/contact.types";
import { contactStatusStyles, formatDate, formatValue } from "@/lib/helpers";

const features = tableFeatures({});

const columnHelper = createColumnHelper<typeof features, Contact>();

const getColumns = (
  onDelete: (contact: Contact) => void,
  onRestore: (contact: Contact) => void,
) =>
  columnHelper.columns([
    columnHelper.accessor("name", {
      header: "Name",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap font-medium">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("company", {
      header: "Company",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    columnHelper.accessor("email", {
      header: "Email",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("phone", {
      header: "Phone",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    columnHelper.accessor("industry", {
      header: "Industry",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    columnHelper.accessor("projectType", {
      header: "Project Type",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{formatValue(getValue())}</span>
      ),
    }),

    columnHelper.accessor("rejectionReason", {
      header: "Reason",

      cell: ({ getValue }) => (
        <span className="max-w-56 truncate text-muted-foreground">
          {getValue() || "—"}
        </span>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",

      cell: ({ getValue }) => {
        const status = getValue();

        return (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              contactStatusStyles[status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {formatValue(status)}
          </span>
        );
      },
    }),

    columnHelper.accessor("rejectedAt", {
      header: "Rejected",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {getValue() ? formatDate(getValue()!) : "—"}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",

      header: "Actions",

      cell: ({ row }) => {
        const contact = row.original;

        return (
          <div className="flex items-center justify-end gap-1 whitespace-nowrap">
            <Link
              href={`/spams/${contact.id}`}
              title="View spam"
              className="inline-flex size-8 items-center justify-center border border-transparent transition-colors hover:border-border hover:bg-muted"
            >
              <Eye className="size-4" />
            </Link>

            <button
              type="button"
              title="Restore spam"
              onClick={() => onRestore(contact)}
              className="inline-flex size-8 items-center justify-center border border-transparent text-green-600 transition-colors hover:border-green-500/20 hover:bg-green-500/10"
            >
              <RotateCcw className="size-4" />
            </button>

            <button
              type="button"
              title="Delete spam"
              onClick={() => onDelete(contact)}
              className="inline-flex size-8 items-center justify-center border border-transparent text-danger transition-colors hover:border-danger/20 hover:bg-danger/10"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        );
      },
    }),
  ]);

interface SpamsTableProps {
  data: Contact[];
}

export function SpamsTable({ data }: SpamsTableProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [restoreContact, setRestoreContact] = useState<Contact | null>(null);

  const deleteSpam = useDeleteSpam();
  const restoreSpam = useRestoreSpam();

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleConfirmDelete = () => {
    if (!selectedContact) return;

    deleteSpam.mutate(selectedContact.id, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Spam contact deleted successfully.",
        });

        setSelectedContact(null);
      },

      onError: () => {
        toast.add({
          type: "error",
          description: "Failed to delete spam contact. Please try again.",
          priority: "high",
        });
      },
    });
  };

  const handleRestore = (contact: Contact) => {
    setRestoreContact(contact);
  };

  const handleConfirmRestore = () => {
    if (!restoreContact) return;

    restoreSpam.mutate(restoreContact.id, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Spam contact restored successfully.",
        });

        setRestoreContact(null);
      },

      onError: () => {
        toast.add({
          type: "error",
          description: "Failed to restore spam contact. Please try again.",
          priority: "high",
        });
      },
    });
  };

  const columns = getColumns(handleDelete, handleRestore);

  const table = useTable({
    features,
    columns,
    data,
  });

  const rows = table.getRowModel().rows;

  return (
    <>
      <div className="w-full overflow-hidden border border-border bg-card">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-300">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.id === "actions"
                          ? "w-32 text-right"
                          : "whitespace-nowrap"
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "actions"
                            ? "text-right"
                            : "whitespace-nowrap"
                        }
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    <p className="text-sm font-medium">
                      No spam contacts found
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Rejected contacts will appear here when marked as spam.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ConfirmationDialog
        open={Boolean(restoreContact)}
        onOpenChange={(open) => {
          if (!open && !restoreSpam.isPending) {
            setRestoreContact(null);
          }
        }}
        title="Restore spam contact?"
        message={
          restoreContact
            ? `Are you sure you want to restore ${restoreContact.name}? This will move the contact back to the contacts list.`
            : ""
        }
        confirmText="Restore"
        cancelText="Cancel"
        onConfirm={handleConfirmRestore}
        isLoading={restoreSpam.isPending}
      />

      <ConfirmationDialog
        open={Boolean(selectedContact)}
        onOpenChange={(open) => {
          if (!open && !deleteSpam.isPending) {
            setSelectedContact(null);
          }
        }}
        title="Delete spam contact?"
        message={
          selectedContact
            ? `Are you sure you want to permanently delete ${selectedContact.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        isLoading={deleteSpam.isPending}
      />
    </>
  );
}
