"use client";

import { useState } from "react";
import { Search, Plus, Eye, Trash2, Edit3, FileText, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ArticleRow {
  id: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  status: "PUBLISHED" | "DRAFT";
  views: number;
}

export default function ArticleManagementTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  // Modal State for Adding/Editing Article
  const [showModal, setShowModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kesehatan Gigi");
  const [author, setAuthor] = useState("Dr. Ahmad Rizky");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");

  const [articles, setArticles] = useState<ArticleRow[]>([
    {
      id: "art_1",
      title: "Mengenal White Spot: Tanda Awal Gigi Berlubang Pada Anak",
      category: "Kesehatan Gigi",
      author: "Dr. Ahmad Rizky",
      publishedDate: "28 Jul 2026",
      status: "PUBLISHED",
      views: 342,
    },
    {
      id: "art_2",
      title: "Tips Memilih Pasta Gigi Berfluoride Yang Aman Untuk Balita",
      category: "Tips Perawatan",
      author: "Dr. Ahmad Rizky",
      publishedDate: "25 Jul 2026",
      status: "PUBLISHED",
      views: 518,
    },
    {
      id: "art_3",
      title: "Bahaya Makanan Tinggi Gula Terhadap Enamel Gigi Anak",
      category: "Nutrisi & Makanan",
      author: "Tim Redaksi Dental AI",
      publishedDate: "20 Jul 2026",
      status: "DRAFT",
      views: 0,
    },
  ]);

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

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Mohon isi judul artikel");
      return;
    }

    if (editingArticleId) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticleId
            ? { ...a, title, category, author, status }
            : a
        )
      );
      toast.success("Artikel berhasil diperbarui!");
    } else {
      const newArt: ArticleRow = {
        id: `art_${Date.now()}`,
        title,
        category,
        author,
        publishedDate: "Hari ini",
        status,
        views: 0,
      };
      setArticles([newArt, ...articles]);
      toast.success("Artikel baru berhasil ditambahkan!");
    }

    setShowModal(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast.success("Artikel berhasil dihapus");
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
            Daftar artikel dan panduan kesehatan gigi anak untuk pengguna orang tua
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
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                  Tidak ada artikel yang ditemukan.
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
                        onClick={() => handleDeleteArticle(art.id)}
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 md:p-8 space-y-6 my-8">
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
                  onChange={(e) => setStatus(e.target.value as "PUBLISHED" | "DRAFT")}
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
