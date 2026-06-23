# Checkbox

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A binary or mixed-state selection control.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/checkbox.json
```

**Dependencies:** `@base-ui/react`

### Manual

```bash
npm install @base-ui/react clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/checkbox.tsx`:

```tsx
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <>
      <style>
        {`@keyframes sunlace-checkbox-pop{0%{opacity:0;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes sunlace-checkbox-draw{0%{stroke-dashoffset:1}100%{stroke-dashoffset:0}}`}
      </style>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:data-checked:bg-primary dark:data-indeterminate:bg-primary",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="group/checkbox-indicator grid place-content-center text-current transition-none animate-[sunlace-checkbox-pop_300ms_cubic-bezier(0.175,0.885,0.32,1.1)_both] motion-reduce:animate-none [&>svg]:size-3.5"
        >
          <svg
            aria-hidden
            className="shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            viewBox="0 0 24 24"
          >
            <path
              className="animate-[sunlace-checkbox-draw_300ms_cubic-bezier(0.645,0.045,0.355,1)_forwards] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-indeterminate/checkbox-indicator:hidden motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
              d="M5 13 L10 18 L20 6"
              pathLength="1"
            />
            <path
              className="hidden animate-[sunlace-checkbox-draw_300ms_cubic-bezier(0.645,0.045,0.355,1)_forwards] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-indeterminate/checkbox-indicator:block motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
              d="M6 12 H18"
              pathLength="1"
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </>
  );
}

export { Checkbox };

```

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox";
```

```tsx
<label className="flex items-center gap-3">
  <Checkbox defaultChecked />
  Accept terms
</label>
```

## Examples

### Terms acceptance

```tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxTermsDemo() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="grid w-80 gap-4">
      <label className="flex items-start gap-3">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        <span className="grid gap-1">
          <span className="font-medium">Accept terms</span>
          <span className="text-sm text-muted-foreground">
            I agree to the terms of service and privacy policy.
          </span>
        </span>
      </label>
      <Button disabled={!accepted}>Continue</Button>
    </div>
  );
}
```

### User permissions

```tsx
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

const permissions = ["Billing", "Members", "Deployments"];

export function CheckboxIndeterminateDemo() {
  const [selected, setSelected] = useState([true, false, false]);
  const allSelected = selected.every(Boolean);
  const someSelected = selected.some(Boolean);

  return (
    <div className="grid w-64 gap-3">
      <label className="flex items-center gap-3 font-medium">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onCheckedChange={(checked) => {
            setSelected(selected.map(() => checked));
          }}
        />
        All permissions
      </label>
      <div className="ml-7 grid gap-3">
        {permissions.map((permission, index) => (
          <label className="flex items-center gap-3" key={permission}>
            <Checkbox
              checked={selected[index]}
              onCheckedChange={(checked) => {
                setSelected((current) =>
                  current.map((value, itemIndex) =>
                    itemIndex === index ? checked : value
                  )
                );
              }}
            />
            {permission}
          </label>
        ))}
      </div>
    </div>
  );
}
```

## Props

### Checkbox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `-` | Controls the checked state. |
| `defaultChecked` | `boolean` | `false` | Sets the initial checked state when uncontrolled. |
| `indeterminate` | `boolean` | `false` | Shows a mixed state when only some child options are selected. |
| `onCheckedChange` | `(checked: boolean, eventDetails: CheckboxRoot.ChangeEventDetails) => void` | `-` | Runs when the checked state changes. |
| `disabled` | `boolean` | `false` | Prevents interaction and lowers visual emphasis. |
| `name` | `string` | `-` | Sets the submitted form field name. |
| `required` | `boolean` | `false` | Marks the checkbox as required in a form. |

---
Also supports Base UI primitive props. See [Base UI Checkbox](https://base-ui.com/react/components/checkbox).

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/checkbox)