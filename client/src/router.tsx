import { createBrowserRouter } from "react-router-dom";
import NewLandingPage from "./pages/NewLandingPage";
import AppLayout from "./layouts/AppLayout";
import NewHome from "./pages/NewHome";
import Photos from "./pages/Photos";
import NewAlbums from "./pages/NewAlbums";

/**
 * setup the application routes
 */
const router = createBrowserRouter([
	{
		path: "/",
		element: <NewLandingPage />,
	},
	{
		path: "home",
		element: <AppLayout />,
		children: [
			{
				path: "",
				element: <NewHome />,
			},
			{
				path: "photos",
				element: <Photos />,
			},
			{
				path: "albums",
				element: <NewAlbums />,
			},
		],
	},
]);

export default router;
