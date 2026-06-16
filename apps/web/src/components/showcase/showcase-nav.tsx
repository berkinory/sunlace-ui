import { BookOpen01Icon, Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DrawerClose } from "@sunlace/ui/components";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

import { componentItems, type ComponentSlug } from "./component-registry";

type ShowcaseNavProps = {
  activeSlug: ComponentSlug;
  mobile?: boolean;
};

export function ShowcaseNav({ activeSlug, mobile = false }: ShowcaseNavProps) {
  const linkClass = mobile
    ? "block rounded-md px-2 py-1.5 text-sm capitalize text-foreground/90 transition-colors hover:bg-muted hover:text-foreground data-active:bg-muted data-active:font-medium data-active:text-foreground"
    : "-ml-2 block w-[calc(100%+0.5rem)] rounded-md px-2 py-1.5 text-sm capitalize text-foreground/90 transition-colors hover:bg-muted hover:text-foreground data-active:bg-muted data-active:font-medium data-active:text-foreground";
  const sectionLabelClass = mobile
    ? "flex items-center gap-2 px-2 text-xs font-medium tracking-wide text-muted-foreground"
    : "flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground";

  function renderNavLink({
    children,
    component = activeSlug,
    hash,
    isActive = false,
  }: {
    children: React.ReactNode;
    component?: ComponentSlug;
    hash?: string;
    isActive?: boolean;
  }) {
    const link = (
      <Link
        className={linkClass}
        data-active={isActive ? true : undefined}
        hash={hash}
        params={{ component }}
        to="/ui/$component"
      >
        {children}
      </Link>
    );

    if (mobile) {
      return <DrawerClose asChild>{link}</DrawerClose>;
    }

    return link;
  }

  return (
    <nav
      className={
        mobile
          ? "flex h-full min-h-0 flex-col overflow-y-auto px-3 pt-5 pb-10"
          : "w-full pr-2 pl-5"
      }
    >
      <div className={mobile ? "space-y-6" : "space-y-10"}>
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
          <div className="space-y-1">
            {renderNavLink({ hash: "installation", children: "Installation" })}
            {renderNavLink({ hash: "cli", children: "CLI" })}
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
          <div className="space-y-1">
            {componentItems.map((item) => (
              <Fragment key={item.slug}>
                {renderNavLink({
                  children: item.label,
                  component: item.slug,
                  isActive: item.slug === activeSlug,
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
