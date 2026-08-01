"use client";

import { useState } from "react";
import { Search, Eye, Trash2, Edit3, UserCheck } from "lucide-react";

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: "PARENT" | "ADMIN";
  childrenCount: number;
  joinedDate: string;
  status: "ACTIVE" | "INACTIVE";
}

interface UserManagementTableProps {
  users?: UserRow[];
  isLoading?: boolean;
}

export default function UserManagementTable({
  users = [],
  isLoading = false,
}: UserManagementTableProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "PARENT" | "ADMIN">("ALL");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Manajemen User & Profil Anak
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Daftar akun terdaftar dalam database Dental AI
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
              placeholder="Cari nama atau email..."
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setRoleFilter("ALL")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${roleFilter === "ALL" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Semua
            </button>
            <button
              onClick={() => setRoleFilter("PARENT")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${roleFilter === "PARENT" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Parent
            </button>
            <button
              onClick={() => setRoleFilter("ADMIN")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${roleFilter === "ADMIN" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-500 text-center uppercase font-bold border-b border-slate-100">
              <th className="py-3.5 px-6 text-left min-w-[220px]">User</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Role</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Jumlah Anak</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Tanggal Daftar</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Status</th>
              <th className="py-3.5 px-6 whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-center text-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                  Memuat data user dari database...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                  Belum ada data user terdaftar di database.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 font-medium min-w-[220px]">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                        <p className="text-slate-500 text-[11px]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap ${user.role === "ADMIN"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700 whitespace-nowrap">
                    {user.role === "PARENT" ? `${user.childrenCount} Anak` : "-"}
                  </td>
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap">{user.joinedDate}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center font-semibold px-2.5 py-0.5 rounded-full text-[10px] whitespace-nowrap ${user.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {user.status === "ACTIVE" ? "Aktif" : "Non-aktif"}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-emerald-700 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-700 transition-colors"
                        title="Edit User"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors"
                        title="Hapus User"
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

      {/* Footer Pagination */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <p>Menampilkan {filteredUsers.length} dari {users.length} total user database</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 font-medium">
            Sebelumnya
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-xs">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
