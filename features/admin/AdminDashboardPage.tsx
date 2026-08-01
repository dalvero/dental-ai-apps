"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminStatGrid from "./components/AdminStatGrid";
import UserManagementTable from "./components/UserManagementTable";
import EducationManagement from "./components/EducationManagement";
import ArticleManagementTable from "./components/ArticleManagementTable";
import AdminOverviewAnalytics from "./components/AdminOverviewAnalytics";
import { getAdminDashboardData, AdminDashboardData } from "@/services/admin/admin.service";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getAdminDashboardData();
        if (res.success && res.data) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="admin-layout min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased w-full">
      {/* Sidebar Navigation (Left Desktop Column) */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area (Right Desktop Column) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Header */}
        <AdminHeader
          title={
            activeTab === "dashboard" || activeTab === "overview"
              ? "Dashboard Overview"
              : activeTab === "users"
                ? "Manajemen User"
                : activeTab === "education"
                  ? "Manajemen Edukasi & Kuis"
                  : "Manajemen Artikel"
          }
          subtitle={
            activeTab === "dashboard" || activeTab === "overview"
              ? "Ringkasan statistik dan grafik pertumbuhan sistem Dental AI hari ini"
              : activeTab === "users"
                ? "Kelola data akun orang tua dan profil anak terdaftar"
                : activeTab === "education"
                  ? "Kelola sumber video, dokumen PDF/Docs, serta kuis & jawaban benar"
                  : "Kelola daftar artikel edukasi kesehatan gigi anak"
          }
        />

        {/* Dynamic Main Workspace Grid */}
        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Section Switcher / Tab Content */}
          {(activeTab === "dashboard" || activeTab === "overview") && (
            <div className="space-y-8">
              {/* Top Section: Overview Stat Cards */}
              <AdminStatGrid
                totalParents={dashboardData?.totalParents}
                totalChildren={dashboardData?.totalChildren}
                totalEducation={dashboardData?.totalEducation}
                totalArticles={dashboardData?.totalArticles}
                isLoading={isLoading}
              />

              {/* Grafik Pertumbuhan & Widget Overview Keseluruhan (Database Real Data) */}
              <AdminOverviewAnalytics
                totalParents={dashboardData?.totalParents}
                totalChildren={dashboardData?.totalChildren}
                ageDemographics={dashboardData?.ageDemographics}
              />
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-8">
              <UserManagementTable users={dashboardData?.users} isLoading={isLoading} />
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-8">
              <EducationManagement />
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-8">
              <ArticleManagementTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
