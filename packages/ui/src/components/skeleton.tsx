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

function SkeletonReveal({
  className,
  revealed,
  ...props
}: React.ComponentProps<"div"> & {
  revealed?: boolean;
}) {
  return (
    <div
      data-slot="skeleton-reveal"
      data-state={revealed ? "revealed" : "loading"}
      className={cn(
        "group/skeleton-reveal grid [--skeleton-reveal-blur:2px] [--skeleton-reveal-dur:400ms] [--skeleton-reveal-ease:ease-in-out]",
        className
      )}
      {...props}
    />
  );
}

function SkeletonRevealSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-reveal-skeleton"
      className={cn(
        "col-start-1 row-start-1 z-1 opacity-100 blur-none transition-[opacity,filter] duration-[var(--skeleton-reveal-dur)] ease-[var(--skeleton-reveal-ease)] group-data-[state=revealed]/skeleton-reveal:pointer-events-none group-data-[state=revealed]/skeleton-reveal:opacity-0 group-data-[state=revealed]/skeleton-reveal:blur-[var(--skeleton-reveal-blur)] motion-reduce:transition-none motion-reduce:blur-none",
        className
      )}
      {...props}
    />
  );
}

function SkeletonRevealContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-reveal-content"
      className={cn(
        "col-start-1 row-start-1 z-2 opacity-0 blur-[var(--skeleton-reveal-blur)] transition-[opacity,filter] duration-[var(--skeleton-reveal-dur)] ease-[var(--skeleton-reveal-ease)] group-data-[state=revealed]/skeleton-reveal:opacity-100 group-data-[state=revealed]/skeleton-reveal:blur-none motion-reduce:transition-none motion-reduce:blur-none",
        className
      )}
      {...props}
    />
  );
}

export {
  Skeleton,
  SkeletonReveal,
  SkeletonRevealContent,
  SkeletonRevealSkeleton,
};
