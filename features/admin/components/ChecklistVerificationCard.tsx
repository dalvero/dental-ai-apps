"use client";

import { Check, X, Clock, Sparkles, CheckCircle2 } from "lucide-react";

interface VerificationItem {
  id: string;
  parentName: string;
  childName: string;
  routine: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function ChecklistVerificationCard() {
  const pendingItems: VerificationItem[] = [
    {
      id: "chk_1",
      parentName: "Budi Santoso",
      childName: "Kenzo Santoso (4 thn)",
      routine: "Sikat Gigi Malam Hari + Flossing",
      submittedAt: "Hari ini, 19:15",
      status: "PENDING",
    },
    {
      id: "chk_2",
      parentName: "Siti Rahma",
      childName: "Aisyah Rahma (2.5 thn)",
      routine: "Sikat Gigi Pagi Hari",
      submittedAt: "Hari ini, 08:30",
      status: "PENDING",
    },
    {
      id: "chk_3",
      parentName: "Dewi Lestari",
      childName: "Naufal Lestari (5 thn)",
      routine: "Sikat Gigi Malam Hari",
      submittedAt: "Kemarin, 20:45",
      status: "PENDING",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-amber-600" />
            Antrean Verifikasi Checklist Gigi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Konfirmasi laporan rutinitas gigi dari orang tua untuk memberikan poin & streak
          </p>
        </div>
        <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
          {pendingItems.length} Menunggu Konfirmasi
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-3">
        {pendingItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-slate-50/70 border border-slate-200/70 p-4 rounded-xl hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                <Clock size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 text-sm">{item.childName}</span>
                  <span className="text-xs text-slate-500">by {item.parentName}</span>
                </div>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <Sparkles size={12} />
                  {item.routine}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{item.submittedAt}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all"
                title="Setujui Laporan"
              >
                <Check size={14} />
                Setujui
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 border border-slate-200 text-xs font-semibold transition-all"
                title="Tolak Laporan"
              >
                <X size={14} />
                Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
