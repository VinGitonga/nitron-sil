import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:5173",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	env: {
		// @ts-expect-error
		testingEmail: process.env.TESTING_USER_EMAIL,
		// @ts-expect-error
		apiUrl: process.env.VITE_API_BASE_URL,
	}
});
