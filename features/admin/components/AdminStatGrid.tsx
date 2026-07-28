"use client";

import { Users, Baby, ScanLine, Clock, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminStatGrid() {
  const stats = [
    {
      title: "Total User Parent",
      value: "142",
      change: "+12.5%",
      isPositive: true,
      subtext: "Terdaftar di sistem",
      icon: Users,
      cardBorder: "border-blue-100 hover:border-blue-300",
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      title: "Total Profil Anak",
      value: "185",
      change: "+18.2%",
      isPositive: true,
      subtext: "Dipantau oleh parent",
      icon: Baby,
      cardBorder: "border-emerald-100 hover:border-emerald-300",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      title: "Deteksi AI Selesai",
      value: "520",
      change: "+24.0%",
      isPositive: true,
      subtext: "Scan 4 sudut gigi",
      icon: ScanLine,
      cardBorder: "border-purple-100 hover:border-purple-300",
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    },
    {
      title: "Checklist Pending",
      value: "3",
      change: "Butuh Tindakan",
      isPositive: false,
      subtext: "Laporan harian gigi",
      icon: Clock,
      cardBorder: "border-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
    },
  ];

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
              <span
                className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {stat.isPositive ? (
                  <TrendingUp size={12} />
                ) : (
                  <AlertCircle size={12} />
                )}
                {stat.change}
              </span>
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
