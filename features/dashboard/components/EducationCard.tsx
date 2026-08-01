"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicEducationResources } from "@/services/education.service";
import { EducationResource, EducationCardProps } from "@/types";
import { extractYouTubeThumbnail } from "@/features/admin/components/EducationManagement";
import { BookOpen, Video, FileText } from "lucide-react";

export default function EducationCard(props: EducationCardProps) {
  const [latestResource, setLatestResource] = useState<EducationResource | null>(null);

  useEffect(() => {
    async function loadLatest() {
      try {
        const res = await getPublicEducationResources();
        if (res.success && res.data && res.data.length > 0) {
          setLatestResource(res.data[0]);
        }
      } catch (err) {
        console.error("Gagal mengambil materi edukasi untuk dashboard:", err);
      }
    }
    loadLatest();
  }, []);

  const displayCategory = props.category || latestResource?.category || "Edukasi Gigi";
  const displayTitle = props.title || latestResource?.title || "Making brushing fun for toddlers";
  const displayDescription =
    props.description ||
    latestResource?.description ||
    "Discover 5 proven techniques to turn the bedtime battle into a game your kids will love...";

  let displayImage = props.image;
  if (!displayImage && latestResource) {
    if (latestResource.imageUrl && latestResource.imageUrl.trim() !== "") {
      displayImage = latestResource.imageUrl;
    } else if (latestResource.type === "VIDEO") {
      displayImage = extractYouTubeThumbnail(latestResource.sourceUrl) || undefined;
    }
  }

  if (!displayImage) {
    displayImage =
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7MtUy4lC6DzgwxXNOGw3dUmNJxqN82EfDNIYrSJqbPXNq9XX5VWERjXQTOmf4E3n3N7nr70KOxnhfxx5e6Ktr_uiqU5YU2VP8fMscgRy9FnRATEfmHPdGp36uowIckDODwTtjHzsBG8ZB_PcIP6qLNysc2Vsu6wRwzAv8-gfWgMgRBgq2ynaB_ue4uNAw0SJnEguohPQf3EWQz65i32Kn4a9tlrRghQLfTz4WbPY7NIKR0dnFNwIMbQ";
  }

  const displayReadTime = props.readTime || latestResource?.readTime || "3 min read";
  const displayType = props.type || latestResource?.type || "VIDEO";
  const href = props.href || "/education";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <BookOpen size={16} className="text-emerald-600" />
          Materi Edukasi
        </h3>
        <Link href="/education" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
          Lihat Semua &rarr;
        </Link>
      </div>

      <Link
        href={href}
        className="block overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-xs transition-all hover:shadow-md active:scale-[0.98]"
      >
        <div className="relative h-44 w-full bg-slate-100">
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            className="object-cover"
            unoptimized
          />

          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
            {displayCategory}
          </span>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
            {displayTitle}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {displayDescription}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
            {displayType === "VIDEO" ? (
              <span className="font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Video size={12} /> Video
              </span>
            ) : (
              <span className="font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <FileText size={12} /> PDF / Document
              </span>
            )}
            <span>{displayReadTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
