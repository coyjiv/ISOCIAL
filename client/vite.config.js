import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    // visualizer(),
    sentryVitePlugin({
      org: 'isocial',
      project: 'javascript-react',
    }),
  ],

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },

  build: {
    sourcemap: true,
  },
})
