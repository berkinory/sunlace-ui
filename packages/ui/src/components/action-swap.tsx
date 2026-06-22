import { cn } from "@sunlace/ui/lib/utils";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Button } from "./button";

type ActionSwapItem = {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
};

type ActionSwapAnimation = "blur" | "roll" | "cascade";

type ActionSwapTextProps = {
  value: string;
  children: ReactNode;
  animation?: ActionSwapAnimation;
  className?: string;
};

type ActionSwapIconProps = {
  value: string;
  children: ReactNode;
  animation?: ActionSwapAnimation;
  className?: string;
};

type ActionSwapButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children"
> & {
  items: ActionSwapItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, item: ActionSwapItem) => void;
  animation?: ActionSwapAnimation;
  iconOnly?: boolean;
  cycle?: boolean;
};

const SWAP_DURATIONS: Record<ActionSwapAnimation, number> = {
  blur: 200,
  roll: 240,
  cascade: 420,
};

const actionSwapKeyframes = `
@keyframes t-swap-blur-in{0%{opacity:0;transform:scale(var(--swap-blur-start-scale));filter:blur(var(--swap-blur-amount))}100%{opacity:1;transform:scale(1);filter:blur(0)}}
@keyframes t-swap-blur-out{0%{opacity:1;transform:scale(1);filter:blur(0)}100%{opacity:0;transform:scale(var(--swap-blur-start-scale));filter:blur(var(--swap-blur-amount))}}
@keyframes t-swap-roll-text-in{0%{opacity:0;transform:translateY(115%);filter:blur(var(--swap-roll-blur))}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes t-swap-roll-text-out{0%{opacity:1;transform:translateY(0);filter:blur(0)}100%{opacity:0;transform:translateY(-115%);filter:blur(var(--swap-roll-blur))}}
@keyframes t-swap-roll-icon-in{0%{opacity:0;transform:translateY(16px);filter:blur(var(--swap-roll-blur))}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes t-swap-roll-icon-out{0%{opacity:1;transform:translateY(0);filter:blur(0)}100%{opacity:0;transform:translateY(-16px);filter:blur(var(--swap-roll-blur))}}
@keyframes t-swap-cascade-in{0%{opacity:0;transform:translateY(105%);filter:blur(var(--swap-roll-blur))}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes t-swap-cascade-out{0%{opacity:1;transform:translateY(0);filter:blur(0)}100%{opacity:0;transform:translateY(-105%);filter:blur(var(--swap-roll-blur))}}
`;

