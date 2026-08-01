"use client";

import { Users, Baby, GraduationCap, FileText, TrendingUp } from "lucide-react";

interface AdminStatGridProps {
  totalParents?: number;
  totalChildren?: number;
  totalEducation?: number;
  totalArticles?: number;
  isLoading?: boolean;
}

export default function AdminStatGrid({
  totalParents = 0,
  totalChildren = 0,
  totalEducation = 2,
  totalArticles = 3,
  isLoading = false,
}: AdminStatGridProps) {
  const stats = [
    {
      title: "Total User Parent",
      value: totalParents.toString(),
      subtext: "User terdaftar di sistem",
      icon: Users,
      cardBorder: "border-blue-100 hover:border-blue-300",
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      title: "Total Profil Anak",
      value: totalChildren.toString(),
      subtext: "Dipantau oleh parent",
      icon: Baby,
      cardBorder: "border-emerald-100 hover:border-emerald-300",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      title: "Total Materi Edukasi",
      value: totalEducation.toString(),
      subtext: "Sumber video & dokumen PDF",
      icon: GraduationCap,
      cardBorder: "border-purple-100 hover:border-purple-300",
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    },
    {
      title: "Total Artikel",
      value: totalArticles.toString(),
      subtext: "Artikel panduan perawatan",
      icon: FileText,
      cardBorder: "border-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs animate-pulse space-y-3"
          >
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-8 bg-slate-200 rounded w-1/3" />
            <div className="h-3 bg-slate-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl bg-white border p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${stat.cardBorder}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {stat.title}
              </span>
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <Icon size={20} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </h3>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
