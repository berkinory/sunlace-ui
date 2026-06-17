"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@sunlace/ui/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <>
      <style>
        {`@keyframes sunlace-checkbox-pop{0%{opacity:0;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes sunlace-checkbox-draw{0%{stroke-dashoffset:1}100%{stroke-dashoffset:0}}`}
      </style>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:data-checked:bg-primary dark:data-indeterminate:bg-primary",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="group/checkbox-indicator grid place-content-center text-current transition-none animate-[sunlace-checkbox-pop_300ms_cubic-bezier(0.175,0.885,0.32,1.1)_both] motion-reduce:animate-none [&>svg]:size-3.5"
        >
          <svg
            aria-hidden
            className="shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            viewBox="0 0 24 24"
          >
            <path
              className="animate-[sunlace-checkbox-draw_300ms_cubic-bezier(0.645,0.045,0.355,1)_forwards] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-indeterminate/checkbox-indicator:hidden motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
              d="M5 13 L10 18 L20 6"
              pathLength="1"
            />
            <path
              className="hidden animate-[sunlace-checkbox-draw_300ms_cubic-bezier(0.645,0.045,0.355,1)_forwards] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-indeterminate/checkbox-indicator:block motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
              d="M6 12 H18"
              pathLength="1"
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </>
  );
}

export { Checkbox };
