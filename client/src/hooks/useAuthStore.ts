import { IUser } from "@/types/User";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthStore {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
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

// Expose the store to Cypress for testing purposes
// @ts-ignore
if(window.Cypress){
	// @ts-ignore
	window.authStore = useAuthStore;
}