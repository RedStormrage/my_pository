import { createApp } from 'vue'
import App from './App.vue'
import {
  ElButton,
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubmenu,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElPopover,
  ElTag,
  ElCard,
  ElTable,
  ElUpload,
  ElDialog,
  ElPagination,
  ElTableColumn,
  ElPopconfirm
} from 'element-plus'
import router from '@/router'
// import 'element-plus/lib/theme-chalk/index.css'
import '~/theme/index.css'
const app = createApp(App) // 生成Vue 实例app

app.use(router) // 引用路由实例
app.use(ElButton)// 引用ele插件
.use(ElContainer)
.use(ElAside)
.use(ElSubmenu)
.use(ElMenu)
.use(ElMenuItemGroup)
.use(ElMenuItem) 
.use(ElForm)
.use(ElFormItem)
.use(ElCheckbox)
.use(ElInput)
.use(ElPopover)
.use(ElTag)
.use(ElCard)
.use(ElTable)
.use(ElTableColumn)
.use(ElUpload)
.use(ElDialog)
.use(ElPagination)
.use(ElPopconfirm)
app.mount('#app') // 挂载到#app
