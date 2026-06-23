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
