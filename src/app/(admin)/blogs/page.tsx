import { Newspaper } from "lucide-react";

const BlogsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Content
        </p>

        <h1 className="text-3xl font-semibold">Blog</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create and manage your blog content.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="flex min-h-105 items-center justify-center border border-border bg-card p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center border border-border bg-muted/50">
            <Newspaper className="size-6 text-muted-foreground" />
          </div>

          <div className="mb-3 inline-flex items-center border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Coming Soon
          </div>

          <h2 className="text-2xl font-semibold">Blog management is coming</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We&apos;re working on a simple content management experience for
            creating, editing, and publishing blog posts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