const actionSwapStyles = `
.t-action-swap {
  --swap-blur-amount: 8px;
  --swap-blur-start-scale: 0.94;
  --swap-icon-blur-start-scale: 0.25;
  --swap-roll-blur: 6px;
  --swap-dur: 200ms;
  --swap-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --swap-width-dur: 220ms;
  --swap-cascade-stagger: 25ms;
}
.t-action-swap[data-animation="roll"] { --swap-dur: 240ms; }
.t-action-swap[data-animation="cascade"] { --swap-dur: 200ms; }
.t-action-swap-icon {
  display: inline-grid;
  place-items: center;
  overflow: hidden;
}
.t-action-swap-icon-layer {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: opacity, filter, transform;
}
.t-action-swap-text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width var(--swap-width-dur) var(--swap-ease);
}
.t-action-swap-text-measure {
  visibility: hidden;
  display: inline-block;
  white-space: nowrap;
}
.t-action-swap-text-layer {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  will-change: opacity, filter, transform;
}
.t-action-swap-text-cascade {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  white-space: pre;
}
.t-action-swap-letter {
  display: inline-block;
  white-space: pre;
  will-change: opacity, filter, transform;
}
.t-action-swap[data-animation="blur"] .t-action-swap-icon-layer.is-in {
  animation: t-swap-blur-in var(--swap-dur) ease-in-out both;
  --swap-blur-start-scale: var(--swap-icon-blur-start-scale);
}
.t-action-swap[data-animation="blur"] .t-action-swap-icon-layer.is-out {
  animation: t-swap-blur-out var(--swap-dur) ease-in-out both;
  --swap-blur-start-scale: var(--swap-icon-blur-start-scale);
}
.t-action-swap[data-animation="blur"] .t-action-swap-text-layer.is-in {
  animation: t-swap-blur-in var(--swap-dur) ease-in-out both;
}
.t-action-swap[data-animation="blur"] .t-action-swap-text-layer.is-out {
  animation: t-swap-blur-out var(--swap-dur) ease-in-out both;
}
.t-action-swap[data-animation="roll"] .t-action-swap-icon-layer.is-in {
  animation: t-swap-roll-icon-in var(--swap-dur) var(--swap-ease) both;
}
.t-action-swap[data-animation="roll"] .t-action-swap-icon-layer.is-out {
  animation: t-swap-roll-icon-out calc(var(--swap-dur) * 0.75) ease-in-out both;
}
.t-action-swap[data-animation="roll"] .t-action-swap-text-layer.is-in {
  animation: t-swap-roll-text-in var(--swap-dur) var(--swap-ease) both;
}
.t-action-swap[data-animation="roll"] .t-action-swap-text-layer.is-out {
  animation: t-swap-roll-text-out calc(var(--swap-dur) * 0.75) ease-in-out both;
}
.t-action-swap[data-animation="cascade"] .t-action-swap-letter.is-in {
  animation: t-swap-cascade-in var(--swap-dur) var(--swap-ease) both;
}
.t-action-swap[data-animation="cascade"] .t-action-swap-letter.is-out {
  animation: t-swap-cascade-out 160ms var(--swap-ease) both;
}
@media (prefers-reduced-motion: reduce) {
  .t-action-swap-icon-layer,
  .t-action-swap-text-layer,
  .t-action-swap-letter { animation: none !important; }
  .t-action-swap-text { transition: none !important; }
}
`;

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
}

function useSwapOutgoing(
  value: string,
  content: ReactNode,
  animation: ActionSwapAnimation,
  reduceMotion: boolean
) {
  const [outgoing, setOutgoing] = useState<{
    content: ReactNode;
    swapKey: number;
    value: string;
  } | null>(null);
  const prev = useRef({ content, value });
  const swapKey = useRef(0);

  useEffect(() => {
    if (reduceMotion || value === prev.current.value) {
      prev.current = { content, value };
      return;
    }

    swapKey.current += 1;
    setOutgoing({
      content: prev.current.content,
      swapKey: swapKey.current,
      value: prev.current.value,
    });
    prev.current = { content, value };

    const timer = window.setTimeout(
      () => setOutgoing(null),
      SWAP_DURATIONS[animation]
    );
    return () => window.clearTimeout(timer);
  }, [animation, content, reduceMotion, value]);

  return { outgoing, swapKey: swapKey.current };
}

function ActionSwapStyles() {
  return (
    <>
      <style>{actionSwapKeyframes}</style>
      <style>{actionSwapStyles}</style>
    </>
  );
}

function ActionSwapIcon({
  value,
  children,
  animation = "blur",
  className,
}: ActionSwapIconProps) {
  const reduceMotion = useReducedMotion();
  const { outgoing, swapKey } = useSwapOutgoing(
    value,
    children,
    animation,
    reduceMotion
  );
  const coreAnimation = animation === "cascade" ? "roll" : animation;

  return (
    <>
      <ActionSwapStyles />
      <span
        className={cn("t-action-swap t-action-swap-icon", className)}
        data-animation={coreAnimation}
        data-slot="action-swap-icon"
      >
        {outgoing ? (
          <span
            className="t-action-swap-icon-layer is-out"
            key={`out-${outgoing.value}-${outgoing.swapKey}`}
          >
            {outgoing.content}
          </span>
        ) : null}
        <span
          className="t-action-swap-icon-layer is-in"
          key={`in-${value}-${swapKey}`}
        >
          {children}
        </span>
      </span>
    </>
  );
}

