import { createApp } from 'vue'
import App from './App.vue'
import {ElButton,ElContainer,ElAside,ElMenu,ElMenuItemGroup,ElMenuItem,ElSubmenu,ElForm,ElFormItem,ElCheckbox
} from 'element-plus'
import router from '@/router'
// import 'element-plus/lib/theme-chalk/index.css'
import '~/theme/index.css'
const app = createApp(App) // 生成Vue 实例app

app.use(router) // 引用路由实例
app.use(ElButton).use(ElContainer).use(ElAside).use(ElSubmenu).use(ElMenu).use(ElMenuItemGroup).use(ElMenuItem) // 引用ele插件
app.mount('#app') // 挂载到#app
