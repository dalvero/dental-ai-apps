"use client";

import { useEffect, useState } from "react";
import {
  Video,
  FileText,
  Plus,
  HelpCircle,
  Trash2,
  Edit3,
  Sparkles,
  BookOpen,
  Loader2,
  Image as ImageIcon,
  Clock,
  CheckSquare,
  XCircle,
  UploadCloud,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  getEducationResources,
  createEducationResource,
  updateEducationResource,
  deleteEducationResource,
} from "@/services/admin/education.service";
import { EducationResource, QuizQuestion, ImageOptionType, EducationType } from "@/types";
import EducationQuizEditor from "./EducationQuizEditor";

/**
 * Ekstrak thumbnail URL otomatis dari URL YouTube
 */
export function extractYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

export default function EducationManagement() {
  const [resources, setResources] = useState<EducationResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [activeType, setActiveType] = useState<"ALL" | "VIDEO" | "DOCUMENT">("ALL");

  // View state: "LIST" or "QUIZ_EDITOR"
  const [viewMode, setViewMode] = useState<"LIST" | "QUIZ_EDITOR">("LIST");
  const [selectedResourceForQuiz, setSelectedResourceForQuiz] = useState<EducationResource | null>(null);

  // Modal State for Adding/Editing Material Metadata
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

  // Custom Delete Confirmation Modal State
  const [deleteResourceItem, setDeleteResourceItem] = useState<EducationResource | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Material Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState<EducationType>("VIDEO");
  const [sourceUrl, setSourceUrl] = useState("");
  const [category, setCategory] = useState("Kesehatan Gigi Anak");
  const [readTime, setReadTime] = useState("3 min read");
  const [hasQuiz, setHasQuiz] = useState<boolean>(true);

  // Image Source Option State in Modal: "YOUTUBE" | "URL" | "LOCAL"
  const [imageOption, setImageOption] = useState<ImageOptionType>("YOUTUBE");

  // Quiz Editor Form State
  const [editingQuizQuestions, setEditingQuizQuestions] = useState<QuizQuestion[]>([]);

  // Fetch data real dari backend API
  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await getEducationResources();
      if (res.success && res.data) {
        setResources(res.data);
      }
    } catch (err) {
      console.error("Failed to load education data:", err);
      toast.error("Gagal mengambil data materi edukasi dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open Modal to Add New Material
  const handleOpenAddMaterial = () => {
    setEditingMaterialId(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setType("VIDEO");
    setSourceUrl("");
    setCategory("Kesehatan Gigi Anak");
    setReadTime("3 min read");
    setHasQuiz(true);
    setImageOption("YOUTUBE");
    setShowMaterialModal(true);
  };

  // Open Modal to Edit Existing Material
  const handleOpenEditMaterial = (res: EducationResource) => {
    setEditingMaterialId(res.id);
    setTitle(res.title || "");
    setDescription(res.description || "");
    setImageUrl(res.imageUrl || "");
    setType(res.type);
    setSourceUrl(res.sourceUrl || "");
    setCategory(res.category || "Kesehatan Gigi Anak");
    setReadTime(res.readTime || "3 min read");
    setHasQuiz(typeof res.hasQuiz === "boolean" ? res.hasQuiz : true);

    if (res.imageUrl?.startsWith("/uploads/")) {
      setImageOption("LOCAL");
    } else if (res.imageUrl?.includes("img.youtube.com")) {
      setImageOption("YOUTUBE");
    } else if (res.imageUrl) {
      setImageOption("URL");
    } else {
      setImageOption(res.type === "VIDEO" ? "YOUTUBE" : "URL");
    }

    setShowMaterialModal(true);
  };

  // Handler jika URL Sumber Video/YouTube berubah -> Otomatis set thumbnail jika mode YOUTUBE aktif
  const handleSourceUrlChange = (newUrl: string) => {
    setSourceUrl(newUrl);
    if (type === "VIDEO" && imageOption === "YOUTUBE") {
      const ytThumb = extractYouTubeThumbnail(newUrl);
      if (ytThumb) {
        setImageUrl(ytThumb);
      }
    }
  };

  // Upload Gambar dari Komputer Lokal
  const handleLocalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success && res.data.url) {
        setImageUrl(res.data.url);
        toast.success("Gambar dari komputer lokal berhasil diunggah!");
      } else {
        toast.error(res.data.message || "Gagal mengunggah gambar");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal mengunggah file gambar");
    } finally {
      setIsUploading(false);
    }
  };

  // Save Material (Add or Edit) via API
  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sourceUrl.trim()) {
      toast.error("Mohon isi judul dan sumber materi");
      return;
    }

    // Jika mode YouTube aktif dan imageUrl kosong, coba ekstrak otomatis
    let finalImageUrl = imageUrl;
    if (!finalImageUrl && type === "VIDEO") {
      const ytThumb = extractYouTubeThumbnail(sourceUrl);
      if (ytThumb) finalImageUrl = ytThumb;
    }

    setIsSubmitting(true);
    try {
      if (editingMaterialId) {
        const res = await updateEducationResource(editingMaterialId, {
          title,
          description,
          imageUrl: finalImageUrl,
          type,
          sourceUrl,
          category,
          readTime,
          hasQuiz: Boolean(hasQuiz),
        });
        if (res.success) {
          toast.success("Materi edukasi berhasil diperbarui!");
          loadData();
        } else {
          toast.error(res.message || "Gagal memperbarui materi");
        }
      } else {
        const res = await createEducationResource({
          title,
          description,
          imageUrl: finalImageUrl,
          type,
          sourceUrl,
          category,
          readTime,
          hasQuiz: Boolean(hasQuiz),
        });
        if (res.success) {
          toast.success("Materi edukasi baru berhasil ditambahkan!");
          loadData();
        } else {
          toast.error(res.message || "Gagal menambahkan materi");
        }
      }
      setShowMaterialModal(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan server");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Quiz Editor Page for a specific resource
  const handleOpenQuizEditor = (res: EducationResource) => {
    if (!res.hasQuiz) {
      toast.info("Materi ini diatur tanpa kuis. Anda dapat mengaktifkan kuis pada Edit Materi.");
      return;
    }
    setSelectedResourceForQuiz(res);
    setEditingQuizQuestions(
      res.quizQuestions && res.quizQuestions.length > 0
        ? JSON.parse(JSON.stringify(res.quizQuestions))
        : [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
          },
        ]
    );
    setViewMode("QUIZ_EDITOR");
  };

  // Save Quiz back to resource via API
  const handleSaveQuiz = async () => {
    if (!selectedResourceForQuiz) return;

    // Validate questions if any
    const isValid = editingQuizQuestions.every(
      (q) => q.question.trim() !== "" && q.options.every((o) => o.trim() !== "")
    );

    if (!isValid && editingQuizQuestions.length > 0) {
      toast.error("Mohon lengkapi semua teks pertanyaan dan 4 opsi jawaban");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateEducationResource(selectedResourceForQuiz.id, {
        quizQuestions: editingQuizQuestions,
      });

      if (res.success) {
        toast.success(`Kuis untuk "${selectedResourceForQuiz.title}" berhasil disimpan!`);
        setViewMode("LIST");
        setSelectedResourceForQuiz(null);
        loadData();
      } else {
        toast.error(res.message || "Gagal menyimpan kuis");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan server");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Custom Pop-up Delete Confirmation Modal
  const handlePromptDeleteResource = (resItem: EducationResource) => {
    setDeleteResourceItem(resItem);
  };

  // Confirm and Perform Delete Action via API
  const handleConfirmDeleteResource = async () => {
    if (!deleteResourceItem) return;

    setIsDeleting(true);
    try {
      const res = await deleteEducationResource(deleteResourceItem.id);
      if (res.success) {
        toast.success(`Materi "${deleteResourceItem.title}" berhasil dihapus.`);
        setDeleteResourceItem(null);
        loadData();
      } else {
        toast.error(res.message || "Gagal menghapus materi");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan server");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredResources = resources.filter(
    (r) => activeType === "ALL" || r.type === activeType
  );

  // Helper untuk menentukan URL Gambar akhir yang ditampilkan di kartu
  const getDisplayImage = (res: EducationResource): string | null => {
    if (res.imageUrl && res.imageUrl.trim() !== "") {
      return res.imageUrl;
    }
    if (res.type === "VIDEO") {
      return extractYouTubeThumbnail(res.sourceUrl);
    }
    return null;
  };

  // ==========================================
  // RENDER MODULAR QUIZ EDITOR COMPONENT
  // ==========================================
  if (viewMode === "QUIZ_EDITOR" && selectedResourceForQuiz) {
    return (
      <EducationQuizEditor
        selectedResource={selectedResourceForQuiz}
        quizQuestions={editingQuizQuestions}
        setQuizQuestions={setEditingQuizQuestions}
        onBack={() => {
          setViewMode("LIST");
          setSelectedResourceForQuiz(null);
        }}
        onSave={handleSaveQuiz}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Main List View
  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Manajemen Materi Edukasi & Kuis Interaktif
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Kelola sumber materi video/PDF, thumbnail otomatis YouTube, unggah gambar dari komputer lokal, serta kuis (Database Real Data)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveType("ALL")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeType === "ALL" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveType("VIDEO")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${activeType === "VIDEO" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <Video size={14} /> Video
            </button>
            <button
              onClick={() => setActiveType("DOCUMENT")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${activeType === "DOCUMENT" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
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
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
          <Loader2 className="mx-auto mb-2 animate-spin text-emerald-600" size={24} />
          Memuat data materi edukasi...
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium space-y-2">
          <p>Belum ada materi edukasi yang ditambahkan ke database.</p>
          <button
            onClick={handleOpenAddMaterial}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus size={14} /> Tambah Materi Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const displayImg = getDisplayImage(res);
            return (
              <div
                key={res.id}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs space-y-0 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                {/* Card Banner Preview Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  {displayImg ? (
                    <img
                      src={displayImg}
                      alt={res.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center p-4 text-center">
                      <div className="text-white space-y-1">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center">
                          {res.type === "VIDEO" ? <Video size={20} /> : <FileText size={20} />}
                        </div>
                        <p className="text-xs font-bold line-clamp-1">{res.title}</p>
                      </div>
                    </div>
                  )}
                  {/* Category Badge overlay on banner */}
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                    {res.category}
                  </div>
                  {/* Type Icon Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    {res.type === "VIDEO" ? "VIDEO" : "PDF / DOCS"}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {res.title}
                    </h4>
                    {res.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {res.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={12} /> {res.readTime || "3 min read"}
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-slate-500 truncate max-w-[140px]">{res.sourceUrl}</span>
                    </div>
                  </div>

                  {/* Status Kuis Widget */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${res.hasQuiz
                        ? "bg-amber-50/70 border-amber-200"
                        : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {res.hasQuiz ? (
                        <HelpCircle size={16} className="text-amber-600 shrink-0" />
                      ) : (
                        <XCircle size={16} className="text-slate-400 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {res.hasQuiz ? `Kuis Interaktif (${res.quizQuestions ? res.quizQuestions.length : 0} Soal)` : "Tanpa Kuis"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {res.hasQuiz
                            ? res.quizQuestions && res.quizQuestions.length > 0
                              ? ""
                              : "Belum ada soal kuis"
                            : "Materi ini disajikan tanpa kuis"}
                        </p>
                      </div>
                    </div>

                    {res.hasQuiz ? (
                      <button
                        onClick={() => handleOpenQuizEditor(res)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        {res.quizQuestions && res.quizQuestions.length > 0 ? "Edit Kuis" : "+ Kuis"}
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md shrink-0">
                        Opsional
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[10px] text-slate-400 font-semibold">{res.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditMaterial(res)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handlePromptDeleteResource(res)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Tambah / Edit Materi Edukasi (Compact & Fixed Header/Footer) */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header (Sticky / Fixed at top of modal) */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 md:px-6 shrink-0 bg-white z-10">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-600" />
                  {editingMaterialId ? "Edit Materi Edukasi" : "Tambah Materi Edukasi"}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Isi informasi materi, pilihan sumber gambar (YouTube/Lokal/URL), & kuis
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMaterialModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveMaterial} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="p-5 md:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Materi Edukasi
                  </label>
                  <input
                    type="text"
                    required
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Making brushing fun for toddlers"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ringkasan / Deskripsi Edukasi
                  </label>
                  <textarea
                    rows={2}
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Contoh: Discover 5 proven techniques to turn bedtime battle into a game your kids will love..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Jenis Sumber Materi
                    </label>
                    <select
                      value={type}
                      onChange={(e) => {
                        const newType = e.target.value as EducationType;
                        setType(newType);
                        if (newType === "VIDEO" && imageOption === "URL") {
                          setImageOption("YOUTUBE");
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                    >
                      <option value="VIDEO">Video (YouTube / Link Video)</option>
                      <option value="DOCUMENT">Dokumen (PDF / Docs File)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {type === "VIDEO" ? "URL YouTube / Link Video" : "Link / File Dokumen PDF"}
                    </label>
                    <input
                      type="text"
                      required
                      value={sourceUrl || ""}
                      onChange={(e) => handleSourceUrlChange(e.target.value)}
                      placeholder={type === "VIDEO" ? "https://www.youtube.com/watch?v=..." : "panduan_gigi.pdf"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Opsi Gambar Banner (YouTube Auto / Upload Komputer Lokal / URL Web) */}
                <div className="space-y-2 bg-slate-50 border border-slate-200/90 p-4 rounded-2xl">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Sumber Gambar Banner PWA
                  </label>

                  {/* Tab Switcher Sumber Gambar */}
                  <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
                    {type === "VIDEO" && (
                      <button
                        type="button"
                        onClick={() => {
                          setImageOption("YOUTUBE");
                          const yt = extractYouTubeThumbnail(sourceUrl);
                          if (yt) setImageUrl(yt);
                        }}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${imageOption === "YOUTUBE"
                            ? "bg-white text-rose-600 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                          }`}
                      >
                        <Video size={14} /> Auto YouTube
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setImageOption("LOCAL")}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${imageOption === "LOCAL"
                          ? "bg-white text-emerald-700 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                      <UploadCloud size={14} /> Unggah Komputer
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageOption("URL")}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${imageOption === "URL"
                          ? "bg-white text-blue-600 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                      <ImageIcon size={14} /> URL Web / Unsplash
                    </button>
                  </div>

                  {/* Input Berdasarkan Opsi yang Dipilih */}
                  {imageOption === "YOUTUBE" && (
                    <div className="pt-2 space-y-2">
                      <p className="text-[11px] text-slate-500 font-medium">
                        Thumbnail diambil secara otomatis dari URL YouTube yang dimasukkan.
                      </p>
                      {sourceUrl && extractYouTubeThumbnail(sourceUrl) ? (
                        <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                          <img
                            src={extractYouTubeThumbnail(sourceUrl)!}
                            alt="YouTube Thumbnail Preview"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                            Auto YouTube Thumbnail
                          </span>
                        </div>
                      ) : (
                        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium">
                          Masukkan URL YouTube yang valid pada kolom &quot;URL YouTube&quot; di atas untuk mengekstrak thumbnail otomatis.
                        </div>
                      )}
                    </div>
                  )}

                  {imageOption === "LOCAL" && (
                    <div className="pt-2 space-y-2">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl cursor-pointer bg-white transition-colors">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                          {isUploading ? (
                            <Loader2 size={22} className="animate-spin text-emerald-600 mb-1" />
                          ) : (
                            <UploadCloud size={22} className="text-emerald-600 mb-1" />
                          )}
                          <p className="text-xs font-bold text-slate-700">
                            {isUploading ? "Mengunggah Gambar..." : "Klik untuk Pilih Gambar dari Komputer"}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Format JPG, PNG, atau WebP (Maksimal 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLocalFileUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                      {imageUrl && imageUrl.startsWith("/uploads/") && (
                        <div className="relative h-24 w-full rounded-xl overflow-hidden border border-slate-200">
                          <img src={imageUrl} alt="Local Preview" className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 right-2 bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                            File Lokal: {imageUrl}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {imageOption === "URL" && (
                    <div className="pt-2 space-y-2">
                      <input
                        type="text"
                        value={imageUrl || ""}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Masukkan URL langsung gambar (contoh: https://images.unsplash.com/...)"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                      {imageUrl && (
                        <div className="relative h-24 w-full rounded-xl overflow-hidden border border-slate-200">
                          <img src={imageUrl} alt="URL Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Materi
                    </label>
                    <input
                      type="text"
                      required
                      value={category || ""}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Parenting Guide / Rutinitas / Karies"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimasi Waktu Baca / Durasi
                    </label>
                    <input
                      type="text"
                      value={readTime || ""}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="4 min read / 5 min video"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Toggle Kuis Opsional dengan strict Boolean control */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckSquare size={16} className="text-emerald-600" />
                      Sediakan Kuis Interaktif?
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tidak semua materi wajib memiliki kuis. Matikan jika hanya berupa bacaan/artikel biasa.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
                    <input
                      type="checkbox"
                      checked={Boolean(hasQuiz)}
                      onChange={(e) => setHasQuiz(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Footer (Sticky / Fixed at bottom of modal) */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 p-4 md:px-6 bg-slate-50/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Simpan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Custom Konfirmasi Hapus Materi Edukasi */}
      {deleteResourceItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center border-4 border-rose-50 shrink-0">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi Hapus Materi</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Apakah Anda yakin ingin menghapus materi <span className="font-bold text-slate-800">&quot;{deleteResourceItem.title}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteResourceItem(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteResource}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
