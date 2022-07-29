<template>
  <div style="width: 500px">
    <el-input icon="el-icon-search" v-model="filterText" size="small" placeholder="请输入部门名称"></el-input>
    <el-tree :expand-on-click-node="false" :data="depts" :props="defaultProps" ref="tree"
             :filter-node-method="filterNode">
           <span class="custom-tree-node" slot-scope="{ node, data }"
                 style="display: flex;justify-content: space-between;width: 100%">
        <span>{{ node.label }}</span>
        <span>
          <el-button
              type="primary"
              size="mini"
              style="padding: 2px"
              @click="showAddDeptView(data)">
            添加部门
          </el-button>
          <el-button
              type="danger"
              size="mini"
              style="padding: 2px"
              @click="deleteDepartment(data)">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog
        title="添加部门"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>父部门：</td>
            <td>
              <el-select v-model="dep.parentId" placeholder="请选择">
                <el-option
                    v-for="item in allDepts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>部门名称：</td>
            <td>
              <el-input v-model="dep.name"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDept">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "DepMana",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      dep: {
        name: '',
        parentId: null
      },
      allDepts: [],
      dialogVisible: false,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      depts: []
    }
  },
  mounted() {
    this.initDepts();
  },
  methods: {
    removeDepfromDeps(deps, dep,parent) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if(d.id == dep.id){
        deps.splice(i,1);
        if (parent){
          if (deps.length == 0){
            parent.isParent = false;
          }
        }
        return;
      } else {
          this.removeDepfromDeps(d.children,dep,d);
        }
      }
    },
    deleteDepartment(data) {
      this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (data.isParent) {
          this.$message.error("该部门下有子部门，删除失败");
        } else {
          this.deleteRequest("/system/basic/department/" + data.id).then(resp => {
            if (resp) {
              this.removeDepfromDeps(this.depts,data)
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addDep2Deps(deps, dep) {
      deps.forEach(d => {
        if (d.id == dep.parentId) {
          d.children = d.children.concat(dep);
          return;
        } else {
          this.addDep2Deps(d.children, dep);
        }
      })
    },
    doAddDept() {
      this.postRequest("/system/basic/department/", this.dep).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.dep.name = '';
          this.dep.parentId = null;
          // this.initDepts();
          this.addDep2Deps(this.depts, resp.data);
        }
      })
    },
    showAddDeptView(data) {
      this.initAllDepts();
      this.dep.parentId = data.id;
      this.dialogVisible = true;
    },
    initAllDepts() {
      this.getRequest("/system/basic/department/list").then(resp => {
        if (resp) {
          this.allDepts = resp
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    initDepts() {
      this.getRequest("/system/basic/department/").then(resp => {
        if (resp) {
          this.depts = resp;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
