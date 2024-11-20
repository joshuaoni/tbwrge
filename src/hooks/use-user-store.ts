import { UserResponse } from "@/interfaces/user-details";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
  isLoading: boolean;
  userData: UserResponse | null;
  addUser: (userData: UserResponse) => void;
  removeUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        userData: null,
        isLoading: true,
        addUser: (authenticatedUser: UserResponse) =>
          set((state) => ({ userData: authenticatedUser, isLoading: false })),
        removeUser: () =>
          set((state) => ({ userData: null, isLoading: false })),
      }),
      {
        name: "candivet-user-store",
        onRehydrateStorage: () => (state) => {
          if (state?.userData) {
            state.isLoading = false;
          }
        },
      }
    )
  )
);
