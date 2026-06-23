import registryJson from "../registry.json";

type RegistryItem = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
};

const items = registryJson.items as RegistryItem[];

export type InstallInfo = {
  cliCommands: { bun: string; npm: string; pnpm: string };
  depInstallCommands: { bun: string; npm: string; pnpm: string };
  hasUtils: boolean;
  npmDeps: string[];
  registryUrl: string;
  sunlaceDeps: string[];
};

export function getInstallInfo(slug: string): InstallInfo | null {
  const item = items.find((i) => i.name === slug);
  if (!item) return null;

  const registryUrl = `https://sunlace.dev/r/${slug}.json`;
  const npmDeps = item.dependencies ?? [];
  const sunlaceDeps =
    item.registryDependencies?.filter((d) => d !== "utils") ?? [];
  const hasUtils = item.registryDependencies?.includes("utils") ?? false;

  const depList = npmDeps.join(" ");

  return {
    cliCommands: {
      bun: `bunx --bun shadcn@latest add ${registryUrl}`,
      npm: `npx shadcn@latest add ${registryUrl}`,
      pnpm: `pnpm dlx shadcn@latest add ${registryUrl}`,
    },
    depInstallCommands: {
      bun: npmDeps.length ? `bun add ${depList}` : "",
      npm: npmDeps.length ? `npm install ${depList}` : "",
      pnpm: npmDeps.length ? `pnpm add ${depList}` : "",
    },
    hasUtils,
    npmDeps,
    registryUrl,
    sunlaceDeps,
  };
}
