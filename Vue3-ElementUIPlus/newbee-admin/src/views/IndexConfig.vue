<template>
  <el-card class="index-container">
    <el-table 
    :loading="loading" 
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column prop="configName" label="商品名称"></el-table-column>
    <el-table-column label="跳转链接">
      <template #default="scope">
        <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="configRank" label="排序值" width="120"></el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <a style="cursor: pointer; margin-right:10px" @click="handleEdit(scope.row.configId)">修改</a>
        <el-popconfirm 
        title="确定要删除吗？" 
        confirmButtonText="确定" 
        cancelButtonText="取消" 
        @confirm="handleDeleteOne(scope.row.configId)">
          <template #reference>
            <a style="cursor: pointer">删除</a>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev,pager,next"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="changePage">
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, onUnmounted,reactive,ref,toRefs} from "vue"
import axios from "@/utils/axios"
// 定义类型参数
const configTypeMap = {
    hot: 3,
    new: 4,
    recommend: 5
  }
export default{
  name:"IndexConfig",
  setup() {
   const router = useRouter()
   const route = useRoute()
   const state = reactive({
     loading: false,
     tableData: [], // 数据列表
     total: 0, // 总条数
     currentPage: 1, // 当前页
     pageSize: 10, // 分页大小
     type: 'add', // 操作类型
     configType: 3, // 3 (首页)热销商品 4(首页)新品上线 5(首页)为你推荐
   })
   // 监听路由变化
   const unWatch = router.beforeEach((to) => {
     console.log(to.name)
     if(['hot','new','recommend'].includes(to.name)){
       state.configType = configTypeMap[to.name]
       state.currentPage = 10
       getIndexConfig()
     }
   })
   // 初始化
   onMounted(() => {
     state.configType = configTypeMap[route.name]
     getIndexConfig()
   })
  //  首页热销商品列表
  const getIndexConfig = () => {
    state.loading = true
    axios.get('/indexConfigs',{
      params:{
        pageNumber: state.currentPage,
        pageSize: state.pageSize, 
        configType: state.configType
        }})
        .then((res)=>{
          state.tableData = res.list
          state.total = res.totalCount
          state.currentPage = res.currPage
          state.loading = false
        })
  }
  const changePage = (val) => {
    state.currentPage = val
    getIndexConfig()
  }
   onUnmounted(()=>{
     console.log()
    //  unWatch()
   })
     return {
       ...toRefs(state),
       getIndexConfig,
       changePage
     }
  }
}
</script>

<style lang="less" scoped>
</style>
