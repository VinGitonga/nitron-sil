import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { FiEdit3 } from "react-icons/fi";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppInput from "../app-forms/AppInput";
import { Loader2 } from "lucide-react";
import usePhotoUtils from "@/hooks/usePhotoUtils";
import { toast } from "sonner";

interface EditPhotoTitleModalProps {
	photoId: string;
	currentTitle: string;
	refresh?: VoidFunction;
}

const formSchema = z.object({
	title: z.string({ message: "Title is required" }).min(3, { message: "Title must be at least 3 characters" }),
});

const EditPhotoTitleModal = ({ photoId, currentTitle, refresh }: EditPhotoTitleModalProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const formMethods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { handleSubmit, control, setValue } = formMethods;

	const { updatePhotoTitle } = usePhotoUtils();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);

		const info = {
			photoId,
			title: data.title,
		};

		try {
			const resp = await updatePhotoTitle(info);

			if (resp.status === "success") {
				toast.success("Title updated successfully");
				refresh && refresh();
				setOpen(false);
			} else {
				toast.error("Failed to update title");
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to update title");
		}
	};

	useEffect(() => {
		if (currentTitle) {
			setValue("title", currentTitle);
		}
	}, [currentTitle]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"ghost"} className="rounded-full hover:bg-gray-500">
					<FiEdit3 className="text-gray-200" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] font-inconsolata">
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Edit Title</DialogTitle>
							<DialogDescription>Update the title of the photo below</DialogDescription>
						</DialogHeader>
						<div className="py-4">
							<AppInput name="title" label="Title" control={control} />
						</div>
						<DialogFooter>
							<Button type="submit" disabled={loading}>
								{loading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
								{loading ? "Updating..." : "Update changes"}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export default EditPhotoTitleModal;
