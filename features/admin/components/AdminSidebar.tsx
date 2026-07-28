"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  ScanLine,
  BookOpen,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User & Profil Anak", icon: Users },
    { id: "checklists", label: "Verifikasi Checklist", icon: CheckCircle2, badge: "3 Pending" },
    { id: "detections", label: "Riwayat Deteksi AI", icon: ScanLine },
    { id: "education", label: "Materi Edukasi", icon: BookOpen },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 border-r border-slate-200/80 shadow-xs">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
              Dental AI{" "}
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-200">
                Admin
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Management Console</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-semibold"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white text-emerald-800"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between p-2 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Administrator</p>
              <p className="text-[10px] text-slate-500">admin@dentalai.com</p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Keluar"
          >
            <LogOut size={18} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
