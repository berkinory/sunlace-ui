import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { componentItems } from "../src/components/showcase/component-catalog";
import { componentDocs } from "../src/components/showcase/component-docs";
import { generateComponentMarkdown } from "../src/components/showcase/generate-markdown";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "../public");
const llmsDir = join(publicDir, "llms");
const llmsUiDir = join(llmsDir, "ui");
const componentsDir = join(here, "../../../packages/ui/src/components");

await rm(llmsDir, { recursive: true, force: true });
await mkdir(llmsUiDir, { recursive: true });

let count = 0;

for (const item of componentItems) {
  const docs = componentDocs[item.slug];

  const examples = docs.examples ?? [
    {
      code: docs.getShowcaseCode(undefined),
      preview: null,
      resetKey: `${item.slug}-example`,
      title: `${item.label} Example`,
    },
  ];

  const componentSource = await readFile(
    join(componentsDir, `${item.slug}.tsx`),
    "utf8"
  );

  const md = generateComponentMarkdown({
    slug: item.slug,
    title: item.label,
    docs,
    examples,
    componentSource,
  });

  await writeFile(join(llmsUiDir, `${item.slug}.md`), md);
  count++;
}

const llmsTxt = [
  "# Sunlace UI",
  "",
  "> A minimal, modern React component library built on Base UI and Hugeicons.",
  "",
  "Sunlace components are installed via the shadcn CLI. Source files use",
  "canonical imports (`@/lib/utils`, `@/components/ui/*`) and are meant to be",
  "edited in place.",
  "",
  "## Components",
  "",
  ...componentItems.map(
    (item) =>
      `- [${item.label}](https://sunlace.dev/llms/ui/${item.slug}.md): ${componentDocs[item.slug].description}`
  ),
  "",
  "## Registry",
  "",
  "Each component is available as a shadcn registry item at",
  "`https://sunlace.dev/r/<slug>.json`.",
  "",
  "Install with:",
  "```bash",
  "npx shadcn@latest add https://sunlace.dev/r/<slug>.json",
  "```",
].join("\n");

await writeFile(join(publicDir, "llms.txt"), llmsTxt);

console.log(`Generated ${count} component docs + llms.txt`);
