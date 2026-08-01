"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/layout/app-header";
import {
  Video,
  FileText,
  Search,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Loader2,
  BookOpen,
} from "lucide-react";
import { getPublicEducationResources } from "@/services/education.service";
import { EducationResource } from "@/types";
import { extractYouTubeThumbnail } from "@/features/admin/components/EducationManagement";
import InteractiveQuizModal from "./components/InteractiveQuizModal";

export default function EducationPage() {
  const [resources, setResources] = useState<EducationResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"ALL" | "VIDEO" | "DOCUMENT" | "QUIZ">("ALL");

  // Quiz Modal State
  const [activeQuizResource, setActiveQuizResource] = useState<EducationResource | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await getPublicEducationResources();
      if (res.success && res.data) {
        setResources(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data materi edukasi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered List
  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === "VIDEO") return item.type === "VIDEO";
    if (activeCategory === "DOCUMENT") return item.type === "DOCUMENT";
    if (activeCategory === "QUIZ")
      return item.hasQuiz && Boolean(item.quizQuestions && item.quizQuestions.length > 0);
    return true;
  });

  const getDisplayImage = (res: EducationResource): string | null => {
    if (res.imageUrl && res.imageUrl.trim() !== "") {
      return res.imageUrl;
    }
    if (res.type === "VIDEO") {
      return extractYouTubeThumbnail(res.sourceUrl);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Top Header */}
      <AppHeader title="Edukasi & Kuis Gigi" notificationCount={1} />

      <main className="pt-24 px-4 md:px-6 space-y-6 max-w-3xl mx-auto">
        {/* Banner Welcome */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden space-y-2">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={16} /> Pusat Edukasi Kesehatan Gigi Anak
          </div>
          <h2 className="text-xl font-extrabold leading-tight">
            Panduan Menarik & Kuis Interaktif Orang Tua
          </h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed max-w-md">
            Pelajari teknik merawat gigi anak dengan video animasi & dokumen panduan. Ikuti kuis singkat untuk menguji pemahaman Anda!
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari materi edukasi (contoh: sikat gigi, karies)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                activeCategory === "ALL"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Semua ({resources.length})
            </button>
            <button
              onClick={() => setActiveCategory("VIDEO")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                activeCategory === "VIDEO"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Video size={14} /> Video
            </button>
            <button
              onClick={() => setActiveCategory("DOCUMENT")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                activeCategory === "DOCUMENT"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <FileText size={14} /> Dokumen PDF
            </button>
            <button
              onClick={() => setActiveCategory("QUIZ")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                activeCategory === "QUIZ"
                  ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <HelpCircle size={14} className={activeCategory === "QUIZ" ? "text-white" : "text-amber-500"} /> Kuis Interaktif
            </button>
          </div>
        </div>

        {/* Material Resource Grid */}
        {isLoading ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-medium">
            <Loader2 className="mx-auto mb-2 animate-spin text-emerald-600" size={24} />
            Memuat materi edukasi dari database...
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2 text-slate-500">
            <BookOpen size={32} className="mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-700">Belum Ada Materi Edukasi</p>
            <p className="text-xs text-slate-400">Tidak ada materi edukasi yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredResources.map((res) => {
              const displayImg = getDisplayImage(res);
              const hasQuizQuestions = res.hasQuiz && Boolean(res.quizQuestions && res.quizQuestions.length > 0);

              return (
                <div
                  key={res.id}
                  className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col space-y-0"
                >
                  {/* Banner Image / Media Preview (Top) */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    {displayImg ? (
                      <img
                        src={displayImg}
                        alt={res.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center p-4 text-center">
                        <div className="text-white space-y-1">
                          {res.type === "VIDEO" ? <Video size={28} className="mx-auto" /> : <FileText size={28} className="mx-auto" />}
                          <p className="text-xs font-bold line-clamp-2">{res.title}</p>
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                      {res.category}
                    </span>
                  </div>

                  {/* Card Content Details (Middle) */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {res.title}
                    </h3>

                    {res.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {res.description}
                      </p>
                    )}

                    {/* Meta Bar: Type Badge & Duration */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                      {res.type === "VIDEO" ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[11px] font-bold inline-flex items-center gap-1">
                          <Video size={13} /> Video
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold inline-flex items-center gap-1">
                          <FileText size={13} /> Dokumen PDF
                        </span>
                      )}

                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock size={13} /> {res.readTime || "3 min read"}
                      </span>
                    </div>

                    {/* Action Buttons Row (Bottom) */}
                    <div className="pt-1 flex items-center gap-2.5">
                      <a
                        href={res.sourceUrl.startsWith("http") ? res.sourceUrl : `#`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={14} /> Buka Materi
                      </a>

                      {hasQuizQuestions && (
                        <button
                          onClick={() => setActiveQuizResource(res)}
                          className="flex-1 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <HelpCircle size={14} /> Ikuti Kuis ({res.quizQuestions?.length} Soal)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Interactive Quiz Taker Modal */}
        {activeQuizResource && activeQuizResource.quizQuestions && (
          <InteractiveQuizModal
            resource={activeQuizResource}
            onClose={() => setActiveQuizResource(null)}
          />
        )}
      </main>
    </div>
  );
}
