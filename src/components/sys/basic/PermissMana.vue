<template>
  <div>
    <el-collapse v-model="activeName" accordion style="width: 500px" @change="roleChange">
      <el-collapse-item :title="role.nameZh" :name="role.name" v-for="(role,index) in roles" :key="index">
        <div>
          <el-tree
              :data="menus"
              show-checkbox
              node-key="id"
              :default-checked-keys="selectedMenus"
              ref="tree"
              :props="defaultProps">
          </el-tree>
          <div style="display: flex;justify-content: flex-end">
            <el-button size="mini">取消修改</el-button>
            <el-button size="mini" type="primary" @click="updateRoleMenu(role.id,index)">确认修改</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {
    return {
      activeName: '',
      selectedMenus: [],
      roles: [],
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    updateRoleMenu(rid,index) {
      let checkedKeys = this.$refs.tree[index].getCheckedKeys();
      let url = '/system/basic/role/?rid=' + rid;
      checkedKeys.forEach(key=>{
        url += '&mid=' + key;
      })
      this.putRequest(url).then(resp=>{
        if (resp) {
          this.initRoles();
        }
      });
    },
    roleChange(name) {
      if (name) {
        this.initMenus();
        this.loadSelectedMenus(name);
      }
    },
    loadSelectedMenus(name) {
      this.getRequest("/system/basic/role/selectedMenus?name="+name).then(resp=>{
        if (resp) {
          this.selectedMenus = resp;
        }
      })
    },
    initMenus() {
      this.getRequest("/system/basic/role/menus").then(resp=>{
        if (resp) {
          this.menus = resp;
        }
      })
    },
    initRoles() {
      this.getRequest("/system/basic/role/").then(resp => {
        if (resp) {
          this.roles = resp;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
