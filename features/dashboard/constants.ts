import { ClipboardCheck, GraduationCap } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { WeeklyProgressItem } from "./types";

export const WEEK_DAYS: WeeklyProgressItem[] = [
  { label: "M", status: "done" },
  { label: "T", status: "done" },
  { label: "W", status: "done" },
  { label: "T", status: "done" },
  { label: "F", status: "today" },
  { label: "S", status: "upcoming" },
  { label: "S", status: "upcoming" },
];

export interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  background: string;
  iconBackground: string;
  textColor: string;
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: "Education",
    description: "Learn dental fun facts",
    href: "/education",
    icon: GraduationCap,
    background: "bg-tertiary-50",
    iconBackground: "bg-tertiary-500",
    textColor: "text-tertiary-700",
  },
  {
    title: "Checklist",
    description: "Daily hygiene tasks",
    href: "/checklist",
    icon: ClipboardCheck,
    background: "bg-secondary-50",
    iconBackground: "bg-secondary-500",
    textColor: "text-secondary-700",
  },
];