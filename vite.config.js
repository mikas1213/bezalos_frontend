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
});
