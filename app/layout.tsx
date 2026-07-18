import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],

  // Ganti Variabel font disini jika nanti ada perubahan atau tambahan
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Dental AI Apps",
  description: "AI Detection for Dental Caries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={poppins.variable}>
        <main className="app-container">
          {children}
          <Toaster richColors position="top-center" />
        </main>
      </body>
    </html>
  );
}