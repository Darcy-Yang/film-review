<template>
  <div class="review-main">
    <div class="top">
      <div class="explain">
        <span>我的影评</span>
      </div>
      <div v-for="(review, index) in reviews" :key="index">
        <div class="info">
          <span>{{ review.title }}</span>
        </div>
        <div class="situation">
          <span>{{ review.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Review',
  data() {
    return {
      uesr: null,
      reviews: [],
    }
  },
  created() {
    const { user } =getUser();
    this.user = user;
    this.getReviews(this.user.id)
  },
  methods: {
    async getReviews(id) {
      try {
        const { reviews } = await request('GET', `/review/${id}/all`);
        this.reviews = reviews;
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>
<style lang="less" scoped>
.review-main {
  .top {
    padding: 20px;
    padding-bottom: 0;
    .explain {
      padding-bottom: 12px;
      font-weight: 600;
      border-bottom: 1px solid #BDBDBD;
    }
  }
}
</style>
