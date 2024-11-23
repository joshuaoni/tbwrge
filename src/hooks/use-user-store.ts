import { UserResponse } from "@/interfaces/user-details";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
  isLoading: boolean;
  userData: {
    user: UserResponse | null;
    token: string | null;
  } | null;
  addUser: ({}: any) => void;
  removeUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        userData: {
          user: null,
          token: null,
        },
        isLoading: true,
        addUser: ({
          authenticatedUser,
          token,
        }: {
          authenticatedUser: UserResponse;
          token: string;
        }) =>
          set((state) => ({
            userData: {
              user: authenticatedUser,
              token,
            },
            isLoading: false,
          })),
        removeUser: () =>
          set((state) => ({
            userData: null,
            isLoading: false,
          })),
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
