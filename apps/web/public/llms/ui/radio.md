# Radio

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A single-choice selection from a list of options.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/radio.json
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

Create `components/ui/radio.tsx`:

```tsx
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

function Radio({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <>
      <style>
        {`@keyframes sunlace-radio-in{0%{opacity:0;transform:scale(.45)}60%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}`}
      </style>
      <RadioPrimitive.Root
        data-slot="radio-item"
        className={cn(
          "peer relative grid aspect-square size-4 shrink-0 place-items-center overflow-hidden rounded-full border border-input transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-indicator"
          className="grid size-full place-items-center"
        >
          <span className="size-2 animate-[sunlace-radio-in_300ms_cubic-bezier(0.175,0.885,0.32,1.1)_both] rounded-full bg-primary-foreground motion-reduce:animate-none" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    </>
  );
}

export { Radio, RadioItem };
```

## Usage

```tsx
import { Radio, RadioItem } from "@/components/ui/radio";
```

```tsx
<Radio defaultValue="pro">
  <label>
    <RadioItem value="starter" />
    Starter
  </label>
  <label>
    <RadioItem value="pro" />
    Pro
  </label>
</Radio>
```

## Examples

### Project visibility

```tsx
import { useState } from "react";

import { Radio, RadioItem } from "@/components/ui/radio";

export function ControlledRadio() {
  const [visibility, setVisibility] = useState("public");

  return (
    <div className="grid gap-3">
      <Radio onValueChange={(value) => setVisibility(value)} value={visibility}>
        <label className="flex items-center gap-3">
          <RadioItem value="public" />
          Public
        </label>
        <label className="flex items-center gap-3">
          <RadioItem value="private" />
          Private
        </label>
        <label className="flex items-center gap-3 text-muted-foreground">
          <RadioItem disabled value="team" />
          Team only
        </label>
      </Radio>
      <p className="w-52 text-center text-sm text-muted-foreground">
        Project is <span className="text-foreground">{visibility}</span>.
      </p>
    </div>
  );
}
```

## Props

### Radio

| Prop            | Type                      | Default | Description                           |
| --------------- | ------------------------- | ------- | ------------------------------------- |
| `value`         | `string`                  | `-`     | Controls the selected value.          |
| `defaultValue`  | `string`                  | `-`     | Sets the initial uncontrolled value.  |
| `onValueChange` | `(value: string) => void` | `-`     | Runs when the selected value changes. |
| `disabled`      | `boolean`                 | `false` | Disables every item in the group.     |

### RadioItem

| Prop       | Type      | Default | Description                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `value`    | `string`  | `-`     | Identifies the item inside its group. |
| `disabled` | `boolean` | `false` | Disables the individual item.         |

---

Also supports Base UI primitive props. See [Base UI Radio](https://base-ui.com/react/components/radio-group).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/radio)
