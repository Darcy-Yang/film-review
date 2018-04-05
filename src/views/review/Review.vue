<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="movie-info">
        <div class="left">
          <img :src="currentReview.rank.img_src" alt="poster"/>
        </div>
        <div class="right">
          <h3>{{ currentReview.rank.title }}</h3>
          <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.movie_type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star }}</span>
          <span>{{ currentReview.rank.votes }}</span>
          <span>{{ currentReview.rank.quote }}</span>
        </div>
      </div>
      <div class="review-list">
        <div class="review" v-for="(review, index) in reviews" :key="index">
          <div class="top">
            <avatar-and-name :name="review.user.name" :avatar="review.user.avatar"/>
            <div class="review-content">
              <span class="title">{{ review.title }}</span>
              <span>{{ review.content }}</span>
            </div>
          </div>
          <div class="bottom">
            <!-- <span>赞👍</span>
            <span>评论</span>
            <span>收藏</span> -->
            <span class="time">{{ review.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import AvatarAndName from '@/components/AvatarAndName';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'review',
  components: {
    Nav,
    AvatarAndName
  },
  data () {
    return {
      entered: false,
      currentReview: null,
      currentUser: null,
      page: 1,
      limit: 10,
      count: 0,
      reviews: [],
    }
  },
  created() {
    if (this.$route.params.review) {
      localStorage.setItem('CURRENT_REVIEW', JSON.stringify(this.$route.params.review));
    }
    if (getUser()) {
      const { user } = getUser();
      this.currentUser = user;
    }
    this.currentReview = JSON.parse(localStorage.getItem('CURRENT_REVIEW'));
    this.getReview();
  },
  methods: {
    eventListener() {
      this.entered = !this.entered;
      if (!this.$refs.comment.innerText) this.entered = false;
    },
    async getReview() {
      try {
        const { count, reviews } = await request('GET', `/review/movie/${this.currentReview.movieId}`, {
          page: this.page,
          limit: this.limit
        });
        this.count = count;
        this.reviews = reviews;
      } catch (err) {
        console.log(err);
      }
    },
    async submit() {
      if (!this.$refs.comment.innerText) {
        alert('评论内容不能为空');
        return;
      }
      try {
        await request('POST', `/comment/${this.currentReview.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: this.currentReview.userId,
          content: this.$refs.comment.innerText
        });
        this.$refs.comment.innerText = '';
        this.getComment();
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.review-main {
  .content {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .movie-info {
      display: flex;
      align-items: center;
      width: 40%;
      .left {
        img {
          width: 160px;
        }
      }
      .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
      }
    }
    .review-list {
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      width: 40%;
      .review {
        margin: 6px 0;
        padding: 12px;
        display: flex;
        flex-direction: column;

        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
        .top {
          display: flex;
          flex-direction: row;
          .review-content {
            margin-left: 20px;
            padding: 6px;
            display: flex;
            flex-direction: column;
            width: 100%;

            letter-spacing: .2px;
            background-color: #F6F6F6;
            border-radius: 4px;
            .title {
              font-weight: 600;
            }
          }
        }
        .bottom {
          margin-top: 4px;
          span {
            margin-right: 4px;
            cursor: pointer;
          }
          .time {
            float: right;
            cursor: default;
          }
        }
      }
    }
  }
}
</style>
