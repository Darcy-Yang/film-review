<template>
  <div class="bar-main">
    <div class="tabs">
      <!-- 添加 exact 后，下链接只在地址为／时激活，exact：全包含匹配； -->
      <router-link to="/homepage" exact active-class="active">
        <span>动态</span>
      </router-link>
      <router-link to="/homepage/review" active-class="active">
        <span>影评</span>
        <span>{{ reviewNum }}</span>
      </router-link>
      <router-link to="/homepage/words" active-class="active">
        <span>台词</span>
        <span>0</span>
      </router-link>
      <router-link to="/homepage/like" active-class="active">
        <span>喜欢</span>
        <span>{{ likeNum }}</span>
      </router-link>
      <router-link to="/homepage/share" active-class="active">
        <span>分享</span>
        <span>0</span>
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
      likeNum: 0,
    }
  },
  created() {
    const { user } = getUser();

    this.getReviewCount(user.id);
    this.getLikeCount(user.id);
  },
  methods: {
    async getReviewCount(id) {
      const { count } = await request('GET', `/review/${id}/count`);
      this.reviewNum = count;
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
  padding: 20px;
  padding-bottom: 0;
  border-bottom: 1px solid #BDBDBD;
  .tabs {
    display: flex;
    a {
      margin-right: 40px;
      padding-bottom: 12px;
      color: #000;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid red;
        font-weight: 600;
      }
    }
  }
}
</style>