function ActionSwapText({
  value,
  children,
  animation = "blur",
  className,
}: ActionSwapTextProps) {
  const reduceMotion = useReducedMotion();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();
  const { outgoing, swapKey } = useSwapOutgoing(
    value,
    children,
    animation,
    reduceMotion
  );
  const label = typeof children === "string" ? children : null;
  const cascade = animation === "cascade" && label !== null && !reduceMotion;
  const coreAnimation: "blur" | "roll" =
    animation === "cascade" ? "roll" : animation;

  useLayoutEffect(() => {
    const nextWidth = measureRef.current?.offsetWidth;
    if (!nextWidth) return;
    setWidth((current) => (current === nextWidth ? current : nextWidth));
  });

  return (
    <>
      <ActionSwapStyles />
      <span
        className={cn("t-action-swap t-action-swap-text", className)}
        data-animation={cascade ? "cascade" : coreAnimation}
        data-slot="action-swap-text"
        style={width === undefined ? undefined : { width }}
      >
        <span
          aria-hidden
          className="t-action-swap-text-measure"
          ref={measureRef}
        >
          {children}
        </span>
        {cascade ? (
          <>
            <span className="sr-only">{label}</span>
            {outgoing && typeof outgoing.content === "string" ? (
              <span
                aria-hidden
                className="t-action-swap-text-cascade"
                key={`out-${outgoing.value}-${outgoing.swapKey}`}
              >
                {outgoing.content.split("").map((char, index) => (
                  <span
                    className="t-action-swap-letter is-out"
                    key={index}
                    style={{
                      animationDelay: `${index * 12.5}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ) : null}
            <span
              aria-hidden
              className="t-action-swap-text-cascade"
              key={`in-${value}-${swapKey}`}
            >
              {label.split("").map((char, index) => (
                <span
                  className="t-action-swap-letter is-in"
                  key={index}
                  style={{
                    animationDelay: `${index * 25}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </>
        ) : (
          <>
            {outgoing ? (
              <span
                className="t-action-swap-text-layer is-out"
                key={`out-${outgoing.value}-${outgoing.swapKey}`}
              >
                {outgoing.content}
              </span>
            ) : null}
            <span
              className="t-action-swap-text-layer is-in"
              key={`in-${value}-${swapKey}`}
            >
              {children}
            </span>
          </>
        )}
      </span>
    </>
  );
}

function ActionSwapButton({
  items,
  value,
  defaultValue,
  onValueChange,
  animation = "blur",
  iconOnly,
  cycle = true,
  variant = "secondary",
  size,
  className,
  disabled,
  onClick,
  ...props
}: ActionSwapButtonProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.id ?? ""
  );
  const currentValue = value ?? internalValue;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === currentValue)
  );
  const activeItem = items[activeIndex] ?? items[0];
  const hasIcon = items.some((item) => item.icon);
  const resolvedIconOnly = iconOnly ?? size === "icon";
  const nextItem =
    cycle && items.length > 0
      ? items[(activeIndex + 1) % items.length]
      : undefined;

  if (!activeItem) return null;

  const accessibleLabel =
    activeItem.ariaLabel ??
    (resolvedIconOnly && typeof activeItem.label === "string"
      ? activeItem.label
      : undefined);

  return (
    <Button
      aria-label={accessibleLabel}
      className={className}
      disabled={disabled}
      size={size}
      variant={variant}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled || !cycle || !nextItem) return;
        if (value === undefined) setInternalValue(nextItem.id);
        onValueChange?.(nextItem.id, nextItem);
      }}
      {...props}
    >
      {hasIcon ? (
        <ActionSwapIcon animation={animation} value={activeItem.id}>
          {activeItem.icon ?? null}
        </ActionSwapIcon>
      ) : null}
      {!resolvedIconOnly ? (
        <ActionSwapText animation={animation} value={activeItem.id}>
          {activeItem.label}
        </ActionSwapText>
      ) : null}
    </Button>
  );
}

export {
  ActionSwapButton,
  ActionSwapIcon,
  ActionSwapText,
  type ActionSwapAnimation,
  type ActionSwapButtonProps,
  type ActionSwapIconProps,
  type ActionSwapItem,
  type ActionSwapTextProps,
};
