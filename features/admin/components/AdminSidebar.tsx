"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/services/auth/auth.service";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import Image from "next/image";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      toast.success("Berhasil keluar dari Admin Panel.");
      router.push("/admin/login");
    } catch {
      toast.error("Gagal melakukan logout.");
    }
  };

  const menuItems: Array<{ id: string; label: string; icon: any; badge?: string }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Manajemen User", icon: Users },
    { id: "education", label: "Manajemen Edukasi", icon: GraduationCap },
    { id: "articles", label: "Manajemen Artikel", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 border-r border-slate-300 shadow-xs">
      {/* Logo Brand Header */}
      <div>
        <div className="p-3 border-b border-slate-300 flex items-center gap-3">
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/logo_2.png"
              alt="Dental AI Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <div className="mb-2">
              <h1 className="text-2xl text-primary-dark font-extrabold tracking-tight">
                Dental AI
              </h1>
              <p className="text-sm font-medium text-slate-600">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
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
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive
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
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Keluar / Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
