import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

function Radio({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <>
      <style>
        {`@keyframes sunlace-radio-in{0%{opacity:0;transform:scale(.45)}60%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}`}
      </style>
      <RadioPrimitive.Root
        data-slot="radio-item"
        className={cn(
          "peer relative grid aspect-square size-4 shrink-0 place-items-center overflow-hidden rounded-full border border-input transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-indicator"
          className="grid size-full place-items-center"
        >
          <span className="size-2 animate-[sunlace-radio-in_300ms_cubic-bezier(0.175,0.885,0.32,1.1)_both] rounded-full bg-primary-foreground motion-reduce:animate-none" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    </>
  );
}

export { Radio, RadioItem };
