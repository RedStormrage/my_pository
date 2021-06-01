<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Home /> -->
    <!-- <el-button type="primary">Start</el-button> -->
    <Bread />
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './activity'
import Bread from "../src/pages/Bread.vue"
// import Activity_detail from "../src/activity/activity_detail/index.vue"
// import Activity_list from "../src/activity/activity_list/index.vue"

export default {
  name: 'App',
  mounted() {
    console.log(this.$route)
  },
  computed:{
  },
  components: {
    // HelloWorld
    // Home
    // Activity_administration,
    // Activity_detail,
    // Activity_list
    Bread
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
