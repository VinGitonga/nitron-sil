import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";

/**
 * Initiliaze the application routes
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
]);

export default router;
