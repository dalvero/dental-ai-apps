import { CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DentalVisitCardProps {
  title?: string;
  nextVisit?: string;
  href?: string;
}

export default function DentalVisitCard({
  title = "Dental Visit",
  nextVisit = "Aug 12, 2024",
  href = "/profile",
}: DentalVisitCardProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-4
        rounded-3xl
        border
        border-primary-200
        bg-primary-50
        p-4
        shadow-sm
        transition-all
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
        <CalendarDays size={26} />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-primary-700">
          {title}
        </h3>

        <p className="text-sm text-primary-700/70">
          Next: {nextVisit}
        </p>
      </div>

      <ChevronRight
        size={20}
        className="text-primary-400"
      />
    </Link>
  );
}