<template>
  <div class="index-main">
    <LeftBar/>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import LeftBar from '@/components/AdminLeftBar'

export default {
  name: 'Index',
  components: {
    LeftBar
  }
}
</script>

<style lang="less" scoped>
.index-main {
  display: flex;
  background-color: #F6F6F6;
  .right {
    display: flex;
    flex-direction: column;
  }
  .content {
    width: 85%;
  }
}
</style>
