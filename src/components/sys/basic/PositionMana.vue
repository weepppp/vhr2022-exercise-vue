<template>
  <div>
    <div></div>
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
            prop="enabled"
            label="是否启用">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PositionMana",
  data() {
    return {
      positions: []
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{
    initPositions() {
      this.getRequest("/system/basic/position/").then(resp=>{
        if (resp) {
          this.positions = resp;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
