<template>
  <div class="user-main">
    <div class="content">
      <div class="header list">
        <div class="block"></div>
        <span>用户名</span>
        <span class="type">账号类型</span>
        <span>注册邮箱</span>
        <span class="time">注册时间</span>
        <span>备注</span>
      </div>
      <div class="list" v-for="(item, index) in test" :key="index">
        <input/>
        <img src="static/images/avatar.jpg" alt="avatar"/>
        <span>user_name</span>
        <span>普通用户</span>
        <span>123456789@163.com</span>
        <span>2018-02-15</span>
        <span>remark</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageUser',
  data () {
    return {
      test: []
    }
  },
  created () {
    this.test.length = 10
  }
}
</script>

<style lang="less" scoped>
.user-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 20px;
    width: 70%;
    .list {
      display: flex;
      margin-top: 12px;
      padding: 12px;
      align-items: center;
      background-color: #FFF;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(26,26,26, .6);
      input {
        width: 14px;
        height: 14px;
        padding: 0;
        border: 1px solid #BDBDBD;
        border-radius: 2px;
      }
      img {
        margin-left: 12px;
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      span {
        margin-left: 20px;
      }
    }
    .header {
      line-height: 42px;
      box-shadow: none;
      .block {
        width: 70px;
      }
      span {
        margin-right: 20px;
      }
      .type {
        margin-left: 30px;
      }
      .time {
        margin-left: 80px;
      }
    }
  }
}
</style>
