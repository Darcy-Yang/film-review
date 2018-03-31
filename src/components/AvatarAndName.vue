<template>
  <div class="avatar-name-main">
    <div class="avatar-name">
      <div class="avatar">
        <img class="show" src="static/images/avatar.jpg" alt="avatar"/>
        <hover-show-card :cardStyle="avatarCardStyle" :name="name"/>
      </div>
      <div class="name">
        <span>{{ name }}</span>
        <hover-show-card :cardStyle="nameCardStyle" :name="name"/>
      </div>
    </div>
  </div>
</template>

<script>
import HoverShowCard from '@/components/HoverShowCard';

export default {
  name: 'AvatarAndName',
  components: {
    HoverShowCard,
  },
  props: {
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      avatarCardStyle: 'top: 33px;',
      nameCardStyle: 'top: 28px; left: -12px;',
    }
  },
}
</script>

<style lang="less" scoped>
.avatar-name-main {
  .avatar-name {
    display: flex;
    align-items: center;
    .avatar {
      position: relative;
      .show {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .name {
      position: relative;
      margin-left: 8px;
    }
    img, span {
      cursor: pointer;
    }
    .avatar, .name {
      display: flex;
      align-items: center;
      &:hover {
        .hover-show {
          display: flex;
        }
      }
    }
  }
}
</style>
