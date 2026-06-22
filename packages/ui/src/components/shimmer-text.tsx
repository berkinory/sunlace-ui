import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const shimmerTextVariants = cva("t-shimmer relative inline-block", {
  variants: {
    variant: {
      muted:
        "[--shimmer-base:var(--muted-foreground)] [--shimmer-highlight:var(--foreground)]",
      primary:
        "[--shimmer-base:color-mix(in_oklch,var(--primary),transparent_60%)] [--shimmer-highlight:var(--primary)]",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-lg",
      xl: "text-2xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    variant: "muted",
    size: "default",
  },
});

const shimmerKeyframes = `@keyframes t-shimmer{0%{background-position:100% 0}100%{background-position:0 0}}`;
const shimmerStyles = `
.t-shimmer {
  --shimmer-dur: 2000ms;
  --shimmer-band: 400%;
  --shimmer-ease: linear;
  color: var(--shimmer-base);
}
.t-shimmer::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(90deg, transparent 0%, transparent 40%, var(--shimmer-highlight) 50%, transparent 60%, transparent 100%);
  background-size: var(--shimmer-band) 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: t-shimmer var(--shimmer-dur) var(--shimmer-ease) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .t-shimmer::before { animation: none !important; }
}
`;

type ShimmerTextProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof shimmerTextVariants> & {
    text: string;
  };

function ShimmerText({
  text,
  variant,
  size,
  className,
  ...props
}: ShimmerTextProps) {
  return (
    <>
      <style>{shimmerKeyframes}</style>
      <style>{shimmerStyles}</style>
      <span
        data-text={text}
        data-slot="shimmer-text"
        className={cn(shimmerTextVariants({ variant, size }), className)}
        {...props}
      >
        {text}
      </span>
    </>
  );
}

export { ShimmerText, shimmerTextVariants };
