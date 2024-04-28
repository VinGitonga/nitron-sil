import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AppInput from "../app-forms/AppInput";
import { useUpdateUserModalStore } from "@/hooks/useUpdateUserModalStore";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useUserUtils from "@/hooks/useUserUtils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { IUser } from "@/types/User";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	name: z.string({ message: "Name is required" }),
	username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }),
});

function UpdateUsernameModal() {
	const { open, setOpen, userInfo } = useUpdateUserModalStore();
	const { setUser } = useAuthStore();
	const { saveUserDetails, getUserByEmail } = useUserUtils();
	const [loading, setLoading] = useState<boolean>(false);

	const getSavedUserDetails = async (email: string) => {
		try {
			const resp = await getUserByEmail(email);

			if (resp?.status === "success") {
				return resp?.data;
			}

			return null;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const formMethods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			username: "",
		},
	});

	const { handleSubmit, control, setValue } = formMethods;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const userData = {
			name: data.name,
			username: data.username,
			email: userInfo?.email!,
		};
		setLoading(true);
		try {
			const resp = await saveUserDetails(userData);

			if (resp?.status === "success") {
				toast.success("Profile updated successfully");
				const savedUser = await getSavedUserDetails(userInfo?.email!);
				if (savedUser) {
					const newUserInfo = { ...savedUser, photoURL: userInfo?.photoURL } as unknown as IUser;
					setUser(newUserInfo);
					setOpen(false);
				}
			} else {
				setLoading(false);
				toast.error(resp?.msg ?? "An error occurred while saving your details");
			}
		} catch (err: any) {
			setLoading(false);
			toast.error(err?.message ?? "An error occurred while saving your details");
		}
	};

	/**
	 * Set the form values to the user's current values when the modal is opened
	 */
	useEffect(() => {
		if (userInfo) {
			const { displayName: name, email } = userInfo;
			setValue("name", name || "");
			setValue("username", email!.split("@")[0]);
		}
	}, [userInfo]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px] font-inconsolata">
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
						</DialogHeader>
						<div className="py-4 space-y-3">
							<AppInput label="Username" name="username" placeholder="Enter your username" control={control} />
							<AppInput label="Name" name="name" placeholder="Enter your name" control={control} />
						</div>
						<DialogFooter>
							<Button type="submit" disabled={loading}>
								{loading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
								{loading ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateUsernameModal;
