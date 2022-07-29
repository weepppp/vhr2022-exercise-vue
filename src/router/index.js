import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Home  from "@/views/Home"
import BasicInfo from "@/views/BasicInfo"
import DataBak from "@/views/DataBak"
import LogMana from "@/views/LogMana"
import UserConfig from "@/views/UserConfig"
import Chat from "@/views/Chat"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    path: '/home',
    name: '首页',
    component: Home,
    hidden: true
  }, {
    path: '/chat',
    name: '聊天',
    component: Chat,
    hidden: true
  }, {
    path: '/home',
    name: '用户管理',
    component: Home,
    meta:{
      icon: 'el-icon-user'
    },
    children:[
      {
        path: '/basicinfo',
        name: '基本信息',
        component: BasicInfo
      },{
        path: '/userconfig',
        name: '用户配置',
        component: UserConfig
      }
    ]
  },{
    path: '/home',
    name: '系统管理',
    component: Home,
    meta:{
      icon: 'el-icon-s-grid'
    },
    children:[
      {
        path: '/logmana',
        name: '日志管理',
        component: LogMana
      },{
        path: '/databak',
        name: '数据备份',
        component: DataBak
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
