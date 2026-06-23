# Progress

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

An indicator for task and process completion.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/progress.json
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

Create `components/ui/progress.tsx`:

```tsx
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  children,
  size = "default",
  value,
  ...props
}: ProgressPrimitive.Root.Props & {
  size?: "default" | "sm";
}) {
  return (
    <>
      <style>
        {`@keyframes sunlace-progress-indeterminate{0%{transform:translateX(-100%)}100%{transform:translateX(500%)}}`}
      </style>
      <ProgressPrimitive.Root
        value={value}
        data-size={size}
        data-slot="progress"
        className={cn(
          "group/progress grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2",
          className
        )}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative col-span-full flex h-1.5 w-full items-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/5 group-data-[size=sm]/progress:h-1",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-indeterminate:w-1/5 data-indeterminate:animate-[sunlace-progress-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:transition-none motion-reduce:data-indeterminate:animate-none",
        className
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
```

## Usage

```tsx
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
```

```tsx
<Progress value={64}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>
```

## Examples

### Upload progress

```tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ControlledProgress() {
  const [value, setValue] = useState(32);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Progress value={value}>
        <ProgressLabel>Project setup</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Button
        disabled={value === 100}
        onClick={() => setValue((current) => Math.min(current + 17, 100))}
        size="sm"
        variant="outline"
      >
        Advance
      </Button>
    </div>
  );
}
```

### Indeterminate progress

```tsx
import { Progress, ProgressLabel } from "@/components/ui/progress";

export function IndeterminateProgress() {
  return (
    <Progress className="w-full max-w-sm" value={null}>
      <ProgressLabel>Preparing deployment</ProgressLabel>
    </Progress>
  );
}
```

## Props

### Progress

| Prop    | Type       | Default | Description                      |
| ------- | ---------- | ------- | -------------------------------- | ------------------------------------------------- |
| `value` | `number    | null`   | `null`                           | Sets progress or enables the indeterminate state. |
| `min`   | `number`   | `0`     | Sets the minimum progress value. |
| `max`   | `number`   | `100`   | Sets the maximum progress value. |
| `size`  | `"default" | "sm"`   | `"default"`                      | Sets the track thickness.                         |

---

Also supports Base UI primitive props. See [Base UI Progress](https://base-ui.com/react/components/progress).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/progress)
