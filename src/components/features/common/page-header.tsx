interface PageHeaderProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({
  title = "Dashboard",
  subTitle = "Welcome back. Here's an overview of your operations.",
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
      </div>

      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
};
