"use client";

import Link from "next/link";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDeleteContact, type Contact } from "@/hooks/apis/useContacts";
import { useState } from "react";
import ConfirmationDialog from "../common/confirmation-dialog";

/* -------------------------------------------------------------------------- */
/*                                  Features                                  */
/* -------------------------------------------------------------------------- */

const features = tableFeatures({});

/* -------------------------------------------------------------------------- */
/*                               Column Helper                                */
/* -------------------------------------------------------------------------- */

const columnHelper = createColumnHelper<typeof features, Contact>();

/* -------------------------------------------------------------------------- */
/*                                  Columns                                   */
/* -------------------------------------------------------------------------- */

const getColumns = (onDelete: (contact: Contact) => void) =>
  columnHelper.columns([
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium whitespace-nowrap">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("company", {
      header: "Company",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("email", {
      header: "Email",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("projectType", {
      header: "Project Type",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("budget", {
      header: "Budget",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: ({ getValue }) => {
        const value = getValue();

        return (
          <span className="whitespace-nowrap">
            {new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const contact = row.original;

        return (
          <div className="flex items-center justify-end gap-1 whitespace-nowrap">
            {/* View */}
            <Link
              href={`/contacts/${contact.id}`}
              title="View contact"
              className="inline-flex size-8 items-center justify-center border border-transparent transition-colors hover:border-border hover:bg-muted"
            >
              <Eye className="size-4" />
            </Link>

            {/* Edit */}
            <Link
              href={`/contacts/${contact.id}/edit`}
              title="Edit contact"
              className="inline-flex size-8 items-center justify-center border border-transparent transition-colors hover:border-border hover:bg-muted"
            >
              <Pencil className="size-4" />
            </Link>

            {/* Delete */}
            <Button
              variant="ghost"
              size="icon"
              title="Delete contact"
              className="text-danger hover:bg-danger/10 hover:text-danger"
              onClick={() => onDelete(contact)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      },
    }),
  ]);

/* -------------------------------------------------------------------------- */
/*                               Table Props                                  */
/* -------------------------------------------------------------------------- */

interface ContactsTableProps {
  data: Contact[];
}

/* -------------------------------------------------------------------------- */
/*                              Contacts Table                                */
/* -------------------------------------------------------------------------- */

export function ContactsTable({ data }: ContactsTableProps) {
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

  const handleDelete = (contact: Contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = () => {
    if (!contactToDelete) return;

    deleteContact(contactToDelete.id, {
      onSuccess: () => {
        setContactToDelete(null);
      },
    });
  };

  const columns = getColumns(handleDelete);

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
          <Table className="min-w-225">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.id === "actions"
                          ? "w-30 text-right"
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
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={!!contactToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setContactToDelete(null);
          }
        }}
        title="Delete contact?"
        message={
          contactToDelete
            ? `Are you sure you want to delete ${contactToDelete.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
