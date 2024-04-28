import { User } from "firebase/auth";
import { create } from "zustand";

interface IUpdateUserModalStore {
	open: boolean;
	setOpen: (open: boolean) => void;
	userInfo: User | null;
	setUserInfo: (userInfo: User | null) => void;
}

/**
 * Zustand store for managing the state of the update user modal.
 */
export const useUpdateUserModalStore = create<IUpdateUserModalStore>((set) => ({
	open: false,
	setOpen: (open) => set({ open }),
	userInfo: null,
	setUserInfo: (userInfo) => set({ userInfo }),
}));
