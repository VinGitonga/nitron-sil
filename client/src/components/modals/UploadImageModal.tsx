import { ChangeEvent, useDeferredValue, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { CloudUploadIcon, TrashIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import AppInput from "../app-forms/AppInput";
import { Badge } from "../ui/badge";
import { getFilenameWithoutExtension, getFileSize } from "@/lib/utils";
import { Progress } from "../ui/progress";
import isURL from "validator/lib/isURL";
import { toast } from "sonner";

const UploadImageModal = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [uploadType, setUploadType] = useState<"url" | "upload">("url");

	const [photoUrl, setPhotoUrl] = useState<string>("");
	const [photoTitle, setPhotoTitle] = useState<string>("");

	const deferredPhotoUrl = useDeferredValue(photoUrl);

	const pickerRef = useRef<HTMLInputElement>(null);
	const [photoImageData, setPhotoImageData] = useState<File | null>(null);
	const [photoImage, setPhotoImage] = useState<ArrayBuffer | string | null>(null);
	const [uploadPhotoTitle, setUploadPhotoTitle] = useState<string>("");
	const [uploadProgress, setUploadProgress] = useState<number>(80);
	const [isUploading, setIsUploading] = useState<boolean>(true);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = () => {
				if (!reader.result) return;

				setPhotoImage(reader.result);
				setPhotoImageData(file);
				setUploadPhotoTitle(getFilenameWithoutExtension(file.name));
			};
		}
	};

	const onRemovePhoto = () => {
		setPhotoImageData(null);
		setPhotoImage(null);
		setUploadPhotoTitle("");
	};

	const uploadPhoto = async () => {
		if (uploadType === "url") {
			// upload photo from url
			// check if url is valid
			if (!isURL(photoUrl)) {
				toast.error("Invalid URL");
				return;
			}

			// check if the title is not empty
			if (!photoTitle) {
				toast.error("Photo title is required");
				return;
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="rounded-full" variant={"outline"}>
					<CloudUploadIcon className="w-6 h-6 mr-2" />
					Upload Photo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px] font-inconsolata">
				<DialogHeader>
					<DialogTitle>Upload Photo</DialogTitle>
					<DialogDescription>Enter photo url or Select a photo from your device to upload</DialogDescription>
				</DialogHeader>
				<div className="pt-2 pb-4">
					<div className="flex flex-col space-y-2">
						<Label>Would you like to upload a photo or use a URL?</Label>
						<RadioGroup defaultValue="url" value={uploadType} onValueChange={(val) => setUploadType(val as any)}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="upload" id="r1" />
								<Label htmlFor="r1">Upload</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="url" id="r2" />
								<Label htmlFor="r2">Use URL</Label>
							</div>
						</RadioGroup>
					</div>
					{uploadType === "url" && (
						<div className="mt-3 space-y-3">
							<AppInput name="photoUrl" label="Photo URL" placeholder="Enter photo url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
							{deferredPhotoUrl && <img src={deferredPhotoUrl} alt="preview" className="w-full h-60 object-cover rounded-lg" />}
							<AppInput name="photoTitle" label="Photo Title" placeholder="Enter photo title" value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} />
						</div>
					)}
					{uploadType === "upload" && (
						<div className="mt-4">
							<>
								{!photoImageData && (
									<Button className="w-full" onClick={() => pickerRef.current?.click()}>
										<CloudUploadIcon className="w-6 h-6 mr-2" /> Upload
									</Button>
								)}
								<input type="file" ref={pickerRef} className="hidden" accept="image/*" onChange={handleFileChange} />
								{photoImageData && (
									<div>
										<img src={photoImage as string} alt="preview" className="mt-4 w-full h-60 object-cover rounded-lg" />
										{isUploading && (
											<div className="mt-2">
												<Progress value={uploadProgress} />
												<p className="text-sm">
													Uploading {photoImageData.name} - {uploadProgress}%
												</p>
											</div>
										)}
										<div className="flex items-center justify-between my-2">
											<Badge>{getFileSize(photoImageData.size)}</Badge>
											<Button size={"sm"} variant="destructive" className="rounded-full" onClick={onRemovePhoto}>
												<TrashIcon className="w-4 h-4 mr-2" />
												Remove
											</Button>
										</div>
										<AppInput name="uploadPhotoTitle" label="Photo Title" placeholder="Enter photo title" value={uploadPhotoTitle} onChange={(e) => setUploadPhotoTitle(e.target.value)} />
									</div>
								)}
							</>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button>Submit</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadImageModal;
