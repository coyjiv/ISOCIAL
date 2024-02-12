/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
// import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  // resolve: {
  //   alias: {
  //     "@": resolve(__dirname, "./src"),
  //   },
  // },
})
