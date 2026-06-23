# Toggle

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A two-state button for toggling a single condition on or off.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/toggle.json
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

Create `components/ui/toggle.tsx`:

```tsx
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "group/toggle inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] outline-none select-none active:scale-[0.96] active:duration-[160ms] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[pressed]:border-[color-mix(in_oklch,var(--primary),black_24%)] data-[pressed]:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_15%)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),black_10%)_100%)] data-[pressed]:text-primary-foreground data-[pressed]:hover:border-[color-mix(in_oklch,var(--primary),black_16%)] data-[pressed]:hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_24%)_0%,color-mix(in_oklch,var(--primary),white_7%)_50%,color-mix(in_oklch,var(--primary),black_4%)_100%)] dark:data-[pressed]:border-[color-mix(in_oklch,var(--primary),black_36%)] dark:data-[pressed]:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_34%)_0%,color-mix(in_oklch,var(--primary),black_2%)_42%,color-mix(in_oklch,var(--primary),black_18%)_100%)] dark:data-[pressed]:text-primary-foreground dark:data-[pressed]:hover:border-[color-mix(in_oklch,var(--primary),black_26%)] dark:data-[pressed]:hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_48%)_0%,color-mix(in_oklch,var(--primary),white_8%)_42%,color-mix(in_oklch,var(--primary),black_10%)_100%)]",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted hover:text-foreground",
        outline:
          "border-border bg-background hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_22%)] hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

```

## Usage

```tsx
import { Toggle } from "@/components/ui/toggle";
```

```tsx
<Toggle defaultPressed>Bold</Toggle>
```

## Examples

### View switch

```tsx
import { Grid02Icon, ListViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toggle } from "@/components/ui/toggle";

export function ViewToggle() {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5">
      <Toggle aria-label="Grid view" size="icon">
        <HugeiconsIcon icon={Grid02Icon} />
      </Toggle>
      <Toggle aria-label="List view" defaultPressed size="icon">
        <HugeiconsIcon icon={ListViewIcon} />
      </Toggle>
    </div>
  );
}
```

### Favorite action

```tsx
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toggle } from "@/components/ui/toggle";

export function FavoriteToggle() {
  return (
    <Toggle aria-label="Add to favorites" size="icon" variant="outline">
      <HugeiconsIcon icon={StarIcon} />
    </Toggle>
  );
}
```

## Props

### Toggle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed` | `boolean` | `false` | Controls the pressed (on) state. |
| `defaultPressed` | `boolean` | `false` | Sets the initial uncontrolled pressed state. |
| `onPressedChange` | `(pressed: boolean) => void` | `-` | Runs when the pressed state changes. |
| `variant` | `"default" | "outline"` | `"default"` | Controls the visual style of the toggle. |
| `size` | `"default" | "sm" | "lg" | "icon"` | `"default"` | Controls the toggle height and padding. |
| `disabled` | `boolean` | `false` | Prevents interaction and lowers visual emphasis. |

---
Also supports Base UI primitive props. See [Base UI Toggle](https://base-ui.com/react/components/toggle).

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/toggle)