<template>
  <div>
    <el-container>
      <el-header style="background-color: #10b6ff;display: flex;align-items: center;justify-content: space-between">
        <div style="font-family: 华文行楷;font-size: 30px;">XXX人事管理系统</div>
        <div>
          <el-dropdown @command="handleCmd">
  <span class="el-dropdown-link" style="display: flex;align-items: center;cursor: pointer">
    {{ hr.name }}<i>
    <img style="width: 48px;height: 48px;border-radius: 24px" :src="hr.userface" alt="">
  </i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting">系统设置</el-dropdown-item>
              <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index+''" v-for="(menu,index) in menus" v-if="!menu.hidden" :key="index">
              <template slot="title">
                <i :class="menu.icon" style="color: #10b6ff;margin-right: 8px"></i>
                <span>{{ menu.name }}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child,indexj) in menu.children" :key="indexj">{{
                  child.name
                }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="font-size: 30px;font-family: 华文行楷;color: red;display: flex;justify-content: center;margin-top: 200px;" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到XXX人事管理系统！
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      hr: JSON.parse(sessionStorage.getItem("hr"))
    }
  },
  computed: {
    menus() {
      return this.$store.state.menus;
    }
  },
  /**
   * 这个生命周期方法，在当前 vue 文件加载的时候会被自动调用
   */
  mounted() {
    // this.initMenu();
  },
  methods: {

    /**
     * 初始化菜单的方法
     */
    initMenu() {
      this.getRequest("/menus").then(resp => {
        //将服务端返回的 JSON 字符串中的 component 字符串变为一个 component 变量/对象
        let fmtMenus = this.formatMenu(resp);
        //1. 根据这个处理好的路由去渲染菜单（其实直接根据服务端返回的 JSON 也能渲染菜单）
        this.menus = fmtMenus;
        //2. 将之添加到 router 对象中，将来页面跳转的时候会用到
        this.$router.addRoutes(fmtMenus);
      })
    },
    /**
     * 格式化 component
     */
    formatMenu(menus) {
      let formatMenus = [];
      menus.forEach(menu => {
        // let id = menu.id;
        // let path = menu.path;
        let {
          path,
          component,
          name,
          iconCls,
          children
        } = menu;
        if (children && children instanceof Array) {
          //说明这个菜单项是有子菜单的，那么子菜单中的 component 也需要处理
          children = this.formatMenu(children);
        }
        let fMenu = {
          path: path,
          name: name,
          icon: iconCls,
          children: children,
          component(resolve) {
            if (component == 'Home') {
              require(['./Home.vue'], resolve);
            } else if (component.startsWith("Emp")) {
              require(['./emp/' + component + '.vue'], resolve);
            } else if (component.startsWith("Per")) {
              require(['./per/' + component + '.vue'], resolve);
            } else if (component.startsWith("Sal")) {
              require(['./sal/' + component + '.vue'], resolve);
            } else if (component.startsWith("Sta")) {
              require(['./sta/' + component + '.vue'], resolve);
            } else if (component.startsWith("Sys")) {
              require(['./sys/' + component + '.vue'], resolve);
            }
          }
        };
        formatMenus.push(fMenu);
      })
      return formatMenus;
    },

    /*menuSelect(index, indexPath) {
      this.$router.push(index);
    },*/
    /**
     * 这个方法有一个默认的参数，参数值就是每一个菜单项的 command 属性的值
     * @param cmd
     */
    handleCmd(cmd) {
      if (cmd == 'logout') {
        //注销登录
        this.$confirm('是否注销登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //执行注销登录
          this.getRequest("/logout");
          //删除sessionStorage 中的数据
          window.sessionStorage.removeItem("hr");
          //跳转到项目登录页面
          this.$router.replace("/");
          //3. 清空 Vuex 中的菜单数据
          this.$store.commit('SET_MENUS', []);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
