import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      babelConfig: {
        plugins: ["module:@locator/babel-jsx"],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["eslint4b"],
  },
});
