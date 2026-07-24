import Image from "next/image";

interface HeroCardProps {
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
}

export default function HeroCard({
  badge = "NEW TECH",
  title = "AI Dental Detection",
  description = "Scan smiles to track health trends instantly.",
  image = "/illustrations/dental_ai_mascot_2.png",
}: HeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-secondary-700 p-6 text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.35)] min-h-[180px] flex items-center">
      {/* Content */}
      <div className="relative z-10 max-w-[60%] flex flex-col gap-2">
        <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide">
          {badge}
        </span>

        <h2 className="text-xl font-bold leading-tight">
          {title}
        </h2>

        <p className="text-sm text-white/90">
          {description}
        </p>
      </div>

      {/* Mascot */}
      <div className="absolute right-[-10px] bottom-[-10px] h-44 w-44 opacity-90">
        <Image
          src={image}
          alt="Dental AI Mascot"
          width={176}
          height={176}
          className="h-full w-full -rotate-12 object-contain"
          priority
        />
      </div>
    </section>
  );
}