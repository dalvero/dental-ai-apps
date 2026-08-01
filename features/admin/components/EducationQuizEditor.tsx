"use client";

import {
  ArrowLeft,
  Save,
  Check,
  Loader2,
  Video,
  FileText,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { EducationResource, QuizQuestion } from "@/types";

interface EducationQuizEditorProps {
  selectedResource: EducationResource;
  quizQuestions: QuizQuestion[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  onBack: () => void;
  onSave: () => void;
  isSubmitting: boolean;
}

export default function EducationQuizEditor({
  selectedResource,
  quizQuestions,
  setQuizQuestions,
  onBack,
  onSave,
  isSubmitting,
}: EducationQuizEditorProps) {
  // Helper: Tambah Soal Kuis Baru
  const handleAddQuestion = () => {
    setQuizQuestions((prev) => [
      ...prev,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  // Helper: Hapus Soal Kuis
  const handleRemoveQuestion = (idx: number) => {
    setQuizQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Action Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft size={16} />
            Kembali ke Daftar Materi
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Simpan Kuis ({quizQuestions.length} Soal)
          </button>
        </div>
      </div>

      {/* Resource Information Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white shrink-0">
            {selectedResource.type === "VIDEO" ? <Video size={20} /> : <FileText size={20} />}
          </div>
          <div>
            <p className="text-xs text-emerald-200 font-medium">Materi Edukasi Terkait</p>
            <h4 className="font-bold text-sm">{selectedResource.title}</h4>
          </div>
        </div>
        <div className="text-xs text-emerald-100 bg-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md font-mono truncate max-w-md">
          {selectedResource.sourceUrl}
        </div>
      </div>

      {/* Questions List & Form */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle size={18} className="text-amber-500" />
            Daftar Soal & Opsi Jawaban Kuis
          </h4>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Plus size={16} />
            Tambah Soal Baru
          </button>
        </div>

        {quizQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm text-slate-500 font-medium">Belum ada soal kuis yang dibuat untuk materi ini.</p>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Buat Soal Pertama
            </button>
          </div>
        ) : (
          quizQuestions.map((q, qIdx) => (
            <div
              key={qIdx}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Pertanyaan
                  </h5>
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    #{qIdx + 1}
                  </span>
                </div>
                {quizQuestions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIdx)}
                    className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 p-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} /> Hapus Soal
                  </button>
                )}
              </div>

              {/* Input Pertanyaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Teks Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan pertanyaan kuis (contoh: Berapa lama durasi menyikat gigi?)"
                  value={q.question || ""}
                  onChange={(e) => {
                    const updated = [...quizQuestions];
                    updated[qIdx].question = e.target.value;
                    setQuizQuestions(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Opsi Jawaban Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Pilihan Jawaban & Tandai Jawaban yang Benar
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = q.correctAnswer === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          isCorrect
                            ? "bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <label className="flex items-center gap-2 shrink-0 cursor-pointer">
                          <input
                            type="radio"
                            name={`correct_${qIdx}`}
                            checked={isCorrect}
                            onChange={() => {
                              const updated = [...quizQuestions];
                              updated[qIdx].correctAnswer = optIdx;
                              setQuizQuestions(updated);
                            }}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span
                            className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${
                              isCorrect ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={`Opsi Jawaban ${String.fromCharCode(65 + optIdx)}`}
                          value={opt || ""}
                          onChange={(e) => {
                            const updated = [...quizQuestions];
                            updated[qIdx].options[optIdx] = e.target.value;
                            setQuizQuestions(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                        {isCorrect && (
                          <span className="text-[10px] font-extrabold text-emerald-700 uppercase shrink-0 px-2 py-0.5 rounded-md bg-emerald-100">
                            Benar
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Bottom Save Floating Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Pastikan setiap pertanyaan memiliki 4 opsi jawaban dan 1 pilihan jawaban benar.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSave}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              Simpan Perubahan Kuis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
