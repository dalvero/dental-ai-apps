import { create } from "zustand";
import { Child } from "@/types/child";
import { getCurrentUser } from "@/services/auth/auth.service";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  children: Child[];
  activeChild: Child | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setActiveChild: (child: Child | null) => void;
  addChildToState: (child: Child) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  children: [],
  activeChild: null,
  isLoading: false,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        const children = response.data.children || [];
        const currentActive = get().activeChild;
        
        // Pilih anak aktif: pertahankan pilihan sebelumnya jika masih ada di list, atau pilih anak pertama
        let nextActive = children.length > 0 ? children[0] : null;
        if (currentActive) {
          const match = children.find((c) => c.id === currentActive.id);
          if (match) nextActive = match;
        }

        set({
          user: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          },
          children,
          activeChild: nextActive,
          isLoading: false,
        });
      } else {
        set({ error: response.message || "Gagal mengambil data user", isLoading: false });
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Terjadi kesalahan koneksi",
        isLoading: false,
      });
    }
  },

  setActiveChild: (child: Child | null) => {
    set({ activeChild: child });
  },

  addChildToState: (child: Child) => {
    set((state) => {
      const updatedChildren = [child, ...state.children];
      return {
        children: updatedChildren,
        activeChild: state.activeChild || child,
      };
    });
  },
}));
