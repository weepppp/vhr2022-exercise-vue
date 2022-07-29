<template>
  <div>
    <div>
      <el-table
          :data="employees"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            width="100">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻状况"
            width="60">
        </el-table-column>
        <el-table-column
            prop="nationId"
            label="民族"
            width="50">
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            width="80">
        </el-table-column>
        <el-table-column
            prop="politicId"
            label="政治面貌"
            width="80">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            width="150">
        </el-table-column>
        <el-table-column
            prop="address"
            label="联系地址"
            width="180">
        </el-table-column>
        <el-table-column
            prop="departmentId"
            label="所属部门"
            width="180">
        </el-table-column>
        <el-table-column
            prop="jobLevelId"
            label="职称ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="posId"
            label="职位ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="聘用形式"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            width="180">
        </el-table-column>
        <el-table-column
            prop="specialty"
            label="所属专业"
            width="180">
        </el-table-column>
        <el-table-column
            prop="school"
            label="毕业院校"
            width="180">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="workState"
            label="在职状态"
            width="180">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="contractTerm"
            label="合同期限"
            width="180">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="notWorkDate"
            label="离职日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同起始日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同终止日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="workAge"
            label="工龄"
            width="180">
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: flex-start">
      <el-pagination
          background
          @current-change="currentChange1"
          @size-change="sizeChange1"
          :page-sizes="[5,10,15,20]"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "EmpMana",
  data() {
    return {
      employees: [],
      total: 0,
      page: 1,
      size: 10
    }
  },
  mounted() {
    this.initEmployees();
  },
  methods: {
    sizeChange1(newSize) {
      this.size = newSize;
      this.initEmployees();
    },
    currentChange1(newPage) {
      this.page = newPage;
      this.initEmployees();
    },
    initEmployees() {
      this.getRequest("/employee/?page=" + this.page + "&size=" + this.size).then(resp => {
        if (resp) {
          this.employees = resp.data;
          this.total = resp.total;
        }
      })
    }
  }

}
</script>

<style scoped>

</style>