import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImport from "vite-plugin-babel-import"
import path from 'path'

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
  plugins: [vue()],
  resolve:{
    alias: {
      '~': path.resolve(__dirname,'./'),
      '@': path.resolve(__dirname,'src')
    },
    extensions:['.vue','.js','.jsx','.json']
  },
  plugin:[vue(),
    vitePluginImport([
      {
        libaryName: 'element-plus',
        libraryDirectory: 'es',
        style(name){
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ])
  ],
  base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx'), // 静态资源路径配置
  server:{
    proxy:{
      '/api':{
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到/api路径的请求，都映射到target属性
        changeOrigin: true,
        rewrite: path=>path.replace(/^\/api/,'') // 重写api为空，就是去掉它
      }
    }
  }
})
