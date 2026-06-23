# Popover

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A floating surface for contextual content and controls.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/popover.json
```

**Dependencies:** `@base-ui/react`

### Manual

```bash
npm install @base-ui/react clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/popover.tsx`:

```tsx
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";

import { cn } from "@/lib/utils";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-3 rounded-lg border border-border bg-popover bg-clip-padding p-3 text-sm text-popover-foreground shadow-[0_1px_1px_rgb(0_0_0/0.06),0_8px_24px_rgb(0_0_0/0.1),inset_0_1px_rgb(255_255_255/0.16)] outline-none dark:shadow-[0_1px_1px_rgb(0_0_0/0.3),0_10px_28px_rgb(0_0_0/0.24),inset_0_1px_rgb(255_255_255/0.07)]",
            "opacity-100 transition-[transform,opacity] duration-[var(--dropdown-open-dur)] ease-[var(--dropdown-ease)] will-change-[transform,opacity] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--dropdown-close-dur)] data-[ending-style]:[transform:scale(var(--dropdown-closing-scale))] data-[starting-style]:opacity-0 data-[starting-style]:[transform:scale(var(--dropdown-pre-scale))] data-open:[transform:scale(1)] motion-reduce:transition-none",
            "[--dropdown-close-dur:150ms] [--dropdown-closing-scale:0.99] [--dropdown-ease:cubic-bezier(0.22,1,0.36,1)] [--dropdown-open-dur:250ms] [--dropdown-pre-scale:0.97]",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("leading-5 font-medium", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
```

## Usage

```tsx
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Quick note</PopoverTitle>
      <PopoverDescription>Supporting detail.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

## Examples

### Notification preferences

```tsx
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export function PreferencesPopover() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        View options
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            Choose which updates reach your inbox.
          </PopoverDescription>
        </PopoverHeader>
        <label className="flex items-center justify-between gap-4">
          Deployment updates
          <Switch defaultChecked />
        </label>
        <label className="flex items-center justify-between gap-4">
          Weekly summary
          <Switch />
        </label>
      </PopoverContent>
    </Popover>
  );
}
```

## Props

### Popover

| Prop           | Type                      | Default | Description                               |
| -------------- | ------------------------- | ------- | ----------------------------------------- |
| `open`         | `boolean`                 | `-`     | Controls whether the popover is open.     |
| `defaultOpen`  | `boolean`                 | `false` | Sets the initial uncontrolled open state. |
| `onOpenChange` | `(open: boolean) => void` | `-`     | Runs when the open state changes.         |

### PopoverContent

| Prop         | Type     | Default  | Description                         |
| ------------ | -------- | -------- | ----------------------------------- | ---------- | --------------------------------------- | --------------------------------------- |
| `side`       | `"top"   | "right"  | "bottom"                            | "left"`    | `"bottom"`                              | Sets the preferred side of the trigger. |
| `align`      | `"start" | "center" | "end"`                              | `"center"` | Aligns the popover against its trigger. |
| `sideOffset` | `number` | `4`      | Sets the distance from the trigger. |

---

Also supports Base UI primitive props. See [Base UI Popover](https://base-ui.com/react/components/popover).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/popover)
