"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { login } from "@/services/auth/login.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";
import TextField from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      // Verifikasi role user: Wajib ADMIN
      if (result.data?.role !== "ADMIN") {
        toast.error("Akses Ditolak. Akun ini terdaftar sebagai Parent, bukan Admin.");
        setIsLoading(false);
        return;
      }

      toast.success("Login Admin berhasil!");
      router.push("/admin");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Email atau password salah."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-layout h-screen max-h-screen overflow-hidden w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60 p-4 font-sans">
      {/* Desktop Web Split Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Brand & Feature Highlights Hero Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 space-y-2">
            <h2 className="text-xl font-bold leading-snug">
              Kelola Data Kesehatan Gigi Anak & Laporan Pengguna
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Platform pusat terintegrasi untuk pemantauan deteksi karies AI, verifikasi checklist rutinitas sikat gigi, dan manajemen data user.
            </p>
          </div>

          {/* Mascot Illustration */}
          <div className="my-1 flex justify-center items-center flex-1">
            <Image
              src="/illustrations/dental_ai_mascot_6.png"
              alt="Dental AI Mascot"
              width={280}
              height={280}
              className="object-contain max-h-60 w-auto drop-shadow-md"
              priority
            />
          </div>

          {/* Bottom divider */}
          <div className="relative z-10 pt-2 border-t border-white/15 text-[11px] text-emerald-100/80 font-medium text-center">
          </div>
        </div>

        {/* Right Column: Clean Form Login */}
        <div className="md:col-span-7 bg-white p-6 md:p-8 flex flex-col justify-center">
          <div>
            {/* Top Logo */}
            <div className="flex text-primary-dark justify-center items-center gap-2 mb-3">
              <Image
                src="/icons/logo_2.png"
                alt="Dental AI Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Dental AI
              </h1>
            </div>

            {/* Header Title */}
            <div className="mb-5 text-center">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Selamat Datang Kembali
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Silakan masukkan email & password akun Admin kamu.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <TextField
                id="admin-email"
                label="Email Administrator"
                type="email"
                placeholder="admin@dentalai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <TextField
                id="admin-password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <div className="pt-1">
                <Button
                  type="submit"
                  width="full"
                  shadow="primary"
                  variant="gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses Authentikasi..." : "Masuk"}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
