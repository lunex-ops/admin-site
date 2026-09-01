"use client";

import Link from "next/link";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@/types/lead.types";
import {
  formatCurrency,
  formatDate,
  formatValue,
  leadStatusStyles,
} from "@/lib/helpers";

const features = tableFeatures({});

const columnHelper = createColumnHelper<typeof features, Lead>();

const getColumns = () =>
  columnHelper.columns([
    columnHelper.accessor("contact.name", {
      id: "name",

      header: "Name",

      cell: ({ getValue }) => (
        <span className="font-medium whitespace-nowrap">{getValue()}</span>
      ),
    }),

    columnHelper.accessor("contact.company", {
      id: "company",

      header: "Company",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    columnHelper.accessor("contact.email", {
      id: "email",

      header: "Email",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("contact.projectType", {
      id: "projectType",

      header: "Project Type",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{formatValue(getValue())}</span>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",

      cell: ({ getValue }) => {
        const status = getValue();

        return (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              leadStatusStyles[status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {formatValue(status)}
          </span>
        );
      },
    }),

    columnHelper.accessor("assignedTo", {
      header: "Assigned To",

      cell: ({ getValue }) => {
        const assignedTo = getValue();

        return (
          <span className="whitespace-nowrap">
            {assignedTo?.name || assignedTo?.username || "Unassigned"}
          </span>
        );
      },
    }),

    columnHelper.accessor("estimatedValue", {
      header: "Value",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{formatCurrency(getValue())}</span>
      ),
    }),

    columnHelper.accessor("nextFollowUpAt", {
      header: "Next Follow-up",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(getValue())}
        </span>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: "Created",

      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(getValue())}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",

      header: "Actions",

      cell: ({ row }) => {
        const lead = row.original;

        return (
          <div className="flex items-center justify-end gap-1 whitespace-nowrap">
            {/* View */}
            <Link
              href={`/leads/${lead.id}`}
              title="View lead"
              className="inline-flex size-8 items-center justify-center border border-transparent transition-colors hover:border-border hover:bg-muted"
            >
              <Eye className="size-4" />
            </Link>
          </div>
        );
      },
    }),
  ]);

interface LeadsTableProps {
  data: Lead[];
}

export function LeadsTable({ data }: LeadsTableProps) {
  const columns = getColumns();

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
          <Table className="min-w-275">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.id === "actions"
                          ? "w-24 text-right"
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
                    <p className="text-sm font-medium">No leads found</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Converted contacts will appear here as leads.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
