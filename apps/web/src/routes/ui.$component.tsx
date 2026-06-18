import { createFileRoute, redirect } from "@tanstack/react-router";

import { ComponentDocsPage } from "@/components/showcase/component-docs-page";
import { isComponentSlug } from "@/components/showcase/component-registry";

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
  head: ({ params }) => ({
    meta: [{ title: `${params.component} - sunlace` }],
  }),
});

function UiComponentRoute() {
  const { component } = Route.useParams();

  return (
    <ComponentDocsPage
      component={isComponentSlug(component) ? component : "accordion"}
    />
  );
}
