import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { serwist } from "@serwist/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		serwist({
			swSrc: "src/sw.ts",
			swDest: "sw.js",
			globDirectory: "dist",
			injectionPoint: "self.__SW_MANIFEST",
			rollupFormat: "iife",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
