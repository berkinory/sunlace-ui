# Drawer

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A gesture-driven sheet for mobile actions and forms.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/drawer.json
```

**Dependencies:** `vaul`

### Manual

```bash
npm install vaul clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/drawer.tsx`:

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 supports-backdrop-filter:backdrop-blur-[4px] dark:bg-black/50",
        "opacity-100 transition-opacity duration-[var(--panel-open-dur)] ease-[var(--panel-ease)] data-closed:pointer-events-none data-closed:opacity-0 data-closed:duration-[var(--panel-close-dur)] data-open:opacity-100 data-open:duration-[var(--panel-open-dur)] motion-reduce:transition-none",
        "[--panel-blur:2px] [--panel-close-dur:350ms] [--panel-ease:cubic-bezier(0.22,1,0.36,1)] [--panel-open-dur:400ms]",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col border-border bg-card bg-clip-padding text-sm text-card-foreground shadow-[0_1px_1px_rgb(0_0_0/0.06),0_12px_40px_rgb(0_0_0/0.14),inset_0_1px_rgb(255_255_255/0.18)] outline-none dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),0_16px_48px_rgb(0_0_0/0.32),inset_0_1px_rgb(255_255_255/0.08)] data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-[min(85vw,24rem)] data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-[min(85vw,24rem)] data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[85dvh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b",
          "opacity-100 transition-[opacity,filter] duration-[var(--panel-open-dur)] ease-[var(--panel-ease)] will-change-[opacity,filter] [filter:none] data-closed:pointer-events-none data-closed:opacity-0 data-closed:duration-[var(--panel-close-dur)] data-closed:[filter:blur(var(--panel-blur))] data-open:pointer-events-auto data-open:opacity-100 data-open:duration-[var(--panel-open-dur)] data-open:[filter:none] motion-reduce:transition-none",
          "[--panel-blur:2px] [--panel-close-dur:350ms] [--panel-ease:cubic-bezier(0.22,1,0.36,1)] [--panel-open-dur:400ms]",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-2.5 hidden h-1 w-10 shrink-0 rounded-full bg-muted-foreground/25 group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1.5 p-5 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left",
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 border-t bg-muted/40 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-base leading-6 font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
```

## Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
```

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Workspace preferences</DrawerTitle>
      <DrawerDescription>Supporting detail.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button>Done</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Examples

### Activity panel

```tsx
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const activity = [
  { event: "Deployment completed", time: "2 minutes ago" },
  { event: "Domain connected", time: "18 minutes ago" },
  { event: "Member invited", time: "1 hour ago" },
];

export function ActivityDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">View activity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project activity</DrawerTitle>
          <DrawerDescription>
            Recent changes across the Acme workspace.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {activity.map((item) => (
            <div
              className="rounded-lg px-2 py-3 hover:bg-muted/50"
              key={item.event}
            >
              <p className="font-medium">{item.event}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close activity</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

## Props

### Drawer

| Prop          | Type      | Default    | Description                                           |
| ------------- | --------- | ---------- | ----------------------------------------------------- | ---------------------------------------- | ---------- | ------------------------------------- |
| `direction`   | `"top"    | "right"    | "bottom"                                              | "left"`                                  | `"bottom"` | Sets the edge the drawer enters from. |
| `snapPoints`  | `(number  | string)[]` | `-`                                                   | Defines the draggable resting positions. |
| `dismissible` | `boolean` | `true`     | Allows dragging or interacting outside to dismiss.    |
| `modal`       | `boolean` | `true`     | Traps focus and blocks interaction behind the drawer. |

---

Also supports Base UI primitive props. See [Base UI Drawer](https://vaul.emilkowal.ski/).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/drawer)
