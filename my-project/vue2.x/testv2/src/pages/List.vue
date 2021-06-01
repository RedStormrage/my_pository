
<template>
  <div>
    <h3>活动列表</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "List",
  mounted () {
    console.log(this.$route)
  },
}
</script> 
<style scoped>

</style>
