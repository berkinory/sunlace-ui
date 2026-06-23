# Dither Avatar

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A deterministic avatar generated from any string.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/dither-avatar.json
```

**Dependencies:** `hashvatar`

### Manual

```bash
npm install hashvatar clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components/ui/dither-avatar.tsx`:

```tsx
"use client";

import { renderHashvatar, type HashvatarOptions } from "hashvatar";
import * as React from "react";

import { cn } from "@/lib/utils";

type DitherAvatarShape = "circle" | "rounded" | "square";
type DitherAvatarSize = "default" | "sm" | "lg";

type DitherAvatarProps = React.ComponentProps<"span"> & {
  hash: string;
  shape?: DitherAvatarShape;
  size?: DitherAvatarSize;
  dotScale?: HashvatarOptions["dotScale"];
  tones?: HashvatarOptions["tones"];
};

function DitherAvatar({
  className,
  dotScale,
  hash,
  shape = "circle",
  size = "default",
  tones,
  ...props
}: DitherAvatarProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    return renderHashvatar(canvas, {
      dotScale,
      hash,
      mode: "dither",
      size: 96,
      tones,
    });
  }, [dotScale, hash, tones]);

  return (
    <span
      data-slot="dither-avatar"
      data-shape={shape}
      data-size={size}
      className={cn(
        "group/dither-avatar relative flex size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border select-none data-[shape=rounded]:rounded-lg data-[shape=square]:rounded-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    >
      <canvas
        aria-hidden
        className="block size-full scale-145 rounded-[inherit] group-data-[shape=rounded]/dither-avatar:scale-125 group-data-[shape=square]/dither-avatar:scale-100"
        height={96}
        ref={canvasRef}
        width={96}
      />
    </span>
  );
}

export { DitherAvatar };

```

## Usage

```tsx
import { DitherAvatar } from "@/components/ui/dither-avatar";
```

```tsx
<div className="flex items-center gap-3">
  <DitherAvatar hash="sunlace" />
  <DitherAvatar hash="ui" />
</div>
```

## Examples

### Identity grid

```tsx
import { DitherAvatar } from "@/components/ui/dither-avatar";

const identities = [
  { hash: "sunlace", dotScale: 1 },
  { hash: "interface", dotScale: 2 },
  { hash: "system", dotScale: 3 },
  { hash: "token", dotScale: 1 },
  { hash: "motion", dotScale: 2 },
  { hash: "craft", dotScale: 3 },
];

export function DitherIdentityGridDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {identities.map((identity) => (
        <div className="flex flex-col items-center gap-2" key={identity.hash}>
          <DitherAvatar
            className="size-12"
            dotScale={identity.dotScale}
            hash={identity.hash}
          />
          <span className="text-xs text-muted-foreground">{identity.hash}</span>
        </div>
      ))}
    </div>
  );
}
```

### Wallet list

```tsx
import { DitherAvatar } from "@/components/ui/dither-avatar";

const wallets = [
  { hash: "medhy.eth", label: "medhy.eth", dotScale: 1 },
  { hash: "0x742d35cc6634c0532925a3b844bc454e4438f44e", label: "0x742...44e", dotScale: 2 },
  { hash: "vitalik.eth", label: "vitalik.eth", dotScale: 3 },
];

export function DitherWalletListDemo() {
  return (
    <div className="w-80 space-y-3">
      {wallets.map((wallet) => (
        <div className="flex items-center gap-3" key={wallet.hash}>
          <DitherAvatar
            className="size-10"
            dotScale={wallet.dotScale}
            hash={wallet.hash}
          />
          <span className="font-mono text-sm">{wallet.label}</span>
        </div>
      ))}
    </div>
  );
}
```

## Props

### DitherAvatar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hash` | `string` | `-` | Seed string used to generate the deterministic image. |
| `shape` | `"circle" | "rounded" | "square"` | `"circle"` | Controls the avatar corner treatment. |
| `size` | `"sm" | "default" | "lg"` | `"default"` | Controls the avatar dimensions. |
| `dotScale` | `number` | `1` | Controls the dither cell size. |
| `tones` | `HashvatarOptions['tones']` | `-` | Restricts generated colors to selected tone families. |

---
[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/dither-avatar)