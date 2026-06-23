# Shimmer Text

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

An animated text shimmer for loading and progress states.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/shimmer-text.json
```

**Dependencies:** `class-variance-authority`

### Manual

```bash
npm install class-variance-authority clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/shimmer-text.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shimmerTextVariants = cva("t-shimmer relative inline-block", {
  variants: {
    variant: {
      muted:
        "[--shimmer-base:var(--muted-foreground)] [--shimmer-highlight:var(--foreground)]",
      primary:
        "[--shimmer-base:color-mix(in_oklch,var(--primary),transparent_60%)] [--shimmer-highlight:var(--primary)]",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-lg",
      xl: "text-2xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    variant: "muted",
    size: "default",
  },
});

const shimmerKeyframes = `@keyframes t-shimmer{0%{background-position:100% 0}100%{background-position:0 0}}`;
const shimmerStyles = `
.t-shimmer {
  --shimmer-dur: 2000ms;
  --shimmer-band: 400%;
  --shimmer-ease: linear;
  color: var(--shimmer-base);
}
.t-shimmer::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(90deg, transparent 0%, transparent 40%, var(--shimmer-highlight) 50%, transparent 60%, transparent 100%);
  background-size: var(--shimmer-band) 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: t-shimmer var(--shimmer-dur) var(--shimmer-ease) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .t-shimmer::before { animation: none !important; }
}
`;

type ShimmerTextProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof shimmerTextVariants> & {
    text: string;
  };

function ShimmerText({
  text,
  variant,
  size,
  className,
  ...props
}: ShimmerTextProps) {
  return (
    <>
      <style>{shimmerKeyframes}</style>
      <style>{shimmerStyles}</style>
      <span
        data-text={text}
        data-slot="shimmer-text"
        className={cn(shimmerTextVariants({ variant, size }), className)}
        {...props}
      >
        {text}
      </span>
    </>
  );
}

export { ShimmerText, shimmerTextVariants };

```

## Usage

```tsx
import { ShimmerText } from "@/components/ui/shimmer-text";
```

```tsx
<ShimmerText size="lg" text="Loading workspace" />
```

## Examples

### Inline loading

```tsx
import { ShimmerText } from "@/components/ui/shimmer-text";

export function InlineShimmer() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <ShimmerText size="sm" text="Loading dashboard" />
      <span className="text-muted-foreground">— this won't take long</span>
    </div>
  );
}
```

## Props

### ShimmerText

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `-` | The text to display. Also feeds the shimmer layer via data-text. |
| `variant` | `"muted" | "primary"` | `"muted"` | Sets the base and highlight color pair. |
| `size` | `"default" | "sm" | "lg" | "xl"` | `"default"` | Controls the text size and weight. |

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/shimmer-text)