"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ChevronDown, Check, Baby } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Child } from "@/types/child";

function getAgeString(birthDateStr: string): string {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (years <= 0) {
    return `${Math.max(0, months)} Bulan`;
  }
  return months > 0 ? `${years} Thn ${months} Bln` : `${years} Tahun`;
}

function getGenderAvatarPath(gender: string): string {
  return gender === "MALE" ? "/images/boy_gender.png" : "/images/girl_gender.png";
}

export default function ChildSelector() {
  const { children, activeChild, setActiveChild, isLoading } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl bg-surface p-4 shadow-sm animate-pulse border border-neutral-100 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-neutral-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-1/3" />
          <div className="h-3 bg-neutral-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  // Jika belum ada data anak
  if (!children || children.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-primary-50/70 border border-primary-100 p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Baby size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-900">
              Belum Ada Profil Anak
            </p>
            <p className="text-xs text-primary-700">
              Tambahkan anak untuk mulai memantau gigi
            </p>
          </div>
        </div>
        <Link
          href="/add-child"
          className="flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus size={14} />
          Tambah
        </Link>
      </div>
    );
  }

  const currentChild = activeChild || children[0];

  return (
    <div className="relative w-full">
      {/* Active Child Card */}
      <div className="w-full rounded-2xl bg-white border border-neutral-100 p-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200 shrink-0 bg-primary-50">
            <Image
              src={getGenderAvatarPath(currentChild.gender)}
              alt={currentChild.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-neutral-800 text-base">
                {currentChild.name}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentChild.gender === "MALE"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {currentChild.gender === "MALE" ? "Laki-laki" : "Perempuan"}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Usia: {getAgeString(currentChild.birthDate)}
            </p>
          </div>
        </div>

        {/* Dropdown toggle / Add child button */}
        <div className="flex items-center gap-2">
          {children.length > 1 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              Ubah
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          <Link
            href="/add-child"
            className="p-2 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
            title="Tambah Anak Baru"
          >
            <Plus size={18} />
          </Link>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && children.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-2xl border border-neutral-100 shadow-lg p-2 space-y-1">
          <p className="text-[11px] font-semibold text-neutral-400 px-3 py-1 uppercase tracking-wider">
            Pilih Profil Anak
          </p>
          {children.map((child: Child) => (
            <button
              key={child.id}
              onClick={() => {
                setActiveChild(child);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                child.id === currentChild.id
                  ? "bg-primary-50 text-primary-800 font-semibold"
                  : "hover:bg-neutral-50 text-neutral-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200 shrink-0 bg-neutral-50">
                  <Image
                    src={getGenderAvatarPath(child.gender)}
                    alt={child.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">{child.name}</p>
                  <p className="text-[11px] text-neutral-400">
                    {getAgeString(child.birthDate)}
                  </p>
                </div>
              </div>

              {child.id === currentChild.id && (
                <Check size={16} className="text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
