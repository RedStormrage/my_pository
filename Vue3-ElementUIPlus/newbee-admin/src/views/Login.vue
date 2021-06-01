<template>
  <div class="login-body">
    <!--登录框div-->
    <div class="login-container">
      <!--登录框头部logo部分-->
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive,toRefs} from "vue"
 interface dataProps{

 }
export default{
  name: "Login",
  setup() {
   const data = reactive({

   })
   const refData = toRefs(data)
    return {
    }
  }
}
</script>

