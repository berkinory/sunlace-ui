# Switch

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A toggle for binary on/off states.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/switch.json
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

Create `components/ui/switch.tsx`:

```tsx
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 outline-none transition-colors duration-300 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-50 motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block shrink-0 rounded-full bg-background ring-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-3 data-checked:bg-primary-foreground motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

```

## Usage

```tsx
import { Switch } from "@/components/ui/switch";
```

```tsx
<label className="flex items-center gap-3">
  <Switch defaultChecked />
  Automatic updates
</label>
```

## Examples

### Notification settings

```tsx
import { Switch } from "@/components/ui/switch";

const preferences = [
  {
    defaultChecked: true,
    description: "Product updates and feature announcements.",
    label: "Product news",
  },
  {
    defaultChecked: false,
    description: "Weekly account activity and usage reports.",
    label: "Weekly summary",
  },
  {
    defaultChecked: true,
    description: "Security alerts and unusual sign-in activity.",
    label: "Security alerts",
  },
];

export function NotificationPreferences() {
  return (
    <div className="grid w-80 divide-y divide-border">
      {preferences.map((preference) => (
        <label
          className="flex cursor-pointer items-start justify-between gap-5 py-3 first:pt-0 last:pb-0"
          key={preference.label}
        >
          <span className="grid gap-0.5">
            <span className="text-sm font-medium">{preference.label}</span>
            <span className="text-sm text-muted-foreground">
              {preference.description}
            </span>
          </span>
          <Switch
            className="mt-0.5"
            defaultChecked={preference.defaultChecked}
          />
        </label>
      ))}
    </div>
  );
}
```

## Props

### Switch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `-` | Controls the checked state. |
| `defaultChecked` | `boolean` | `false` | Sets the initial checked state when uncontrolled. |
| `onCheckedChange` | `(checked: boolean, eventDetails: SwitchRoot.ChangeEventDetails) => void` | `-` | Runs when the checked state changes. |
| `disabled` | `boolean` | `false` | Prevents interaction and lowers visual emphasis. |
| `readOnly` | `boolean` | `false` | Prevents changes while preserving focus behavior. |
| `required` | `boolean` | `false` | Marks the switch as required in a form. |
| `name` | `string` | `-` | Sets the submitted form field name. |
| `size` | `"sm" | "default"` | `"default"` | Sets the switch dimensions. |

---
Also supports Base UI primitive props. See [Base UI Switch](https://base-ui.com/react/components/switch).

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/switch)