import { Calendar } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  return <Calendar />;
}`;

export const calendarDocs: ComponentDocDefinition = {
  description: "A date picker surface for selecting days and date ranges.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Calendar } from "@/components/ui/calendar";`,
  renderPreview: () => <Calendar />,
  usageCode: `<Calendar />`,
};
