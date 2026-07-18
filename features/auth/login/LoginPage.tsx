"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import TextField from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { login } from "@/services/auth/login.service"
import { toast } from "sonner";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      toast.success(result.message);
      router.push("/add-child");
    } catch (error: unknown){
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Terjadi kesalahan."
      )
    }
  }

  return (
    <main className="min-h-screen flex items-start justify-center bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6 py-10">
      <div className="w-full items-center max-w-sm flex flex-col gap-12">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/icons/logo_2.png"
            alt="Dental AI Logo"
            width={88}
            height={88}
            priority
            className="object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-text">
              Dental AI
            </h1>
            <p className="text-sm text-text-secondary">
              Smart Dental Detection
            </p>
          </div>
        </div>

        {/* Card */}
        <div
            className="
              w-full
              rounded-3xl
              bg-surface
              px-7
              py-4
              shadow-[0_20px_45px_-20px_rgba(16,185,129,0.35)]
              flex
              flex-col
              gap-8
            "
          >
          {/* Heading */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-bold text-text">Welcome Back</h1>
            <p className="text-sm text-text-secondary">
              Sign in to continue your journey toward a brighter, healthier
              smile.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email */}
            <TextField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />
      
            {/* Password — toggle show/hide sudah otomatis dari TextField */}
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              labelAction={
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Forgot Password?
                </button>
              }
            />
            {/* Submit */}
            <Button 
                type="submit"
                width="full" 
                shadow="primary" 
                variant="gradient" 
            >
                Log In
                <ArrowRight size={18} />
            </Button>
          </form>
          {/* Sign Up */}
          <p className="text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}