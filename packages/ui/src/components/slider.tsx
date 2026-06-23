import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  thumbCollisionBehavior = "none",
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : typeof value === "number"
      ? [value]
      : Array.isArray(defaultValue)
        ? defaultValue
        : typeof defaultValue === "number"
          ? [defaultValue]
          : [min];

  return (
    <SliderPrimitive.Root
      className={cn(
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment="center"
      thumbCollisionBehavior={thumbCollisionBehavior}
      {...props}
    >
      <SliderPrimitive.Control
        className={cn(
          "relative flex touch-none items-center select-none data-disabled:opacity-50",
          orientation === "horizontal"
            ? "h-5 w-full"
            : "h-full min-h-40 w-5 flex-col"
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full bg-muted ring-1 ring-foreground/5 select-none",
            orientation === "horizontal" ? "h-1.5 w-full" : "h-full w-1.5"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(
              "rounded-full bg-primary select-none",
              orientation === "horizontal" ? "h-full" : "w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block size-4 shrink-0 rounded-full border border-primary bg-primary shadow-sm ring-ring/50 transition-[transform,box-shadow] duration-150 ease-out select-none after:absolute after:-inset-2 hover:scale-110 hover:ring-3 focus-visible:scale-110 focus-visible:ring-3 focus-visible:outline-hidden active:scale-95 active:ring-3 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
