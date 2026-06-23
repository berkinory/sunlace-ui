import type { ComponentDocDefinition } from "./component-docs/types";
import type { ComponentDocExample } from "./component-docs/types";
import { getInstallInfo } from "./install-info";

export function generateComponentMarkdown({
  slug,
  title,
  docs,
  examples,
}: {
  slug: string;
  title: string;
  docs: ComponentDocDefinition;
  examples: ComponentDocExample[];
}): string {
  const info = getInstallInfo(slug);
  const sections: string[] = [];

  sections.push(`# ${title}\n`);
  sections.push(
    `> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.\n`
  );
  sections.push(`${docs.description}\n`);

  sections.push(`## Installation\n`);
  if (info) {
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
