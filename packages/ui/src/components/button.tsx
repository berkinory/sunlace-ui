import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonSizeVariants = {
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
} as const;

const buttonContentSizeVariants = {
  default:
    "gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  xs: "gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
  sm: "gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
  lg: "gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  icon: "",
  "icon-xs": "",
  "icon-sm": "",
  "icon-lg": "",
} satisfies Record<keyof typeof buttonSizeVariants, string>;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color,filter] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none select-none active:scale-[0.98] active:duration-75 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_oklch,var(--primary),black_24%)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_15%)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),black_10%)_100%)] text-primary-foreground hover:border-[color-mix(in_oklch,var(--primary),black_16%)] hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_24%)_0%,color-mix(in_oklch,var(--primary),white_7%)_50%,color-mix(in_oklch,var(--primary),black_4%)_100%)] dark:border-[color-mix(in_oklch,var(--primary),black_36%)] dark:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_34%)_0%,color-mix(in_oklch,var(--primary),black_2%)_42%,color-mix(in_oklch,var(--primary),black_18%)_100%)] dark:hover:border-[color-mix(in_oklch,var(--primary),black_26%)] dark:hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_48%)_0%,color-mix(in_oklch,var(--primary),white_8%)_42%,color-mix(in_oklch,var(--primary),black_10%)_100%)]",
        outline:
          "border-border bg-background hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_22%)] hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "shadow-none hover:bg-muted hover:text-foreground hover:shadow-none aria-expanded:bg-muted aria-expanded:text-foreground dark:shadow-none dark:hover:bg-muted/50",
        link: "text-primary shadow-none underline-offset-4 hover:underline hover:shadow-none dark:shadow-none",
        success:
          "bg-[oklch(0.93_0.07_145)] text-[oklch(0.43_0.13_145)] shadow-none hover:bg-[oklch(0.90_0.08_145)] hover:shadow-none focus-visible:ring-[oklch(0.52_0.13_145/0.24)] dark:bg-[oklch(0.34_0.06_145)] dark:text-[oklch(0.74_0.16_145)] dark:hover:bg-[oklch(0.38_0.07_145)] dark:shadow-none dark:hover:shadow-none",
        warning:
          "bg-[oklch(0.93_0.09_76)] text-[oklch(0.48_0.14_62)] shadow-none hover:bg-[oklch(0.90_0.10_76)] hover:shadow-none focus-visible:ring-[oklch(0.58_0.16_68/0.24)] dark:bg-[oklch(0.37_0.07_68)] dark:text-[oklch(0.78_0.16_76)] dark:hover:bg-[oklch(0.41_0.08_68)] dark:shadow-none dark:hover:shadow-none",
        destructive:
          "bg-[oklch(0.93_0.06_27)] text-[oklch(0.56_0.20_27)] shadow-none hover:bg-[oklch(0.90_0.07_27)] hover:shadow-none focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-[oklch(0.33_0.07_27)] dark:text-[oklch(0.72_0.20_27)] dark:hover:bg-[oklch(0.37_0.08_27)] dark:shadow-none dark:hover:shadow-none dark:focus-visible:ring-destructive/40",
        shine:
          "overflow-hidden border-border bg-[linear-gradient(110deg,#000000,48%,#ffffff,52%,#000000)] bg-[length:400%_100%] text-white animate-[sunlace-shine_7s_linear_infinite] motion-reduce:animate-none dark:bg-[linear-gradient(110deg,#000103,48%,#ffffff,52%,#000103)]",
        "animated-border":
          "relative border-primary/10 bg-background text-muted-foreground shadow-none hover:bg-muted hover:text-foreground hover:shadow-none",
        "rotate-border":
          "relative overflow-hidden border-transparent bg-transparent !p-px text-foreground shadow-none hover:shadow-none",
      },
      size: buttonSizeVariants,
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
  const resolvedSize = size ?? "default";

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

  if (variant === "animated-border") {
    return (
      <>
        <style>
          {`@keyframes sunlace-border-run{0%{offset-distance:0%}100%{offset-distance:100%}}`}
        </style>
        <ButtonPrimitive
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-px rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box]",
              "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
            )}
          >
            <div
              className={cn(
                "absolute aspect-square w-5 animate-[sunlace-border-run_5s_linear_infinite] bg-gradient-to-r from-transparent via-neutral-300 to-neutral-400 [offset-distance:0%] [offset-path:rect(0_auto_auto_0_round_20px)] motion-reduce:animate-none",
                "dark:from-transparent dark:via-neutral-600 dark:to-neutral-400"
              )}
            />
          </div>
          <span className="relative z-10">{children}</span>
        </ButtonPrimitive>
      </>
    );
  }

  if (variant === "rotate-border") {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4e4e4e_0%,#d4d4d4_50%,#414141_100%)] motion-reduce:animate-none",
            "dark:bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]"
          )}
        />
        <span
          className={cn(
            "relative z-10 inline-flex size-full items-center justify-center rounded-[calc(var(--radius-lg)-1px)] bg-background text-foreground backdrop-blur-3xl",
            buttonContentSizeVariants[resolvedSize]
          )}
        >
          {children}
        </span>
      </ButtonPrimitive>
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
