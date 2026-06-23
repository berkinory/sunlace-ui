# Command Palette

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A searchable command surface with fuzzy filter and keyboard navigation.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/command-palette.json
```

**Dependencies:** `@hugeicons/core-free-icons`, `@hugeicons/react`

### Manual

```bash
npm install @hugeicons/core-free-icons @hugeicons/react clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/command-palette.tsx`:

```tsx
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

type CommandPaletteItem = {
  id: string;
  label: string;
  group?: string;
  hint?: string;
  keywords?: string[];
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onSelect: () => void;
};

type CommandPaletteProps = {
  items: CommandPaletteItem[];
  shortcut?: string;
  shortcutEnabled?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

const commandPaletteKbdClassName =
  "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center rounded-sm bg-muted px-1 font-sans font-medium text-muted-foreground text-xs select-none";

const modalTransitionVars =
  "[--modal-close-dur:280ms] [--modal-ease:cubic-bezier(0.22,1,0.36,1)] [--modal-open-dur:280ms]";

const modalScaleVars = "[--modal-scale-close:0.94] [--modal-scale:0.94]";

const MODAL_CLOSE_MS = 280;

function fuzzyMatch(needle: string, hay: string) {
  if (!needle) {
    return true;
  }

  const query = needle.toLowerCase();
  const target = hay.toLowerCase();
  let index = 0;

  for (const char of target) {
    if (char === query[index]) {
      index += 1;
    }

    if (index === query.length) {
      return true;
    }
  }

  return false;
}

function CommandPaletteKbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(commandPaletteKbdClassName, className)}
      data-slot="command-palette-kbd"
    >
      {children}
    </kbd>
  );
}

function CommandPaletteKbdGroup({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative z-10 inline-flex items-center gap-1"
      data-slot="command-palette-kbd-group"
    >
      {children}
    </span>
  );
}

function CommandHint({ hint }: { hint: string }) {
  const keys = hint.trim().split(/\s+/);

  return (
    <CommandPaletteKbdGroup>
      {keys.map((key, index) => (
        <CommandPaletteKbd key={`${key}-${index}`}>{key}</CommandPaletteKbd>
      ))}
    </CommandPaletteKbdGroup>
  );
}

function getMotionProps(state: "entering" | "open" | "exiting") {
  if (state === "entering") {
    return { "data-starting-style": "" } as const;
  }

  if (state === "exiting") {
    return { "data-ending-style": "" } as const;
  }

  return {};
}

function scrollItemIntoView(list: HTMLElement, button: HTMLElement) {
  const listRect = list.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  if (buttonRect.top < listRect.top) {
    list.scrollTop -= listRect.top - buttonRect.top;
    return;
  }

  if (buttonRect.bottom > listRect.bottom) {
    list.scrollTop += buttonRect.bottom - listRect.bottom;
  }
}

