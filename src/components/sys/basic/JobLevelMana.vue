<template>
  <div>
    <div>
      <el-input
          placeholder="请输入职称名称"
          style="width: 250px"
          suffix-icon="el-icon-plus"
          @keydown.enter.native="addPosition1"
          v-model="jobLevel.name">
      </el-input>
      <el-select v-model="value" @change="queryTitleLevel($event)" placeholder="请选择职称级别">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" @click="addPosition1">添加</el-button>
    </div>
    <div>
      <el-table
          :data="jobLevels"
          stripe
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
            width="150">
        </el-table-column>
        <!--      下面是4个可选项-->
        <el-table-column
            prop="titleLevel"
            label="职称级别"
            width="150">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
        </el-table-column>
        <el-table-column
            label="是否启用">
          <template slot-scope="scope">
            <el-switch
                @change="enabledChange1(scope.row)"
                v-model="scope.row.enabled"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="min" @click="showEditPositionView1(scope.row)">编辑</el-button>
            <el-button size="min" type="danger" @click="deletePosition1(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="编辑职称"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>职称名称：</td>
            <td>
              <el-input v-model="editPos.name"></el-input>
            </td>
          </tr>
          <tr>
            <td>职称等级：</td>
            <el-select v-model="value1" @change="updateTitleLevel($event)" placeholder="请选择职称级别">
              <el-option
                  v-for="item in options1"
                  :key="item.value1"
                  :label="item.label"
                  :value="item.value1">
              </el-option>
            </el-select>
          </tr>
          <tr>
            <td>是否启用：</td>
            <td>
              <el-switch
                  v-model="editPos.enabled"
                  active-text="启用"
                  inactive-text="禁用">
              </el-switch>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdatePosition1">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JobLevelMana",
  data() {
    return {
      dialogVisible: false,
      jobLevels: [],
      jobLevel: {
        name: '',
        titleLevel: ''
      },
      editPos: {},
      options: [{
        value: '选项1',
        label: '正高级'
      }, {
        value: '选项2',
        label: '副高级'
      }, {
        value: '选项3',
        label: '中级'
      }, {
        value: '选项4',
        label: '初级'
      }, {
        value: '选项5',
        label: '员级'
      }],
      value: '',
      options1: [{
        value1: '选项1',
        label: '正高级'
      }, {
        value1: '选项2',
        label: '副高级'
      }, {
        value1: '选项3',
        label: '中级'
      }, {
        value1: '选项4',
        label: '初级'
      }, {
        value1: '选项5',
        label: '员级'
      }],
      value1: ''
    }

  },
  mounted() {
    this.initPositions1();
  },
  methods: {
    queryTitleLevel(id) {
      let obj = {};
      obj = this.options.find((item)=>{
        return item.value === id;
      });
     this.jobLevel.titleLevel = obj.label;
    },
    updateTitleLevel(id){
      let obj = {};
      obj = this.options1.find((item)=>{
        return item.value1 === id;
      });
       this.editPos.titleLevel= obj.label;
    },
    initPositions1() {
      this.getRequest("/system/basic/jobLevel/").then(resp => {
        if (resp) {
          this.jobLevels = resp;
        }
      })
    },
    addPosition1() {
      this.postRequest("/system/basic/jobLevel/", this.jobLevel).then(resp => {
        if (resp) {
          this.jobLevel.name = '';
          this.jobLevel.titleLevel = '';
          this.initPositions1();
        }
      })
    },
    enabledChange1(data) {
      this.putRequest("/system/basic/jobLevel/", data).then(resp => {
        if (resp) {
          //刷新表格
          this.initPositions1();
        }
      })
    },
    doUpdatePosition1() {
      this.putRequest("/system/basic/jobLevel/", this.editPos).then(resp => {
        if (resp) {
          //关闭对话框
          this.dialogVisible = false;
          //刷新表格
          this.initPositions1();
        }
      })
    },
    showEditPositionView1(data) {
      this.dialogVisible = true;
      //将 data 对象先序列化成字符串，再将字符串转为 JSON 对象，这样，data 和 editPos 就是两块内存了
      this.editPos = JSON.parse(JSON.stringify(data));
    },
    deletePosition1(data) {
      this.$confirm('此操作将永久删除【' + data.name + '】职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/jobLevel/" + data.id).then(resp => {
          if (resp) {
            this.initPositions1();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style scoped>

</style>
