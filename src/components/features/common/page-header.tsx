interface PageHeaderProps {
  title?: string;
  pageName?: string;
  subTitle?: string;
}

export const PageHeader = ({
  title = "Workspace",
  pageName = "Dashboard",
  subTitle = "Welcome back. Here's an overview of your operations.",
}: PageHeaderProps) => {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {title}
      </p>

      <h1 className="text-3xl font-semibold tracking-tight">{pageName}</h1>

      <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
    </div>
  );
};
