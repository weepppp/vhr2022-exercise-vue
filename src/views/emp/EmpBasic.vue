<template>
  <div>
    <el-tabs v-model="activeName">
<!--      <el-tab-pane label="员工基本资料" name="EmpMana">-->
        <EmpMana></EmpMana>
<!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

import EmpMana from "@/components/emp/basic/EmpMana";


export default {
  name: "EmpBasic",
  components: {
    EmpMana
  },
  data() {
    return {
      activeName: 'employee'
    }
  }
}
</script>

<style scoped>

</style>
