import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "group/badge inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-4xl border border-transparent bg-clip-padding px-3 text-sm font-medium whitespace-nowrap shadow-[0_1px_1px_rgb(0_0_0/0.08),0_3px_8px_rgb(0_0_0/0.06),inset_0_1px_rgb(255_255_255/0.16)] transition-[background-color,border-color,box-shadow,color,filter] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:shadow-[0_1px_1px_rgb(0_0_0/0.35),0_4px_12px_rgb(0_0_0/0.28),inset_0_1px_rgb(255_255_255/0.10)] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-4!",
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
        link: "text-primary shadow-none underline-offset-4 hover:underline hover:shadow-none dark:shadow-none",
        success:
          "bg-[oklch(0.93_0.07_145)] text-[oklch(0.43_0.13_145)] shadow-none hover:bg-[oklch(0.90_0.08_145)] hover:shadow-none focus-visible:ring-[oklch(0.52_0.13_145/0.24)] dark:bg-[oklch(0.34_0.06_145)] dark:text-[oklch(0.74_0.16_145)] dark:hover:bg-[oklch(0.38_0.07_145)] dark:shadow-none dark:hover:shadow-none",
        warning:
          "bg-[oklch(0.93_0.09_76)] text-[oklch(0.48_0.14_62)] shadow-none hover:bg-[oklch(0.90_0.10_76)] hover:shadow-none focus-visible:ring-[oklch(0.58_0.16_68/0.24)] dark:bg-[oklch(0.37_0.07_68)] dark:text-[oklch(0.78_0.16_76)] dark:hover:bg-[oklch(0.41_0.08_68)] dark:shadow-none dark:hover:shadow-none",
        info: "bg-[oklch(0.93_0.07_250)] text-[oklch(0.5_0.16_255)] shadow-none hover:bg-[oklch(0.90_0.08_250)] hover:shadow-none focus-visible:ring-[oklch(0.6_0.16_255/0.24)] dark:bg-[oklch(0.34_0.07_250)] dark:text-[oklch(0.78_0.14_255)] dark:hover:bg-[oklch(0.38_0.08_250)] dark:shadow-none dark:hover:shadow-none",
        destructive:
          "bg-[oklch(0.93_0.06_27)] text-[oklch(0.56_0.20_27)] shadow-none hover:bg-[oklch(0.90_0.07_27)] hover:shadow-none focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-[oklch(0.33_0.07_27)] dark:text-[oklch(0.72_0.20_27)] dark:hover:bg-[oklch(0.37_0.08_27)] dark:shadow-none dark:hover:shadow-none dark:focus-visible:ring-destructive/40",
        shine:
          "border-border bg-[linear-gradient(110deg,#000000,48%,#ffffff,52%,#000000)] bg-[length:400%_100%] text-white shadow-[0_1px_1px_rgb(0_0_0/0.26),0_3px_7px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.18)] animate-[sunlace-shine_7s_linear_infinite] hover:shadow-[0_1px_1px_rgb(0_0_0/0.28),0_4px_10px_rgb(0_0_0/0.16),inset_0_1px_0_rgb(255_255_255/0.24)] motion-reduce:animate-none dark:bg-[linear-gradient(110deg,#000103,48%,#ffffff,52%,#000103)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_1px_0_rgb(255_255_255/0.1),0_8px_18px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.24)] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_1px_0_rgb(255_255_255/0.14),0_10px_22px_rgb(0_0_0/0.58),inset_0_1px_0_rgb(255_255_255/0.3)]",
        "animated-border":
          "relative overflow-visible border-primary/10 bg-background text-muted-foreground shadow-none hover:bg-muted hover:text-foreground hover:shadow-none",
        "rotate-border":
          "relative overflow-hidden border-transparent bg-transparent !p-px text-foreground shadow-none hover:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  children,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  const content =
    variant === "animated-border" ? (
      <>
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
      </>
    ) : variant === "rotate-border" ? (
      <>
        <span
          aria-hidden
          className={cn(
            "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4e4e4e_0%,#d4d4d4_50%,#414141_100%)] motion-reduce:animate-none",
            "dark:bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]"
          )}
        />
        <span className="relative z-10 inline-flex size-full items-center justify-center rounded-full bg-background px-3 text-foreground backdrop-blur-3xl">
          {children}
        </span>
      </>
    ) : (
      children
    );

  const badge = useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: content,
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });

  if (variant === "shine") {
    return (
      <>
        <style>
          {`@keyframes sunlace-shine{0%{background-position:0 0}74%,100%{background-position:-400% 0}}`}
        </style>
        {badge}
      </>
    );
  }

  if (variant === "animated-border") {
    return (
      <>
        <style>
          {`@keyframes sunlace-border-run{0%{offset-distance:0%}100%{offset-distance:100%}}`}
        </style>
        {badge}
      </>
    );
  }

  return badge;
}

export { Badge, badgeVariants };
