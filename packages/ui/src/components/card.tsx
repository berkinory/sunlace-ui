import { cn } from "@sunlace/ui/lib/utils";
import * as React from "react";

type CardVariant = "default" | "shine" | "animated-border";

const cardBaseClass =
  "group/card relative flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border bg-clip-padding py-(--card-spacing) text-sm shadow-[0_1px_1px_rgb(0_0_0/0.06),0_3px_8px_rgb(0_0_0/0.05),inset_0_1px_rgb(255_255_255/0.18)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),0_4px_12px_rgb(0_0_0/0.22),inset_0_1px_rgb(255_255_255/0.08)] [--card-spacing:--spacing(4)]";

const cardVariantClasses = {
  default: "border-border bg-card text-card-foreground",
  shine:
    "animate-[sunlace-shine_7s_linear_infinite] border-white/10 bg-[linear-gradient(110deg,#000000,45%,#303030,55%,#000000)] bg-[length:400%_100%] text-white motion-reduce:animate-none dark:bg-[linear-gradient(110deg,#000103,45%,#303030,55%,#000103)] [&_[data-slot=card-content]]:text-white/80 [&_[data-slot=card-description]]:text-white/60 [&_[data-slot=card-footer]]:border-white/10 [&_[data-slot=card-footer]]:bg-white/5",
  "animated-border":
    "overflow-visible border-primary/10 bg-card text-card-foreground shadow-none",
} satisfies Record<CardVariant, string>;

function Card({
  className,
  children,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  variant?: CardVariant;
}) {
  const card = (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardBaseClass, cardVariantClasses[variant], className)}
      {...props}
    >
      {children}
      {variant === "animated-border" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box]",
            "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
        >
          <div
            className={cn(
              "absolute h-5 w-10 animate-[sunlace-border-run_5s_linear_infinite] bg-gradient-to-r from-transparent via-neutral-300 to-neutral-400 [offset-distance:0%] [offset-path:rect(0_auto_auto_0_round_20px)] [offset-rotate:auto] motion-reduce:animate-none",
              "dark:from-transparent dark:via-neutral-600 dark:to-neutral-400"
            )}
          />
        </div>
      ) : null}
    </div>
  );

  if (variant === "shine") {
    return (
      <>
        <style>
          {`@keyframes sunlace-shine{0%{background-position:0 0}74%,100%{background-position:-400% 0}}`}
        </style>
        {card}
      </>
    );
  }

  if (variant === "animated-border") {
    return (
      <>
        <style>
          {`@keyframes sunlace-border-run{0%{offset-distance:0%}100%{offset-distance:100%}}`}
        </style>
        {card}
      </>
    );
  }

  return card;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 px-(--card-spacing) py-3",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
