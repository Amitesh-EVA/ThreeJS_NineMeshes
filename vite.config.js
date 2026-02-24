import { defineConfig } from "vite";
import { resolve } from "path";
 
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        project1: resolve(__dirname, "./Project1/index1.html"),
        project2: resolve(__dirname, "./Project2/index2.html"),
        project3: resolve(__dirname, "./Project3/index3.html"),
      },
    },
  },
});
 