import { cn } from "@sunlace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

const numberPopVariants = cva("t-digit-group", {
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-lg",
      xl: "text-2xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const numberPopKeyframes = `
@keyframes t-digit-pop-in{0%{transform:translate(calc(var(--digit-distance)*var(--digit-dir-x)),calc(var(--digit-distance)*var(--digit-dir-y)));opacity:0;filter:blur(var(--digit-blur))}100%{transform:translate(0,0);opacity:1;filter:blur(0)}}
@keyframes t-digit-pop-out{0%{transform:translate(0,0);opacity:1;filter:blur(0)}100%{transform:translate(calc(var(--digit-distance)*var(--digit-dir-x)*-1),calc(var(--digit-distance)*var(--digit-dir-y)*-1));opacity:0;filter:blur(var(--digit-blur))}}
`;

const numberPopStyles = `
.t-digit-group {
  --digit-dur: 500ms;
  --digit-distance: 8px;
  --digit-stagger: 70ms;
  --digit-blur: 2px;
  --digit-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
  --digit-dir-x: 0;
  --digit-dir-y: 1;
  display: inline-flex;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
  position: relative;
}
.t-digit-slot {
  display: inline-block;
  position: relative;
}
.t-digit {
  display: inline-block;
  will-change: transform, opacity, filter;
}
.t-digit.is-in {
  animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both;
}
.t-digit.is-out {
  position: absolute;
  inset: 0;
  animation: t-digit-pop-out var(--digit-dur) var(--digit-ease) both;
}
.t-digit.is-in[data-stagger="1"] { animation-delay: var(--digit-stagger); }
.t-digit.is-in[data-stagger="2"] { animation-delay: calc(var(--digit-stagger) * 2); }
.t-digit.is-in[data-stagger="3"] { animation-delay: calc(var(--digit-stagger) * 3); }
.t-digit.is-in[data-stagger="4"] { animation-delay: calc(var(--digit-stagger) * 4); }
.t-digit.is-in[data-stagger="5"] { animation-delay: calc(var(--digit-stagger) * 5); }
.t-digit.is-in[data-stagger="6"] { animation-delay: calc(var(--digit-stagger) * 6); }
.t-digit.is-in[data-stagger="7"] { animation-delay: calc(var(--digit-stagger) * 7); }
.t-digit.is-in[data-stagger="8"] { animation-delay: calc(var(--digit-stagger) * 8); }
.t-digit.is-in[data-stagger="9"] { animation-delay: calc(var(--digit-stagger) * 9); }
.t-digit.is-in[data-stagger="10"] { animation-delay: calc(var(--digit-stagger) * 10); }
.t-digit.is-in[data-stagger="11"] { animation-delay: calc(var(--digit-stagger) * 11); }
.t-digit.is-in[data-stagger="12"] { animation-delay: calc(var(--digit-stagger) * 12); }
@media (prefers-reduced-motion: reduce) {
  .t-digit { animation: none !important; }
}
`;

type NumberPopProps = VariantProps<typeof numberPopVariants> & {
  value: string | number;
  className?: string;
  playKey?: number | string;
};

function splitDigits(value: string) {
  let digitIndex = 0;
  return value.split("").map((char) => {
    if (/[0-9]/.test(char)) {
      digitIndex += 1;
      return { char, stagger: digitIndex };
    }
    return { char, stagger: 0 };
  });
}

function DigitSlot({
  char,
  stagger,
  playKey,
}: {
  char: string;
  stagger: number;
  playKey?: number | string;
}) {
  const [displayChar, setDisplayChar] = useState(char);
  const [oldChar, setOldChar] = useState<string | null>(null);
  const prevChar = useRef(char);

  useEffect(() => {
    if (char !== prevChar.current) {
      setOldChar(prevChar.current);
      setDisplayChar(char);
      prevChar.current = char;
      const t = setTimeout(() => setOldChar(null), 500);
      return () => clearTimeout(t);
    }
  }, [char, playKey]);

  return (
    <span className="t-digit-slot">
      {oldChar && (
        <span className="t-digit is-out" key={oldChar}>
          {oldChar}
        </span>
      )}
      <span
        className="t-digit is-in"
        data-stagger={stagger || undefined}
        key={displayChar}
      >
        {displayChar}
      </span>
    </span>
  );
}

function NumberPop({ value, size, className, playKey }: NumberPopProps) {
  const digits = splitDigits(String(value));

  return (
    <>
      <style>{numberPopKeyframes}</style>
      <style>{numberPopStyles}</style>
      <span
        className={cn(numberPopVariants({ size }), className)}
        data-slot="number-pop"
      >
        {digits.map((d, i) => (
          <DigitSlot
            char={d.char}
            key={i}
            playKey={playKey}
            stagger={d.stagger}
          />
        ))}
      </span>
    </>
  );
}

export { NumberPop, numberPopVariants };
