import { BookOpen01Icon, Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DrawerClose } from "@sunlace/ui/components";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { componentItems, type ComponentSlug } from "./component-registry";

type ShowcaseNavProps = {
  activeSlug: ComponentSlug;
  mobile?: boolean;
};

const indicatorHeight = 14;

export function ShowcaseNav({ activeSlug, mobile = false }: ShowcaseNavProps) {
  const { hash } = useRouterState({
    select: (state) => state.location,
  });
  const activeGetStartedKey =
    hash === "installation" || hash === "cli" ? hash : null;
  const activeKey = activeGetStartedKey ?? activeSlug;
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null);

  const linkClass = mobile
    ? "relative -ml-2 block w-[calc(100%+0.5rem)] rounded-md py-1.5 pr-2 pl-2 text-sm capitalize text-foreground/65 transition-colors before:absolute before:top-1/2 before:left-0 before:h-[1em] before:w-px before:-translate-y-1/2 before:rounded-full before:bg-transparent hover:text-foreground data-active:text-foreground data-active:before:bg-foreground"
    : "relative -ml-2 block w-[calc(100%+0.5rem)] rounded-md py-2 pr-2 pl-2 text-sm capitalize text-foreground/65 transition-colors hover:text-foreground data-active:text-foreground";
  const linkContentClass = mobile
    ? undefined
    : "block transition-transform duration-150 ease-out group-hover:translate-x-1 group-data-active:translate-x-1";
  const sectionLabelClass = mobile
    ? "flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground"
    : "flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground";

  const getIndicatorTop = useCallback((key: string) => {
    const navElement = navRef.current;
    const linkElement = linkRefs.current.get(key);

    if (!navElement || !linkElement) {
      return null;
    }

    const navRect = navElement.getBoundingClientRect();
    const linkRect = linkElement.getBoundingClientRect();

    return linkRect.top - navRect.top + (linkRect.height - indicatorHeight) / 2;
  }, []);

  useLayoutEffect(() => {
    if (mobile) {
      setIndicatorTop(null);
      return;
    }

    const updateIndicators = () => {
      setIndicatorTop(getIndicatorTop(activeKey));
    };

    updateIndicators();
    window.addEventListener("resize", updateIndicators);

    return () => {
      window.removeEventListener("resize", updateIndicators);
    };
  }, [activeKey, getIndicatorTop, mobile]);

  function renderNavLink({
    children,
    component = activeSlug,
    hash,
    itemKey,
    isActive = false,
  }: {
    children: React.ReactNode;
    component?: ComponentSlug;
    hash?: string;
    itemKey: string;
    isActive?: boolean;
  }) {
    const link = (
      <Link
        className={`${linkClass} group`}
        data-active={isActive ? true : undefined}
        hash={hash}
        params={{ component }}
        ref={(node) => {
          if (!node) {
            linkRefs.current.delete(itemKey);
            return;
          }

          linkRefs.current.set(itemKey, node);
        }}
        onClick={() => {
          if (mobile) {
            return;
          }

          setIndicatorTop(getIndicatorTop(itemKey));
        }}
        to="/ui/$component"
      >
        <span className={linkContentClass}>{children}</span>
      </Link>
    );

    if (mobile) {
      return <DrawerClose asChild>{link}</DrawerClose>;
    }

    return link;
  }

  return (
    <nav
      ref={navRef}
      className={
        mobile
          ? "flex h-full min-h-0 flex-col overflow-y-auto px-3 pt-5 pb-10"
          : "relative w-full pr-2 pl-5"
      }
    >
      {!mobile && indicatorTop !== null ? (
        <div
          aria-hidden
          className="absolute left-3 w-px rounded-full bg-foreground transition-transform duration-200 ease-out"
          style={{
            height: indicatorHeight,
            transform: `translateY(${indicatorTop}px)`,
          }}
        />
      ) : null}
      <div className={mobile ? "space-y-6" : "space-y-7"}>
        <div className="space-y-2">
          <p className={sectionLabelClass}>
            <HugeiconsIcon
              aria-hidden
              icon={BookOpen01Icon}
              size={14}
              strokeWidth={2}
            />
            Get Started
          </p>
          <div>
            {renderNavLink({
              hash: "installation",
              children: "Installation",
              itemKey: "installation",
              isActive: activeKey === "installation",
            })}
            {renderNavLink({
              hash: "cli",
              children: "CLI",
              itemKey: "cli",
              isActive: activeKey === "cli",
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className={sectionLabelClass}>
            <HugeiconsIcon
              aria-hidden
              icon={Layers01Icon}
              size={14}
              strokeWidth={2}
            />
            Components
          </p>
          <div>
            {componentItems.map((item) => (
              <Fragment key={item.slug}>
                {renderNavLink({
                  children: item.label,
                  component: item.slug,
                  itemKey: item.slug,
                  isActive: activeKey === item.slug,
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
