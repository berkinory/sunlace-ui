import { Input as InputPrimitive } from "@base-ui/react/input";
import {
  Cancel01Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@sunlace/ui/lib/utils";
import * as React from "react";

type InputProps = Omit<React.ComponentProps<"input">, "prefix"> & {
  clearable?: boolean;
  endAddon?: React.ReactNode;
  error?: React.ReactNode;
  onClear?: () => void;
  revealable?: boolean;
  shakeKey?: React.Key;
  startIcon?: React.ReactNode;
};

const inputClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";

const inputShellClassName =
  "group/input relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:bg-input/50 has-disabled:opacity-50 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[aria-invalid=true]]:border-destructive/50 dark:has-[[aria-invalid=true]]:ring-destructive/40";

function useComposedRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback((node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }
  }, refs);
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    clearable = false,
    disabled,
    endAddon,
    error,
    onChange,
    onClear,
    revealable = false,
    shakeKey,
    startIcon,
    type,
    value,
    ...props
  },
  ref
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const shellRef = React.useRef<HTMLDivElement>(null);
  const selectionRef = React.useRef<{
    end: number | null;
    start: number | null;
  } | null>(null);
  const composedRef = useComposedRef(inputRef, ref);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const isInvalid =
    props["aria-invalid"] === true || props["aria-invalid"] === "true";
  const hasValue = value !== undefined ? String(value).length > 0 : false;
  const inputType =
    revealable && type === "password" && passwordVisible ? "text" : type;
  const showClearButton = clearable && hasValue;
  const showRevealButton = revealable && type === "password";
  const hasShell = Boolean(
    startIcon ||
    endAddon ||
    error ||
    clearable ||
    (revealable && type === "password")
  );

  React.useEffect(() => {
    if (shakeKey === undefined) {
      return;
    }

    const target = shellRef.current ?? inputRef.current;

    if (
      !target ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const animation = target.animate(
      [
        {
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          transform: "translateX(0)",
        },
        {
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          offset: 0.2857,
          transform: "translateX(4px)",
        },
        {
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          offset: 0.5714,
          transform: "translateX(-4px)",
        },
        {
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          offset: 0.7857,
          transform: "translateX(2px)",
        },
        { transform: "translateX(0)" },
      ],
      { duration: 240 }
    );

    return () => {
      animation.cancel();
    };
  }, [shakeKey]);

  React.useLayoutEffect(() => {
    const selection = selectionRef.current;
    const inputElement = inputRef.current;

    if (
      !selection ||
      !inputElement ||
      document.activeElement !== inputElement
    ) {
      return;
    }

    try {
      inputElement.setSelectionRange(selection.start, selection.end);
    } catch {
      // Password inputs can reject selection restoration in some browsers.
    }

    selectionRef.current = null;
  }, [inputType]);

  const input = (
    <InputPrimitive
      aria-invalid={isInvalid || undefined}
      className={cn(
        hasShell
          ? "h-full flex-1 border-0 bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent md:text-sm dark:bg-transparent dark:disabled:bg-transparent"
          : inputClassName,
        hasShell && startIcon && "pl-1.5",
        hasShell && (clearable || showRevealButton || endAddon) && "pr-1.5",
        !hasShell && className
      )}
      data-slot="input"
      disabled={disabled}
      onChange={onChange}
      ref={composedRef}
      type={inputType}
      value={value}
      {...props}
    />
  );

  if (!hasShell) {
    return input;
  }

  return (
    <div
      className={cn("grid w-full gap-1.5", className)}
      data-slot="input-root"
    >
      <div
        className={inputShellClassName}
        data-slot="input-shell"
        ref={shellRef}
      >
        {startIcon ? (
          <span
            aria-hidden
            className="flex h-full items-center pl-2.5 text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
            data-slot="input-start-icon"
          >
            {startIcon}
          </span>
        ) : null}
        {input}
        {endAddon ? (
          <span
            className="flex h-full items-center pr-2.5 text-sm text-muted-foreground"
            data-slot="input-end-addon"
          >
            {endAddon}
          </span>
        ) : null}
        {clearable ? (
          <button
            aria-label="Clear input"
            className={cn(
              "mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-[background-color,color,opacity,transform,filter] duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none motion-reduce:transition-none [&_svg]:size-4",
              showClearButton
                ? "scale-100 opacity-100 blur-0"
                : "pointer-events-none scale-75 opacity-0 blur-[2px]"
            )}
            disabled={disabled}
            tabIndex={showClearButton ? undefined : -1}
            onClick={() => {
              if (!showClearButton) {
                return;
              }

              onClear?.();
              inputRef.current?.focus();
            }}
            onMouseDown={(event) => event.preventDefault()}
            type="button"
          >
            <HugeiconsIcon aria-hidden icon={Cancel01Icon} strokeWidth={2} />
          </button>
        ) : null}
        {showRevealButton ? (
          <button
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            disabled={disabled}
            onClick={() => {
              const inputElement = inputRef.current;

              selectionRef.current = inputElement
                ? {
                    end: inputElement.selectionEnd,
                    start: inputElement.selectionStart,
                  }
                : null;

              setPasswordVisible((current) => !current);
              inputRef.current?.focus();
            }}
            onMouseDown={(event) => event.preventDefault()}
            type="button"
          >
            <HugeiconsIcon
              aria-hidden
              className="size-4 transition-[opacity,transform] duration-200 ease-in-out motion-reduce:transition-none"
              icon={passwordVisible ? ViewOffSlashIcon : ViewIcon}
              strokeWidth={2}
            />
          </button>
        ) : null}
      </div>
      {error ? (
        <p
          className="text-destructive text-xs opacity-100 transition-[opacity,visibility] duration-[280ms] ease-out"
          data-slot="input-error"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
});

function InputField({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid w-full gap-1.5", className)}
      data-slot="input-field"
      {...props}
    />
  );
}

function InputLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("font-medium text-sm leading-none", className)}
      data-slot="input-label"
      {...props}
    />
  );
}

function InputDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-xs", className)}
      data-slot="input-description"
      {...props}
    />
  );
}

export { Input, InputDescription, InputField, InputLabel };
