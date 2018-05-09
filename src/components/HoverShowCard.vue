<template>
  <div class="hover-show" :style="cardStyle">
    <div class="top">
      <img :src="avatar" alt="avatar"/>
      <span>{{ name }}</span>
    </div>
    <div class="bottom">
      <div class="intro">
        <span>一句话介绍自己</span>
      </div>
      <div class="experience">
        <div class="field">
          <span>影评</span>
          <span>{{ reviewCount }}</span>
        </div>
        <div class="field">
          <span>台词</span>
          <span>{{ wordsCount }}</span>
        </div>
        <div class="field">
          <span>获得赞同</span>
          <span>{{ reviewLikes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';

import { getUser } from "@/utils/user";

export default {
  name: 'HoverShowCard',
  props: {
    cardStyle: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: 'static/images/avatar.jpg',
    },
  },
  data() {
    return {
      user: null,
      reviewCount: 0,
      wordsCount: 0,
      reviewLikes: 0,
    }
  },
  created() {
    const { user } = getUser();
    this.user = user;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const { count: reviewCount } = await request('GET', `/review/${this.user.id}/count`);
      const { count: wordsCount } = await request('GET', `/words/${this.user.id}/count`);
      const { count: reviewLikes } = await request('GET', `/like/${this.user.id}/count`);
      this.reviewCount = reviewCount;
      this.wordsCount = wordsCount;
      this.reviewLikes = reviewLikes;
    },
  },
}
</script>

<style lang="less" scoped>
.hover-show {
  // display: flex;
  display: none;
  position: absolute;
  padding: 8px 24px; /*px*/
  flex-direction: column;

  width: 500px; /*px*/
  border-radius: 8px; /*px*/
  color: #000;
  background-color: #FFF;
  box-shadow: 0 2px 6px rgba(26, 26, 26, .3); /*px*/

  z-index: 2;
  img, span {
    cursor: default;
  }
  .top {
    display: flex;
    padding: 12px 0 20px 0; /*px*/
    align-items: center;
    border-bottom: 2px solid #BDBDBD; /*px*/
    img {
      width: 96px; /*px*/
      height: 96px; /*px*/
      border-radius: 50%;
    }
    span {
      margin-left: 24px; /*px*/
      font-size: 34px; /*px*/
      font-weight: 600;
    }
  }
  .bottom {
    margin: 16px 0; /*px*/
    .intro {
      margin: 4px 0; /*px*/
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .experience {
      margin-top: 8px; /*px*/
      display: flex;
      justify-content: space-around;
      .field {
        margin-right: 24px; /*px*/
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
