import { Check, Flame, Paintbrush } from "lucide-react";

import { WEEK_DAYS } from "../constants";
import { WeeklyProgressItem } from "../types";

interface WeeklyProgressProps {
  title?: string;
  streak?: number;
  days?: WeeklyProgressItem[];
}

export default function WeeklyProgress({
  title = "Weekly Progress",
  streak = 5,
  days = WEEK_DAYS,
}: WeeklyProgressProps) {
  return (
    <section className="rounded-3xl bg-surface p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold text-text">
          {title}
        </h3>

        <div className="flex items-center gap-1.5">
          <Flame
            size={18}
            className="text-orange-400"
          />

          <span className="text-xs font-semibold text-text-secondary">
            {streak} Day Streak
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        {days.map((day, index) => (
          <DayItem
            key={index}
            day={day}
          />
        ))}
      </div>
    </section>
  );
}

interface DayItemProps {
  day: WeeklyProgressItem;
}

function DayItem({ day }: DayItemProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {day.status === "done" && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-sm">
          <Check size={16} />
        </span>
      )}

      {day.status === "today" && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-700">
          <Paintbrush size={16} />
        </span>
      )}

      {day.status === "upcoming" && (
        <span className="h-10 w-10 rounded-full border-2 border-border" />
      )}

      <span
        className={`text-xs ${
          day.status === "today"
            ? "font-bold text-primary-600"
            : "text-text-secondary"
        } ${
          day.status === "upcoming"
            ? "opacity-40"
            : ""
        }`}
      >
        {day.label}
      </span>
    </div>
  );
}