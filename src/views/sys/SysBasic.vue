<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="部门管理" name="depmana">
        <DepMana></DepMana>
      </el-tab-pane>
      <el-tab-pane name="position" label="职位管理">
        <PositionMana></PositionMana>
      </el-tab-pane>
      <el-tab-pane name="joblevel" label="职称管理">
        <JobLevelMana></JobLevelMana>
      </el-tab-pane>
      <el-tab-pane name="ecmana" label="奖惩规则">
        <EcMana></EcMana>
      </el-tab-pane>
      <el-tab-pane name="permissmana" label="权限组">
        <PermissMana></PermissMana>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import DepMana from "@/components/sys/basic/DepMana";
import EcMana from "@/components/sys/basic/EcMana";
import JobLevelMana from "@/components/sys/basic/JobLevelMana";
import PermissMana from "@/components/sys/basic/PermissMana";
import PositionMana from "@/components/sys/basic/PositionMana";

export default {
  name: "SysBasic",
  components: {
    DepMana,
    EcMana,
    JobLevelMana,
    PermissMana,
    PositionMana
  },
  data() {
    return {
      activeName: 'PermissMana'
    }
  }
}
</script>

<style scoped>

</style>
