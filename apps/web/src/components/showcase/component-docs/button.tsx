import { Button } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const actionCode = `import { Button } from "@/components/ui/button";

export function ButtonVariantDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Save Changes</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">View Logs</Button>
    </div>
  );
}`;

const intentCode = `import { Button } from "@/components/ui/button";

export function ButtonIntentDemo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="success">Approve</Button>
        <Button variant="warning">Review</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="shine">Upgrade</Button>
        <Button variant="animated-border">Sync</Button>
        <Button variant="rotate-border">Deploy</Button>
      </div>
    </div>
  );
}`;

const showcaseCode = `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="shine">Shine</Button>
        <Button variant="animated-border">Animated Border</Button>
        <Button variant="rotate-border">Rotate Border</Button>
      </div>
    </div>
  );
}`;

function IntentExample() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="success">Approve</Button>
        <Button variant="warning">Review</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="shine">Upgrade</Button>
        <Button variant="animated-border">Sync</Button>
        <Button variant="rotate-border">Deploy</Button>
      </div>
    </div>
  );
}

export const buttonDocs: ComponentDocDefinition = {
  description:
    "A clickable action control with variants for hierarchy, semantics, sizing, and icon-only usage.",
  examples: [
    {
      code: actionCode,
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button>Save Changes</Button>
          <Button variant="secondary">Preview</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="link">View Logs</Button>
        </div>
      ),
      resetKey: "button-variant-example",
      title: "Action Variants",
    },
    {
      code: intentCode,
      preview: <IntentExample />,
      resetKey: "button-intent-example",
      title: "Intent Variants",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Button } from "@/components/ui/button";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/button",
  props: [
    {
      title: "Button",
      props: [
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "link" | "success" | "warning" | "destructive" | "shine" | "animated-border" | "rotate-border"',
          defaultValue: '"default"',
          description: "Controls the visual style and emphasis of the button.",
        },
        {
          name: "size",
          type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
          defaultValue: '"default"',
          description:
            "Controls the button height, padding, and icon dimensions.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents interaction and lowers visual emphasis.",
        },
      ],
    },
  ],
  renderPreview: () => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="shine">Shine</Button>
        <Button variant="animated-border">Animated Border</Button>
        <Button variant="rotate-border">Rotate Border</Button>
      </div>
    </div>
  ),
  usageCode: `<div className="flex gap-2">
  <Button>Continue</Button>
  <Button variant="outline">Cancel</Button>
</div>`,
};
