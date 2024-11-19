import { UserResponse } from "@/interfaces/user-details";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
  userData: UserResponse | null;
  addUser: (userData: UserResponse) => void;
  removeUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        addUser: (authenticatedUser: UserResponse) =>
          set((state) => ({ userData: authenticatedUser })),
        removeUser: () => set((state) => ({ userData: null })),
      }),
      { name: "user-store" }
    )
  )
);
