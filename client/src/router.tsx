import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";

/**
 * setup the application routes
 */
const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/get-started",
		element: <GetStarted />,
	},
	{
		path: "/home",
		element: <HomeLayout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
		],
	},
]);

export default router;
