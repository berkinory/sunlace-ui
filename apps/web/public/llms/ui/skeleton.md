# Skeleton

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A placeholder for loading content.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/skeleton.json
```

### Manual

```bash
npm install clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/skeleton.tsx`:

```tsx
import { cn } from "@/lib/utils";

function Skeleton({
  animation = "shimmer",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  animation?: "none" | "pulse" | "shimmer";
}) {
  return (
    <>
      <style>
        {`@keyframes sunlace-skeleton-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}
      </style>
      <div
        data-animation={animation}
        data-slot="skeleton"
        className={cn(
          "relative overflow-hidden rounded-md bg-muted data-[animation=pulse]:animate-pulse data-[animation=shimmer]:after:absolute data-[animation=shimmer]:after:inset-0 data-[animation=shimmer]:after:animate-[sunlace-skeleton-shimmer_1.8s_ease-in-out_infinite] data-[animation=shimmer]:after:bg-linear-to-r data-[animation=shimmer]:after:from-transparent data-[animation=shimmer]:after:via-foreground/6 data-[animation=shimmer]:after:to-transparent motion-reduce:data-[animation=pulse]:animate-none motion-reduce:data-[animation=shimmer]:after:animate-none",
          className
        )}
        {...props}
      />
    </>
  );
}

function SkeletonReveal({
  className,
  revealed,
  ...props
}: React.ComponentProps<"div"> & {
  revealed?: boolean;
}) {
  return (
    <div
      data-slot="skeleton-reveal"
      data-state={revealed ? "revealed" : "loading"}
      className={cn(
        "group/skeleton-reveal grid [--skeleton-reveal-blur:2px] [--skeleton-reveal-dur:400ms] [--skeleton-reveal-ease:ease-in-out]",
        className
      )}
      {...props}
    />
  );
}

function SkeletonRevealSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-reveal-skeleton"
      className={cn(
        "col-start-1 row-start-1 z-1 opacity-100 blur-none transition-[opacity,filter] duration-[var(--skeleton-reveal-dur)] ease-[var(--skeleton-reveal-ease)] group-data-[state=revealed]/skeleton-reveal:pointer-events-none group-data-[state=revealed]/skeleton-reveal:opacity-0 group-data-[state=revealed]/skeleton-reveal:blur-[var(--skeleton-reveal-blur)] motion-reduce:transition-none motion-reduce:blur-none",
        className
      )}
      {...props}
    />
  );
}

function SkeletonRevealContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-reveal-content"
      className={cn(
        "col-start-1 row-start-1 z-2 opacity-0 blur-[var(--skeleton-reveal-blur)] transition-[opacity,filter] duration-[var(--skeleton-reveal-dur)] ease-[var(--skeleton-reveal-ease)] group-data-[state=revealed]/skeleton-reveal:opacity-100 group-data-[state=revealed]/skeleton-reveal:blur-none motion-reduce:transition-none motion-reduce:blur-none",
        className
      )}
      {...props}
    />
  );
}

export {
  Skeleton,
  SkeletonReveal,
  SkeletonRevealContent,
  SkeletonRevealSkeleton,
};
```

## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton";
```

```tsx
<Skeleton className="h-4 w-full" />
```

## Examples

### Table rows

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md divide-y rounded-lg border">
      {[0, 1, 2, 3].map((row) => (
        <div className="grid grid-cols-[1fr_6rem] gap-4 p-3" key={row}>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48 max-w-full" />
          </div>
          <Skeleton className="h-7 w-full self-center" />
        </div>
      ))}
    </div>
  );
}
```

## Props

### Skeleton

| Prop        | Type       | Default | Description |
| ----------- | ---------- | ------- | ----------- | ----------- | --------------------------------- |
| `animation` | `"shimmer" | "pulse" | "none"`     | `"shimmer"` | Sets the loading animation style. |

### SkeletonReveal

| Prop       | Type      | Default | Description                                               |
| ---------- | --------- | ------- | --------------------------------------------------------- |
| `revealed` | `boolean` | `false` | Cross-fades from the skeleton layer to the content layer. |

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/skeleton)
