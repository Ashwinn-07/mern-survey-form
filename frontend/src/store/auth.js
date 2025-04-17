import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        sessionStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
