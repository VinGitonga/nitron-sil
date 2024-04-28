import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppInput from "../app-forms/AppInput";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useAlbumUtils from "@/hooks/useAlbumUtils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { toast } from "sonner";

interface NewAlbumModalProps {
	refresh?: VoidFunction;
}

const formSchema = z.object({
	title: z.string({ message: "Title is required" }).min(3, { message: "Title must be at least 3 characters" }),
});

const NewAlbumModal = ({ refresh }: NewAlbumModalProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const formMethods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { user } = useAuthStore();

	const { saveAlbum } = useAlbumUtils();

	const { handleSubmit, control } = formMethods;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			const resp = await saveAlbum({
				title: data.title,
				userId: user?._id!,
			});

			if (resp?.status === "success") {
				toast.success(resp.msg);
				setLoading(false);
				refresh?.();
				formMethods.reset();
				setOpen(false);
			} else {
				toast.error(resp?.msg || "Failed to save album");
				setLoading(false);
			}
		} catch (err: any) {
			console.error(err);
			toast.error(err?.message || "Failed to save album");
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="rounded-full">Add Album</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] font-inconsolata">
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Add Album</DialogTitle>
							<DialogDescription>Enter the title of the album</DialogDescription>
						</DialogHeader>
						<div className="py-4">
							<AppInput name="title" label="Title" control={control} placeholder="e.g. Vintage Cars" />
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
};

export default NewAlbumModal;
