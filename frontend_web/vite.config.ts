import path from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      resolves: [AntdResolve()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.tsx', 'json', 'scss'], // 导入时想要省略的扩展名列表
  },
  envPrefix: 'ENV_',
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]_[local]_[hash:5]',
      // localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        // additionalData: `@import "${path.resolve(
        //   __dirname,
        //   'src/styles/global.scss'
        // )}";`,
      },
    },
  },
  // build configure
  build: {
    outDir: 'dist',
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: 'esbuild',
    // minify: "terser",
    // terserOptions: {
    // 	compress: {
    // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
    // 		drop_debugger: true
    // 	}
    // },
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  // 服务
  server: {
    port: 9090,
    host: 'http://localhost',
    open: true,
    proxy: {
      // '/api/user': {
      //   target: 'http://localhost:8888',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/user, ''),
      // },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
