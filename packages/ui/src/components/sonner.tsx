import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  MultiplicationSignCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const sonnerStyles = `
.cn-toast {
  font-family: var(--font-sans);
  border-radius: var(--radius);
  box-shadow: 0 1px 1px rgb(0 0 0/0.06), 0 3px 8px rgb(0 0 0/0.05), inset 0 1px rgb(255 255 255/0.18) !important;
}
.dark .cn-toast {
  box-shadow: 0 1px 1px rgb(0 0 0/0.32), 0 4px 12px rgb(0 0 0/0.22), inset 0 1px rgb(255 255 255/0.08) !important;
}
.cn-toast[data-type="success"] {
  --normal-bg: oklch(0.93 0.07 145) !important;
  --normal-text: oklch(0.43 0.13 145) !important;
  --normal-border: oklch(0.86 0.08 145) !important;
}
.cn-toast[data-type="warning"] {
  --normal-bg: oklch(0.93 0.09 76) !important;
  --normal-text: oklch(0.48 0.14 62) !important;
  --normal-border: oklch(0.86 0.1 76) !important;
}
.cn-toast[data-type="error"] {
  --normal-bg: oklch(0.93 0.06 27) !important;
  --normal-text: oklch(0.56 0.2 27) !important;
  --normal-border: oklch(0.86 0.07 27) !important;
}
.cn-toast[data-type="info"] {
  --normal-bg: oklch(0.93 0.07 250) !important;
  --normal-text: oklch(0.5 0.16 255) !important;
  --normal-border: oklch(0.86 0.08 250) !important;
}
.dark .cn-toast[data-type="success"] {
  --normal-bg: oklch(0.34 0.06 145) !important;
  --normal-text: oklch(0.74 0.16 145) !important;
  --normal-border: oklch(0.4 0.07 145) !important;
}
.dark .cn-toast[data-type="warning"] {
  --normal-bg: oklch(0.37 0.07 68) !important;
  --normal-text: oklch(0.78 0.16 76) !important;
  --normal-border: oklch(0.43 0.08 68) !important;
}
.dark .cn-toast[data-type="error"] {
  --normal-bg: oklch(0.33 0.07 27) !important;
  --normal-text: oklch(0.72 0.2 27) !important;
  --normal-border: oklch(0.4 0.08 27) !important;
}
.dark .cn-toast[data-type="info"] {
  --normal-bg: oklch(0.34 0.07 250) !important;
  --normal-text: oklch(0.78 0.14 255) !important;
  --normal-border: oklch(0.41 0.08 250) !important;
}
@media (prefers-reduced-motion: reduce) {
  .cn-toast { transition: none !important; animation: none !important; }
}
`;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <>
      <style>{sonnerStyles}</style>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--card)",
            "--normal-text": "var(--card-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
          } as React.CSSProperties
        }
        icons={{
          success: (
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              strokeWidth={2}
              className="size-4"
            />
          ),
          info: (
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-4"
            />
          ),
          warning: (
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={2}
              className="size-4"
            />
          ),
          error: (
            <HugeiconsIcon
              icon={MultiplicationSignCircleIcon}
              strokeWidth={2}
              className="size-4"
            />
          ),
          loading: (
            <HugeiconsIcon
              icon={Loading03Icon}
              strokeWidth={2}
              className="size-4 animate-spin"
            />
          ),
        }}
        toastOptions={{
          classNames: {
            toast: "cn-toast",
          },
        }}
        {...props}
      />
    </>
  );
};

export { Toaster };
