<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
    <el-aside class="aside">
      <div class="head">
        <div>
          <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
          <span>Vue3 admin</span>
        </div>
      </div>
      <div class="line"/>
      <el-menu 
      background-color="#222832" 
      text-color="#fff" 
      :router="true" 
      :default-openeds="defaultOpen"
      :default-active="currentPath">
        <el-submenu index="1">
          <template #title>
            <span>Dashboard</span>
          </template>
          <!-- 二级栏目 -->
          <el-menu-item-group>
            <el-menu-item index="/"><i class="el-icon-data-line" />首页</el-menu-item>
            <el-menu-item index="/add"><i class="el-icon-data-line" />添加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <span>首页配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/swiper"><i class="el-icon-picture"></i>轮播图配置</el-menu-item>
            <el-menu-item index="/hot"><i class="el-icon-star-on"></i>热销商品配置</el-menu-item>
            <el-menu-item index="/new"><i class="el-icon-sell"></i>新品上线配置</el-menu-item>
            <el-menu-item index="/recommend"><i class="el-icon-thumb"></i>为你推荐配置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container  class="content">
        <Header />
      <div class="main">
        <router-view />
      </div>
        <Footer />
    </el-container>
    </el-container>
    <el-container v-else class="content">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import {reactive,toRefs} from 'vue';
import {useRouter} from 'vue-router'
import {localGet,pathMap} from '@/utils'
export default {
  name: 'App',
  setup(){
    const noMenu = ['/login']
    const router = useRouter()
    const state = reactive({
      showMenu: true, // 是否需要显示菜单
      defaultOpen:['1','2'],
      currentPath: '/'
    })
    // 监听路由的变化
    router.beforeEach((to, from, next) => {
      if(to.path == '/login'){
        // 如果路径是/login则正常执行
        next()
      }else{
        if(!localGet('token')){
          // 如果没有，则跳至登录页面
          next({path: '/login'})
        }else{
          // 否则继续执行
          next()
        }
      }
      state.showMenu = !noMenu.includes(to.path) // 如果去的页面不包含login这个路径，那么就不显示登陆页面，false就不显示菜单
      state.currentPath = to.path
      document.title = pathMap[to.name]
    })
    return {
      ...toRefs(state)
    }
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style scoped>
  .layout{
    min-height: 100vh;
    background-color: #fff;
  }
  .container{
    height: 100vh;
  }
  .aside{
    width: 200px!important;
    background-color: #222832;
  }
  .head{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
  }
  .head > div{
    display: flex;
    align-items: center;
  }
  .head img{
    width: 50px;
    height: 50px;
    margin-right:10px;
  }
  .head span{
    font-size: 20px;
    color: #fff;
  }
  .line{
    border-top:1px solid hsla(0,0%,100%,.05);
    border-bottom:1px solid rgba(0,0,0,.2)
  }
  .content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>
<style>

body{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
</style>

