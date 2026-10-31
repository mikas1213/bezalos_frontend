/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'process.env': {},
	},
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			'/sitemap.xml': {
				target: 'http://localhost:3003',
				changeOrigin: true,
			},
			'/api': {
				target: 'http://localhost:3003',
				changeOrigin: true,
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 2600,
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		coverage: {
			// Netestuoti failai irgi įskaičiuojami (0 %), kitaip procentas rodytų tik testų paliestus failus.
			include: ['src/**/*.{js,jsx,ts,tsx}'],
			exclude: ['src/test/**'],
		},
	},
});
