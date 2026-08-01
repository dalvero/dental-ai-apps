"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Eye, Trash2, Edit3, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/services/admin/article.service";
import { Article, ArticleStatus } from "@/types";

export type ArticleRow = Article;

export default function ArticleManagementTable() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  // Modal State for Adding/Editing Article
  const [showModal, setShowModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Custom Delete Confirmation Modal State
  const [deleteArticleItem, setDeleteArticleItem] = useState<ArticleRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kesehatan Gigi");
  const [author, setAuthor] = useState("Dr. Ahmad Rizky");
  const [status, setStatus] = useState<ArticleStatus>("PUBLISHED");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await getArticles();
      if (res.success && res.data) {
        setArticles(res.data);
      }
    } catch (err) {
      console.error("Failed to load article data:", err);
      toast.error("Gagal mengambil data artikel dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingArticleId(null);
    setTitle("");
    setCategory("Kesehatan Gigi");
    setAuthor("Dr. Ahmad Rizky");
    setStatus("PUBLISHED");
    setShowModal(true);
  };

  const handleOpenEditModal = (art: ArticleRow) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setCategory(art.category);
    setAuthor(art.author);
    setStatus(art.status);
    setShowModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Mohon isi judul artikel");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingArticleId) {
        const res = await updateArticle(editingArticleId, {
          title,
          category,
          author,
          status,
        });
        if (res.success) {
          toast.success("Artikel berhasil diperbarui!");
          loadData();
        } else {
          toast.error(res.message || "Gagal memperbarui artikel");
        }
      } else {
        const res = await createArticle({
          title,
          category,
          author,
          status,
        });
        if (res.success) {
          toast.success("Artikel baru berhasil ditambahkan!");
          loadData();
        } else {
          toast.error(res.message || "Gagal menambahkan artikel");
        }
      }
      setShowModal(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePromptDeleteArticle = (art: ArticleRow) => {
    setDeleteArticleItem(art);
  };

  const handleConfirmDeleteArticle = async () => {
    if (!deleteArticleItem) return;

    setIsDeleting(true);
    try {
      const res = await deleteArticle(deleteArticleItem.id);
      if (res.success) {
        toast.success(`Artikel "${deleteArticleItem.title}" berhasil dihapus`);
        setDeleteArticleItem(null);
        loadData();
      } else {
        toast.error(res.message || "Gagal menghapus artikel");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan server");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText size={18} className="text-emerald-600" />
            Manajemen Artikel Edukasi Gigi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Daftar artikel dan panduan kesehatan gigi anak untuk pengguna orang tua (Database Real Data)
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul artikel..."
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === "ALL" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter("PUBLISHED")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === "PUBLISHED" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Terbit
            </button>
            <button
              onClick={() => setStatusFilter("DRAFT")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === "DRAFT" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Draft
            </button>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus size={16} /> Artikel Baru
          </button>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-500 uppercase font-bold border-b border-slate-100">
              <th className="py-3.5 px-6 min-w-[280px]">Judul Artikel</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Kategori</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Penulis</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Tanggal Terbit</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Status</th>
              <th className="py-3.5 px-6 text-right whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-emerald-600" size={18} />
                    Memuat data artikel...
                  </div>
                </td>
              </tr>
            ) : filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                  Tidak ada artikel yang ditemukan di database.
                </td>
              </tr>
            ) : (
              filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 font-medium min-w-[280px]">
                    <p className="font-semibold text-slate-900 text-sm line-clamp-1">{art.title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{art.views} Pembaca</p>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center font-semibold text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">{art.author}</td>
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap">{art.publishedDate}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full text-[10px] whitespace-nowrap ${
                        art.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {art.status === "PUBLISHED" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {art.status === "PUBLISHED" ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
                        title="Preview Artikel"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(art)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-700 transition-colors cursor-pointer"
                        title="Edit Artikel"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handlePromptDeleteArticle(art)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Hapus Artikel"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah / Edit Artikel */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 md:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-emerald-600" />
                  {editingArticleId ? "Edit Artikel" : "Tambah Artikel Baru"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Isi judul, kategori, dan informasi artikel panduan kesehatan gigi anak
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Mengenal White Spot Pada Gigi Anak"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Artikel
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Kesehatan Gigi / Nutrisi & Makanan"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nama Penulis"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status Publikasi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="PUBLISHED">Terbit (Published)</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Custom Konfirmasi Hapus Artikel */}
      {deleteArticleItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center border-4 border-rose-50 shrink-0">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Konfirmasi Hapus Artikel</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Apakah Anda yakin ingin menghapus artikel <span className="font-bold text-slate-800">&quot;{deleteArticleItem.title}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteArticleItem(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteArticle}
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
