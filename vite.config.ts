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
import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/postcss'

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
    // 把svg作为组件引入
    svgLoader(),
    // 自动引入element-plus
    AutoImport({
      dts: '.temp/auto-imports.d.ts', // 生成到临时目录
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 组件目录，自动扫描
      dirs: ['src/components'],

      // 自动生成类型声明文件
      dts: '.temp/components.d.ts', // 生成到临时目录

      // 解析器：Element Plus 组件
      resolvers: [ElementPlusResolver()],

      // 包含的文件类型
      extensions: ['vue'],

      // 排除的文件
      exclude: [/node_modules/, /\.git/],

      // 深度导入
      deep: true,

      // 目录作为命名空间
      directoryAsNamespace: false,

      // 全局组件
      globalNamespaces: [],

      // 指令自动导入
      directives: true,
    }),
  ],
  /* 解析 */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js', // 添加 Vue 别名
    },
  },
  /* scss全局变量的配置 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  /* iconify */
  optimizeDeps: {
    include: [
      '@iconify/vue',
      '@iconify-json/ep', // 预构建图标集
    ],
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
