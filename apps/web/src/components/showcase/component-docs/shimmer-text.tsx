import { ShimmerText } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { ShimmerText } from "@/components/ui/shimmer-text";

export function ShimmerTextDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ShimmerText size="xl" text="Planning next moves" />
      <ShimmerText variant="primary" size="lg" text="Syncing workspace" />
    </div>
  );
}`;

const inlineCode = `import { ShimmerText } from "@/components/ui/shimmer-text";

export function InlineShimmer() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <ShimmerText size="sm" text="Loading dashboard" />
      <span className="text-muted-foreground">— this won't take long</span>
    </div>
  );
}`;

function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ShimmerText size="xl" text="Planning next moves" />
      <ShimmerText size="lg" text="Syncing workspace" variant="primary" />
    </div>
  );
}

function InlineExample() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <ShimmerText size="sm" text="Loading dashboard" />
      <span className="text-muted-foreground">— this won't take long</span>
    </div>
  );
}

export const shimmerTextDocs: ComponentDocDefinition = {
  description: "An animated text shimmer for loading and progress states.",
  examples: [
    {
      code: inlineCode,
      preview: <InlineExample />,
      resetKey: "shimmer-text-inline-example",
      title: "Inline loading",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { ShimmerText } from "@/components/ui/shimmer-text";`,
  props: [
    {
      title: "ShimmerText",
      props: [
        {
          name: "text",
          type: "string",
          defaultValue: "-",
          description:
            "The text to display. Also feeds the shimmer layer via data-text.",
        },
        {
          name: "variant",
          type: '"muted" | "primary"',
          defaultValue: '"muted"',
          description: "Sets the base and highlight color pair.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "xl"',
          defaultValue: '"default"',
          description: "Controls the text size and weight.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<ShimmerText size="lg" text="Loading workspace" />`,
};
