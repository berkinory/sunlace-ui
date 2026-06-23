# Tooltip

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A label that appears on hover or focus.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/tooltip.json
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

Create `components/ui/tooltip.tsx`:

```tsx
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />;
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  showArrow = true,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    showArrow?: boolean;
  }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-secondary-foreground text-xs shadow-[0_1px_1px_rgb(0_0_0/0.06),0_2px_6px_rgb(0_0_0/0.08)] opacity-100 [filter:blur(0)] [transform:scale(1)_translate(0,0)] transition-[opacity,transform,filter] duration-[var(--tooltip-open-dur)] ease-[var(--tooltip-ease)] will-change-[opacity,transform,filter] [--tooltip-close-dur:140ms] [--tooltip-ease:cubic-bezier(0.34,1.2,0.64,1)] [--tooltip-enter-blur:6px] [--tooltip-enter-scale:0.85] [--tooltip-exit-blur:4px] [--tooltip-exit-scale:0.92] [--tooltip-open-dur:280ms] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--tooltip-close-dur)] data-[ending-style]:[filter:blur(var(--tooltip-exit-blur))] data-[ending-style]:[transform:scale(var(--tooltip-exit-scale))_translate(var(--tooltip-exit-x),var(--tooltip-exit-y))] data-[instant]:transition-none data-[starting-style]:opacity-0 data-[starting-style]:[filter:blur(var(--tooltip-enter-blur))] data-[starting-style]:[transform:scale(var(--tooltip-enter-scale))_translate(var(--tooltip-enter-x),var(--tooltip-enter-y))] data-[side=bottom]:[--tooltip-enter-x:0px] data-[side=bottom]:[--tooltip-enter-y:-10px] data-[side=bottom]:[--tooltip-exit-x:0px] data-[side=bottom]:[--tooltip-exit-y:-6px] data-[side=inline-end]:[--tooltip-enter-x:-10px] data-[side=inline-end]:[--tooltip-enter-y:0px] data-[side=inline-end]:[--tooltip-exit-x:-6px] data-[side=inline-end]:[--tooltip-exit-y:0px] data-[side=inline-start]:[--tooltip-enter-x:10px] data-[side=inline-start]:[--tooltip-enter-y:0px] data-[side=inline-start]:[--tooltip-exit-x:6px] data-[side=inline-start]:[--tooltip-exit-y:0px] data-[side=left]:[--tooltip-enter-x:10px] data-[side=left]:[--tooltip-enter-y:0px] data-[side=left]:[--tooltip-exit-x:6px] data-[side=left]:[--tooltip-exit-y:0px] data-[side=right]:[--tooltip-enter-x:-10px] data-[side=right]:[--tooltip-enter-y:0px] data-[side=right]:[--tooltip-exit-x:-6px] data-[side=right]:[--tooltip-exit-y:0px] data-[side=top]:[--tooltip-enter-x:0px] data-[side=top]:[--tooltip-enter-y:10px] data-[side=top]:[--tooltip-exit-x:0px] data-[side=top]:[--tooltip-exit-y:6px] motion-reduce:transition-none motion-reduce:blur-none motion-reduce:transform-none dark:shadow-[0_1px_1px_rgb(0_0_0/0.24),0_2px_8px_rgb(0_0_0/0.24)]",
            className
          )}
          {...props}
        >
          {children}
          {showArrow ? (
            <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-secondary fill-secondary data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
          ) : null}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
```

```tsx
<TooltipProvider delay={80}>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Hover for info
    </TooltipTrigger>
    <TooltipContent>Quick info</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Examples

### Field hint

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FormTooltip() {
  return (
    <TooltipProvider delay={80}>
      <div className="grid w-72 gap-2">
        <label className="text-sm font-medium" htmlFor="workspace">
          Workspace slug
        </label>
        <div className="flex gap-2">
          <Input id="workspace" placeholder="sunlace" />
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              ?
            </TooltipTrigger>
            <TooltipContent showArrow={false} side="right">
              Used in project URLs.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Props

### Tooltip

| Prop           | Type                      | Default | Description                               |
| -------------- | ------------------------- | ------- | ----------------------------------------- |
| `open`         | `boolean`                 | `-`     | Controls whether the tooltip is open.     |
| `defaultOpen`  | `boolean`                 | `false` | Sets the initial uncontrolled open state. |
| `onOpenChange` | `(open: boolean) => void` | `-`     | Runs when the open state changes.         |

### TooltipContent

| Prop         | Type      | Default  | Description                           |
| ------------ | --------- | -------- | ------------------------------------- | ---------- | --------------------------------------- | --------------------------------------- |
| `side`       | `"top"    | "right"  | "bottom"                              | "left"`    | `"top"`                                 | Sets the preferred side of the trigger. |
| `align`      | `"start"  | "center" | "end"`                                | `"center"` | Aligns the tooltip against its trigger. |
| `sideOffset` | `number`  | `8`      | Sets the distance from the trigger.   |
| `showArrow`  | `boolean` | `true`   | Shows or hides the directional arrow. |

---

Also supports Base UI primitive props. See [Base UI Tooltip](https://base-ui.com/react/components/tooltip).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/tooltip)
