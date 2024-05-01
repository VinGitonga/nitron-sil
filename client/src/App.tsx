import { useEffect } from "react";
import AppProviders from "./providers/AppProviders";
import { getSerwist } from "virtual:serwist";

const App = () => {
	useEffect(() => {
		/**
		 * Load the service worker and register it
		 */
		const loadSerwist = async () => {
			if ("serviceWorker" in navigator) {
				const serwist = await getSerwist();

				serwist?.addEventListener("installed", () => {
					console.log("Service Worker Installed");
				});

				void serwist?.register();
			}
		};

		loadSerwist();
	}, []);
	return <AppProviders />;
};

export default App;
