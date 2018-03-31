<template>
  <div class="avatar-name-main">
    <div class="avatar-name">
      <img src="static/images/avatar.jpg" alt="avatar"/>
      <span>name</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarAndName'
}
</script>

<style lang="less" scoped>
.avatar-name-main {
  .avatar-name {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 8px;
    }
    img, span {
      cursor: pointer;
    }
  }
}
</style>
