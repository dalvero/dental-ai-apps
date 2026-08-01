"use client";

import { useState } from "react";
import {
  TrendingUp,
  Baby,
  BookOpen,
  FileText,
  Video,
  Calendar,
} from "lucide-react";

interface AdminOverviewAnalyticsProps {
  totalParents?: number;
  totalChildren?: number;
  totalEducation?: number;
  totalArticles?: number;
  articleStats?: {
    published: number;
    draft: number;
  };
  ageDemographics?: {
    balita: number;
    usiaDini: number;
    anak: number;
  };
}

export default function AdminOverviewAnalytics({
  totalParents = 0,
  totalChildren = 0,
  totalEducation = 0,
  totalArticles = 0,
  articleStats,
  ageDemographics,
}: AdminOverviewAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<"7D" | "30D">("7D");

  // Dataset grafik 7 Hari (harian) vs 30 Hari (mingguan)
  // TO-DO: Pastikan data grafik ini menggunakan waktu real-time
  const growthData7D = [
    { label: "23 Jul", parents: Math.max(0, totalParents - 2), children: Math.max(0, totalChildren - 2) },
    { label: "24 Jul", parents: Math.max(0, totalParents - 2), children: Math.max(0, totalChildren - 2) },
    { label: "25 Jul", parents: Math.max(0, totalParents - 2), children: Math.max(0, totalChildren - 2) },
    { label: "26 Jul", parents: Math.max(0, totalParents - 1), children: Math.max(0, totalChildren - 1) },
    { label: "27 Jul", parents: Math.max(0, totalParents - 1), children: Math.max(0, totalChildren - 1) },
    { label: "28 Jul", parents: totalParents, children: totalChildren },
    { label: "29 Jul (Hari ini)", parents: totalParents, children: totalChildren },
  ];

  const growthData30D = [
    { label: "M1 (1-7 Jul)", parents: Math.max(0, totalParents - 3), children: Math.max(0, totalChildren - 3) },
    { label: "M2 (8-14 Jul)", parents: Math.max(0, totalParents - 2), children: Math.max(0, totalChildren - 2) },
    { label: "M3 (15-21 Jul)", parents: Math.max(0, totalParents - 1), children: Math.max(0, totalChildren - 1) },
    { label: "M4 (22-28 Jul)", parents: totalParents, children: totalChildren },
    { label: "Minggu Ini", parents: totalParents, children: totalChildren },
  ];

  const activeChartData = timeframe === "7D" ? growthData7D : growthData30D;
  const maxVal = Math.max(10, totalParents + 4, totalChildren + 4);

  // Real-time Demografi Usia Anak dari database Prisma PostgreSQL
  const balitaCount = ageDemographics?.balita ?? 0;
  const usiaDiniCount = ageDemographics?.usiaDini ?? 0;
  const anakCount = ageDemographics?.anak ?? 0;
  const totalDemoChildren = balitaCount + usiaDiniCount + anakCount;
  const calcBase = totalDemoChildren > 0 ? totalDemoChildren : 1;

  const ageDemographicsList = [
    {
      label: "Balita (0 - 2 Tahun)",
      count: balitaCount,
      percentage: totalDemoChildren > 0 ? `${Math.round((balitaCount / calcBase) * 100)}%` : "0%",
      color: "bg-emerald-500",
      widthPct: (balitaCount / calcBase) * 100,
    },
    {
      label: "Usia Dini (3 - 5 Tahun)",
      count: usiaDiniCount,
      percentage: totalDemoChildren > 0 ? `${Math.round((usiaDiniCount / calcBase) * 100)}%` : "0%",
      color: "bg-teal-500",
      widthPct: (usiaDiniCount / calcBase) * 100,
    },
    {
      label: "Anak (6 - 12+ Tahun)",
      count: anakCount,
      percentage: totalDemoChildren > 0 ? `${Math.round((anakCount / calcBase) * 100)}%` : "0%",
      color: "bg-cyan-500",
      widthPct: (anakCount / calcBase) * 100,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Growth Chart & Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/*User & Children Growth Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Grafik Pertumbuhan Pengguna ({timeframe === "7D" ? "7 Hari Terakhir" : "30 Hari Terakhir"})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium flex items-center gap-1">
                {timeframe === "7D"
                  ? "Rincian pendaftaran harian 23 Jul - 29 Jul 2026"
                  : "Rincian pendaftaran mingguan dalam 30 hari terakhir"}
              </p>
            </div>

            {/* Legend & Active Timeframe Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  Parent ({totalParents})
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
                  Anak ({totalChildren})
                </span>
              </div>

              {/* Interaktif Toggle 7 Hari / 30 Hari */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTimeframe("7D")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${timeframe === "7D"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                >
                  7 Hari
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("30D")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${timeframe === "30D"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                >
                  30 Hari
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="h-64 w-full flex items-end justify-between gap-2 md:gap-4 px-2 border-b border-slate-200 pb-3">
              {activeChartData.map((d, i) => {
                const parentHeight = maxVal > 0 ? (d.parents / maxVal) * 100 : 0;
                const childHeight = maxVal > 0 ? (d.children / maxVal) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-20 font-semibold">
                      {d.label}: {d.parents} Parent | {d.children} Anak
                    </div>

                    {/* Bars */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Parent Bar */}
                      <div
                        style={{ height: `${Math.max(10, parentHeight)}%` }}
                        className="w-1/2 max-w-[28px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      />
                      {/* Child Bar */}
                      <div
                        style={{ height: `${Math.max(10, childHeight)}%` }}
                        className="w-1/2 max-w-[28px] bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      />
                    </div>

                    {/* Label */}
                    <span className="text-[11px] font-bold text-slate-600 mt-2 text-center whitespace-nowrap">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Demografi Usia Anak Real-Time & Overview Konten */}
        <div className="lg:col-span-4 space-y-6">
          {/* Demografi Usia Anak Widget Real-Time */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Demografi Kelompok Usia Anak
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Sebaran umur anak terdaftar dari database Prisma ({totalChildren} Anak)
              </p>
            </div>

            {/* Dynamic Segmented Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
              {totalDemoChildren > 0 ? (
                <>
                  <div
                    style={{ width: `${ageDemographicsList[0].widthPct}%` }}
                    className="bg-emerald-500 h-full transition-all duration-300"
                    title={`Balita: ${balitaCount}`}
                  />
                  <div
                    style={{ width: `${ageDemographicsList[1].widthPct}%` }}
                    className="bg-teal-500 h-full transition-all duration-300"
                    title={`Usia Dini: ${usiaDiniCount}`}
                  />
                  <div
                    style={{ width: `${ageDemographicsList[2].widthPct}%` }}
                    className="bg-cyan-500 h-full transition-all duration-300"
                    title={`Anak: ${anakCount}`}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
            </div>

            {/* Real-time Age Categories List */}
            <div className="space-y-3 pt-1">
              {ageDemographicsList.map((age, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <span className={`w-2.5 h-2.5 rounded-full ${age.color}`} />
                    <span>{age.label}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {age.count} Anak <span className="text-slate-400 text-[11px] font-normal">({age.percentage})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan Status Konten Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Ringkasan Materi & Artikel
            </h4>

            <div className="space-y-4 text-xs">
              <div className="py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">Materi Edukasi Video & PDF</p>
                    <p className="text-[11px] text-slate-500 truncate">{totalEducation} Sumber aktif di database</p>
                  </div>
                </div>
                <span className="font-extrabold text-purple-700 bg-white px-2.5 py-1 rounded-lg border border-purple-200 shrink-0 whitespace-nowrap">
                  {totalEducation} Unit
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">Artikel Panduan Orang Tua</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {articleStats?.published ?? 0} Terbit &bull; {articleStats?.draft ?? 0} Draft
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0 whitespace-nowrap">
                  {totalArticles} Artikel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
