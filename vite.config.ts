import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  /* 使用插件 */
  plugins: [
    // vue
    vue(),
    // vue开发者工具
    vueDevTools(),
    // mock工具
    viteMockServe({
      enable: true,
    }),
    // svg
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    // 自动引入element-plus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  /* 解析 */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /* scss全局变量的配置 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
  /* 代理服务器 */
  // server: {
  //   proxy: {
  //     [env.VITE_APP_BASE_API]: {
  //       // 目标服务器地址
  //       target: env.VITE_SERVE,
  //       // 需要开启代理服务器
  //       changeOrigin: true,
  //       // 路径重写：去掉路径前的api字段
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
