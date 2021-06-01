import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue';
import Manage from '../pages/Manage.vue';
import List from '../pages/List.vue';
// import Test from '../pages/Test.vue';

// import Home from '../components/Home.vue';
// import Manage from '../components/Manage.vue';
// import List from '../components/List.vue';

Vue.use(VueRouter)

const routes = [
  // 第一级 
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [
      // 第二级
      {
        path: 'manage',
        name: 'Manage',
        component: Manage,
        meta: {
          title: '活动管理',
        },
        children: [
          // 第三级
          {
            path: 'list',
            name: 'List',
            component: List,
            meta: {
              title: '活动列表',
            },
          },
          // 第三级
          // {
          //   path: 'test',
          //   name: 'Test',
          //   component: Test,
          //   meta: {
          //     title: '测试',
          //   },
          // },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes
})

export default router
