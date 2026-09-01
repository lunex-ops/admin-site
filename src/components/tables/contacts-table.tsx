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
import { type Contact } from "@/hooks/apis/useContacts";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const formatValue = (value: string | null | undefined) => {
  if (!value) return "—";

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  CONVERTED: "bg-green-500/10 text-green-600",
  SPAM: "bg-red-500/10 text-red-600",
};

/* -------------------------------------------------------------------------- */
/*                                  Features                                  */
/* -------------------------------------------------------------------------- */

const features = tableFeatures({});

/* -------------------------------------------------------------------------- */
/*                               Column Helper                                */
/* -------------------------------------------------------------------------- */

const columnHelper = createColumnHelper<typeof features, Contact>();

/* -------------------------------------------------------------------------- */
/*                                   Columns                                  */
/* -------------------------------------------------------------------------- */

const getColumns = () =>
  columnHelper.columns([
    /* ---------------------------------------------------------------------- */
    /* Name                                                                   */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium whitespace-nowrap">{getValue()}</span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Company                                                                */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("company", {
      header: "Company",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Email                                                                  */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("email", {
      header: "Email",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {getValue()}
        </span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Phone                                                                  */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("phone", {
      header: "Phone",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Industry                                                               */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("industry", {
      header: "Industry",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() || "—"}</span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Project Type                                                           */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("projectType", {
      header: "Project Type",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{formatValue(getValue())}</span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Status                                                                 */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();

        return (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              statusStyles[status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {formatValue(status)}
          </span>
        );
      },
    }),

    /* ---------------------------------------------------------------------- */
    /* Created                                                                */
    /* ---------------------------------------------------------------------- */

    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(getValue())}
        </span>
      ),
    }),

    /* ---------------------------------------------------------------------- */
    /* Actions                                                                */
    /* ---------------------------------------------------------------------- */

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
          </div>
        );
      },
    }),
  ]);

/* -------------------------------------------------------------------------- */
/*                                Table Props                                 */
/* -------------------------------------------------------------------------- */

interface ContactsTableProps {
  data: Contact[];
}

/* -------------------------------------------------------------------------- */
/*                              Contacts Table                                */
/* -------------------------------------------------------------------------- */

export function ContactsTable({ data }: ContactsTableProps) {
  /* ------------------------------------------------------------------------ */
  /*                                  Table                                   */
  /* ------------------------------------------------------------------------ */

  const columns = getColumns();

  const table = useTable({
    features,
    columns,
    data,
  });

  const rows = table.getRowModel().rows;

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

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
                    <p className="text-sm font-medium">No contacts found</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Contacts submitted through your website will appear here.
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
