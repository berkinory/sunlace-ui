import { CheckmarkCircle01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ActionSwapIcon,
  ActionSwapText,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sunlace/ui";
import { useState } from "react";

import { getInstallInfo } from "./install-info";
import { highlightLine } from "./showcase-example";

type Installer = "bun" | "npm" | "pnpm";

const installers: Installer[] = ["npm", "pnpm", "bun"];

const componentSources = import.meta.glob(
  "../../../../../packages/ui/src/components/*.tsx",
  { query: "?raw", eager: true, import: "default" }
) as Record<string, string>;

const utilsCode = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

function getComponentSource(slug: string): string | undefined {
  const key = Object.keys(componentSources).find((k) =>
    k.endsWith(`/${slug}.tsx`)
  );
  return key ? componentSources[key] : undefined;
}

const shellTokenClasses = {
  command: "text-rose-600 dark:text-rose-400",
  subcommand: "text-sky-700 dark:text-sky-400",
  package: "text-emerald-700 dark:text-blue-300",
  flag: "text-violet-700 dark:text-violet-300",
  punctuation: "text-foreground/55 dark:text-foreground/70",
};

const shellCommandWords = new Set(["npx", "npm", "pnpm", "bun", "bunx"]);
const shellSubcommandWords = new Set([
  "install",
  "add",
  "dlx",
  "i",
  "run",
  "create",
]);

function highlightShellLine(line: string) {
  const tokens =
    line.match(
      /\b(?:npx|npm|pnpm|bun|bunx)\b|\b(?:install|add|dlx|i|run|create)\b|--[\w-]+|https?:\/\/[^\s]+|@[A-Za-z0-9._/-]+|[A-Za-z][A-Za-z0-9._-]*/g
    ) ?? [];

  if (tokens.length === 0) return line;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let seenSubcommand = false;

  tokens.forEach((token) => {
    const start = line.indexOf(token, cursor);
    if (start === -1) return;
    if (start > cursor) parts.push(line.slice(cursor, start));

    let type: keyof typeof shellTokenClasses;
    if (shellCommandWords.has(token)) {
      type = "command";
    } else if (shellSubcommandWords.has(token)) {
      type = "subcommand";
      seenSubcommand = true;
    } else if (token.startsWith("http")) {
      type = "package";
    } else if (token.startsWith("--")) {
      type = "flag";
    } else {
      type = seenSubcommand ? "package" : "punctuation";
    }

    parts.push(
      <span className={shellTokenClasses[type]} key={start}>
        {token}
      </span>
    );
    cursor = start + token.length;
  });

  if (cursor < line.length) parts.push(line.slice(cursor));
  return parts;
}

export function InstallationSection({ slug }: { slug: string }) {
  const info = getInstallInfo(slug);
  const [activeTab, setActiveTab] = useState("cli");
  const [installer, setInstaller] = useState<Installer>("npm");

  if (!info) {
    return (
      <p className="text-sm text-muted-foreground">
        Installation info not found.
      </p>
    );
  }

  return (
    <Tabs onValueChange={setActiveTab} value={activeTab}>
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      {activeTab === "cli" ? (
        <CliTab
          info={info}
          installer={installer}
          onInstallerChange={setInstaller}
        />
      ) : (
        <ManualTab
          info={info}
          installer={installer}
          onInstallerChange={setInstaller}
          slug={slug}
        />
      )}
    </Tabs>
  );
}

function CliTab({
  info,
  installer,
  onInstallerChange,
}: {
  info: NonNullable<ReturnType<typeof getInstallInfo>>;
  installer: Installer;
  onInstallerChange: (i: Installer) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <InstallerCommands
        commands={info.cliCommands}
        installer={installer}
        onInstallerChange={onInstallerChange}
      />

      {info.npmDeps.length > 0 ? <DepList deps={info.npmDeps} /> : null}

      {info.sunlaceDeps.length > 0 ? (
        <SunlaceDeps deps={info.sunlaceDeps} autoInstall />
      ) : null}
    </div>
  );
}

function ManualTab({
  info,
  installer,
  onInstallerChange,
  slug,
}: {
  info: NonNullable<ReturnType<typeof getInstallInfo>>;
  installer: Installer;
  onInstallerChange: (i: Installer) => void;
  slug: string;
}) {
  const source = getComponentSource(slug);
  const manualDeps = info.hasUtils
    ? [...info.npmDeps, "clsx", "tailwind-merge"]
    : info.npmDeps;

  const depList = manualDeps.join(" ");

  const depCommands = {
    bun: `bun add ${depList}`,
    npm: `npm install ${depList}`,
    pnpm: `pnpm add ${depList}`,
  };

  return (
    <div className="mt-6 space-y-8">
      {manualDeps.length > 0 ? (
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Install dependencies
          </p>
          <InstallerCommands
            commands={depCommands}
            installer={installer}
            onInstallerChange={onInstallerChange}
          />
        </div>
      ) : null}

      {info.hasUtils ? (
        <CodeCopyBlock
          code={utilsCode}
          fileName="utils.ts"
          path="lib/utils.ts"
        />
      ) : null}

      <CodeCopyBlock
        code={source ?? ""}
        fileName={`${slug}.tsx`}
        path={`components/ui/${slug}.tsx`}
      />

      {info.sunlaceDeps.length > 0 ? (
        <SunlaceDeps deps={info.sunlaceDeps} />
      ) : null}
    </div>
  );
}

function InstallerCommands({
  commands,
  installer,
  onInstallerChange,
}: {
  commands: { bun: string; npm: string; pnpm: string };
  installer: Installer;
  onInstallerChange: (i: Installer) => void;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    void navigator.clipboard.writeText(commands[installer]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
      <div className="flex items-center justify-between border-b border-border px-2 py-1.5">
        <Tabs
          onValueChange={(v) => onInstallerChange(v as Installer)}
          value={installer}
        >
          <TabsList>
            {installers.map((inst) => (
              <TabsTrigger key={inst} value={inst}>
                {inst}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <CopyButton copied={copied} onCopy={copy} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-foreground/85">
        <code>{highlightShellLine(commands[installer])}</code>
      </pre>
    </div>
  );
}

function CodeCopyBlock({
  code,
  fileName,
  path,
}: {
  code: string;
  fileName: string;
  path: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lines = code.trim().split("\n");

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">
        Create <code className="font-mono text-xs">{path}</code>
      </p>
      <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {fileName}
          </span>
          <CopyButton copied={copied} onCopy={copy} />
        </div>
        <div className="showcase-scrollbar max-h-[24rem] overflow-auto">
          <pre className="min-w-max px-4 py-3 font-mono text-sm leading-6">
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
      </div>
    </div>
  );
}

function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      className="flex items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      onClick={onCopy}
      type="button"
    >
      <ActionSwapIcon animation="roll" value={copied ? "copied" : "copy"}>
        <HugeiconsIcon
          icon={copied ? CheckmarkCircle01Icon : Copy01Icon}
          size={14}
          strokeWidth={2}
        />
      </ActionSwapIcon>
      <ActionSwapText animation="roll" value={copied ? "copied" : "copy"}>
        {copied ? "Copied" : "Copy"}
      </ActionSwapText>
    </button>
  );
}

function titlecase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function DepList({ deps }: { deps: string[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">Dependencies</p>
      <p className="mb-3 text-sm text-muted-foreground">
        The CLI will install these packages automatically.
      </p>
      <div className="flex flex-wrap gap-2">
        {deps.map((dep) => (
          <a
            className="rounded-md border border-border bg-muted/30 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            href={`https://www.npmjs.com/package/${dep}`}
            key={dep}
            rel="noreferrer"
            target="_blank"
          >
            {dep}
          </a>
        ))}
      </div>
    </div>
  );
}

function SunlaceDeps({
  deps,
  autoInstall = false,
}: {
  deps: string[];
  autoInstall?: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">
        Sunlace Dependencies
      </p>
      <p className="mb-2 text-sm text-muted-foreground">
        {autoInstall
          ? "These Sunlace components will also be installed automatically:"
          : "Make sure you have these components installed:"}
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {deps.map((dep) => (
          <a
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            href={`/ui/${dep}`}
            key={dep}
          >
            {titlecase(dep)}
          </a>
        ))}
      </div>
    </div>
  );
}
