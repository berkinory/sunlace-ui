import { Calendar } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

type DateRange = {
  from: Date | undefined;
  to?: Date;
};

const defaultDate = new Date(2026, 5, 18);
const defaultRange = {
  from: new Date(2026, 5, 16),
  to: new Date(2026, 5, 20),
};

function getShowcaseCode(settings?: ComponentSettings) {
  const calendar = settings?.calendar;
  const range = calendar?.mode === "range";

  return `import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  ${
    range
      ? `const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 16),
    to: new Date(2026, 5, 20),
  });`
      : `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 5, 18)
  );`
  }

  return (
    <Calendar
      easyNavigation={${calendar?.easyNavigation ?? false}}
      mode="${range ? "range" : "single"}"
      ${range ? "onSelect={setRange}" : "onSelect={setDate}"}
      selected={${range ? "range" : "date"}}
      showOutsideDays={${calendar?.showOutsideDays ?? true}}
    />
  );
}`;
}

const bookedDatesCode = `import { Calendar } from "@/components/ui/calendar";

const bookedDates = [
  new Date(2026, 5, 9),
  new Date(2026, 5, 10),
  new Date(2026, 5, 24),
];

export function AvailabilityCalendar() {
  return (
    <Calendar
      defaultMonth={new Date(2026, 5)}
      disabled={bookedDates}
      mode="single"
      modifiers={{ booked: bookedDates }}
      modifiersClassNames={{
        booked: "line-through opacity-45",
      }}
      showOutsideDays={false}
    />
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const calendar = settings?.calendar;

  return calendar?.mode === "range" ? (
    <RangeCalendar settings={settings} />
  ) : (
    <SingleCalendar settings={settings} />
  );
}

function SingleCalendar({ settings }: { settings?: ComponentSettings }) {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const calendar = settings?.calendar;

  return (
    <Calendar
      defaultMonth={defaultDate}
      easyNavigation={calendar?.easyNavigation}
      mode="single"
      onSelect={setDate}
      selected={date}
      showOutsideDays={calendar?.showOutsideDays}
    />
  );
}

function RangeCalendar({ settings }: { settings?: ComponentSettings }) {
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);
  const calendar = settings?.calendar;

  return (
    <Calendar
      defaultMonth={defaultDate}
      easyNavigation={calendar?.easyNavigation}
      mode="range"
      onSelect={setRange}
      selected={range}
      showOutsideDays={calendar?.showOutsideDays}
    />
  );
}

function AvailabilityExample() {
  const bookedDates = [
    new Date(2026, 5, 9),
    new Date(2026, 5, 10),
    new Date(2026, 5, 24),
  ];

  return (
    <Calendar
      defaultMonth={defaultDate}
      disabled={bookedDates}
      mode="single"
      modifiers={{ booked: bookedDates }}
      modifiersClassNames={{
        booked: "line-through opacity-45",
      }}
      showOutsideDays={false}
    />
  );
}

export const calendarDocs: ComponentDocDefinition = {
  description: "A date picker for single dates and ranges.",
  examples: [
    {
      code: bookedDatesCode,
      preview: <AvailabilityExample />,
      resetKey: "calendar-availability-example",
      title: "Booked dates",
    },
  ],
  getShowcaseCode,
  importCode: `import { Calendar } from "@/components/ui/calendar";`,
  primitiveDocsUrl: "https://daypicker.dev/",
  props: [
    {
      title: "Calendar",
      props: [
        {
          name: "mode",
          type: '"single" | "multiple" | "range"',
          defaultValue: "-",
          description: "Sets the date selection behavior.",
        },
        {
          name: "selected",
          type: "Date | Date[] | DateRange",
          defaultValue: "-",
          description: "Controls the selected date or dates.",
        },
        {
          name: "showOutsideDays",
          type: "boolean",
          defaultValue: "true",
          description: "Shows days from adjacent months.",
        },
        {
          name: "easyNavigation",
          type: "boolean",
          defaultValue: "false",
          description:
            "Uses Sunlace selects for direct month and year changes.",
        },
        {
          name: "buttonVariant",
          type: "Button variant",
          defaultValue: '"ghost"',
          description: "Sets the previous and next button style.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
};
