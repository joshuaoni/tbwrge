import { UserResponse } from "@/interfaces/user-details";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface IUserStore {
  isLoading: boolean;
  isHydrated: boolean;
  userData: {
    user: UserResponse | null;
    token: string | null;
  } | null;
  addUser: ({}: any) => void;
  removeUser: () => void;
  updateUser: (updates: Partial<UserResponse>) => void;
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
        isHydrated: false,
        addUser: ({
          authenticatedUser,
          token,
        }: {
          authenticatedUser: UserResponse;
          token: string;
        }) => {
          // Set user role in cookie
          Cookies.set("userRole", authenticatedUser.role, {
            expires: 7, // 7 days
            path: "/",
            sameSite: "strict",
          });

          return set((state) => ({
            userData: {
              user: authenticatedUser,
              token,
            },
            isLoading: false,
            isHydrated: true,
          }));
        },
        removeUser: () => {
          // Remove user role cookie
          Cookies.remove("userRole", { path: "/" });

          return set((state) => ({
            userData: null,
            isLoading: false,
            isHydrated: true,
          }));
        },
        updateUser: (updates: Partial<UserResponse>) => {
          return set((state) => ({
            userData: state.userData
              ? {
                  ...state.userData,
                  user: state.userData.user
                    ? {
                        ...state.userData.user,
                        ...updates,
                      }
                    : null,
                }
              : null,
          }));
        },
      }),
      {
        name: "candivet-user-store",
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isLoading = false;
            state.isHydrated = true;
          }
        },
      }
    )
  )
);
