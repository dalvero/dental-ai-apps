export type DayStatus = "done" | "today" | "upcoming";

export interface WeeklyProgressItem {
  label: string;
  status: DayStatus;
}