
<template>
<el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="breadItem in breadCrumbList" :key="breadItem.path">{{breadItem.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  // 计算属性
  computed: {
    breadCrumbList(){
      return this.$route.matched
    }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>

</style>
