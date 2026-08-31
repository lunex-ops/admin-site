"use client";

import { useDashboards } from "@/hooks/apis/useDashboard";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CircleAlert,
  CircleCheck,
  Clock3,
  ContactRound,
  DollarSign,
  Mail,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  CONTACTED: "bg-yellow-500/10 text-yellow-600",
  QUALIFIED: "bg-purple-500/10 text-purple-600",
  WON: "bg-green-500/10 text-green-600",
  LOST: "bg-red-500/10 text-red-600",
};

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboards();

  const dashboard = data?.data;
  const overview = dashboard?.overview;

  const recentContacts = dashboard?.recentContacts ?? [];
  const recentLeads = dashboard?.recentLeads ?? [];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Overview
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse border border-border bg-muted/30"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !overview) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <CircleAlert className="size-8 text-red-500" />

        <p className="mt-3 text-sm font-medium">Unable to load dashboard</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Overview
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Here&apos;s an overview of your operations.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contacts */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center bg-muted">
              <ContactRound className="size-4" />
            </div>

            <span className="text-xs text-muted-foreground">
              {overview.contacts.new} new
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Total Contacts</p>

          <p className="mt-1 font-headline text-3xl font-semibold">
            {overview.contacts.total}
          </p>
        </div>

        {/* Leads */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center bg-muted">
              <UserRoundPlus className="size-4" />
            </div>

            <span className="text-xs text-muted-foreground">
              {overview.leads.unassigned} unassigned
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Total Leads</p>

          <p className="mt-1 font-headline text-3xl font-semibold">
            {overview.leads.total}
          </p>
        </div>

        {/* Follow Ups */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center bg-muted">
              <Clock3 className="size-4" />
            </div>

            {overview.leads.followUpsDue > 0 && (
              <span className="text-xs text-orange-600">Due</span>
            )}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Follow-ups Due</p>

          <p className="mt-1 font-headline text-3xl font-semibold">
            {overview.leads.followUpsDue}
          </p>
        </div>

        {/* Pipeline */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center bg-muted">
              <DollarSign className="size-4" />
            </div>

            <span className="text-xs text-muted-foreground">Estimated</span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Pipeline Value</p>

          <p className="mt-1 font-headline text-3xl font-semibold">
            {formatCurrency(overview.pipeline.estimatedValue)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Contacts */}
        <div className="border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-medium">Recent Contacts</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest contacts added to your workspace
              </p>
            </div>

            <Link
              href="/contacts"
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {recentContacts.length > 0 ? (
            <div className="divide-y divide-border">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/30"
                >
                  {/* Avatar */}
                  <div className="flex size-10 shrink-0 items-center justify-center bg-muted font-medium">
                    {contact.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Contact Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {contact.name}
                      </p>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          statusStyles[contact.status] ??
                          "bg-muted text-muted-foreground"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="size-3" />
                        {contact.email}
                      </span>

                      <span>{contact.company}</span>
                    </div>
                  </div>

                  {/* Project */}
                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-medium">{contact.projectType}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center p-5 text-center">
              <ContactRound className="size-8 text-muted-foreground/50" />

              <p className="mt-3 text-sm font-medium">No contacts yet</p>

              <p className="mt-1 text-xs text-muted-foreground">
                New contacts will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Lead Summary */}
        <div className="border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="font-medium">Lead Overview</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Current lead pipeline status
            </p>
          </div>

          <div className="space-y-1 p-3">
            {/* Total */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center bg-muted">
                  <UsersRound className="size-4" />
                </div>

                <span className="text-sm">Total Leads</span>
              </div>

              <span className="font-medium">{overview.leads.total}</span>
            </div>

            {/* Won */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center bg-green-500/10 text-green-600">
                  <CircleCheck className="size-4" />
                </div>

                <span className="text-sm">Won</span>
              </div>

              <span className="font-medium">{overview.leads.won}</span>
            </div>

            {/* Lost */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center bg-red-500/10 text-red-600">
                  <CircleAlert className="size-4" />
                </div>

                <span className="text-sm">Lost</span>
              </div>

              <span className="font-medium">{overview.leads.lost}</span>
            </div>

            {/* Unassigned */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center bg-yellow-500/10 text-yellow-600">
                  <UserRoundPlus className="size-4" />
                </div>

                <span className="text-sm">Unassigned</span>
              </div>

              <span className="font-medium">{overview.leads.unassigned}</span>
            </div>

            {/* Follow Ups */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center bg-orange-500/10 text-orange-600">
                  <Clock3 className="size-4" />
                </div>

                <span className="text-sm">Follow-ups Due</span>
              </div>

              <span className="font-medium">{overview.leads.followUpsDue}</span>
            </div>
          </div>

          {/* Contact Stats */}
          <div className="mx-5 border-t border-border py-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Contact Status
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>

                <span className="font-medium">{overview.contacts.total}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">New</span>

                <span className="font-medium text-blue-600">
                  {overview.contacts.new}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Spam</span>

                <span className="font-medium text-red-600">
                  {overview.contacts.spam}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-medium">Recent Leads</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Latest leads added to your pipeline
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        {recentLeads.length > 0 ? (
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-5">
                {/* Render lead data here once backend shape is finalized */}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 flex-col items-center justify-center p-5 text-center">
            <BriefcaseBusiness className="size-8 text-muted-foreground/50" />

            <p className="mt-3 text-sm font-medium">No leads yet</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Leads will appear here once they are added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
