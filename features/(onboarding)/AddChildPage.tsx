"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/textfield";

const AVATAR_OPTIONS = [
  { id: "smile", emoji: "😄", bg: "bg-primary-100" },
  { id: "shy", emoji: "😊", bg: "bg-secondary-100" },
  { id: "glasses", emoji: "🤓", bg: "bg-tertiary-100" },
  { id: "cat", emoji: "😺", bg: "bg-neutral-100" },
  { id: "cool", emoji: "😎", bg: "bg-primary-100" },
  { id: "star", emoji: "🤩", bg: "bg-secondary-100" },
  { id: "ninja", emoji: "🥷", bg: "bg-neutral-100" },
  { id: "wink", emoji: "😉", bg: "bg-tertiary-100" },
];

export default function AddChildPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    AVATAR_OPTIONS[0].id
  );
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: sambungkan ke logic simpan profil anak
    console.log({ selectedAvatar, name, age });
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6 py-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold text-text">Add Your Child</h1>
          <p className="text-sm text-text-secondary max-w-[280px]">
            Let&apos;s set up a profile to start tracking their healthy smile
            journey.
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-3xl px-6 py-7 shadow-[0_20px_45px_-20px_rgba(16,185,129,0.35)] flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Avatar Picker */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-medium text-text">
                Choose an Avatar
              </span>
              <div className="grid grid-cols-4 gap-3">
                {AVATAR_OPTIONS.map((avatar) => {
                  const isSelected = selectedAvatar === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      aria-pressed={isSelected}
                      aria-label={`Pilih avatar ${avatar.id}`}
                      className={`aspect-square rounded-full flex items-center justify-center text-xl transition ${avatar.bg} ${
                        isSelected
                          ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-surface"
                          : "ring-1 ring-border"
                      }`}
                    >
                      {avatar.emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Child's Name */}
            <TextField
              id="child-name"
              label="Child's Name"
              placeholder="e.g. Levi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
            />

            {/* Age */}
            <TextField
              id="child-age"
              label="Age"
              type="number"
              inputMode="numeric"
              placeholder="e.g. 6"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              icon={<Calendar size={18} />}
            />

            {/* Submit */}
            <div className="flex flex-col items-center gap-2">
              <Button
                type="submit"
                variant="gradient"
                width="full"
                shadow="primary"
                className="gap-2"
              >
                Add Profile
                <ArrowRight size={18} />
              </Button>
              <p className="text-xs text-text-secondary">
                You can add more children later
              </p>
            </div>
          </form>
        </div>

        {/* Decorative Illustration */}
        <div className="flex justify-center pt-2">
          <div className="relative w-28 h-28 rounded-full bg-primary-100/70 flex items-center justify-center overflow-hidden">
            <Image
              src="/illustrations/dental_ai_mascot_kids.png"
              alt="Ilustrasi anak-anak menjaga kesehatan gigi"
              width={96}
              height={96}
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}