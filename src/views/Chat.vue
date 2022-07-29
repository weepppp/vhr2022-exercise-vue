<template>
  <div>
    <div>
      <p v-for="(msg,index) in msgs" :key="index">
        {{ msg.from }}:{{ msg.msg }}
      </p>
    </div>
    <div>
      <el-input v-model="to"></el-input>
      <el-input v-model="msg"></el-input>
      <el-button type="primary" @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script>

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
  name: "Chat",
  data() {
    return {
      msgs: [],
      to: null,
      msg: '',
      stomp: null
    }
  },
  mounted() {
    this.initCon();
  },
  methods: {
    initCon() {
      let _this = this;
      _this.stomp = Stomp.over(new SockJS("/myws/ep"));
      _this.stomp.connect({}, success => {
        _this.stomp.subscribe("/user/queue/chat", msg => {
          _this.msgs.push(JSON.parse(msg.body));
        })
      }, error => {

      })
    },
    sendMsg() {
      this.stomp.send("/myws/chat", {}, JSON.stringify({to: this.to, msg: this.msg}))
    }
  }
}
</script>

<style scoped>

</style>