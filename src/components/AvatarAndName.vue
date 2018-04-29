<template>
  <div class="avatar-name-main">
    <div class="avatar-name">
      <div class="avatar">
        <img class="show" :src="avatar" alt="avatar" :style="avatarStyle"/>
        <hover-show-card :cardStyle="avatarCardStyle" :name="name" :avatar="avatar"/>
      </div>
      <div class="name">
        <span>{{ name }}</span>
        <!-- <hover-show-card :cardStyle="nameCardStyle" :name="name" :avatar="avatar"/> -->
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
    },
    avatar: {
      type: String,
      default: 'static/images/avatar.jpg',
    },
    avatarStyle: {
      type: String,
      default: '',
    },
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
        width: .46rem;
        height: .46rem;
        border-radius: 50%;
        @media screen and (max-device-width: 800px) {
          width: .6rem;
          height: .6rem;
        }
      }
    }
    .name {
      position: relative;
      margin-left: 8px;
      font-weight: 600;
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
