
<template>
  <div>
    <h5>活动管理</h5>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "activity_administration",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  mounted () {
    console.log(this.$route)
  },
}
</script> 
<style scoped>

</style>
