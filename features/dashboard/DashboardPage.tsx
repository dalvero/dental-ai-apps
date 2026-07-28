"use client";

import { useEffect } from "react";
import ArticleCard from "./components/ArticleCard";
import AppHeader from "@/components/layout/app-header";
import HeroCard from "./components/HeroCard";
import FeatureGrid from "./components/FeatureGrid";
import DentalVisitCard from "./components/DentalVisitCard";
import WeeklyProgress from "./components/WeeklyProgress";
import ReminderCard from "./components/ReminderCard";
import ChildSelector from "./components/ChildSelector";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardPage() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const parentName = user?.name ? user.name.split(" ")[0] : "Parent";

  return (
    <div className="min-h-screen pb-32">
      {/* Top Navigation */}
      <AppHeader
        title={`Hello, ${parentName}  `}
        notificationCount={1}
      />

      <main className="pt-24 px-5 flex flex-col gap-6">
        {/* Child Selector */}
        <ChildSelector />

        {/* Hero Card */}
        <HeroCard />

        {/* Feature Grid */}
        <FeatureGrid />

        {/* Dental Visit */}
        <DentalVisitCard />

        {/* Weekly Progress */}
        <WeeklyProgress />

        {/* Reminder Card */}
        <ReminderCard />

        {/* Article Card */}
        <ArticleCard />
      </main>
    </div>
  );
}