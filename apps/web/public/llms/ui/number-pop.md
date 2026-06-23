# Number Pop

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

An animated number that pops in with staggered digits.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/number-pop.json
```

**Dependencies:** `class-variance-authority`

### Manual

```bash
npm install class-variance-authority clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/number-pop.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const numberPopVariants = cva("t-digit-group", {
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-lg",
      xl: "text-2xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const numberPopKeyframes = `
@keyframes t-digit-pop-in{0%{transform:translate(calc(var(--digit-distance)*var(--digit-dir-x)),calc(var(--digit-distance)*var(--digit-dir-y)));opacity:0;filter:blur(var(--digit-blur))}100%{transform:translate(0,0);opacity:1;filter:blur(0)}}
@keyframes t-digit-pop-out{0%{transform:translate(0,0);opacity:1;filter:blur(0)}100%{transform:translate(calc(var(--digit-distance)*var(--digit-dir-x)*-1),calc(var(--digit-distance)*var(--digit-dir-y)*-1));opacity:0;filter:blur(var(--digit-blur))}}
`;

const numberPopStyles = `
.t-digit-group {
  --digit-dur: 500ms;
  --digit-distance: 8px;
  --digit-stagger: 70ms;
  --digit-blur: 2px;
  --digit-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
  --digit-dir-x: 0;
  --digit-dir-y: 1;
  display: inline-flex;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
  position: relative;
}
.t-digit-slot {
  display: inline-block;
  position: relative;
}
.t-digit {
  display: inline-block;
  will-change: transform, opacity, filter;
}
.t-digit.is-in {
  animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both;
}
.t-digit.is-out {
  position: absolute;
  inset: 0;
  animation: t-digit-pop-out var(--digit-dur) var(--digit-ease) both;
}
.t-digit.is-in[data-stagger="1"] { animation-delay: var(--digit-stagger); }
.t-digit.is-in[data-stagger="2"] { animation-delay: calc(var(--digit-stagger) * 2); }
.t-digit.is-in[data-stagger="3"] { animation-delay: calc(var(--digit-stagger) * 3); }
.t-digit.is-in[data-stagger="4"] { animation-delay: calc(var(--digit-stagger) * 4); }
.t-digit.is-in[data-stagger="5"] { animation-delay: calc(var(--digit-stagger) * 5); }
.t-digit.is-in[data-stagger="6"] { animation-delay: calc(var(--digit-stagger) * 6); }
.t-digit.is-in[data-stagger="7"] { animation-delay: calc(var(--digit-stagger) * 7); }
.t-digit.is-in[data-stagger="8"] { animation-delay: calc(var(--digit-stagger) * 8); }
.t-digit.is-in[data-stagger="9"] { animation-delay: calc(var(--digit-stagger) * 9); }
.t-digit.is-in[data-stagger="10"] { animation-delay: calc(var(--digit-stagger) * 10); }
.t-digit.is-in[data-stagger="11"] { animation-delay: calc(var(--digit-stagger) * 11); }
.t-digit.is-in[data-stagger="12"] { animation-delay: calc(var(--digit-stagger) * 12); }
@media (prefers-reduced-motion: reduce) {
  .t-digit { animation: none !important; }
}
`;

type NumberPopProps = VariantProps<typeof numberPopVariants> & {
  value: string | number;
  className?: string;
  playKey?: number | string;
};

function splitDigits(value: string) {
  let digitIndex = 0;
  return value.split("").map((char) => {
    if (/[0-9]/.test(char)) {
      digitIndex += 1;
      return { char, stagger: digitIndex };
    }
    return { char, stagger: 0 };
  });
}

function DigitSlot({
  char,
  stagger,
  playKey,
}: {
  char: string;
  stagger: number;
  playKey?: number | string;
}) {
  const [displayChar, setDisplayChar] = useState(char);
  const [oldChar, setOldChar] = useState<string | null>(null);
  const prevChar = useRef(char);

  useEffect(() => {
    if (char !== prevChar.current) {
      setOldChar(prevChar.current);
      setDisplayChar(char);
      prevChar.current = char;
      const t = setTimeout(() => setOldChar(null), 500);
      return () => clearTimeout(t);
    }
  }, [char, playKey]);

  return (
    <span className="t-digit-slot">
      {oldChar && (
        <span className="t-digit is-out" key={oldChar}>
          {oldChar}
        </span>
      )}
      <span
        className="t-digit is-in"
        data-stagger={stagger || undefined}
        key={displayChar}
      >
        {displayChar}
      </span>
    </span>
  );
}

function NumberPop({ value, size, className, playKey }: NumberPopProps) {
  const digits = splitDigits(String(value));

  return (
    <>
      <style>{numberPopKeyframes}</style>
      <style>{numberPopStyles}</style>
      <span
        className={cn(numberPopVariants({ size }), className)}
        data-slot="number-pop"
      >
        {digits.map((d, i) => (
          <DigitSlot
            char={d.char}
            key={i}
            playKey={playKey}
            stagger={d.stagger}
          />
        ))}
      </span>
    </>
  );
}

export { NumberPop, numberPopVariants };

```

## Usage

```tsx
import { NumberPop } from "@/components/ui/number-pop";
```

```tsx
<NumberPop size="xl" value="1,284.05" />
```

## Examples

### Revenue counter

```tsx
import { Button, NumberPop } from "@/sunlace/ui";
import { useState } from "react";

export function RevenueCounter() {
  const [revenue, setRevenue] = useState(128405);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-muted-foreground">Total revenue</span>
        <NumberPop size="xl" value={`$${revenue.toLocaleString()}`} />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevenue((r) => r + 1250)}
        >
          Add sale
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevenue((r) => Math.max(0, r - 1250))}
        >
          Refund
        </Button>
      </div>
    </div>
  );
}
```

## Props

### NumberPop

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string | number` | `-` | The number to display. Replays the animation when it changes. |
| `playKey` | `number | string` | `-` | Change this to force a replay without changing the value. |
| `size` | `"default" | "sm" | "lg" | "xl"` | `"default"` | Controls the text size and weight. |

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/number-pop)