# Dialog

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A modal surface for forms and confirmations.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/dialog.json
```

**Dependencies:** `@base-ui/react`, `@hugeicons/core-free-icons`, `@hugeicons/react`

**Sunlace Dependencies:** [`button`](https://sunlace.dev/ui/button)

### Manual

```bash
npm install @base-ui/react @hugeicons/core-free-icons @hugeicons/react clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/dialog.tsx`:

```tsx
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dialogTransitionVars =
  "[--modal-close-dur:280ms] [--modal-ease:cubic-bezier(0.22,1,0.36,1)] [--modal-open-dur:280ms]";

const dialogScaleVars = "[--modal-scale-close:0.94] [--modal-scale:0.94]";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/30 opacity-100 supports-backdrop-filter:backdrop-blur-[4px] transition-opacity duration-[var(--modal-open-dur)] ease-[var(--modal-ease)] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--modal-close-dur)] data-[starting-style]:opacity-0 motion-reduce:transition-none dark:bg-black/50",
        dialogTransitionVars,
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-5 rounded-xl border border-border bg-card bg-clip-padding p-5 text-sm text-card-foreground opacity-100 shadow-[0_1px_1px_rgb(0_0_0/0.06),0_12px_40px_rgb(0_0_0/0.14),inset_0_1px_rgb(255_255_255/0.18)] outline-none transition-[transform,opacity] duration-[var(--modal-open-dur)] ease-[var(--modal-ease)] will-change-[transform,opacity] origin-center [transform:translate(-50%,-50%)_scale(1)] sm:max-w-md data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--modal-close-dur)] data-[ending-style]:[transform:translate(-50%,-50%)_scale(var(--modal-scale-close))] data-[starting-style]:opacity-0 data-[starting-style]:[transform:translate(-50%,-50%)_scale(var(--modal-scale))] motion-reduce:transition-none dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),0_16px_48px_rgb(0_0_0/0.32),inset_0_1px_rgb(255_255_255/0.08)]",
          dialogTransitionVars,
          dialogScaleVars,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 pr-8", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-5 -mb-5 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/40 px-4 py-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base leading-6 font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-5 text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
```

## Usage

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
```

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Open dialog
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Supporting detail.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Examples

### Destructive confirmation

```tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Delete project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This permanently removes the project and its deployment history.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button variant="destructive">Delete project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Props

### Dialog

| Prop           | Type                      | Default | Description                               |
| -------------- | ------------------------- | ------- | ----------------------------------------- |
| `open`         | `boolean`                 | `-`     | Controls whether the dialog is open.      |
| `defaultOpen`  | `boolean`                 | `false` | Sets the initial uncontrolled open state. |
| `onOpenChange` | `(open: boolean) => void` | `-`     | Runs when the open state changes.         |

### DialogContent

| Prop              | Type      | Default | Description                                     |
| ----------------- | --------- | ------- | ----------------------------------------------- |
| `showCloseButton` | `boolean` | `true`  | Shows the close button in the top-right corner. |

### DialogFooter

| Prop              | Type      | Default | Description                           |
| ----------------- | --------- | ------- | ------------------------------------- |
| `showCloseButton` | `boolean` | `false` | Adds a default outlined close action. |

---

Also supports Base UI primitive props. See [Base UI Dialog](https://base-ui.com/react/components/dialog).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/dialog)
