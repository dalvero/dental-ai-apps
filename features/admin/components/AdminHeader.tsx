"use client";

import { Search, Bell, Sparkles, RefreshCw } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  title = "Overview Dashboard",
  subtitle = "Ringkasan statistik dan aktivitas sistem Dental AI hari ini",
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-300 px-8 py-5 flex items-center justify-between shadow-xs">
      {/* Left: Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">{subtitle}</p>
      </div>

      {/* Right: Search & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Cari user, anak, atau hasil scan..."
            className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200"
          title="Refresh Data"
        >
          <RefreshCw size={16} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200 relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