function CommandPalette({
  items,
  shortcut = "k",
  shortcutEnabled = true,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
  open: controlledOpen,
  onOpenChange,
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!controlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [controlled, onOpenChange]
  );

  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [present, setPresent] = React.useState(false);
  const [motionState, setMotionState] = React.useState<
    "entering" | "open" | "exiting"
  >("entering");
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const updateQuery = React.useCallback((value: string) => {
    setQuery(value);
    setActive(0);
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      clearTimeout(closeTimerRef.current);
      setPresent(true);
      setMotionState("entering");

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMotionState("open"));
      });

      return () => cancelAnimationFrame(frame);
    }

    if (present) {
      setMotionState("exiting");
      closeTimerRef.current = setTimeout(() => {
        setPresent(false);
        setMotionState("entering");
      }, MODAL_CLOSE_MS);

      return () => clearTimeout(closeTimerRef.current);
    }
  }, [open, present]);

  React.useEffect(() => {
    if (!shortcutEnabled) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === shortcut.toLowerCase()
      ) {
        event.preventDefault();
        setOpen(!open);
        return;
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen, shortcut, shortcutEnabled]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    updateQuery("");
    setActive(0);
  }, [open, updateQuery]);

  React.useLayoutEffect(() => {
    if (!present || motionState === "exiting") {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const input = inputRef.current;

      if (!input) {
        return;
      }

      input.focus({ preventScroll: true });
      input.setSelectionRange(input.value.length, input.value.length);
    });

    return () => cancelAnimationFrame(frame);
  }, [motionState, open, present]);

  React.useEffect(() => {
    if (!present) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [present]);

  const filtered = React.useMemo(() => {
    if (!query) {
      return items;
    }

    return items.filter((item) => {
      const haystacks = [
        item.label,
        item.group ?? "",
        ...(item.keywords ?? []),
      ];
      return haystacks.some((haystack) => fuzzyMatch(query, haystack));
    });
  }, [items, query]);

  const hasIcons = React.useMemo(
    () => items.some((item) => item.icon),
    [items]
  );

  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandPaletteItem[]>();

    filtered.forEach((item) => {
      const group = item.group ?? "Results";
      const groupItems = map.get(group) ?? [];
      groupItems.push(item);
      map.set(group, groupItems);
    });

    return Array.from(map.entries());
  }, [filtered]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(filtered.length - 1, current + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(0, current - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[active];

      if (item) {
        item.onSelect();
        setOpen(false);
      }

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (!present || motionState === "exiting") {
      return;
    }

    const list = listRef.current;
    const button = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);

    if (list && button) {
      scrollItemIntoView(list, button);
    }
  }, [active, motionState, present]);

  if (!mounted || !present) {
    return null;
  }

  const motionProps = getMotionProps(motionState);

  let cursor = 0;

  return createPortal(
    <div
      aria-hidden={motionState === "exiting"}
      className={cn("fixed inset-0 z-[100]", className)}
      data-slot="command-palette"
    >
      <button
        aria-label="Close command palette"
        className={cn(
          "absolute inset-0 bg-black/30 opacity-100 supports-backdrop-filter:backdrop-blur-[4px] transition-opacity duration-[var(--modal-open-dur)] ease-[var(--modal-ease)] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--modal-close-dur)] data-[starting-style]:opacity-0 motion-reduce:transition-none dark:bg-black/50",
          modalTransitionVars
        )}
        tabIndex={-1}
        type="button"
        onClick={() => setOpen(false)}
        {...motionProps}
      />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center p-4 pt-[18vh]">
        <div
          aria-label="Command palette"
          aria-modal="true"
          className={cn(
            "pointer-events-auto w-full max-w-xl origin-top overflow-hidden rounded-xl border border-border bg-card bg-clip-padding text-card-foreground opacity-100 shadow-[0_1px_1px_rgb(0_0_0/0.06),0_12px_40px_rgb(0_0_0/0.14),inset_0_1px_rgb(255_255_255/0.18)] outline-none transition-[transform,opacity] duration-[var(--modal-open-dur)] ease-[var(--modal-ease)] will-change-[transform,opacity] [transform:scale(1)] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--modal-close-dur)] data-[ending-style]:[transform:scale(var(--modal-scale-close))] data-[starting-style]:opacity-0 data-[starting-style]:[transform:scale(var(--modal-scale))] motion-reduce:transition-none dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),0_16px_48px_rgb(0_0_0/0.32),inset_0_1px_rgb(255_255_255/0.08)]",
            modalTransitionVars,
            modalScaleVars
          )}
          role="dialog"
          {...motionProps}
        >
          <div className="flex items-center gap-3 border-border border-b px-4">
            <HugeiconsIcon
              className="size-4 text-muted-foreground"
              icon={Search01Icon}
              strokeWidth={2}
            />
            <input
              ref={inputRef}
              aria-activedescendant={
                filtered.length > 0 ? `${uid}-opt-${active}` : undefined
              }
              aria-autocomplete="list"
              aria-controls={`${uid}-list`}
              aria-expanded
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              className="h-11 flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
              placeholder={placeholder}
              role="combobox"
              spellCheck={false}
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
            />
            <CommandPaletteKbd className="hidden sm:inline-flex">
              ESC
            </CommandPaletteKbd>
          </div>
          <div
            ref={listRef}
            aria-label="Commands"
            className="max-h-[60vh] overflow-y-auto p-1"
            id={`${uid}-list`}
            role="listbox"
          >
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                {emptyMessage}
              </div>
            ) : (
              grouped.map(([group, list]) => (
                <div className="mb-1 last:mb-0" key={group}>
                  <div
                    aria-hidden
                    className="px-1.5 py-1.5 font-medium text-muted-foreground text-xs"
                  >
                    {group}
                  </div>
                  {list.map((item) => {
                    const index = cursor++;
                    const isActive = index === active;

                    return (
                      <button
                        key={item.id}
                        aria-selected={isActive}
                        className={cn(
                          "relative flex w-full cursor-default items-center gap-2 rounded-md px-1.5 py-[5px] text-left text-sm outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                          isActive
                            ? "bg-accent text-accent-foreground **:text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        data-index={index}
                        id={`${uid}-opt-${index}`}
                        role="option"
                        tabIndex={-1}
                        type="button"
                        onClick={() => {
                          item.onSelect();
                          setOpen(false);
                        }}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setActive(index)}
                      >
                        {item.icon ? (
                          <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
                            {item.icon}
                          </span>
                        ) : hasIcons ? (
                          <span className="size-4 shrink-0" />
                        ) : null}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="shrink-0">{item.badge}</span>
                        ) : null}
                        {item.hint ? <CommandHint hint={item.hint} /> : null}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export { CommandPalette, type CommandPaletteItem, type CommandPaletteProps };
```

## Usage

```tsx
import {
  CommandPalette,
  type CommandPaletteItem,
} from "@/components/ui/command-palette";
```

```tsx
<CommandPalette
  items={[{ id: "home", label: "Go to Home", onSelect: () => {} }]}
  open={open}
  onOpenChange={setOpen}
/>
```

## Examples

### Command Palette Example

```tsx
import { Button } from "@/components/ui/button";
import { useSiteCommandPalette } from "@/components/site-command-palette";

export function CommandPaletteDemo() {
  const { setOpen } = useSiteCommandPalette();

  return (
    <Button variant="outline" onClick={() => setOpen(true)}>
      Open command palette
    </Button>
  );
}
```

## Props

### CommandPalette

| Prop              | Type                      | Default                       | Description                                      |
| ----------------- | ------------------------- | ----------------------------- | ------------------------------------------------ |
| `items`           | `CommandPaletteItem[]`    | `-`                           | Commands to search and run.                      |
| `open`            | `boolean`                 | `-`                           | Controls whether the palette is open.            |
| `onOpenChange`    | `(open: boolean) => void` | `-`                           | Runs when the open state changes.                |
| `shortcut`        | `string`                  | `"k"`                         | Opens with Cmd/Ctrl plus this key.               |
| `shortcutEnabled` | `boolean`                 | `true`                        | Registers the global Cmd/Ctrl shortcut listener. |
| `placeholder`     | `string`                  | `"Type a command or search…"` | Search field placeholder.                        |
| `emptyMessage`    | `string`                  | `"No results found."`         | Shown when the filter returns no items.          |

### CommandPaletteItem

| Prop       | Type         | Default | Description                   |
| ---------- | ------------ | ------- | ----------------------------- |
| `id`       | `string`     | `-`     | Stable item identifier.       |
| `label`    | `string`     | `-`     | Visible command label.        |
| `group`    | `string`     | `-`     | Optional section heading.     |
| `hint`     | `string`     | `-`     | Optional keyboard hint badge. |
| `keywords` | `string[]`   | `-`     | Extra fuzzy-match terms.      |
| `onSelect` | `() => void` | `-`     | Runs when the item is chosen. |

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/command-palette)
