const ProjectsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold">Projects</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your contacts and leads.
        </p>
      </div>

      <div className="border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Contacts will appear here.
        </p>
      </div>
    </div>
  );
};

export default ProjectsPage;
