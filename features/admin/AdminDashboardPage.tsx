"use client";

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminStatGrid from "./components/AdminStatGrid";
import UserManagementTable from "./components/UserManagementTable";
import ChecklistVerificationCard from "./components/ChecklistVerificationCard";
import RecentDetectionsTable from "./components/RecentDetectionsTable";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="admin-layout min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased w-full">
      {/* Sidebar Navigation (Left Desktop Column) */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area (Right Desktop Column) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Header */}
        <AdminHeader
          title={
            activeTab === "overview"
              ? "Overview Dashboard"
              : activeTab === "users"
                ? "Manajemen User & Anak"
                : activeTab === "checklists"
                  ? "Verifikasi Checklist Gigi"
                  : activeTab === "detections"
                    ? "Riwayat Scan AI"
                    : activeTab === "education"
                      ? "Materi Edukasi"
                      : "Pengaturan Platform"
          }
        />

        {/* Dynamic Main Workspace Grid */}
        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Top Section: Overview Stat Grid */}
          <AdminStatGrid />

          {/* Section Switcher / Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <ChecklistVerificationCard />
              <UserManagementTable />
              <RecentDetectionsTable />
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-8">
              <UserManagementTable />
            </div>
          )}

          {activeTab === "checklists" && (
            <div className="space-y-8">
              <ChecklistVerificationCard />
            </div>
          )}

          {activeTab === "detections" && (
            <div className="space-y-8">
              <RecentDetectionsTable />
            </div>
          )}

          {activeTab === "education" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                📚
              </div>
              <h3 className="text-lg font-bold text-slate-900">Manajemen Materi Edukasi</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Modul kelola artikel edukasi perawatan gigi anak & kuis interaktif untuk orang tua.
              </p>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all">
                + Tambah Artikel Baru
              </button>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto text-xl font-bold">
                ⚙️
              </div>
              <h3 className="text-lg font-bold text-slate-900">Pengaturan System & AI Model</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Konfigurasi API AI, ambang batas sensitivitas deteksi, dan kredensial server Supabase.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
