<template>
  <div class="like-main">
    <div class="top">
      <div class="explain">
        <span>我喜欢的影评</span>
      </div>
      <div class="likes-content" v-for="like in reviewLikes" :key="like.id">
        <div class="info">
          <div class="dress">
            <span>影评</span>
          </div>
          <span>{{ like.review.title }}</span>
        </div>
        <div class="situation">
          <span>{{ like.createdAt }}</span>
        </div>
      </div>
      <div class="explain second">
        <span>我喜欢的台词</span>
      </div>
      <div class="likes-content" v-for="like in wordsLikes" :key="like.id + 1000">
        <div class="info">
          <div class="dress words">
            <span>台词</span>
          </div>
          <span>{{ like.word.title }}</span>
        </div>
        <div class="situation">
          <span>{{ like.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Like',
  data() {
    return {
      reviewLikes: [],
      wordsLikes: [],
    }
  },
  created() {
    const { user } = getUser();
    this.getLikes(user.id);
  },
  methods: {
    async getLikes(id) {
      try {
        const { reviewLikes, wordsLikes } = await request('GET', `/like/${id}/all`);
        this.reviewLikes = reviewLikes;
        this.wordsLikes = wordsLikes;
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>
<style lang="less" scoped>
.like-main {
  .top {
    padding: .3rem;
    padding-bottom: 0;
    min-height: 440px; /*px*/
    // overflow: scroll;
    .explain {
      padding-bottom: 12px;
      font-weight: 600;
    }
    .second {
      padding-top: 12px;
      border-top: 1px solid #BDBDBD;
    }
    .likes-content {
      padding: 24px 0 16px 0; /*px*/
      border-top: 1px solid #BDBDBD;
      .info {
        margin-bottom: 8px;
        display: flex;
        font-size: .32rem;
        font-weight: 600;
        cursor: pointer;
        span:hover {
          color: #175199;
        }
        .dress {
          margin-right: 12px;
          padding: 2px 4px;
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: .26rem;
          letter-spacing: .8px;
          color: #FFF;
          background-color: #0077FF;
          border-radius: 4px;
          span:hover {
            color: #FFF;
          }
        }
        .words {
          background-color: pink;
        }
      }
      .situation {
        font-size: .26rem;
        color: #8590A6;
      }
    }
  }
}
</style>
