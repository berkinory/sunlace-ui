import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap shadow-[0_1px_1px_rgb(0_0_0/0.08),0_3px_8px_rgb(0_0_0/0.06),inset_0_1px_rgb(255_255_255/0.16)] transition-[transform,background-color,border-color,box-shadow,color,filter] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none select-none active:scale-[0.98] active:duration-75 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:shadow-[0_1px_1px_rgb(0_0_0/0.35),0_4px_12px_rgb(0_0_0/0.28),inset_0_1px_rgb(255_255_255/0.10)] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_oklch,var(--primary),black_24%)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_15%)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),black_10%)_100%)] text-primary-foreground shadow-[0_1px_1px_rgb(0_0_0/0.26),0_3px_7px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.22)] hover:border-[color-mix(in_oklch,var(--primary),black_16%)] hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_24%)_0%,color-mix(in_oklch,var(--primary),white_7%)_50%,color-mix(in_oklch,var(--primary),black_4%)_100%)] hover:shadow-[0_1px_1px_rgb(0_0_0/0.28),0_4px_10px_rgb(0_0_0/0.16),inset_0_1px_0_rgb(255_255_255/0.28)] dark:border-[color-mix(in_oklch,var(--primary),black_36%)] dark:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_34%)_0%,color-mix(in_oklch,var(--primary),black_2%)_42%,color-mix(in_oklch,var(--primary),black_18%)_100%)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_1px_0_rgb(255_255_255/0.12),0_8px_18px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.85),inset_0_-1px_0_rgb(0_0_0/0.18)] dark:hover:border-[color-mix(in_oklch,var(--primary),black_26%)] dark:hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_48%)_0%,color-mix(in_oklch,var(--primary),white_8%)_42%,color-mix(in_oklch,var(--primary),black_10%)_100%)] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_1px_0_rgb(255_255_255/0.16),0_10px_22px_rgb(0_0_0/0.58),inset_0_1px_0_rgb(255_255_255/0.95),inset_0_-1px_0_rgb(0_0_0/0.14)]",
        outline:
          "border-border bg-background shadow-[0_1px_1px_rgb(0_0_0/0.06),inset_0_1px_rgb(255_255_255/0.18)] hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_22%)] hover:bg-muted hover:text-foreground hover:shadow-[0_2px_3px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.22)] aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),inset_0_1px_rgb(255_255_255/0.08)] dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_1px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.16)] hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] hover:shadow-[0_2px_3px_rgb(0_0_0/0.08),inset_0_1px_rgb(255_255_255/0.20)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "shadow-none hover:bg-muted hover:text-foreground hover:shadow-none aria-expanded:bg-muted aria-expanded:text-foreground dark:shadow-none dark:hover:bg-muted/50",
        success:
          "bg-[oklch(0.93_0.07_145)] text-[oklch(0.43_0.13_145)] shadow-none hover:bg-[oklch(0.90_0.08_145)] hover:shadow-none focus-visible:ring-[oklch(0.52_0.13_145/0.24)] dark:bg-[oklch(0.34_0.06_145)] dark:text-[oklch(0.74_0.16_145)] dark:hover:bg-[oklch(0.38_0.07_145)] dark:shadow-none dark:hover:shadow-none",
        warning:
          "bg-[oklch(0.93_0.09_76)] text-[oklch(0.48_0.14_62)] shadow-none hover:bg-[oklch(0.90_0.10_76)] hover:shadow-none focus-visible:ring-[oklch(0.58_0.16_68/0.24)] dark:bg-[oklch(0.37_0.07_68)] dark:text-[oklch(0.78_0.16_76)] dark:hover:bg-[oklch(0.41_0.08_68)] dark:shadow-none dark:hover:shadow-none",
        destructive:
          "bg-[oklch(0.93_0.06_27)] text-[oklch(0.56_0.20_27)] shadow-none hover:bg-[oklch(0.90_0.07_27)] hover:shadow-none focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-[oklch(0.33_0.07_27)] dark:text-[oklch(0.72_0.20_27)] dark:hover:bg-[oklch(0.37_0.08_27)] dark:shadow-none dark:hover:shadow-none dark:focus-visible:ring-destructive/40",
        shine:
          "overflow-hidden border-border bg-[linear-gradient(110deg,#000000,48%,#ffffff,52%,#000000)] bg-[length:400%_100%] text-white shadow-[0_1px_1px_rgb(0_0_0/0.26),0_3px_7px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.18)] animate-[sunlace-shine_7s_linear_infinite] hover:shadow-[0_1px_1px_rgb(0_0_0/0.28),0_4px_10px_rgb(0_0_0/0.16),inset_0_1px_0_rgb(255_255_255/0.24)] motion-reduce:animate-none dark:bg-[linear-gradient(110deg,#000103,48%,#ffffff,52%,#000103)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_1px_0_rgb(255_255_255/0.1),0_8px_18px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.24)] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_1px_0_rgb(255_255_255/0.14),0_10px_22px_rgb(0_0_0/0.58),inset_0_1px_0_rgb(255_255_255/0.3)]",
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
  children,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  if (variant === "shine") {
    return (
      <>
        <style>
          {`@keyframes sunlace-shine{0%{background-position:0 0}74%,100%{background-position:-400% 0}}`}
        </style>
        <ButtonPrimitive
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </ButtonPrimitive>
      </>
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
