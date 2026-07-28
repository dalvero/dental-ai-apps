import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Dental AI",
  description: "Management Console Platform Dental AI Apps",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800">
      {children}
    </div>
  );
}
