# Dock

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A macOS-style dock with a gliding active pill.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/dock.json
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

Create `components/ui/dock.tsx`:

```tsx
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type DockContextValue = {
  size: number;
  activeId: string | null;
  setActiveId: (id: string) => void;
  registerItem: (id: string, el: HTMLElement) => void;
  pillRef: React.RefObject<HTMLDivElement | null>;
};

const DockContext = createContext<DockContextValue | null>(null);

type DockProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  defaultActiveId?: string;
};

function Dock({ children, size = 44, className, defaultActiveId }: DockProps) {
  const [activeId, setActiveId] = useState<string | null>(
    defaultActiveId ?? null
  );
  const pillRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());

  const registerItem = (id: string, el: HTMLElement) => {
    itemsRef.current.set(id, el);
    if (activeId === id) {
      movePill(el);
    }
  };

  const movePill = (el: HTMLElement) => {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.setProperty("--dock-pill-x", `${el.offsetLeft}px`);
    pill.style.setProperty("--dock-pill-y", `${el.offsetTop}px`);
    pill.style.setProperty("--dock-pill-w", `${el.offsetWidth}px`);
    pill.style.setProperty("--dock-pill-h", `${el.offsetHeight}px`);
    pill.style.opacity = "1";
  };

  const handleActiveChange = (id: string) => {
    setActiveId(id);
    const el = itemsRef.current.get(id);
    if (el) movePill(el);
  };

  const ctxValue: DockContextValue = {
    size,
    activeId,
    setActiveId: handleActiveChange,
    registerItem,
    pillRef,
  };

  return (
    <DockContext.Provider value={ctxValue}>
      <div
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card/80 px-2 py-1 shadow-lg backdrop-blur-xl",
          className
        )}
      >
        <div
          className="pointer-events-none absolute top-0 left-0 z-0 rounded-xl border border-border bg-background shadow-sm ring-1 ring-foreground/5 transition-[transform,width,height,opacity] duration-[var(--tabs-dur)] ease-[var(--tabs-ease)] will-change-[transform,width,height] [--tabs-dur:250ms] [--tabs-ease:cubic-bezier(0.22,1,0.36,1)] [transform:translate(var(--dock-pill-x,0),var(--dock-pill-y,0))] [width:var(--dock-pill-w,0)] [height:var(--dock-pill-h,0)] opacity-0 dark:border-input dark:bg-input/50 motion-reduce:transition-none"
          ref={pillRef}
        />
        {children}
      </div>
    </DockContext.Provider>
  );
}

type DockItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  id: string;
  "aria-label"?: string;
};

function DockItem({
  children,
  className,
  onClick,
  active,
  id,
  ...rest
}: DockItemProps) {
  const dock = useContext(DockContext);
  const ref = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const size = dock?.size ?? 44;

  useLayoutEffect(() => {
    if (ref.current && dock) {
      dock.registerItem(id, ref.current);
    }
  }, [id, dock]);

  const handleClick = () => {
    dock?.setActiveId(id);
    onClick?.();
  };

  const sharedClass = cn(
    "dock-item relative z-10 flex shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-300",
    active && "text-foreground",
    className
  );

  const sharedStyle = { width: size, height: size };

  if (onClick) {
    return (
      <button
        aria-label={rest["aria-label"]}
        aria-pressed={active}
        className={cn(
          sharedClass,
          "cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        onClick={handleClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        style={sharedStyle}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={sharedClass}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={sharedStyle}
    >
      {children}
    </div>
  );
}

function DockSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-1 h-8 w-px shrink-0 self-center bg-border", className)}
    />
  );
}

export { Dock, DockItem, DockSeparator };
```

## Usage

```tsx
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
```

```tsx
<Dock>
  <DockItem id="home" active onClick={() => {}}>
    <Icon />
  </DockItem>
  <DockSeparator />
  <DockItem id="settings" onClick={() => {}}>
    <Icon />
  </DockItem>
</Dock>
```

## Examples

### Editor toolbar

```tsx
import {
  AlignLeftIcon,
  AlignRightIcon,
  CropIcon,
  Image02Icon,
  Redo02Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
import { useState } from "react";

export function EditorToolbar() {
  const [active, setActive] = useState("align-left");

  return (
    <Dock defaultActiveId="align-left" size={36}>
      <DockItem
        id="undo"
        aria-label="Undo"
        onClick={() => setActive("undo")}
        active={active === "undo"}
      >
        <HugeiconsIcon icon={Undo02Icon} className="size-4" />
      </DockItem>
      <DockItem
        id="redo"
        aria-label="Redo"
        onClick={() => setActive("redo")}
        active={active === "redo"}
      >
        <HugeiconsIcon icon={Redo02Icon} className="size-4" />
      </DockItem>
      <DockSeparator />
      <DockItem
        id="align-left"
        aria-label="Align left"
        onClick={() => setActive("align-left")}
        active={active === "align-left"}
      >
        <HugeiconsIcon icon={AlignLeftIcon} className="size-4" />
      </DockItem>
      <DockItem
        id="align-right"
        aria-label="Align right"
        onClick={() => setActive("align-right")}
        active={active === "align-right"}
      >
        <HugeiconsIcon icon={AlignRightIcon} className="size-4" />
      </DockItem>
      <DockSeparator />
      <DockItem
        id="crop"
        aria-label="Crop"
        onClick={() => setActive("crop")}
        active={active === "crop"}
      >
        <HugeiconsIcon icon={CropIcon} className="size-4" />
      </DockItem>
      <DockItem
        id="image"
        aria-label="Image"
        onClick={() => setActive("image")}
        active={active === "image"}
      >
        <HugeiconsIcon icon={Image02Icon} className="size-4" />
      </DockItem>
    </Dock>
  );
}
```

## Props

### Dock

| Prop              | Type     | Default | Description                       |
| ----------------- | -------- | ------- | --------------------------------- |
| `size`            | `number` | `44`    | Size of each dock item in pixels. |
| `defaultActiveId` | `string` | `-`     | Sets the initially active item.   |

### DockItem

| Prop      | Type         | Default | Description                                                          |
| --------- | ------------ | ------- | -------------------------------------------------------------------- |
| `id`      | `string`     | `-`     | Unique identifier for the active pill tracking.                      |
| `active`  | `boolean`    | `false` | Shows the active pill behind this item.                              |
| `onClick` | `() => void` | `-`     | When set, the item renders as a button and triggers the active pill. |

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/dock)
