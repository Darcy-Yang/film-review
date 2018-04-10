<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="movie-info">
        <div class="left">
          <img :src="currentReview.img_src || currentReview.rank.img_src" alt="poster"/>
        </div>
        <div class="right">
          <h3>{{ currentReview.rank.title }}</h3>
          <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star }}</span>
          <span>{{ currentReview.rank.votes }}</span>
          <span>{{ currentReview.rank.quote }}</span>
        </div>
      </div>
      <div class="review-list" v-if="reviews.length">
        <div class="add-review">
          <div class="description">
            <span>《{{ currentReview.rank.title }}》的影评</span>
            <div class="dot">
              <span>......</span>
            </div>
            <span>(共{{ reviews.length }}条)</span>
          </div>
          <span class="add-btn" @click="openModal">添加影评</span>
        </div>
        <review-component class="review" :reviews="reviews" :userId="currentUser.id" :getReview="getReview"/>
      </div>
      <div class="no-review" v-else>
        <h3>《{{ currentReview.rank.title }}》暂时还没有影评～</h3>
        <span class="add-btn" @click="openModal">添加影评</span>
      </div>
    </div>
    <div class="modal" v-if="showModal">
      <container class="container" v-click-outside="closeModal" v-on:container="addReview"
      :firstPlaceHolder="firstPlaceHolder" :secondPlaceHolder="secondPlaceHolder" :cancel="closeModal"/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import ReviewComponent from '@/components/ReviewComponent';
import Container from '@/components/Container';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'review',
  components: {
    Nav,
    ReviewComponent,
    Container,
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
      showModal: false,
      firstPlaceHolder: '影评内容',
      secondPlaceHolder: '标题',
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
    this.currentReview = this.$route.params.review ? this.$route.params.review : JSON.parse(localStorage.getItem('CURRENT_REVIEW'));
    this.getReview();
  },
  methods: {
    async getReview() {
      try {
        const { count, reviews } = await request('GET', `/review/${this.currentUser.id}/movie/${this.currentReview.movieId}`, {
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
    async addReview(title, content) {
      if (!title) {
        alert('标题不能为空');
        return;
      } else if (!content) {
        alert('内容不能为空');
        return;
      }
      try {
        await request('POST', '/review', {}, {
          userId: this.currentUser.id,
          movieId: this.currentReview.movieId,
          title,
          content
        });
        this.closeModal();
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    eventListener() {
      this.entered = !this.entered;
      if (!this.$refs.comment.innerText) this.entered = false;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
      width: 40%;
      .add-review {
        display: flex;
        justify-content: space-between;
        .description {
          display: flex;
          align-items: center;
          .dot {
            margin: 0 4px;
            padding-bottom: 12px;
            font-weight: 600;
            letter-spacing: 4px;
          }
        }
      }
    }
    .no-review {
      display: flex;
      width: 40%;
      align-items: center;
      color: gray;
    }
    .add-btn {
      margin-left: 4px;
      font-weight: 600;
      color: #0077FF;
      cursor: pointer;
    }
  }
  .modal {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #0077FF;
    background-color: rgba(26, 26, 26, .6);
    .container {
      height: auto;
    }
  }
}
</style>
