import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  category?: string;
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  readTime?: string;
  href?: string;
  authorImage?: string;
}

export default function ArticleCard({
  category = "Parenting Guide",
  title = "Making brushing fun for toddlers",
  description = "Discover 5 proven techniques to turn the bedtime battle into a game your kids will love...",
  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7MtUy4lC6DzgwxXNOGw3dUmNJxqN82EfDNIYrSJqbPXNq9XX5VWERjXQTOmf4E3n3N7nr70KOxnhfxx5e6Ktr_uiqU5YU2VP8fMscgRy9FnRATEfmHPdGp36uowIckDODwTtjHzsBG8ZB_PcIP6qLNysc2Vsu6wRwzAv8-gfWgMgRBgq2ynaB_ue4uNAw0SJnEguohPQf3EWQz65i32Kn4a9tlrRghQLfTz4WbPY7NIKR0dnFNwIMbQ",
  author = "Dr. Sarah Jenkins",
  readTime = "4 min read",
  href = "/education",
  authorImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuA07RI_Nw86HWGenf4ydwKJiZOJqCD8-h0mLFlc6bAejpoAFRWVJO_5SuuJk2soaND80fTxs78_aHm-rDm0c0hag7QIsaiBYDKiKDM-6UhQGVDoEo4wOKjp4AT10JSNMBULwIWKmOpntLtkKjwbl22XdnGviKikmp2zO7IEsFaKoH4q1e0i9lk2DJSzpQw2-JYBKlcBAImt2DzWbFlprPSeG8TOcbOUvAhpQNZr8iqv288o1kQC_ZvmHA",
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-3xl bg-surface shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      <div className="relative h-44 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />

        <span className="absolute left-3 top-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-base font-semibold text-text">
          {title}
        </h3>

        <p className="mb-4 text-sm text-text-secondary">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={authorImage}
              alt={author}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <span className="text-xs text-text-secondary">
            By {author} • {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}