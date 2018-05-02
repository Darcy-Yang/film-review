<template>
  <div class="bar-main">
    <div class="tabs">
      <!-- 添加 exact 后，下链接只在地址为／时激活，exact：全包含匹配； -->
      <router-link to="/homepage" exact active-class="active">
        <span>动态</span>
      </router-link>
      <router-link to="/homepage/review" active-class="active">
        <span>影评</span>
        <span class="num">{{ reviewNum }}</span>
      </router-link>
      <router-link to="/homepage/words" active-class="active">
        <span>台词</span>
        <span class="num">{{ wordsNum }}</span>
      </router-link>
      <router-link to="/homepage/like" active-class="active">
        <span>喜欢</span>
        <span class="num">{{ likeNum }}</span>
      </router-link>
      <router-link to="/homepage/share" active-class="active">
        <span>收藏</span>
        <span class="num">0</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'TabBar',
  data() {
    return {
      reviewNum: 0,
      wordsNum: 0,
      likeNum: 0,
    }
  },
  created() {
    const { user } = getUser();

    this.getReviewCount(user.id);
    this.getWordsCount(user.id);
    this.getLikeCount(user.id);
  },
  methods: {
    async getReviewCount(id) {
      const { count } = await request('GET', `/review/${id}/count`);
      this.reviewNum = count;
    },
    async getWordsCount(id) {
      const { count } = await request('GET', `/words/${id}/count`);
      this.wordsNum = count;
    },
    async getLikeCount(id) {
      const { count } = await request('GET', `/like/${id}/count`);
      this.likeNum = count;
    },
  },
}
</script>

<style lang="less" scoped>
.bar-main {
  padding: .3rem;
  padding-bottom: 0;
  border-bottom: 1px solid #BDBDBD;
  .tabs {
    display: flex;
    a {
      margin-right: 40px;
      padding-bottom: 12px;
      color: #000;
      text-decoration: none;
      .num {
        color: #999;
      }
      &.active {
        border-bottom: 2px solid red;
        font-weight: 600;
        .num {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
