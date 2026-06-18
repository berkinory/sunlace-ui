import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@sunlace/ui/lib/utils";

function Progress({
  className,
  children,
  size = "default",
  value,
  ...props
}: ProgressPrimitive.Root.Props & {
  size?: "default" | "sm";
}) {
  return (
    <>
      <style>
        {`@keyframes sunlace-progress-indeterminate{0%{transform:translateX(-100%)}100%{transform:translateX(500%)}}`}
      </style>
      <ProgressPrimitive.Root
        value={value}
        data-size={size}
        data-slot="progress"
        className={cn(
          "group/progress grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2",
          className
        )}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative col-span-full flex h-1.5 w-full items-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/5 group-data-[size=sm]/progress:h-1",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-indeterminate:w-1/5 data-indeterminate:animate-[sunlace-progress-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:transition-none motion-reduce:data-indeterminate:animate-none",
        className
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
