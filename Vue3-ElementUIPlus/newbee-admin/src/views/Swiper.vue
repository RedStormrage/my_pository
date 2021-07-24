<template>
    <el-card class="swiper-container">
      <template #header>
      <div class="header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
        <el-table
        :load="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="轮播图" width="200" prop="carouselUrl">
            <template #default="scope">
              <img style="width:150px;height:150" :src="scope.row.carouselUrl" alt="轮播图">
            </template>
          </el-table-column>

          <el-table-column label="跳转链接" prop="redirectUrl">
            <template #default="scope">
              <a target="_blank" :href="scope.row.redirectUrl">{{scope.row.redirectUrl}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="carouselRank" label="排序值" width="120"></el-table-column>
          <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination 
        background
        layout="prev，pager，next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
        @size-change="changeSize"/>
    </el-card>
    <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="type"/>
</template>

<script>
import {onMounted,reactive,ref,toRefs} from 'vue'
import axios from '@/utils/axios'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
export default {
    name:'Swiper',
    components: {
      DialogAddSwiper
    },
    setup(){
      const addSwiper = ref(null)
      const state = reactive({
        loading: false, // 控制加载动画
        tableData: [], // 数据列表
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页数据的请求数
        type: 'add', // 操作类型
        total: 0, // 总条数
      })
      // 添加轮播项
      const handleAdd = () => {
        state.type = 'add'
        addSwiper.value.open()
      }
      // 修改轮播项
      const handleEdit = (id) => {
        state.type = 'edit'
        addSwiper.value.open(id)
      }
      onMounted(() => {
        getCarousels()
      })
      // 获取轮播图列表
      const getCarousels = ()=>{
        state.loading = true
        axios.get('/carousels',{
          params:{
            pageNumber: state.currentPage,
            pageSize: state.pageSize
          }
        })
        .then((res)=>{
          if(res.list){
            state.tableData = res.list || [{},{}]
            state.pageSize = res.pageSize
            state.total = res.totalCount
            state.currentPage = res.currPage
            state.loading = false
          }
        })
      }
      const changePage = (val) => {
        state.currentPage = val
        getCarousels()
      } 
      const changeSize = (val) => {
        state.pageSize = val
        getCarousels()
      }
      return {
        ...toRefs(state),
        addSwiper,
        handleAdd,
        handleEdit,
        getCarousels, // 这里将获取列表的接口返回，因为弹窗内部添加后，需要刷新页面
        changePage,
        changeSize,
      }
    }
};
</script>

<style scoped lang="less">
</style>
