import { Skeleton } from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const animation = settings?.skeleton?.animation ?? "shimmer";
  const animationProp =
    animation === "shimmer" ? "" : ` animation="${animation}"`;

  return `import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="mx-auto flex max-w-sm items-center gap-3">
      <Skeleton className="size-10 rounded-full"${animationProp} />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-32"${animationProp} />
        <Skeleton className="h-3 w-48 max-w-full"${animationProp} />
      </div>
    </div>
  );
}`;
}

const tableCode = `import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md divide-y rounded-lg border">
      {[0, 1, 2, 3].map((row) => (
        <div className="grid grid-cols-[1fr_6rem] gap-4 p-3" key={row}>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48 max-w-full" />
          </div>
          <Skeleton className="h-7 w-full self-center" />
        </div>
      ))}
    </div>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const animation = settings?.skeleton?.animation;

  return (
    <div className="mx-auto flex max-w-sm items-center gap-3">
      <Skeleton animation={animation} className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton animation={animation} className="h-3.5 w-32" />
        <Skeleton animation={animation} className="h-3 w-48 max-w-full" />
      </div>
    </div>
  );
}

function TableExample() {
  return (
    <div className="mx-auto w-full max-w-md divide-y rounded-lg border">
      {[0, 1, 2, 3].map((row) => (
        <div className="grid grid-cols-[1fr_6rem] gap-4 p-3" key={row}>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48 max-w-full" />
          </div>
          <Skeleton className="h-7 w-full self-center" />
        </div>
      ))}
    </div>
  );
}

export const skeletonDocs: ComponentDocDefinition = {
  description: "A placeholder for loading content.",
  examples: [
    {
      code: tableCode,
      preview: <TableExample />,
      resetKey: "skeleton-table-example",
      title: "Table rows",
    },
  ],
  getShowcaseCode,
  importCode: `import { Skeleton } from "@/components/ui/skeleton";`,
  props: [
    {
      title: "Skeleton",
      props: [
        {
          name: "animation",
          type: '"shimmer" | "pulse" | "none"',
          defaultValue: '"shimmer"',
          description: "Sets the loading animation style.",
        },
      ],
    },
    {
      title: "SkeletonReveal",
      props: [
        {
          name: "revealed",
          type: "boolean",
          defaultValue: "false",
          description:
            "Cross-fades from the skeleton layer to the content layer.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Skeleton className="h-4 w-full" />`,
};
