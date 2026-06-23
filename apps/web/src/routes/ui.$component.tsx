import { createFileRoute, redirect } from "@tanstack/react-router";

import { componentDocs } from "@/components/showcase/component-docs";
import { ComponentDocsPage } from "@/components/showcase/component-docs-page";
import {
  isComponentSlug,
  toPascalCase,
} from "@/components/showcase/component-registry";

export const Route = createFileRoute("/ui/$component")({
  beforeLoad: ({ params }) => {
    if (!isComponentSlug(params.component)) {
      throw redirect({
        to: "/ui/$component",
        params: { component: "accordion" },
      });
    }
  },
  component: UiComponentRoute,
  head: ({ params }) => {
    const slug = params.component;
    const title = toPascalCase(slug);
    const description = isComponentSlug(slug)
      ? componentDocs[slug].description
      : "";

    const url = `https://sunlace.dev/ui/${slug}`;

    return {
      meta: [
        { title: `${title} | Sunlace` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Sunlace` },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: `${title} | Sunlace`,
        },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function UiComponentRoute() {
  const { component } = Route.useParams();

  return (
    <ComponentDocsPage
      component={isComponentSlug(component) ? component : "accordion"}
    />
  );
}
