# Accordion

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A stack of collapsible sections.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/accordion.json
```

**Dependencies:** `@base-ui/react`, `@hugeicons/core-free-icons`, `@hugeicons/react`

### Manual

```bash
npm install @base-ui/react @hugeicons/core-free-icons @hugeicons/react clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/accordion.tsx`:

```tsx
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  showArrow?: boolean;
  underline?: boolean;
};

function AccordionTrigger({
  className,
  children,
  showArrow = true,
  underline = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          underline && "hover:underline",
          className
        )}
        {...props}
      >
        {children}
        {showArrow ? (
          <span
            data-slot="accordion-trigger-icon"
            className="pointer-events-none flex shrink-0 translate-y-0.5 items-center justify-center transition-transform duration-[360ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none"
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="size-full"
            />
          </span>
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="group/accordion-content h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-[360ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "min-h-0 overflow-hidden pt-0 pb-2.5 transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-data-ending-style/accordion-content:opacity-0 group-data-starting-style/accordion-content:-translate-y-1 group-data-starting-style/accordion-content:opacity-0 motion-reduce:transition-none [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

## Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
```

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows accessible disclosure behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Examples

### Release checklist

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccordionCardDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Release checklist</CardTitle>
        <CardDescription>
          Track the final passes before publishing a component update.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["design"]}>
          <AccordionItem value="design">
            <AccordionTrigger>Design review</AccordionTrigger>
            <AccordionContent>
              Validate spacing, color tokens, focus states, and dark mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="qa">
            <AccordionTrigger>QA pass</AccordionTrigger>
            <AccordionContent>
              Test keyboard navigation across desktop and mobile viewports.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="docs">
            <AccordionTrigger>Docs update</AccordionTrigger>
            <AccordionContent>
              Keep the usage snippet aligned with the shipped component API.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
```

## Props

### Accordion

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `borders` | `boolean` | `false` | Wraps the accordion in a connected border treatment. |
| `multiple` | `boolean` | `false` | Allows more than one item to stay open at the same time. |

### AccordionTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showArrow` | `boolean` | `true` | Shows or hides the trigger arrow icon. |
| `underline` | `boolean` | `true` | Controls the trigger underline on hover. |

---
Also supports Base UI primitive props. See [Base UI Accordion](https://base-ui.com/react/components/accordion).

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/accordion)