import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@sunlace/ui/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  showArrow?: boolean;
  underline?: boolean;
};

function AccordionTrigger({
  className,
  children,
  showArrow = true,
  underline = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          underline && "hover:underline",
          className
        )}
        {...props}
      >
        {children}
        {showArrow ? (
          <span
            data-slot="accordion-trigger-icon"
            className="pointer-events-none flex shrink-0 translate-y-0.5 items-center justify-center transition-transform duration-[360ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none"
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="size-full"
            />
          </span>
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="group/accordion-content h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-[360ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "min-h-0 overflow-hidden pt-0 pb-2.5 transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-data-ending-style/accordion-content:opacity-0 group-data-starting-style/accordion-content:-translate-y-1 group-data-starting-style/accordion-content:opacity-0 motion-reduce:transition-none [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
