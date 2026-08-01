"use client";

import { useState } from "react";
import {
  Video,
  FileText,
  Plus,
  HelpCircle,
  Trash2,
  Edit3,
  Upload,
  Link2,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Save,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
}

export interface EducationResource {
  id: string;
  title: string;
  type: "VIDEO" | "DOCUMENT";
  sourceUrl: string; // URL video atau nama file PDF/Docs
  category: string;
  quizQuestions: QuizQuestion[];
  createdAt: string;
}

export default function EducationManagement() {
  const [activeType, setActiveType] = useState<"ALL" | "VIDEO" | "DOCUMENT">("ALL");

  // View state: "LIST" or "QUIZ_EDITOR"
  const [viewMode, setViewMode] = useState<"LIST" | "QUIZ_EDITOR">("LIST");
  const [selectedResourceForQuiz, setSelectedResourceForQuiz] = useState<EducationResource | null>(null);

  // Modal State for Adding/Editing Material Metadata
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

  // Material Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"VIDEO" | "DOCUMENT">("VIDEO");
  const [sourceUrl, setSourceUrl] = useState("");
  const [category, setCategory] = useState("Kesehatan Gigi Anak");

  // Quiz Editor Form State
  const [editingQuizQuestions, setEditingQuizQuestions] = useState<QuizQuestion[]>([]);

  // Mock initial data
  const [resources, setResources] = useState<EducationResource[]>([
    {
      id: "edu_1",
      title: "Panduan Menyikat Gigi Anak Usia 2-5 Tahun",
      type: "VIDEO",
      sourceUrl: "https://youtube.com/watch?v=sample_video",
      category: "Rutinitas Gigi",
      createdAt: "28 Jul 2026",
      quizQuestions: [
        {
          id: "q_101",
          question: "Berapa lama durasi menyikat gigi yang dianjurkan?",
          options: ["30 Detik", "1 Menit", "2 Menit", "5 Menit"],
          correctAnswer: 2,
        },
        {
          id: "q_102",
          question: "Berapa kali sebaiknya anak menyikat gigi dalam sehari?",
          options: ["1 Kali", "2 Kali (Pagi & Malam)", "3 Kali", "Tidak Perlu"],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: "edu_2",
      title: "Buku Saku Demineralisasi & Spot Gigi Anak (PDF)",
      type: "DOCUMENT",
      sourceUrl: "panduan_karies_dini_v1.pdf",
      category: "Pencegahan Karies",
      createdAt: "27 Jul 2026",
      quizQuestions: [
        {
          id: "q_103",
          question: "Apa tanda awal demineralisasi enamel pada gigi anak?",
          options: ["Gigi Berlubang Hitam", "White Spot / Berbintik Putih", "Gigi Goyang", "Nyeri Gusi"],
          correctAnswer: 1,
        },
      ],
    },
  ]);

  // Open Modal to Add New Material
  const handleOpenAddMaterial = () => {
    setEditingMaterialId(null);
    setTitle("");
    setType("VIDEO");
    setSourceUrl("");
    setCategory("Kesehatan Gigi Anak");
    setShowMaterialModal(true);
  };

  // Open Modal to Edit Existing Material
  const handleOpenEditMaterial = (res: EducationResource) => {
    setEditingMaterialId(res.id);
    setTitle(res.title);
    setType(res.type);
    setSourceUrl(res.sourceUrl);
    setCategory(res.category);
    setShowMaterialModal(true);
  };

  // Save Material (Add or Edit)
  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sourceUrl.trim()) {
      toast.error("Mohon isi judul dan sumber materi");
      return;
    }

    if (editingMaterialId) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingMaterialId
            ? { ...r, title, type, sourceUrl, category }
            : r
        )
      );
      toast.success("Materi edukasi berhasil diperbarui!");
    } else {
      const newRes: EducationResource = {
        id: `edu_${Date.now()}`,
        title,
        type,
        sourceUrl,
        category,
        quizQuestions: [],
        createdAt: "Hari ini",
      };
      setResources([newRes, ...resources]);
      toast.success("Materi edukasi baru berhasil ditambahkan!");
    }

    setShowMaterialModal(false);
  };

  // Open Quiz Editor Page for a specific resource
  const handleOpenQuizEditor = (res: EducationResource) => {
    setSelectedResourceForQuiz(res);
    setEditingQuizQuestions(
      res.quizQuestions.length > 0
        ? JSON.parse(JSON.stringify(res.quizQuestions))
        : [
            {
              id: `q_${Date.now()}`,
              question: "",
              options: ["", "", "", ""],
              correctAnswer: 0,
            },
          ]
    );
    setViewMode("QUIZ_EDITOR");
  };

  // Quiz Editor Helper: Add new Question
  const handleAddQuestionToQuiz = () => {
    setEditingQuizQuestions((prev) => [
      ...prev,
      {
        id: `q_${Date.now()}`,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  // Quiz Editor Helper: Remove Question
  const handleRemoveQuestionFromQuiz = (idx: number) => {
    setEditingQuizQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  // Save Quiz back to resource
  const handleSaveQuiz = () => {
    if (!selectedResourceForQuiz) return;

    // Validate that questions are not empty
    const isValid = editingQuizQuestions.every(
      (q) => q.question.trim() !== "" && q.options.every((o) => o.trim() !== "")
    );

    if (!isValid && editingQuizQuestions.length > 0) {
      toast.error("Mohon lengkapi semua teks pertanyaan dan 4 opsi jawaban");
      return;
    }

    setResources((prev) =>
      prev.map((r) =>
        r.id === selectedResourceForQuiz.id
          ? { ...r, quizQuestions: editingQuizQuestions }
          : r
      )
    );

    toast.success(`Kuis untuk "${selectedResourceForQuiz.title}" berhasil disimpan!`);
    setViewMode("LIST");
    setSelectedResourceForQuiz(null);
  };

  // Delete Resource
  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Materi edukasi berhasil dihapus");
  };

  const filteredResources = resources.filter(
    (r) => activeType === "ALL" || r.type === activeType
  );

  // ==========================================
  // RENDER SEPARATE QUIZ EDITOR PAGE / VIEW
  // ==========================================
  if (viewMode === "QUIZ_EDITOR" && selectedResourceForQuiz) {
    return (
      <div className="space-y-6">
        {/* Top Navigation & Action Header */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("LIST")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft size={16} />
              Kembali ke Daftar Materi
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Halaman Kelola Kuis
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {selectedResourceForQuiz.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Kuis Untuk: {selectedResourceForQuiz.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode("LIST")}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveQuiz}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save size={16} />
              Simpan Kuis ({editingQuizQuestions.length} Soal)
            </button>
          </div>
        </div>

        {/* Resource Information Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white shrink-0">
              {selectedResourceForQuiz.type === "VIDEO" ? <Video size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <p className="text-xs text-emerald-200 font-medium">Materi Edukasi Terkait</p>
              <h4 className="font-bold text-sm">{selectedResourceForQuiz.title}</h4>
            </div>
          </div>
          <div className="text-xs text-emerald-100 bg-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md font-mono">
            {selectedResourceForQuiz.sourceUrl}
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
              onClick={handleAddQuestionToQuiz}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Plus size={16} />
              Tambah Soal Baru
            </button>
          </div>

          {editingQuizQuestions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
              <p className="text-sm text-slate-500 font-medium">Belum ada soal kuis yang dibuat untuk materi ini.</p>
              <button
                type="button"
                onClick={handleAddQuestionToQuiz}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Buat Soal Pertama
              </button>
            </div>
          ) : (
            editingQuizQuestions.map((q, qIdx) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      #{qIdx + 1}
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                      Pertanyaan Kuis #{qIdx + 1}
                    </h5>
                  </div>
                  {editingQuizQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestionFromQuiz(qIdx)}
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
                    placeholder="Masukkan pertanyaan kuis (contoh: Berapa kali disarankan menyikat gigi?)"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...editingQuizQuestions];
                      updated[qIdx].question = e.target.value;
                      setEditingQuizQuestions(updated);
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
                              name={`correct_${q.id}`}
                              checked={isCorrect}
                              onChange={() => {
                                const updated = [...editingQuizQuestions];
                                updated[qIdx].correctAnswer = optIdx;
                                setEditingQuizQuestions(updated);
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
                            value={opt}
                            onChange={(e) => {
                              const updated = [...editingQuizQuestions];
                              updated[qIdx].options[optIdx] = e.target.value;
                              setEditingQuizQuestions(updated);
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
                onClick={() => setViewMode("LIST")}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveQuiz}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Check size={16} /> Simpan Perubahan Kuis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER MAIN LIST VIEW
  // ==========================================
  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen size={20} className="text-emerald-600" />
            Manajemen Materi Edukasi & Kuis Interaktif
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Kelola sumber materi edukasi video/PDF dan buat kuis interaktif pada halaman terpisah
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveType("ALL")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeType === "ALL" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveType("VIDEO")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                activeType === "VIDEO" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Video size={14} /> Video
            </button>
            <button
              onClick={() => setActiveType("DOCUMENT")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                activeType === "DOCUMENT" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText size={14} /> PDF / Docs
            </button>
          </div>

          <button
            onClick={handleOpenAddMaterial}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus size={16} />
            Tambah Materi Edukasi
          </button>
        </div>
      </div>

      {/* Grid Materi Edukasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-200 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                      res.type === "VIDEO"
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    }`}
                  >
                    {res.type === "VIDEO" ? <Video size={22} /> : <FileText size={22} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                      {res.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{res.title}</h4>
                  </div>
                </div>
              </div>

              {/* Sumber Detail */}
              <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-medium truncate max-w-[80%]">
                  {res.type === "VIDEO" ? (
                    <Link2 size={14} className="text-rose-500 shrink-0" />
                  ) : (
                    <Upload size={14} className="text-blue-500 shrink-0" />
                  )}
                  <span className="truncate">{res.sourceUrl}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">{res.createdAt}</span>
              </div>

              {/* Status Kuis Ringkasan */}
              <div className="bg-amber-50/60 border border-amber-200/70 p-3.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Kuis Terkait ({res.quizQuestions.length} Soal)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {res.quizQuestions.length > 0
                        ? "Kuis aktif & dapat diakses parent"
                        : "Belum ada kuis untuk materi ini"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenQuizEditor(res)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 size={14} />
                  {res.quizQuestions.length > 0 ? "Kelola Kuis" : "Buat Kuis"}
                </button>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenQuizEditor(res)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle size={14} /> Halaman Kuis →
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditMaterial(res)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 size={14} /> Edit Materi
                </button>
                <button
                  onClick={() => handleDeleteResource(res.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah / Edit Materi Edukasi SAJA (Tanpa Kuis) */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 md:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-emerald-600" />
                  {editingMaterialId ? "Edit Materi Edukasi" : "Tambah Materi Edukasi"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingMaterialId
                    ? "Perbarui informasi materi video atau dokumen PDF"
                    : "Masukkan informasi video atau dokumen PDF edukasi baru"}
                </p>
              </div>
              <button
                onClick={() => setShowMaterialModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Materi Edukasi
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Cara Sikat Gigi yang Benar"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Materi
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Kesehatan Gigi / Rutinitas / Pencegahan Karies"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Sumber Materi
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "VIDEO" | "DOCUMENT")}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="VIDEO">Video (YouTube / Link Video)</option>
                  <option value="DOCUMENT">Dokumen (PDF / Docs File)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {type === "VIDEO" ? "URL Sumber Video" : "Nama / Link File Dokumen PDF"}
                </label>
                <input
                  type="text"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder={type === "VIDEO" ? "https://youtube.com/..." : "panduan_gigi.pdf"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-700">
                <p className="font-semibold">💡 Pengelolaan Kuis:</p>
                <p className="text-[11px] text-blue-600 mt-0.5">
                  Setelah menyimpan materi ini, Anda dapat mengelola/membuat soal kuis pada **Halaman Kelola Kuis** terpisah melalui tombol "Kelola Kuis" di kartu materi.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
