"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        router.replace("/get-started");
                    }, 250);
                    return 100;
                }
                return prev + 2;
            });
        }, 35);
        return () => clearInterval(interval);
    }, [router]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6">
            <div className="app-container flex flex-col items-center justify-center gap-8 py-12">
                {/* Mascot Image */}
                <div className="relative">
                    {/* Ambient glow behind the card */}
                    <div className="absolute inset-0 rounded-[32px] bg-primary-200/40 blur-2xl scale-95" />
                        <Image
                        src="/illustrations/dental_ai_mascot_2.png"
                        alt="Maskot Dental AI, gigi ramah dengan lencana AI"
                        width={220}
                        height={220}
                        priority
                        className="w-52 h-52 object-contain"
                        />
                </div>

                {/* Apps Name & Deskripsi */}
                <div className="flex flex-col items-center gap-2 text-center px-4">
                    <h1 className="text-2xl font-semibold text-primary-600 tracking-tight">
                        Dental AI
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[280px]">
                        Aplikasi deteksi kesehatan gigi berbasis kecerdasan buatan untuk anak-anak.
                    </p>
                </div>

                {/* Progress */}
                <div className="w-full max-w-xs space-y-3">
                    <div className="h-2 rounded-full bg-primary-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div className="flex justify-between text-xs text-text-secondary">
                        <span>Menyiapkan aplikasi...</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </div>
        </main>
    );
}