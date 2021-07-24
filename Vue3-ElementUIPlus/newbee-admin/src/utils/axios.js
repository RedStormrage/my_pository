import axios from 'axios'
import router from '@/router/index'
// 引入设置好的config对象
import config from '~/config'
import {ElMessage } from 'element-plus'
import {localGet} from './index'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带cookie，对目前的项目没有什么作用，因为我们是token鉴权
axios.defaults.withCredentials = true
// 请求头，headers信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认post请求，使用application/json形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res=>{
  if(typeof res.data !== 'object'){
    ElMessage.error('服务器异常！')
    // 返回一个失败的promise
    return Promise.reject(res)
  }
  // 如果返回的code不是200
  if(res.data.resultCode != 200){
    // 有响应的信息，我就弹出响应的信息
    if(res.data.message) ElMessage.error(res.data.message)
    if(res.data.resultCode === 419){
      console.log(res.data.resultCode)
      // 如果code等于419就让他去登录界面
      router.push({ path: '/login'})
    }
    // 反正只要不是200的code就是失败的
    return Promise.reject(res.data)
  }
  return res.data.data
})

// 将封装的axios暴露出去
export default axios