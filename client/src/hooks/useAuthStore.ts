import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthStore {
	user: User | null;
	setUser: (user: User | null) => void;
	clearData: () => void;
}

/**
 * Zustand store for managing user authentication state.
 */

export const useAuthStore = create(
	devtools(
		persist<IAuthStore>(
			(set) => ({
				user: null,
				setUser: (user) => set({ user }),
				clearData: () => set({ user: null }),
			}),
			{
				name: "nitron-auth-store",
			}
		)
	)
);
