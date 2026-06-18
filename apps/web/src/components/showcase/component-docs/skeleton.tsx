import { Skeleton } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}`;

export const skeletonDocs: ComponentDocDefinition = {
  description: "A placeholder surface for content that is still loading.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Skeleton } from "@/components/ui/skeleton";`,
  renderPreview: () => (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
  usageCode: `<Skeleton className="h-4 w-full" />`,
};
