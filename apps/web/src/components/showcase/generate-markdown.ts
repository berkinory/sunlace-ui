import type { ComponentDocDefinition } from "./component-docs/types";
import type { ComponentDocExample } from "./component-docs/types";
import { getInstallInfo } from "./install-info";

const utilsCode = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

export type ComponentMarkdownInput = {
  slug: string;
  title: string;
  docs: ComponentDocDefinition;
  examples: ComponentDocExample[];
  componentSource?: string;
};

export function generateComponentMarkdown({
  slug,
  title,
  docs,
  examples,
  componentSource,
}: ComponentMarkdownInput): string {
  const info = getInstallInfo(slug);
  const sections: string[] = [];

  sections.push(`# ${title}\n`);
  sections.push(
    `> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.\n`
  );
  sections.push(`${docs.description}\n`);

  sections.push(`## Installation\n`);
  if (info) {
    sections.push("### CLI\n");
    sections.push("```bash");
    sections.push(info.cliCommands.npm);
    sections.push("```\n");

    if (info.npmDeps.length > 0) {
      sections.push(
        `**Dependencies:** ${info.npmDeps.map((d) => `\`${d}\``).join(", ")}\n`
      );
    }

    if (info.sunlaceDeps.length > 0) {
      const depLinks = info.sunlaceDeps
        .map((d) => `[\`${d}\`](https://sunlace.dev/ui/${d})`)
        .join(", ");
      sections.push(`**Sunlace Dependencies:** ${depLinks}\n`);
    }

    sections.push("### Manual\n");
    const manualDeps = info.hasUtils
      ? [...info.npmDeps, "clsx", "tailwind-merge"]
      : info.npmDeps;

    if (manualDeps.length > 0) {
      sections.push("```bash");
      sections.push(`npm install ${manualDeps.join(" ")}`);
      sections.push("```\n");
    }

    if (info.hasUtils) {
      sections.push("Create `lib/utils.ts`:\n");
      sections.push("```ts");
      sections.push(utilsCode);
      sections.push("```\n");
    }

    sections.push(`Create \`components/ui/${slug}.tsx\`:\n`);
    sections.push("```tsx");
    sections.push(componentSource ?? "Source not found.");
    sections.push("```\n");
  }

  sections.push(`## Usage\n`);
  sections.push("```tsx");
  sections.push(docs.importCode);
  sections.push("```\n");
  sections.push("```tsx");
  sections.push(docs.usageCode);
  sections.push("```\n");

  sections.push(`## Examples\n`);
  for (const example of examples) {
    sections.push(`### ${example.title}\n`);
    sections.push("```tsx");
    sections.push(example.code);
    sections.push("```\n");
  }

  sections.push(`## Props\n`);
  if (docs.props?.length) {
    for (const group of docs.props) {
      sections.push(`### ${group.title}\n`);
      sections.push("| Prop | Type | Default | Description |");
      sections.push("| --- | --- | --- | --- |");
      for (const prop of group.props) {
        sections.push(
          `| \`${prop.name}\` | \`${prop.type}\` | \`${prop.defaultValue}\` | ${prop.description} |`
        );
      }
      sections.push("");
    }
  } else {
    sections.push("No custom props documented yet.\n");
  }

  if (docs.primitiveDocsUrl) {
    const name = docs.primitiveName ?? "Base UI";
    sections.push(
      `---\nAlso supports ${name} primitive props. See [${name} ${title}](${docs.primitiveDocsUrl}).\n`
    );
  }

  sections.push(
    `---\n[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/${slug})`
  );

  return sections.join("\n");
}
