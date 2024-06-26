import { create } from "zustand";

type AuthStatus = "unknownAuth" | "notAuth" | "isAuth";

interface AuthState {
  authStatus: AuthStatus;
  setAuthStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authStatus: "unknownAuth",
  setAuthStatus: (status: AuthStatus) => set({ authStatus: status }),
}));
