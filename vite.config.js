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
        project4: resolve(__dirname, "./Project4/index4.html"),
        project5: resolve(__dirname, "./Project5/index5.html"),
        project6: resolve(__dirname, "./Project6/index6.html"),
        project7: resolve(__dirname, "./Project7/index7.html"),
      },
    },
  },
});
 