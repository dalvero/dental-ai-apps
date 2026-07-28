"use client";

import { ScanLine, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

interface DetectionItem {
  id: string;
  childName: string;
  parentName: string;
  detectedAt: string;
  finding: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  confidence: number;
}

export default function RecentDetectionsTable() {
  const detections: DetectionItem[] = [
    {
      id: "det_1",
      childName: "Kenzo Santoso",
      parentName: "Budi Santoso",
      detectedAt: "28 Jul 2026, 14:20",
      finding: "White Spot Demineralisasi Gigi Depan",
      riskLevel: "MEDIUM",
      confidence: 86,
    },
    {
      id: "det_2",
      childName: "Aisyah Rahma",
      parentName: "Siti Rahma",
      detectedAt: "28 Jul 2026, 11:05",
      finding: "Gigi Bersih (Bebas Karies)",
      riskLevel: "LOW",
      confidence: 94,
    },
    {
      id: "det_3",
      childName: "Naufal Lestari",
      parentName: "Dewi Lestari",
      detectedAt: "27 Jul 2026, 18:40",
      finding: "Yellow Spot Karies Tahap Awal Samping Kiri",
      riskLevel: "HIGH",
      confidence: 89,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ScanLine size={18} className="text-purple-600" />
            Riwayat Scan AI Terbaru
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Hasil deteksi karies gigi berbasis AI dari pengguna
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-500 uppercase font-bold border-b border-slate-100">
              <th className="py-3 px-4">Nama Anak / Parent</th>
              <th className="py-3 px-4">Temuan AI</th>
              <th className="py-3 px-4">Tingkat Risiko</th>
              <th className="py-3 px-4">Akurasi Confidence</th>
              <th className="py-3 px-4">Waktu Scan</th>
              <th className="py-3 px-4 text-right">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {detections.map((det) => (
              <tr key={det.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 font-medium">
                  <p className="font-semibold text-slate-900">{det.childName}</p>
                  <p className="text-slate-500 text-[11px]">Parent: {det.parentName}</p>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {det.finding}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                      det.riskLevel === "LOW"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : det.riskLevel === "MEDIUM"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {det.riskLevel === "LOW" ? (
                      <CheckCircle size={12} />
                    ) : (
                      <AlertTriangle size={12} />
                    )}
                    {det.riskLevel === "LOW"
                      ? "Risiko Rendah"
                      : det.riskLevel === "MEDIUM"
                      ? "Demineralisasi Dini"
                      : "Risiko Tinggi"}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  {det.confidence}%
                </td>
                <td className="py-3.5 px-4 text-slate-500">{det.detectedAt}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-purple-700 transition-colors"
                    title="Lihat Detail Foto Scan"
                  >
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
