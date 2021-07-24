<template>
  <el-dialog
  :title="type == 'add' ? '添加商品' : '修改商品'"
  v-model="visible"
  width="400px">
  <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="100px" class="good-form">
    <el-form-item label="商品名称" prop="name">
      <el-input type="text" v-model="ruleForm.name"></el-input>
    </el-form-item>
  </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {reactive,toRefs} from "vue"
 interface dataProps{

 }
export default{
  name:"App",
  setup() {
   const data = reactive({

   })
   const refData = toRefs(data)
    return {
    }
  }
}
</script>

<style lang="less" scoped>
</style>
