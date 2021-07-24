<template>
  <div class="header">
    <div class="left">
      <span style="font-size:20px;">{{name}}</span>
    </div>
    <div class="right">
      <el-popover 
      placement="bottom"
      :width="320"
      trigger="click"
      popper-class="poper-user-box">
      <template #reference>
        <div class="author">
          <i class="icon el-icon-s-custom"></i>
          {{userInfo && userInfo.nickName || '' }}
          <i class="icon el-icon-caret-bottom"></i>
        </div>
      </template>
      <div class="nickname">
        <p>登录名:{{userInfo && userInfo.loginUserName || ''}}</p>
        <p>昵称:{{userInfo && userInfo.nickName || ''}}</p>
        <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
      </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted,reactive,toRefs} from "vue"
import { useRouter } from 'vue-router'
import axios from "@/utils/axios"
import {localRemove,pathMap} from "@/utils"
export default{
  name:"Header",
  setup(){
    // 获取路由实例
    const router = useRouter()
    const state = reactive({
      name: 'dashboard',
      userInfo: null, // 用户信息变量
    })
    // 初始化执行方法
    onMounted(() => {
      console.log(window.location.hash)
      const pathname = window.location.hash.split('/')[1] || ''
      if(!['login'].includes(pathname)){
        getUserInfo()
      }
    })
    const getUserInfo = async ()=>{
      const userInfo = await axios.get('/adminUser/profile')
      state.userInfo = userInfo
    }
    // 退出登录
    const logout = () => {
      axios.delete('/logout').then(()=>{
        localRemove('token')
        // 登出并跳转到登录页面
        router.push({path:'/login'})
      })
    }
    // 声明路由和title对应的键值对
    // 监听路由变换的方法afterEach
    router.afterEach((to)=>{
      // to 能获取到路由的相关信息
      const {id} = to.query
      state.name = pathMap[to.name]
    })
    return {
      ...toRefs(state),
      logout
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  height: 50px;
  border-bottom:1px solid #e9e9e9;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding:0 20px;
}
.right > div > .icon{
  font-size: 18px;
  margin-right:6px;
}
.author{
  margin-left:10px;
  cursor: pointer;
}
</style>
<style>
  .poper-user-box{
    background:url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat !important;
    background-size:cover!important;
    border-radius:0 !important;
  }
  .poper-user-box .nickname{
    position: reactive;
    color:#fff;
  }
  .poper-user-box .nickname .logout{
    position: absolute;
    right:10px;
    top:10px;
    cursor:pointer;
  }
</style>
