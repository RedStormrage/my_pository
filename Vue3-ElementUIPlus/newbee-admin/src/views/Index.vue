<template>
  <el-card class="introduce">
    <div class="order">
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>今日订单数</span>
          </div>
        </template>
        <div class="item">1888</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>今日日活</span>
          </div>
        </template>
        <div class="item">9527</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>转化率</span>
          </div>
        </template>
        <div class="item">20%</div>
      </el-card>
    </div>
    <div id="zoom"></div>
  </el-card>
  
</template>

<script>
import {onMounted , onUnmounted} from 'vue'
let myChart = null
const ENV = import.meta.env
export default{
  name:"Index",
  setup() {
    onMounted(() => {
      console.log(window.echarts)
      if(window.echarts){
        // 基于准备好的dom，初始化echarts实例
        myChart = window.echarts.init(document.getElementById('zoom'))

        // 指定图标配置项和数据
        const option = {
          title:{
            text: '系统折线图'
          },
          tooltip: {
            trigger:'axis',
            axisPointer:{
              type:'cross',
              label:{
                backgroundColor:'#6a7985'
              }
            }
          },
          legend: {
            data:['新增注册','付费用户','活跃用户','订单数','当日总收入'],
          },
          toolbox:{
            feature:{
              saveAsImage:{}
            }
          },
          grid:{
            left: '3%',
            right: '4%',
            bottom: '3%',
            containerLabel: true
          },
          xAxis:[
            {
              type: 'category',
              boundaryGap: false,
              data:['2021-3-11','2021-3-12','2021-3-13','2021-3-14','2021-3-15','2021-3-16','2021-3-17']
            }
          ],
          yAxis:[
            {
              type: 'value',
            }
          ],
          series:[
            {
              name: '新增注册',
              type: 'line',
              stack: '总量',
              areaStyle:{},
              emphasis:{
                focus: 'series'
              },
              data:[120,132,101,134,90,230,210]
            },
            {
              name:'付费用户',
              type: 'line',
              stack:'总量',
              label:{},
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'活跃用户',
              type: 'line',
              stack:'总量',
              label:{},
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '当日总收入',
              type: 'line',
              stack: '总量',
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }

        // 使用杠指定的配置和数据显示图表
        myChart.setOption(option)
      }
    })
    onUnmounted(() => {
      myChart.dispose()
    })
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.introduce .order{
  display: flex;
  margin-bottom: 50px;
}
.introduce .order .order-item {
  flex: 1;
  margin-right:20px;
}
.introduce .order .order-item:last-child{
  margin-right: 0;
}
#zoom{
  min-height: 300px;
}
</style>
