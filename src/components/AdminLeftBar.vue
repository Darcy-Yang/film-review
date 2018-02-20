<template>
  <div class="left-bar">
    <div class="description">
      <span>影评网</span>
      <div class="module">
        <span>后台管理</span>
      </div>
    </div>
    <div class="user-info">
      <img src="static/images/avatar.jpg" alt="avatar"/>
      <span class="user-name">user_name</span>
      <div class="label">
        <span>管理员</span>
      </div>
    </div>
    <div class="nav">
      <router-link to="/admin" exact active-class="active">
        <span>管理用户</span>
      </router-link>
      <router-link to="/admin/review" active-class="active">
        <span>管理影评</span>
      </router-link>
      <router-link to="/admin/words" active-class="active">
        <span>管理台词</span>
      </router-link>
      <router-link to="/admin/rank" active-class="active">
        <span>管理电影排行</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLeftBar'
}
</script>

<style lang="less" scoped>
.left-bar {
  display: flex;
  height: 100vh;
  flex-direction: column;
  color: #FFF;
  background-color: #192B56;
  .description {
    display: flex;
    margin-top: 52px;
    justify-content: center;
    letter-spacing: 1px;
    .module {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 2px solid #FFF;
    }
  }
  .user-info {
    display: flex;
    margin: 30px 0;
    flex-direction: column;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-name {
      margin: 12px 0;
    }
    .label {
      padding: 3px 8px;
      font-size: 13px;
      letter-spacing: 1px;
      border: 1px solid #FFF;
      border-radius: 40px;
    }
  }
  .nav {
    display: flex;
    flex-direction: column;
    // align-items: center;
    a {
      margin-top: 20px;
      padding: 12px 60px 12px 40px;
      color: #FFF;
      text-decoration: none;
      letter-spacing: 1px;
      &.active {
        padding-left: 36px;
        border-left: 4px solid #64A2F0;
        background-color: #081B4A;
      }
    }
  }
}
</style>
