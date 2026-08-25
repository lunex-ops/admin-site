import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Lunex Admin
            </span>

            <h1 className="mt-1 font-headline text-xl font-bold">
              Design System
            </h1>
          </div>

          <span className="bg-primary px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-white">
            v1.0
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6">
        {/* Foundation */}
        <section className="border-b border-border py-20">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
            Foundation
          </span>

          <h2 className="mt-5 max-w-4xl font-headline text-5xl font-bold tracking-tight sm:text-7xl">
            Simple.
            <br />
            <span className="text-primary">Operational.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            The Lunex Admin design system is built for clear data, efficient
            workflows, and consistent interfaces.
          </p>
        </section>

        {/* Colors */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="01"
            title="Colors"
            description="The core Lunex Admin palette."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ColorCard
              name="Primary"
              value="#2563EB"
              description="Actions and focus"
              className="bg-primary text-white"
            />

            <ColorCard
              name="Secondary"
              value="#64748B"
              description="Secondary content"
              className="bg-secondary text-white"
            />

            <ColorCard
              name="Tertiary"
              value="#BC4800"
              description="Attention and warnings"
              className="bg-tertiary text-white"
            />

            <ColorCard
              name="Neutral"
              value="#0F172A"
              description="Strong contrast"
              className="bg-neutral text-white"
            />
          </div>

          <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <TokenCard name="Background" token="bg-background" />
            <TokenCard name="Card" token="bg-card" />
            <TokenCard name="Muted" token="bg-muted" />
            <TokenCard name="Input" token="bg-input" />
          </div>
        </section>

        {/* Typography */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="02"
            title="Typography"
            description="Two typefaces keep the interface clear and consistent."
          />

          <div className="mt-10 space-y-10">
            <div>
              <TypographyLabel>Headline / Space Grotesk</TypographyLabel>

              <h3 className="mt-3 font-headline text-5xl font-bold tracking-tight">
                Manage your business.
              </h3>
            </div>

            <div>
              <TypographyLabel>Body / Inter</TypographyLabel>

              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                Clear typography helps users understand information, navigate
                the system, and complete tasks quickly.
              </p>
            </div>

            <div>
              <TypographyLabel>Label / Inter</TypographyLabel>

              <p className="mt-3 font-label text-xs font-semibold uppercase tracking-widest text-primary">
                LEAD STATUS
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="03"
            title="Buttons"
            description="Simple actions with clear hierarchy."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Primary
            </button>

            <button className="bg-neutral px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Neutral
            </button>

            <button className="border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted">
              Secondary
            </button>

            <button className="border border-danger px-5 py-3 text-sm font-semibold text-danger transition-colors hover:bg-danger hover:text-white">
              Delete
            </button>

            <button
              disabled
              className="cursor-not-allowed bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground"
            >
              Disabled
            </button>
          </div>
        </section>

        {/* Forms */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="04"
            title="Forms"
            description="Simple form controls for admin workflows."
          />

          <div className="mt-8 grid max-w-3xl gap-6">
            <FormField label="Company" placeholder="Enter company name" />

            <FormField
              label="Email"
              type="email"
              placeholder="company@example.com"
            />

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest">
                Status
              </label>

              <div className="relative">
                <select className="w-full appearance-none border border-border bg-input px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Converted</option>
                </select>

                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest">
                Notes
              </label>

              <textarea
                rows={4}
                placeholder="Add notes..."
                className="w-full resize-none border border-border bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="05"
            title="Status"
            description="Use semantic colors for system states."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <StatusBadge label="New" className="bg-primary/10 text-primary" />

            <StatusBadge
              label="Qualified"
              className="bg-success/10 text-success"
            />

            <StatusBadge
              label="Pending"
              className="bg-warning/10 text-warning"
            />

            <StatusBadge label="Lost" className="bg-danger/10 text-danger" />
          </div>
        </section>

        {/* Cards & Table */}
        <section className="border-b border-border py-16">
          <SectionHeader
            number="06"
            title="Cards & Tables"
            description="The main building blocks for admin data."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <StatCard
              label="Total Leads"
              value="128"
              description="+12 this month"
            />

            <StatCard
              label="Qualified"
              value="42"
              description="32.8% of total leads"
            />

            <StatCard label="Clients" value="18" description="+4 this month" />
          </div>

          <div className="mt-6 overflow-hidden border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="font-headline text-lg font-bold">Recent Leads</h3>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-5 py-3 font-label text-xs uppercase tracking-wider">
                    Company
                  </th>

                  <th className="px-5 py-3 font-label text-xs uppercase tracking-wider">
                    Contact
                  </th>

                  <th className="px-5 py-3 font-label text-xs uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 font-medium">Acme Inc.</td>

                  <td className="px-5 py-4 text-muted-foreground">
                    hello@acme.com
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      label="New"
                      className="bg-primary/10 text-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-4 font-medium">Example Studio</td>

                  <td className="px-5 py-4 text-muted-foreground">
                    hello@example.com
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      label="Qualified"
                      className="bg-success/10 text-success"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16">
          <SectionHeader
            number="07"
            title="Principles"
            description="Keep the admin interface consistent."
          />

          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
            <Principle
              title="Clear"
              description="Prioritize information and make actions obvious."
            />

            <Principle
              title="Simple"
              description="Use a small number of components and colors."
            />

            <Principle
              title="Consistent"
              description="Reuse the same patterns throughout the admin."
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="font-headline font-bold">Lunex Admin</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Internal design system
          </p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   Components
   ========================================================= */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-label text-xs font-bold text-primary">
          {number}
        </span>

        <span className="h-px w-8 bg-primary" />

        <span className="font-label text-xs uppercase tracking-widest text-muted-foreground">
          System
        </span>
      </div>

      <div className="mt-3">
        <h2 className="font-headline text-3xl font-bold tracking-tight">
          {title}
        </h2>

        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function ColorCard({
  name,
  value,
  description,
  className,
}: {
  name: string;
  value: string;
  description: string;
  className: string;
}) {
  return (
    <div className={`min-h-36 border border-border p-5 ${className}`}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="font-label text-xs font-bold uppercase tracking-widest">
            {name}
          </span>

          <p className="mt-2 text-sm opacity-75">{description}</p>
        </div>

        <span className="font-label text-xs">{value}</span>
      </div>
    </div>
  );
}

function TokenCard({ name, token }: { name: string; token: string }) {
  return (
    <div className="bg-card p-5">
      <span className="font-headline font-bold">{name}</span>

      <p className="mt-2 font-label text-[10px] uppercase tracking-wider text-muted-foreground">
        {token}
      </p>
    </div>
  );
}

function TypographyLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-border bg-input px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-card p-5">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <p className="mt-4 font-headline text-4xl font-bold">{value}</p>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Principle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6">
      <h3 className="font-headline text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
