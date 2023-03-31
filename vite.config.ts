import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"), // 根路径
      "@": path.resolve(__dirname, "src"), // src 路径
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3001,
    host: "0.0.0.0",
    open: false,
    proxy: {
      "/api": {
        // 接口是自己用node搭的，中转了一下，你也可以直接使用 腾讯或阿里的 cos sdk
        target: "http://localhost:9527",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
