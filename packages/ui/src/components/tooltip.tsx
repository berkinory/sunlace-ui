import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@sunlace/ui/lib/utils";

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  showArrow = true,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    showArrow?: boolean;
  }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs text-background opacity-100 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_6px_0_rgb(0_0_0/0.05),0_4px_42px_0_rgb(0_0_0/0.06)] transition-[transform,opacity] duration-[var(--tooltip-open-dur)] ease-[var(--tooltip-ease)] will-change-[transform,opacity] data-[ending-style]:pointer-events-none data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--tooltip-close-dur)] data-[ending-style]:[transform:scale(var(--tooltip-closing-scale))] data-[starting-style]:opacity-0 data-[starting-style]:[transform:scale(var(--tooltip-pre-scale))] data-open:[transform:scale(1)] motion-reduce:transition-none",
            "[--tooltip-close-dur:100ms] [--tooltip-closing-scale:0.99] [--tooltip-ease:cubic-bezier(0.22,1,0.36,1)] [--tooltip-open-dur:180ms] [--tooltip-pre-scale:0.98]",
            className
          )}
          {...props}
        >
          {children}
          {showArrow ? (
            <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
          ) : null}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
