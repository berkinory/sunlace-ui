# Calendar

> Part of [Sunlace UI](https://sunlace.dev) — a minimal, modern React component library.

A date picker for single dates and ranges.

## Installation

### CLI

```bash
npx shadcn@latest add https://sunlace.dev/r/calendar.json
```

**Dependencies:** `@hugeicons/core-free-icons`, `@hugeicons/react`, `react-day-picker`

**Sunlace Dependencies:** [`button`](https://sunlace.dev/ui/button), [`select`](https://sunlace.dev/ui/select)

### Manual

```bash
npm install @hugeicons/core-free-icons @hugeicons/react react-day-picker clsx tailwind-merge
```

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `components/ui/calendar.tsx`:

```tsx
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type MonthCaptionProps,
  useDayPicker,
} from "react-day-picker";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  easyNavigation = false,
  locale,
  formatters,
  components,
  startMonth,
  endMonth,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  easyNavigation?: boolean;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar rounded-xl border border-border bg-card bg-clip-padding p-3 text-card-foreground shadow-[0_1px_1px_rgb(0_0_0/0.06),0_3px_8px_rgb(0_0_0/0.05),inset_0_1px_rgb(255_255_255/0.18)] [--cell-radius:var(--radius-md)] [--cell-size:calc(var(--spacing)*8)] dark:shadow-[0_1px_1px_rgb(0_0_0/0.32),0_4px_12px_rgb(0_0_0/0.22),inset_0_1px_rgb(255_255_255/0.08)] in-data-[slot=card-content]:border-0 in-data-[slot=card-content]:bg-transparent in-data-[slot=card-content]:shadow-none in-data-[slot=popover-content]:border-0 in-data-[slot=popover-content]:bg-transparent in-data-[slot=popover-content]:shadow-none",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={easyNavigation ? "label" : captionLayout}
      startMonth={
        easyNavigation && !startMonth
          ? new Date(new Date().getFullYear() - 100, 0)
          : startMonth
      }
      endMonth={
        easyNavigation && !endMonth
          ? new Date(new Date().getFullYear() + 10, 11)
          : endMonth
      }
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) rounded-(--cell-radius) p-0 text-muted-foreground select-none hover:text-foreground aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) rounded-(--cell-radius) p-0 text-muted-foreground select-none hover:text-foreground aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius) border border-input bg-background/60 px-1.5 py-1 transition-colors hover:bg-muted/60",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-xs [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--cell-radius) text-xs font-medium text-muted-foreground/80 select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-(--cell-radius) bg-muted/70 text-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/55 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <HugeiconsIcon
                icon={ArrowLeftIcon}
                strokeWidth={2}
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          if (orientation === "right") {
            return (
              <HugeiconsIcon
                icon={ArrowRightIcon}
                strokeWidth={2}
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <HugeiconsIcon
              icon={ArrowDownIcon}
              strokeWidth={2}
              className={cn("size-4", className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        ...(easyNavigation
          ? { MonthCaption: CalendarMonthCaption }
          : undefined),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarMonthCaption({ calendarMonth }: MonthCaptionProps) {
  const { dayPickerProps, formatters, goToMonth } = useDayPicker();
  const month = calendarMonth.date.getMonth();
  const year = calendarMonth.date.getFullYear();
  const firstYear = dayPickerProps.startMonth?.getFullYear() ?? year - 100;
  const lastYear = dayPickerProps.endMonth?.getFullYear() ?? year + 10;
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => firstYear + index
  );

  return (
    <div
      className="relative z-20 flex h-(--cell-size) items-center justify-center gap-1.5 px-(--cell-size)"
      onClick={(event) => {
        event.stopPropagation();
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
    >
      <Select
        modal={false}
        onValueChange={(nextMonth) => {
          if (nextMonth) goToMonth(new Date(year, Number(nextMonth), 1));
        }}
        value={String(month)}
      >
        <SelectTrigger
          aria-label="Choose the Month"
          className="h-7 min-w-20 px-2"
        >
          <SelectValue>
            {formatters.formatMonthDropdown(calendarMonth.date)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {Array.from({ length: 12 }, (_, monthIndex) => {
            const date = new Date(year, monthIndex, 1);

            return (
              <SelectItem key={monthIndex} value={String(monthIndex)}>
                {formatters.formatMonthDropdown(date)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select
        modal={false}
        onValueChange={(nextYear) => {
          if (nextYear) goToMonth(new Date(Number(nextYear), month, 1));
        }}
        value={String(year)}
      >
        <SelectTrigger
          aria-label="Choose the Year"
          className="h-7 min-w-20 px-2"
        >
          <SelectValue>{year}</SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {years.map((yearOption) => (
            <SelectItem key={yearOption} value={String(yearOption)}>
              {yearOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal transition-[background-color,color,transform] duration-150 ease-out active:scale-95 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:hover:!bg-primary data-[range-end=true]:hover:!text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-middle=true]:hover:!bg-muted data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:hover:!bg-primary data-[range-start=true]:hover:!text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:hover:!bg-primary data-[selected-single=true]:hover:!text-primary-foreground motion-reduce:transition-none [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
```

## Usage

```tsx
import { Calendar } from "@/components/ui/calendar";
```

```tsx
<Calendar mode="single" selected={date} onSelect={setDate} />
```

## Examples

### Booked dates

```tsx
import { Calendar } from "@/components/ui/calendar";

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
}
```

## Props

### Calendar

| Prop              | Type             | Default    | Description                                             |
| ----------------- | ---------------- | ---------- | ------------------------------------------------------- | --- | ------------------------------------ |
| `mode`            | `"single"        | "multiple" | "range"`                                                | `-` | Sets the date selection behavior.    |
| `selected`        | `Date            | Date[]     | DateRange`                                              | `-` | Controls the selected date or dates. |
| `showOutsideDays` | `boolean`        | `true`     | Shows days from adjacent months.                        |
| `easyNavigation`  | `boolean`        | `false`    | Uses Sunlace selects for direct month and year changes. |
| `buttonVariant`   | `Button variant` | `"ghost"`  | Sets the previous and next button style.                |

---

Also supports Base UI primitive props. See [Base UI Calendar](https://daypicker.dev/).

---

[Sunlace UI](https://sunlace.dev) · [View on web](https://sunlace.dev/ui/calendar)
