import { cn } from "@sunlace/ui/lib/utils";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DockContextValue = {
  size: number;
  activeId: string | null;
  setActiveId: (id: string) => void;
  registerItem: (id: string, el: HTMLElement) => void;
  pillRef: React.RefObject<HTMLDivElement | null>;
};

const DockContext = createContext<DockContextValue | null>(null);

type DockProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  defaultActiveId?: string;
};

function Dock({ children, size = 44, className, defaultActiveId }: DockProps) {
  const [activeId, setActiveId] = useState<string | null>(
    defaultActiveId ?? null
  );
  const pillRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());

  const registerItem = (id: string, el: HTMLElement) => {
    itemsRef.current.set(id, el);
    if (activeId === id) {
      movePill(el);
    }
  };

  const movePill = (el: HTMLElement) => {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.setProperty("--dock-pill-x", `${el.offsetLeft}px`);
    pill.style.setProperty("--dock-pill-y", `${el.offsetTop}px`);
    pill.style.setProperty("--dock-pill-w", `${el.offsetWidth}px`);
    pill.style.setProperty("--dock-pill-h", `${el.offsetHeight}px`);
    pill.style.opacity = "1";
  };

  const handleActiveChange = (id: string) => {
    setActiveId(id);
    const el = itemsRef.current.get(id);
    if (el) movePill(el);
  };

  const ctxValue: DockContextValue = {
    size,
    activeId,
    setActiveId: handleActiveChange,
    registerItem,
    pillRef,
  };

  return (
    <DockContext.Provider value={ctxValue}>
      <div
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card/80 px-2 py-1 shadow-lg backdrop-blur-xl",
          className
        )}
      >
        <div
          className="pointer-events-none absolute top-0 left-0 z-0 rounded-xl border border-border bg-background shadow-sm ring-1 ring-foreground/5 transition-[transform,width,height,opacity] duration-[var(--tabs-dur)] ease-[var(--tabs-ease)] will-change-[transform,width,height] [--tabs-dur:250ms] [--tabs-ease:cubic-bezier(0.22,1,0.36,1)] [transform:translate(var(--dock-pill-x,0),var(--dock-pill-y,0))] [width:var(--dock-pill-w,0)] [height:var(--dock-pill-h,0)] opacity-0 dark:border-input dark:bg-input/50 motion-reduce:transition-none"
          ref={pillRef}
        />
        {children}
      </div>
    </DockContext.Provider>
  );
}

type DockItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  id: string;
  "aria-label"?: string;
};

function DockItem({
  children,
  className,
  onClick,
  active,
  id,
  ...rest
}: DockItemProps) {
  const dock = useContext(DockContext);
  const ref = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const size = dock?.size ?? 44;

  useLayoutEffect(() => {
    if (ref.current && dock) {
      dock.registerItem(id, ref.current);
    }
  }, [id, dock]);

  const handleClick = () => {
    dock?.setActiveId(id);
    onClick?.();
  };

  const sharedClass = cn(
    "dock-item relative z-10 flex shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-300",
    active && "text-foreground",
    className
  );

  const sharedStyle = { width: size, height: size };

  if (onClick) {
    return (
      <button
        aria-label={rest["aria-label"]}
        aria-pressed={active}
        className={cn(
          sharedClass,
          "cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        onClick={handleClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        style={sharedStyle}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={sharedClass}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={sharedStyle}
    >
      {children}
    </div>
  );
}

function DockSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-1 h-8 w-px shrink-0 self-center bg-border", className)}
    />
  );
}

export { Dock, DockItem, DockSeparator };
