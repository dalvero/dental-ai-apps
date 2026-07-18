"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GetStartedPage() {
    const router = useRouter();
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6">
        {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 py-8">
                {/* Mascot Image */}
                <div className="relative">
                    {/* Ambient glow behind the card */}
                    <div className="absolute inset-0 rounded-[32px] bg-primary-200/40 blur-2xl scale-95" />
                    <Image
                        src="/illustrations/dental_ai_mascot_4.png"
                        alt="Maskot Dental AI, gigi ramah dengan lencana AI"
                        width={820}
                        height={820}
                        priority
                        className="relative w-82 h-82 object-contain"
                    />
                </div>

                {/* Headline & Deskripsi */}
                <div className="flex flex-col items-center gap-3 text-center px-2">
                    <h1 className="text-2xl font-bold text-text leading-snug">
                        Better Dental Health
                        <br />
                        <span className="text-primary-600">for Your Family</span>
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[300px]">
                        Empower your children with smart brushing habits. Our advanced AI
                        scans help you track oral health daily, making dental visits
                        stress-free and fun.
                    </p>
                </div>

                {/* CTA */}
                <div className="w-full max-w-[320px] flex flex-col items-center gap-4">
                    <Button 
                        width="full" 
                        shadow="primary" 
                        variant="gradient" 
                        onClick={() => router.push("/login")}
                    >
                        Get Started
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </main>
    );
}