import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type SpinnerSpeed = "fast" | "normal" | "slow";
type SpinnerVariant = "icon" | "ring";

const spinnerSpeedClassName: Record<SpinnerSpeed, string> = {
  fast: "[animation-duration:700ms]",
  normal: "[animation-duration:1000ms]",
  slow: "[animation-duration:1400ms]",
};

function Spinner({
  className,
  "aria-label": ariaLabel = "Loading",
  render,
  speed = "normal",
  variant = "icon",
  ...props
}: useRender.ComponentProps<"span"> & {
  speed?: SpinnerSpeed;
  variant?: SpinnerVariant;
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        "aria-label": ariaLabel,
        children:
          variant === "icon" ? (
            <HugeiconsIcon aria-hidden icon={Loading03Icon} strokeWidth={2} />
          ) : null,
        className: cn(
          "inline-block size-4 animate-spin",
          variant === "icon"
            ? "[&>svg]:size-full"
            : "rounded-full border-2 border-foreground border-r-transparent",
          spinnerSpeedClassName[speed],
          className
        ),
        role: "status",
      },
      props
    ),
    render,
    state: {
      slot: "spinner",
      speed,
      variant,
    },
  });
}

export { Spinner };
