import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@sunlace/ui/lib/utils";

function Spinner({
  className,
  "aria-label": ariaLabel = "Loading",
}: {
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      data-slot="spinner"
      role="status"
      aria-label={ariaLabel}
      className={cn("size-4 animate-spin", className)}
    />
  );
}

export { Spinner };
