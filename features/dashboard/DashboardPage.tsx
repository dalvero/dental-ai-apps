import ArticleCard from "./components/ArticleCard";
import AppHeader from "@/components/layout/app-header";
import HeroCard from "./components/HeroCard";
import FeatureGrid from "./components/FeatureGrid";
import DentalVisitCard from "./components/DentalVisitCard";
import WeeklyProgress from "./components/WeeklyProgress";
import ReminderCard from "./components/ReminderCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen pb-32">
      {/* Top Navigation */}
      <AppHeader
          title="Hello, Parent 👋"
          notificationCount={1}
      />

      <main className="pt-24 px-5 flex flex-col gap-6">
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