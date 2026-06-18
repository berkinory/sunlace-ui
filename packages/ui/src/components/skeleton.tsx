import { cn } from "@sunlace/ui/lib/utils";

function Skeleton({
  animation = "shimmer",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  animation?: "none" | "pulse" | "shimmer";
}) {
  return (
    <>
      <style>
        {`@keyframes sunlace-skeleton-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}
      </style>
      <div
        data-animation={animation}
        data-slot="skeleton"
        className={cn(
          "relative overflow-hidden rounded-md bg-muted data-[animation=pulse]:animate-pulse data-[animation=shimmer]:after:absolute data-[animation=shimmer]:after:inset-0 data-[animation=shimmer]:after:animate-[sunlace-skeleton-shimmer_1.8s_ease-in-out_infinite] data-[animation=shimmer]:after:bg-linear-to-r data-[animation=shimmer]:after:from-transparent data-[animation=shimmer]:after:via-foreground/6 data-[animation=shimmer]:after:to-transparent motion-reduce:data-[animation=pulse]:animate-none motion-reduce:data-[animation=shimmer]:after:animate-none",
          className
        )}
        {...props}
      />
    </>
  );
}

export { Skeleton };
