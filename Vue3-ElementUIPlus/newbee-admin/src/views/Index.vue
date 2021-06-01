<template>
  <div><el-button type="primary">提交</el-button></div>
  
</template>

<script>
import {reactive,toRefs} from "vue"
const ENV = import.meta.env
export default{
  name:"App",
  setup() {
   console.log(ENV)
    return {
    }
  }
}
</script>

<style lang="less" scoped>
</style>
