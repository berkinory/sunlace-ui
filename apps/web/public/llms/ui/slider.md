# Slider

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A draggable control for numeric value or range selection.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/slider.json
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

Create `components/ui/slider.tsx`:

```tsx
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  thumbCollisionBehavior = "none",
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : typeof value === "number"
      ? [value]
      : Array.isArray(defaultValue)
        ? defaultValue
        : typeof defaultValue === "number"
          ? [defaultValue]
          : [min];

  return (
    <SliderPrimitive.Root
      className={cn(
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment="center"
      thumbCollisionBehavior={thumbCollisionBehavior}
      {...props}
    >
      <SliderPrimitive.Control
        className={cn(
          "relative flex touch-none items-center select-none data-disabled:opacity-50",
          orientation === "horizontal"
            ? "h-5 w-full"
            : "h-full min-h-40 w-5 flex-col"
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full bg-muted ring-1 ring-foreground/5 select-none",
            orientation === "horizontal" ? "h-1.5 w-full" : "h-full w-1.5"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(
              "rounded-full bg-primary select-none",
              orientation === "horizontal" ? "h-full" : "w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block size-4 shrink-0 rounded-full border border-primary bg-primary shadow-sm ring-ring/50 transition-[transform,box-shadow] duration-150 ease-out select-none after:absolute after:-inset-2 hover:scale-110 hover:ring-3 focus-visible:scale-110 focus-visible:ring-3 focus-visible:outline-hidden active:scale-95 active:ring-3 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
```

## Usage

```tsx
import { Slider } from "@/components/ui/slider";
```

```tsx
<Slider defaultValue={[44]} />
```

## Examples

### Volume control

```tsx
import { useState } from "react";

import { Slider } from "@/components/ui/slider";

export function VolumeSlider() {
  const [volume, setVolume] = useState([68]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Slider
        onValueChange={(value) => {
          setVolume(Array.isArray(value) ? [...value] : [value]);
        }}
        value={volume}
      />
      <p className="h-5 text-center text-sm text-muted-foreground">
        Volume{" "}
        <span className="inline-block w-10 tabular-nums text-foreground">
          {volume[0]}%
        </span>
      </p>
    </div>
  );
}
```

## Props

### Slider

| Prop           | Type          | Default     | Description                                   |
| -------------- | ------------- | ----------- | --------------------------------------------- | -------------------------- |
| `value`        | `number[]`    | `-`         | Controls the selected value or range.         |
| `defaultValue` | `number[]`    | `-`         | Sets the initial uncontrolled value or range. |
| `min`          | `number`      | `0`         | Sets the minimum value.                       |
| `max`          | `number`      | `100`       | Sets the maximum value.                       |
| `step`         | `number`      | `1`         | Sets the increment between values.            |
| `orientation`  | `"horizontal" | "vertical"` | `"horizontal"`                                | Sets the slider direction. |

---

Also supports Base UI primitive props. See [Base UI Slider](https://base-ui.com/react/components/slider).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/slider)
