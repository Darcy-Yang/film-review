<template>
  <div class="left-bar">
    <!-- <div class="description">
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
    </div> -->
    <div class="nav">
      <router-link to="/admin" exact active-class="active">
        <i class="iconfont icon-user"></i>
        <span>用户管理</span>
      </router-link>
      <router-link to="/admin/review" active-class="active">
        <i class="iconfont icon-review"></i>
        <span>影评管理</span>
      </router-link>
      <router-link to="/admin/words" active-class="active">
        <i class="iconfont icon-words"></i>
        <span>台词管理</span>
      </router-link>
      <router-link to="/admin/rank" active-class="active">
        <i class="iconfont icon-summary"></i>
        <span>电影管理</span>
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
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  color: gray;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.6);
  z-index: 4;
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
    max-width: 202px;
    margin: 30px 0;
    padding: 0 10px;
    flex-direction: column;
    align-items: center;
    word-break: break-word;
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
    a {
      margin-top: 20px;
      padding: 14px 60px 14px 40px;
      color: #7F8697;
      text-decoration: none;
      letter-spacing: 1px;
      i {
        font-size: 24px;
      }
      &.active {
        width: 55.3%;
        padding-left: 36px;
        color: #2E84fA;
        border-left: 4px solid #2E84fA;
        background-color: #FBFBFB;
        border-top: 1px solid #D9D6CF;
        border-bottom: 1px solid #D9D6CF;
      }
    }
  }
}
</style>
