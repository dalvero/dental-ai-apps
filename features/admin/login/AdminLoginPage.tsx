"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Lock, CheckCircle2, Sparkles } from "lucide-react";
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
    <div className="admin-layout min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/60 p-6 md:p-12 font-sans">
      {/* Desktop Web Split Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        {/* Left Column: Brand & Feature Highlights Hero Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
              <Image
                src="/icons/logo_2.png"
                alt="Dental AI Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Dental AI</h1>
              <p className="text-xs text-emerald-100 font-medium">Management Console</p>
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 my-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Admin Management Portal
            </span>
            <h2 className="text-2xl font-bold leading-tight">
              Kelola Data Kesehatan Gigi Anak & Laporan Pengguna
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Platform pusat terintegrasi untuk pemantauan deteksi karies AI, verifikasi checklist rutinitas sikat gigi, dan manajemen data user.
            </p>

            <div className="pt-2 space-y-2.5 text-xs font-medium">
              <div className="flex items-center gap-2 text-emerald-50">
                <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                <span>Monitoring Real-time Scan Gigi AI</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-50">
                <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                <span>Konfirmasi Laporan Routine Checklist</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-50">
                <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                <span>Manajemen User & Edukasi</span>
              </div>
            </div>
          </div>

          {/* Bottom Security Badge */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] text-emerald-100/80">
            <ShieldCheck size={16} className="text-teal-300 shrink-0" />
            <span>Akses Terenkripsi & Hanya Khusus Otoritas Admin</span>
          </div>
        </div>

        {/* Right Column: Clean Form Login */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            {/* Form Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Lock size={13} className="text-emerald-600" />
                Administrator Login
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Selamat Datang Kembali
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Silakan masukkan email & password akun Admin kamu.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminLogin} className="space-y-5">
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

              <div className="pt-2">
                <Button
                  type="submit"
                  width="full"
                  shadow="primary"
                  variant="gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses Authentikasi..." : "Masuk ke Console Admin"}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          </div>

          {/* Security Note Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            Dental AI Management Portal &bull; Protected System &bull; 2026
          </div>
        </div>

      </div>
    </div>
  );
}
