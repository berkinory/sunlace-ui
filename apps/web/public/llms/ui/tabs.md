# Tabs

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A set of panels switched by a shared tab list.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/tabs.json
```

**Dependencies:** `@base-ui/react`, `class-variance-authority`

### Manual

```bash
npm install @base-ui/react class-variance-authority clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/tabs.tsx`:

```tsx
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2",
        orientation === "horizontal" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center justify-center self-start rounded-lg p-[3px] text-muted-foreground data-[orientation=horizontal]:h-9 data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {variant === "default" ? (
        <TabsPrimitive.Indicator
          data-slot="tabs-indicator"
          className="absolute top-0 left-0 z-0 rounded-md border border-border bg-background shadow-sm ring-1 ring-foreground/5 transition-[transform,width,height] duration-[var(--tabs-dur)] ease-[var(--tabs-ease)] will-change-[transform,width,height] [--tabs-dur:250ms] [--tabs-ease:cubic-bezier(0.22,1,0.36,1)] [height:var(--active-tab-height)] [transform:translate(var(--active-tab-left),var(--active-tab-top))] [width:var(--active-tab-width)] dark:border-input dark:bg-input/50 motion-reduce:transition-none"
        />
      ) : null}
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-1 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2.5 py-1 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none transition-[height,opacity,filter,transform] delay-[var(--tabs-content-delay)] duration-[var(--tabs-content-dur)] ease-[var(--tabs-content-ease)] will-change-[height,opacity,filter,transform] [--tabs-content-delay:90ms] [--tabs-content-dur:260ms] [--tabs-content-ease:cubic-bezier(0.16,1,0.3,1)] data-[ending-style]:absolute data-[ending-style]:w-full data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:blur-[3px] data-[ending-style]:[--tabs-content-delay:0ms] data-[ending-style]:[--tabs-content-dur:120ms] data-[ending-style]:[transform:translateY(-2px)] data-[starting-style]:opacity-0 data-[starting-style]:blur-[3px] data-[starting-style]:[transform:translateY(2px)] motion-reduce:transition-none motion-reduce:blur-none motion-reduce:transform-none",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };

```

## Usage

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
```

```tsx
<Tabs defaultValue="login">
  <TabsList>
    <TabsTrigger value="login">Log in</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login">Log in form</TabsContent>
  <TabsContent value="register">Registration form</TabsContent>
</Tabs>
```

## Examples

### Project sections

```tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ProjectTabs() {
  return (
    <Tabs className="w-80 gap-4" defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <Card>
        <TabsContent value="overview">
          <CardContent className="text-muted-foreground">
            Track launch status, ownership, and current project health.
          </CardContent>
        </TabsContent>
        <TabsContent value="activity">
          <CardContent className="text-muted-foreground">
            Review recent deploys, comments, and handoff notes.
          </CardContent>
        </TabsContent>
        <TabsContent value="settings">
          <CardContent className="text-muted-foreground">
            Manage access, notifications, and automation rules.
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
```

## Props

### Tabs

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Controls the active tab. |
| `defaultValue` | `string` | `-` | Sets the initial active tab when uncontrolled. |
| `onValueChange` | `(value: string) => void` | `-` | Runs when the active tab changes. |
| `orientation` | `"horizontal" | "vertical"` | `"horizontal"` | Sets the tab list direction. |

### TabsList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" | "line"` | `"default"` | Sets the list presentation. |
| `activateOnFocus` | `boolean` | `false` | Activates tabs while moving keyboard focus. |

### TabsTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Connects the trigger to its content panel. |
| `disabled` | `boolean` | `false` | Prevents selecting the tab. |

### TabsContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Connects the panel to its trigger. |

---
Also supports Base UI primitive props. See [Base UI Tabs](https://base-ui.com/react/components/tabs).

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/tabs)