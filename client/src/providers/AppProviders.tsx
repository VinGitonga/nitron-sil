import { Toaster } from "@/components/ui/sonner";
import router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

const AppProviders = () => {
	return (
		<HelmetProvider>
			<div className="font-inconsolata">
				<RouterProvider router={router} />
				<Toaster />
			</div>
		</HelmetProvider>
	);
};

export default AppProviders;
