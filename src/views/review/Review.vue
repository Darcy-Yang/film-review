<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="left-content">
        <img :src="currentReview.rank.img_src" alt="poster"/>
        <span class="title">{{ currentReview.rank.title }}</span>
        <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star }}</span>
          <span class="quote">{{ currentReview.rank.quote }}</span>
      </div>
      <div class="right-content">
        <h3>用户影评</h3>
        <div class="review-content">
          <div class="reviews" v-for="review in reviews" :key="review.id">
            <div class="top">
              <avatar-and-name :avatar="review.user.avatar" :name="review.user.name" :avatarStyle="avatarStyle"/>
              <span>{{ review.updatedAt }}</span>
            </div>
            <span class="title">{{ review.title }}</span>
            <span class="text">{{ review.content }}</span>
            <div class="feature">
              <div class="like btn" :class="review.isLiked ? 'actived' : ''" @click="operate(review, true)">
                <i class="iconfont icon-like"></i>
                <span>{{ review.likeNum }}</span>
              </div>
              <div class="comment btn">
                <i class="iconfont icon-comment"></i>
                <span>{{ review.commentNum }}</span>
              </div>
              <div class="collect btn" :class="review.isCollected ? 'actived' : ''" @click="operate(review, false)">
                <i class="iconfont icon-collect-b"></i>
                <span>{{ review.collectNum }}</span>
              </div>
            </div>
          </div>
          <div class="reviews add" @click="openModal">
            <i class="iconfont icon-add-b"></i>
            <span>添加影评</span>
          </div>
        </div>
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
import AvatarAndName from '@/components/AvatarAndName';
import Container from '@/components/Container';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'review',
  components: {
    Nav,
    ReviewComponent,
    AvatarAndName,
    Container,
  },
  data () {
    return {
      avatarStyle: 'width: 30px; height: 30px;',
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
    async operate(review, isLike) {
      const path = isLike ? `/like/${review.id}` : `/collect/${review.id}`;
      try {
        await request('POST', path, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId
        });
        this.getReview();
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
  background-color: #D8B84A;
  min-height: 100vh;
  .content {
    margin: 40px auto 0 auto;
    display: flex;
    width: 80%;
    .left-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      width: 210px;
      height: 100%;
      padding: 0 20px 30px 20px;
      color: #FFF;
      background-color: #F0D165;
      img {
        position: absolute;
        top: -20px;
        width: 210px;
        height: 315px;
        box-shadow: 0 8px 12px rgba(26, 26, 26, .3);
      }
      .title {
        margin-top: 325px;
        font-size: 18px;
        font-weight: 600;
      }
      .quote {
        font-style: italic;
      }
    }
    .right-content {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      flex: 1;
      flex-wrap: wrap;
      h3 {
        margin-left: 20px;
        padding-left: 20px;
        width: 15%;
        color: #FFF;
        font-size: 24px;
        letter-spacing: 1px;
        font-style: italic;
        border-bottom: 2px solid #655A6E;
      }
      .review-content {
        display: flex;
        flex-wrap: wrap;
        .reviews {
          margin: 0 0 20px 20px;
          display: flex;
          flex-direction: column;
          min-width: 40%;
          height: 100%;
          padding: 10px 20px;
          word-break: break-all;
          color: #8A6516;
          background-color: #FFF;
          border-radius: 4px;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title {
            margin: 12px 0;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: .7px;
          }
          .text {
            letter-spacing: .6px;
            line-height: 24px;
          }
          .feature {
            margin-top: 6px;
            display: flex;
            justify-content: space-around;
            color: gray;
            .btn {
              cursor: pointer;
            }
          }
          .actived {
            color: #0077FF;
          }
        }
        .add {
          justify-content: center;
          align-items: center;
          height: 132px;
          cursor: pointer;
          .iconfont {
            margin-bottom: 2px;
            font-size: 18px;
            font-weight: 600;
          }
          &:hover {
            color: #0077FF;
          }
        }
      }
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
