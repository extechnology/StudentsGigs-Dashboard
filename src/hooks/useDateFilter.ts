import { useState, useCallback, useMemo } from "react";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
  parseISO,
} from "date-fns";

export type DatePreset = "all" | "today" | "this_week" | "this_month" | "this_year" | "custom";

export interface DateFilter {
  preset: DatePreset;
  from: Date | undefined;
  to: Date | undefined;
}

export function useDateFilter() {
  const [filter, setFilter] = useState<DateFilter>({
    preset: "all",
    from: undefined,
    to: undefined,
  });

  const dateRange = useMemo(() => {
    const now = new Date();
    switch (filter.preset) {
      case "today":
        return { from: startOfDay(now), to: endOfDay(now) };
      case "this_week":
        return { from: startOfWeek(now, { weekStartsOn: 1 }), to: endOfWeek(now, { weekStartsOn: 1 }) };
      case "this_month":
        return { from: startOfMonth(now), to: endOfMonth(now) };
      case "this_year":
        return { from: startOfYear(now), to: endOfYear(now) };
      case "custom":
        return { from: filter.from, to: filter.to };
      case "all":
      default:
        return { from: undefined, to: undefined };
    }
  }, [filter]);

  const setPreset = useCallback((preset: DatePreset) => {
    setFilter({ preset, from: undefined, to: undefined });
  }, []);

  const setCustomRange = useCallback((from: Date | undefined, to: Date | undefined) => {
    setFilter({ preset: "custom", from, to });
  }, []);

  const filterByDate = useCallback(
    <T>(items: T[], dateKey: keyof T): T[] => {
      if (!dateRange.from && !dateRange.to) return items;
      return items.filter((item) => {
        const dateValue = item[dateKey];
        if (typeof dateValue !== "string") return true;
        try {
          const date = parseISO(dateValue as string);
          if (dateRange.from && dateRange.to) {
            return isWithinInterval(date, { start: dateRange.from, end: dateRange.to });
          }
          if (dateRange.from) return date >= dateRange.from;
          if (dateRange.to) return date <= dateRange.to;
          return true;
        } catch {
          return true;
        }
      });
    },
    [dateRange]
  );

  return { filter, dateRange, setPreset, setCustomRange, filterByDate };
}
