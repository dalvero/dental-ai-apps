"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, User, Calendar, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/textfield";
import { toast } from "sonner";
import { createChild } from "@/services/child/child.service";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { useRouter } from "next/navigation";

const GENDER_OPTIONS = [
  {
    id: "MALE",
    label: "Boy",
    image: "/images/boy_gender.png",
    margin: "-ml-2",
  },
  {
    id: "FEMALE",
    label: "Girl",
    image: "/images/girl_gender.png",
    margin: "mr-2",
  },
] as const;

/**
 * Hitung umur (dalam tahun) dari tanggal lahir sampai hari ini.
 * Return string kosong kalau birthDate belum diisi/invalid.
 */
function calculateAge(birthDate: string): string {
  if (!birthDate) return "";

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return "";

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--;
  }

  if (years < 0) return "";
  if (years === 0) return "< 1 tahun";

  return `${years} tahun`;
}

export default function AddChildPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string>(
    GENDER_OPTIONS[0].id
  );
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const displayAge = useMemo(() => calculateAge(birthDate), [birthDate]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const result = await createChild({
        gender: selectedGender as "MALE" | "FEMALE",
        name,
        birthDate,
      });

      toast.success(result.message);
      router.push("/dashboard");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Terjadi kesalahan."
      );
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-primary-50 via-secondary-50 to-primary-100 px-6 py-5">
      <div className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold text-text">Add Your Child</h1>
          <p className="text-sm text-text-secondary max-w-[280px]">
            Let&apos;s set up a profile to start tracking their healthy smile
            journey.
          </p>
        </div>

        <div className="bg-surface rounded-3xl px-6 py-3 shadow-[0_20px_45px_-20px_rgba(16,185,129,0.35)] flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Gender Picker */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-medium text-text">
                Choose a Gender
              </span>
              <div className="grid grid-cols-2 gap-4">
                {GENDER_OPTIONS.map((gender) => {
                  const isSelected = selectedGender === gender.id;
                  return (
                    <button
                      key={gender.id}
                      type="button"
                      onClick={() => setSelectedGender(gender.id)}
                      aria-pressed={isSelected}
                      aria-label={`Pilih gender ${gender.label}`}
                      className={`flex flex-col items-center gap-2 rounded-2xl transition ${
                        isSelected
                          ? "ring-2 ring-primary-500"
                          : "ring-1 ring-border"
                      }`}
                    >
                      <span className="relative w-full aspect-[4/4] rounded-xl overflow-hidden bg-white">
                        <Image
                          src={gender.image}
                          alt={`Ilustrasi anak ${gender.label}`}
                          fill
                          sizes="160px"
                          className={`object-contain ${gender.margin}`}
                        />
                      </span>
                      <span
                        className={`text-sm font-medium mb-2 ${
                          isSelected ? "text-primary-600" : "text-text-secondary"
                        }`}
                      >
                        {gender.label}
                      </span>
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
              icon={<User size={15} />}
              className="-mb-2"
            />

            {/* Birth Date */}
            <TextField
              id="child-birthdate"
              label="Birth Date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              icon={<Calendar size={15} />}
              className="-mb-1"
              max={new Date().toISOString().split("T")[0]}
            />

            {/* Age — auto-calculated, read-only */}
            <TextField
              id="child-age"
              label="Age"
              type="text"
              value={displayAge}
              onChange={() => {}}
              placeholder="Terisi otomatis dari Birth Date"
              icon={<Cake size={15} />}
              className="-mb-1"
              disabled
              readOnly
            />

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
      </div>
    </main>
  );
}