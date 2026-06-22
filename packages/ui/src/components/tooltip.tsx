import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@sunlace/ui/lib/utils";
import * as React from "react";

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />;
}

function Tooltip({ onOpenChange, ...props }: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = React.useState(props.defaultOpen ?? false);
  const isControlled = props.open !== undefined;
  const currentOpen = isControlled ? props.open : open;

  return (
    <TooltipOpenContext value={currentOpen ?? false}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
        onOpenChange={(nextOpen, eventDetails) => {
          if (!isControlled) {
            setOpen(nextOpen);
          }

          onOpenChange?.(nextOpen, eventDetails);
        }}
      />
    </TooltipOpenContext>
  );
}

const TooltipOpenContext = React.createContext(false);

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
  const open = React.use(TooltipOpenContext);

  return (
    <TooltipPrimitive.Portal keepMounted>
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
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_6px_0_rgb(0_0_0/0.05),0_4px_42px_0_rgb(0_0_0/0.06)] will-change-[transform,opacity] data-[state=closed]:pointer-events-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none",
            className
          )}
          data-state={open ? "open" : "closed"}
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
