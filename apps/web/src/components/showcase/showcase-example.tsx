import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Tabs, TabsList, TabsTrigger } from "@sunlace/ui";
import { useEffect, useState } from "react";

type ShowcaseExampleProps = {
  code: string;
  preview: React.ReactNode;
  controls?: React.ReactNode;
  resetKey: string;
};

const tokenClassByType = {
  keyword: "text-rose-600 dark:text-rose-400",
  component: "text-sky-700 dark:text-sky-400",
  string: "text-emerald-700 dark:text-blue-300",
  punctuation: "text-foreground/55 dark:text-foreground/70",
  prop: "text-violet-700 dark:text-violet-300",
};

function highlightLine(line: string) {
  const tokens =
    line.match(
      /("[^"]*"|'[^']*'|`[^`]*`|\b(?:import|from|export|function|return|const|let|type)\b|<\/?[A-Z][A-Za-z0-9.]*|[A-Za-z-]+(?==)|[{}()[\],=<>/])/g
    ) ?? [];

  if (tokens.length === 0) {
    return line;
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  tokens.forEach((token) => {
    const start = line.indexOf(token, cursor);

    if (start === -1) {
      return;
    }

    if (start > cursor) {
      parts.push(line.slice(cursor, start));
    }

    const type =
      token.startsWith('"') || token.startsWith("'")
        ? "string"
        : /^(import|from|export|function|return|const|let|type)$/.test(token)
          ? "keyword"
          : /^<\/?[A-Z]/.test(token)
            ? "component"
            : /^[A-Za-z-]+$/.test(token)
              ? "prop"
              : "punctuation";

    parts.push(
      <span className={tokenClassByType[type]} key={start}>
        {token}
      </span>
    );
    cursor = start + token.length;
  });

  if (cursor < line.length) {
    parts.push(line.slice(cursor));
  }

  return parts;
}

export function CodeBlock({
  code,
  collapsed = false,
  expanded = true,
}: {
  code: string;
  collapsed?: boolean;
  expanded?: boolean;
}) {
  const lines = code.trim().split("\n");

  return (
    <div
      className={
        expanded && !collapsed
          ? "max-h-[16rem] overflow-auto transition-[max-height] duration-250 ease-[cubic-bezier(0.32,0.72,0,1)]"
          : "pointer-events-none h-[5.625rem] overflow-hidden transition-[height,max-height] duration-250 ease-[cubic-bezier(0.32,0.72,0,1)]"
      }
    >
      <pre
        className={
          expanded && !collapsed
            ? "min-w-max px-4 py-3 font-mono text-sm leading-6"
            : "min-w-max select-none px-4 py-3 font-mono text-sm leading-6 [mask-image:linear-gradient(to_bottom,black_0%,black_68%,rgb(0_0_0/.72)_100%)]"
        }
      >
        <code>
          {lines.map((line, index) => (
            <span className="grid grid-cols-[2rem_1fr]" key={index}>
              <span className="select-none text-right text-foreground/35">
                {index + 1}
              </span>
              <span className="pl-5 text-foreground/85">
                {highlightLine(line)}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function ShowcaseExample({
  code,
  controls,
  preview,
  resetKey,
}: ShowcaseExampleProps) {
  const [expanded, setExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState("preview");

  useEffect(() => {
    setExpanded(false);
    setMobileTab("preview");
  }, [resetKey]);

  return (
    <div>
      {controls ? (
        <Tabs
          className="mb-3 md:hidden"
          onValueChange={setMobileTab}
          value={mobileTab}
        >
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      ) : null}
      <div className="overflow-hidden rounded-lg border border-border bg-card/20">
        <div
          className={
            controls
              ? "grid h-[300px] grid-cols-1 md:grid-cols-[minmax(0,1fr)_200px]"
              : "flex h-[300px] items-center justify-center overflow-auto p-8"
          }
        >
          {controls && mobileTab === "settings" ? (
            <div className="showcase-scrollbar h-[300px] overflow-y-auto bg-muted/25 p-4 md:hidden">
              {controls}
            </div>
          ) : controls ? (
            <div className="showcase-scrollbar flex h-[300px] items-center justify-center overflow-auto p-8 md:hidden">
              {preview}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8">
              {preview}
            </div>
          )}
          {controls ? (
            <div className="showcase-scrollbar hidden h-[300px] items-center justify-center overflow-auto p-8 md:flex">
              {preview}
            </div>
          ) : null}
          {controls ? (
            <aside className="showcase-scrollbar hidden h-[300px] overflow-y-auto border-border border-l bg-muted/25 p-4 md:block">
              {controls}
            </aside>
          ) : null}
        </div>

        <div className="relative border-t border-border bg-muted/25">
          <CodeBlock code={code} expanded={expanded} />

          {!expanded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/32 backdrop-blur-[1px] dark:bg-muted/18">
              <Button
                className="relative z-10"
                onClick={() => {
                  setExpanded(true);
                }}
              >
                View Code
              </Button>
            </div>
          ) : (
            <Button
              className="absolute top-4 right-4 size-8 bg-muted/80"
              onClick={() => {
                void navigator.clipboard.writeText(code);
              }}
              size="icon"
              variant="ghost"
            >
              <span className="sr-only">Copy Code</span>
              <HugeiconsIcon icon={Copy01Icon} size={16} strokeWidth={2} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
