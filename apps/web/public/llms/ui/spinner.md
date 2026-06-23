# Spinner

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

An animated indicator for loading states.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/spinner.json
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

Create `components/ui/spinner.tsx`:

```tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type SpinnerSpeed = "fast" | "normal" | "slow";
type SpinnerVariant = "icon" | "ring";

const spinnerSpeedClassName: Record<SpinnerSpeed, string> = {
  fast: "[animation-duration:700ms]",
  normal: "[animation-duration:1000ms]",
  slow: "[animation-duration:1400ms]",
};

function Spinner({
  className,
  "aria-label": ariaLabel = "Loading",
  render,
  speed = "normal",
  variant = "icon",
  ...props
}: useRender.ComponentProps<"span"> & {
  speed?: SpinnerSpeed;
  variant?: SpinnerVariant;
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        "aria-label": ariaLabel,
        children:
          variant === "icon" ? (
            <HugeiconsIcon aria-hidden icon={Loading03Icon} strokeWidth={2} />
          ) : null,
        className: cn(
          "inline-block size-4 animate-spin",
          variant === "icon"
            ? "[&>svg]:size-full"
            : "rounded-full border-2 border-foreground border-r-transparent",
          spinnerSpeedClassName[speed],
          className
        ),
        role: "status",
      },
      props
    ),
    render,
    state: {
      slot: "spinner",
      speed,
      variant,
    },
  });
}

export { Spinner };

```

## Usage

```tsx
import { Spinner } from "@/components/ui/spinner";
```

```tsx
<Spinner className="size-6" />
```

## Examples

### Inline loading

```tsx
import { Spinner } from "@/components/ui/spinner";

export function InlineStatus() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
      <Spinner className="size-4" speed="slow" variant="ring" />
      Syncing changes
    </div>
  );
}
```

## Props

### Spinner

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"ring" | "icon"` | `"icon"` | Sets the spinner visual style. |
| `speed` | `"slow" | "normal" | "fast"` | `"normal"` | Sets the spin duration from the design system scale. |

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/spinner)