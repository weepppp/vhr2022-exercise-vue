<template>
  <div style="display: flex;justify-content: center">
    <el-card class="box-card" style="width: 450px;margin-top: 200px">
      <div slot="header" class="clearfix">
        <span>登录</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="6" style="display: flex;align-items: center;height: 40px;">
            <div style="margin-left: 10px;">用户名</div>
          </el-col>
          <el-col :span="18">
            <div>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6" style="display: flex;align-items: center;height: 40px;">
            <div style="margin-left: 10px;">用户密码</div>
          </el-col>
          <el-col :span="18">
            <div>
              <el-input @keydown.enter.native="doLogin" v-model="user.password" type="password" show-password
                        placeholder="请输入用户密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div>
              <el-button type="primary" style="width: 100%;margin-top: 10px" @click="doLogin">登录</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>

// 导入进行请求响应处理的封装api文件的一部分——接收请求的那部分
// import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: 'admin',
        password: '123'
      }
    }
  },
  methods: {
    doLogin() {
      // 以下是原有的直接处理请求和响应的代码
      // let that = this;
      // axios.post('/login',this.user,{
      //         transformRequest: [function(data,headers) {
      //                 let ret = '';
      //                 for(let i in data) {
      //                     ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) +'&'
      //                 }
      //                 return ret;
      //         }],
      //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // })
      // .then(function(response){
      //     let data = response.data;
      //     if(data.status == 200){
      //         that.$message.success(data.msg);
      //     } else {
      //         that.$message.error(data.msg);
      //     }
      //     console.log(response.data);
      // })
      // .catch(function(error){
      //     console.log(error);
      // });
      this.postKeyValueRequest('/login', this.user).then(resp => {
        // 直接进入响应拦截器进行处理
        if (resp) {
          // 说明请求成功
          window.sessionStorage.setItem("hr", JSON.stringify(resp.data));
          let redirect = this.$router.currentRoute.query.redirect;
          this.$router.replace(redirect ? redirect : '/home');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>