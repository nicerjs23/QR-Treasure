import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@routes": path.resolve(__dirname, "src/routes"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@layout": path.resolve(__dirname, "src/layout"),
        },
    },
});
