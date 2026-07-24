import Link from "next/link";
import { FEATURE_ITEMS } from "../constants";

export default function FeatureGrid() {
  return (
    <section className="grid grid-cols-2 gap-4">
      {FEATURE_ITEMS.map((feature) => {
        const Icon = feature.icon;

        return (
          <Link
            key={feature.title}
            href={feature.href}
            className={`
              ${feature.background}
              rounded-3xl
              p-4
              aspect-square
              flex
              flex-col
              justify-between
              shadow-sm
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-transform
            `}
          >
            <div
              className={`
                w-12
                h-12
                rounded-2xl
                ${feature.iconBackground}
                flex
                items-center
                justify-center
                text-white
              `}
            >
              <Icon size={26} />
            </div>

            <div>
              <h3
                className={`
                  text-base
                  font-semibold
                  ${feature.textColor}
                `}
              >
                {feature.title}
              </h3>

              <p
                className={`
                  text-xs
                  mt-1
                  ${feature.textColor}
                  opacity-80
                `}
              >
                {feature.description}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}