import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap shadow-[0_1px_1px_rgb(0_0_0/0.08),0_3px_8px_rgb(0_0_0/0.06),inset_0_1px_rgb(255_255_255/0.16)] transition-[transform,background-color,border-color,box-shadow,color,filter] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none select-none active:scale-[0.98] active:duration-75 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:shadow-[0_1px_1px_rgb(0_0_0/0.35),0_4px_12px_rgb(0_0_0/0.28),inset_0_1px_rgb(255_255_255/0.10)] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_oklch,var(--primary),black_22%)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_14%)_0%,var(--primary)_52%,color-mix(in_oklch,var(--primary),black_8%)_100%)] text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.22),inset_0_1px_0_rgb(255_255_255/0.20)] hover:border-[color-mix(in_oklch,var(--primary),black_14%)] hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_20%)_0%,color-mix(in_oklch,var(--primary),white_6%)_52%,var(--primary)_100%)] hover:shadow-[0_2px_3px_rgb(0_0_0/0.24),inset_0_1px_0_rgb(255_255_255/0.24)] dark:border-[color-mix(in_oklch,var(--primary),black_16%)] dark:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_12%)_0%,var(--primary)_52%,color-mix(in_oklch,var(--primary),black_10%)_100%)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.44),inset_0_1px_0_rgb(255_255_255/0.44)] dark:hover:border-[color-mix(in_oklch,var(--primary),black_10%)] dark:hover:bg-[linear-gradient(180deg,var(--primary)_0%,color-mix(in_oklch,var(--primary),black_6%)_100%)] dark:hover:shadow-[0_2px_3px_rgb(0_0_0/0.46),inset_0_1px_0_rgb(255_255_255/0.48)]",
        outline:
          "border-border bg-background shadow-[0_1px_1px_rgb(0_0_0/0.06),inset_0_1px_rgb(255_255_255/0.18)] hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_22%)] hover:bg-muted hover:text-foreground hover:shadow-[0_2px_3px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.22)] aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),inset_0_1px_rgb(255_255_255/0.08)] dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_1px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.16)] hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] hover:shadow-[0_2px_3px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.20)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "shadow-none hover:bg-muted hover:text-foreground hover:shadow-none aria-expanded:bg-muted aria-expanded:text-foreground dark:shadow-none dark:hover:bg-muted/50",
        success:
          "bg-[linear-gradient(to_top,oklch(0.52_0.11_145),oklch(0.58_0.12_145))] text-white shadow-none hover:bg-[linear-gradient(to_top,oklch(0.54_0.11_145),oklch(0.60_0.12_145))] hover:shadow-none focus-visible:ring-[oklch(0.56_0.11_145/0.25)] dark:bg-[linear-gradient(to_top,oklch(0.48_0.10_145),oklch(0.54_0.11_145))] dark:hover:bg-[linear-gradient(to_top,oklch(0.50_0.10_145),oklch(0.56_0.11_145))] dark:shadow-none dark:hover:shadow-none",
        destructive:
          "bg-[linear-gradient(to_top,oklch(0.48_0.15_27),oklch(0.54_0.17_27))] text-white shadow-none hover:bg-[linear-gradient(to_top,oklch(0.50_0.15_27),oklch(0.56_0.17_27))] hover:shadow-none focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-[linear-gradient(to_top,oklch(0.44_0.13_27),oklch(0.50_0.15_27))] dark:hover:bg-[linear-gradient(to_top,oklch(0.46_0.13_27),oklch(0.52_0.15_27))] dark:shadow-none dark:hover:shadow-none dark:focus-visible:ring-destructive/40",
        link: "text-primary shadow-none underline-offset-4 hover:underline hover:shadow-none dark:shadow-none",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
