import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from 'vite-plugin-eslint';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return  defineConfig({
    base: "/",
    plugins: [react(), eslint()],
    preview: {
      port: process.env.VITE_PORT,
      strictPort: true,
    },
    server: {
      port: process.env.VITE_PORT,
      strictPort: true,
      host: true,
      origin: `http://0.0.0.0:${process.env.VITE_PORT}`,
    },
  });
}