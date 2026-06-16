import { Button } from "@sunlace/ui";
import { Link, createFileRoute } from "@tanstack/react-router";

import { defaultComponentSlug } from "@/components/showcase/component-registry";
import { SiteHeaderRow } from "@/components/showcase/showcase-header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  head: () => ({
    meta: [{ title: "sunlace" }],
  }),
});

function HomeComponent() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeaderRow />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Component Library</p>
            <h1 className="text-3xl font-semibold tracking-tight">sunlace</h1>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
            <span className="text-sm text-muted-foreground">Workspace</span>
            <span className="font-medium">Ready</span>
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              render={
                <Link
                  to="/ui/$component"
                  params={{ component: defaultComponentSlug }}
                />
              }
            >
              Components
            </Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
