<template>
  <div class="header">
    <div class="left">
      <span style="font-size:20px;">{{name}}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script lang="ts">
import {reactive,toRefs} from "vue"
import { useRouter } from 'vue-router'
 interface dataProps{

 }
export default{
  name:"Header",
  setup(){
    // 获取路由实例
    const router = useRouter()
    // 声明路由和title对应的键值对
    const pathMap = {
      index:'首页',
      add:'添加商品'
    }
    const state = reactive({
      name:'首页'
    })
    // 监听路由变换的方法afterEach
    router.afterEach((to)=>{
      console.log(to)
      // to 能获取到路由的相关信息
      const {id} = to.query
      state.name = pathMap[to.name]
    })
    return {
      ...toRefs(state)
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
</style>
