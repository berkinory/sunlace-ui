import { Badge } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const exampleCode = `import { Badge } from "@/components/ui/badge";

export function BadgeStatusDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Synced</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}`;

const showcaseCode = `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="shine">Shine</Badge>
        <Badge variant="animated-border">Animated Border</Badge>
        <Badge variant="rotate-border">Rotate Border</Badge>
      </div>
    </div>
  );
}`;

export const badgeDocs: ComponentDocDefinition = {
  description:
    "A compact label for status, metadata, and low-friction emphasis.",
  examples: [
    {
      code: exampleCode,
      preview: (
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Synced</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Failed</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      ),
      resetKey: "badge-status-example",
      title: "Status Badges",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Badge } from "@/components/ui/badge";`,
  props: [
    {
      title: "Badge",
      props: [
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "link" | "success" | "warning" | "destructive" | "shine" | "animated-border" | "rotate-border"',
          defaultValue: '"default"',
          description: "Controls the visual style and emphasis of the badge.",
        },
      ],
    },
  ],
  renderPreview: () => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="shine">Shine</Badge>
        <Badge variant="animated-border">Animated Border</Badge>
        <Badge variant="rotate-border">Rotate Border</Badge>
      </div>
    </div>
  ),
  usageCode: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
</div>`,
};
