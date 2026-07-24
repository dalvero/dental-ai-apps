import { Stethoscope } from "lucide-react";

interface ReminderCardProps {
  badge?: string;
  title?: string;
  buttonText?: string;
  onBookNow?: () => void;
}

export default function ReminderCard({
  badge = "Reminder",
  title = "Last visit was 6 months ago",
  buttonText = "Book Now",
  onBookNow,
}: ReminderCardProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 p-5 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.25)]">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-purple-700">
            {badge}
          </p>

          <h3 className="mb-3 text-lg font-bold text-purple-900">
            {title}
          </h3>

          <button
            onClick={onBookNow}
            className="
              rounded-full
              bg-gradient-to-r
              from-primary-500
              to-secondary-500
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              transition-transform
              active:scale-95
            "
          >
            {buttonText}
          </button>
        </div>

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/40 backdrop-blur-md">
          <Stethoscope
            size={32}
            className="text-purple-600"
          />
        </div>
      </div>
    </section>
  );
}