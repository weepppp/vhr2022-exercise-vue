<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input
            placeholder="请输入职位名称"
            style="width: 250px"
            suffix-icon="el-icon-plus"
            @keydown.enter.native="addPosition"
            v-model="position.name">
        </el-input>
        <el-button type="primary" icon="el-icon-plus" @click="addPosition">添加职位</el-button>
      </div>
      <div>
        <el-upload
            style="display: inline-flex"
            :show-file-list="false"
            :on-success="onSuccess"
            :on-error="onError"
            :before-upload="beforeUpload"
            :disabled="uploadBtn.disabled"
            action="/system/basic/position/import">
          <el-button type="success" :icon="uploadBtn.icon">{{ uploadBtn.name }}</el-button>
        </el-upload>
        <el-button type="success" icon="el-icon-download" @click="excortPositionData">导出数据</el-button>
      </div>
    </div>
    <div>
      <el-table
          :data="positions"
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
            label="职位名称"
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
                @change="enabledChange(scope.row)"
                v-model="scope.row.enabled"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="min" @click="showEditPositionView(scope.row)">编辑</el-button>
            <el-button size="min" type="danger" @click="deletePosition(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            :page-sizes="[5,10,15,20]"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
        title="编辑职位"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>职位名称：</td>
            <td>
              <el-input v-model="editPos.name"></el-input>
            </td>
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
    <el-button type="primary" @click="doUpdatePosition">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PositionMana",
  data() {
    return {
      dialogVisible: false,
      page: 1,
      size: 10,
      uploadBtn: {
        name: '导入数据',
        disabled: false,
        icon: 'el-icon-upload2'
      },
      editPos: {},
      positions: [],
      position: {
        name: ''
      },
      total: 0
    }
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    sizeChange(newSize) {
      this.size = newSize;
      this.initPositions();
    },
    currentChange(newPage) {
      this.page = newPage;
      this.initPositions();
    },
    onError(err, file, fileList) {
      this.uploadBtn = {
        name: '导入数据',
        disabled: false,
        icon: 'el-icon-upload2'
      }
    },
    onSuccess(response, file, fileList) {
      this.$message.success(response.msg)
      this.uploadBtn = {
        name: '导入数据',
        disabled: false,
        icon: 'el-icon-upload2'
      }
    },
    beforeUpload() {
      this.uploadBtn.name = '正在上传';
      this.uploadBtn.disabled = true;
      this.uploadBtn.icon = 'el-icon-loading'
    },
    excortPositionData() {
      window.open("/system/basic/position/export", "_blank");
    },
    enabledChange(data) {
      this.putRequest("/system/basic/position/", data).then(resp => {
        if (resp) {
          //刷新表格
          this.initPositions();
        }
      })
    },
    doUpdatePosition() {
      this.putRequest("/system/basic/position/", this.editPos).then(resp => {
        if (resp) {
          //关闭对话框
          this.dialogVisible = false;
          //刷新表格
          this.initPositions();
        }
      })
    },
    showEditPositionView(data) {
      this.dialogVisible = true;
      //将 data 对象先序列化成字符串，再将字符串转为 JSON 对象，这样，data 和 editPos 就是两块内存了
      this.editPos = JSON.parse(JSON.stringify(data));
    },
    deletePosition(data) {
      this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/position/" + data.id).then(resp => {
          if (resp) {
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addPosition() {
      this.postRequest("/system/basic/position/", this.position).then(resp => {
        if (resp) {
          //添加成功
          this.position.name = '';
          //刷新表格
          this.initPositions();
        }
      })
    },
    initPositions() {
      this.getRequest("/system/basic/position/?page=" + this.page + "&size=" + this.size).then(resp => {
        if (resp) {
          this.positions = resp.data;
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
