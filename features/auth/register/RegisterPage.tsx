"use client";

import { ArrowRight, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
import TextField from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { register } from "@/services/auth/register.service";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("Kamu harus menyetujui Terms of Service terlebih dahulu.");
      return;
    }

    try {
      const result = await register(name, email, password);
      toast.success(result.message);
      router.push("/add-child");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Terjadi kesalahan."
      );
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6 py-5">
      <div className="w-full items-center max-w-sm flex flex-col gap-3">
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
            gap-4
          "
        >
          {/* Heading */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-bold text-text">Create Your Account</h1>
            <p className="text-sm text-text-secondary">
              Join us and start tracking your child&apos;s healthy smile journey.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            {/* Full Name */}
            <TextField
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              icon={<User size={15} />}
              autoComplete="name"
            />

            {/* Email */}
            <TextField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              icon={<Mail size={15} />}
              autoComplete="email"
            />

            {/* Password — toggle show/hide sudah otomatis dari TextField */}
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={15} />}
              autoComplete="new-password"
            />

            {/* TOS Checkbox */}
            <div className="flex items-center gap-2 px-1">
              <input
                id="tos"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 rounded-md border-border text-primary-500 focus:ring-primary-200 cursor-pointer"
              />
              <label htmlFor="tos" className="text-sm text-text-secondary leading-tight">
                I agree to the{" "}
                <a href="#" className="text-primary-600 font-semibold hover:text-primary-700">
                  Terms of Service
                </a>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              width="full"
              shadow="primary"
              variant="gradient"
            >
              Continue
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}