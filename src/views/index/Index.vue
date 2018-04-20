<template>
  <div class="index-main">
    <Nav v-on:search="search" :placeholder="placeholder"/>
    <div class="main">
      <div class="left">
        <div class="content" v-for="review in reviews" :key="review.id">
          <div class="review-main">
            <div class="poster">
              <img v-if="review.rank.img_src" :src="review.rank.img_src" alt="poster" @click="jumpToDetail(review)"/>
              <div class="preview" v-else @click="jumpToDetail(review)">
                <span>{{ review.rank.title }}</span>
              </div>
              <div class="like" :class="review.isLiked ? 'actived' : ''" @click="like(review)">
                <i class="iconfont icon-like"></i>
                <span>{{ review.likeNum }}</span>
              </div>
            </div>
            <div class="info">
              <span class="title">{{ review.title }}</span>
              <div class="review-content">
                <span>{{ review.content }}</span>
              </div>
              <div class="feature">
                <div class="comment btn">
                  <i class="iconfont icon-comment"></i>
                  <span>{{ review.commentNum }}</span>
                </div>
                <div class="collect btn" :class="review.isCollected ? 'actived' : ''" @click="collect(review)">
                  <i class="iconfont icon-collect-b"></i>
                  <span>{{ review.collectNum }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <avatar-and-name :name="review.user.name" :avatar="review.user.avatar"/>
            <span class="time">{{ review.updatedAt }}</span>
          </div>
        </div>
        <div class="pagination">
          <pagination v-if="pageCount > 1" :pageCount="pageCount"/>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="header">
            <span>影评类型</span>
          </div>
          <div class="content">
            <div class="type" :class="type.selected ? 'active' : ''" v-for="(type, index) in types" :key="index" @click="getReview(type)">
              <span>{{ type.name }}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="header">
            <span>电影推荐</span>
            <div class="switch">
              <i class="iconfont icon-icon--"></i>
              <span>换一换</span>
            </div>
          </div>
          <div class="recommend" v-for="i in 3" :key="i">
            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg" alt="poster">
            <div class="info">
              <span>无间道</span>
              <span>信息简介</span>
              <span>星标及评分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import AvatarAndName from '@/components/AvatarAndName';
import Pagination from '@/components/Pagination';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Index',
  components: {
    Nav,
    AvatarAndName,
    Pagination,
  },
  data() {
    return {
      placeholder: '影评标题',
      searchWord: '',
      types: [
        { name: '动作', selected: false },
        { name: '喜剧', selected: false },
        { name: '科幻', selected: false },
        { name: '爱情', selected: false },
        { name: '剧情', selected: false },
        { name: '动画', selected: false },
        { name: '历史', selected: false },
        { name: '悬疑', selected: false },
        { name: '纪录片', selected: false }
      ],
      reviewPage: 1,
      commentPage: 1,
      limit: 12,
      pageCount: 0,
      commentCount: 0,
      reviews: [],
      comments: [],
      currentUser: null,
      entered: false,
      showComment: false,
      lastIndex: -1,
      count: [],
      type: '',
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getReview();
  },
  methods: {
    search(val) {
      this.searchWord = val;
      this.getReview();
    },
    async getReview(item) {
      if (item && item.selected) {
        item = null;
        this.type = '';
        this.reviewPage = 1;
      };
      this.types.forEach(type => type.selected = false);
      if (item) {
        item.selected = !item.selected;
        this.type = item.selected ? item.name : '';
      }
      if (this.type) (this.types.filter(type => type.name === this.type))[0].selected = true;
      try {
        const { pageCount, reviews } = await request('GET', `/review/${this.currentUser.id}`, {
          page: this.reviewPage,
          limit: this.limit,
          searchWord: this.searchWord,
          type: this.type
        })
        reviews.forEach(review => {
          review.updatedAt = review.updatedAt.split(' ')[0];
        });
        this.pageCount = pageCount;
        this.reviews = reviews;
      } catch (err) {
        console.log(err);
      }
    },
    async like(review) {
      try {
        await request('POST', `/like/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId
        });
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    async collect(review) {
      try {
        await request('POST', `/collect/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.user.id
        });
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    async submit(review, index) {
      if (!this.$refs.comment[index].innerText) {
        alert('评论内容不能为空');
        return;
      }
      try {
        await request('POST', `/comment/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId,
          content: this.$refs.comment[index].innerText
        });
        this.$refs.comment[index].innerText = '';
        this.getReview();
        this.getComment(review);
      } catch (err) {
        console.log(err);
      }
    },
    async getComment(review) {
      try {
        const { count, comments } = await request('GET', `/comment/${review.id}`, {
          page: this.commentPage,
          limit: this.limit,
        });
        this.commentCount = count;
        this.comments = comments;
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    showCommentBox(review, index) {
      this.$refs.commentBox[index].style.display = 'flex';
      if (this.lastIndex !== index && this.lastIndex === -1) {
        this.lastIndex = index;
        this.$refs.commentBox[index].style.display = 'flex';
      } else if (this.lastIndex !== index && this.lastIndex !== -1) {
        this.count = [];
        this.$refs.commentBox[this.lastIndex].style.display = 'none';
        this.$refs.commentBox[index].style.display = 'flex';
      } else {
        this.count.push(index);
        this.$refs.commentBox[this.lastIndex].style.display = this.count.length % 2 ===0 ? 'flex' : 'none';
      }
      this.lastIndex = index;

      if (this.$refs.commentBox[index].style.display === 'flex') this.getComment(review);
    },
    eventListener() {
      this.entered = !this.entered;
    },
    jumpToDetail(review) {
      this.$router.push({ name: 'Review', params: { review } });
    },
  },
  mounted() {
    this.$root.$on('currentPage', (val) => {
      this.reviewPage = val;
      this.getReview();
    })
  },
}
</script>

<style lang="less" scoped>
.index-main {
  margin-top: 82px;
  .main {
    display: flex;
    margin-top: 34px;
    justify-content: center;
    .left {
      display: flex;
      flex-wrap: wrap;
      width: 60%;
      .content {
        margin: 0 0 24px 40px;
        display: flex;
        flex-direction: column;
        width: 220px;
        .review-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 220px;
          flex-wrap: wrap;

          border-radius: 6px;
          background-color: #FFF;
          box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
          .poster {
            position: relative;
            flex: 1;
            height: 255px;
            background-color: #426AB3;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            cursor: pointer;
            img {
              width: 220px;
              height: 255px;
              border-top-left-radius: 6px;
              border-top-right-radius: 6px;
            }
            .preview {
              display: flex;
              justify-content: center;;
              align-items: center;
              padding: 12px;
              width: 196px;
              height: 221px;
              color: #FFF;
              letter-spacing: .4px;
            }
            .like {
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              top: 232px;
              right: 19px;

              width: 45px;
              height: 45px;
              color: gray;
              background-color: #FFF;
              border-radius: 50%;
              .iconfont {
                font-size: 18px;
                font-weight: 600;
              }
              &:hover {
                color: #636262;
              }
            }
            .actived {
              color: #FFF;
              background-color: #57CE4A;
              &:hover {
                color: #FFF;
              }
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            padding: 10px 0 12px 0;
            .top {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
            }
            .title {
              margin-top: 4px;
              padding: 0 15px;
              font-size: 17px;
              font-weight: 600;
              color: rgb(49, 56, 64);
            }
            .review-content {
              margin: 6px 0 12px 0;
              padding: 0 15px;

              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;

              letter-spacing: .8px;
              color: #70757B;
            }
            .feature {
              display: flex;
              justify-content: space-around;
              padding: 10px 15px 0 15px;
              color: gray;
              border-top: 1px dashed #70757B;
              .comment {
                .iconfont {
                  font-size: 18px;
                  font-weight: 600;
                }
              }
              .collect {
                cursor: pointer;
              }
              .actived {
                color: #0077FF;
              }
            }
          }
        }
        .bottom {
          margin-top: 12px;
          padding: 0 12px;
          display: flex;
          justify-content: space-between;
          color: #3A8BBB;
          .time {
            font-size: 14px;
            color: #8590A6;
          }
        }
      }
      .pagination {
        margin: 12px 0 20px 0;
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
    .right {
      margin: 0 0 20px 20px;
      width: 20%;
      .top {
        .header {
          margin-bottom: 12px;
          padding-left: 4px;
        }
        .content {
          display: flex;
          flex-wrap: wrap;
          .type {
            margin: 0 12px 12px 0;
            padding: 10px 0;
            width: 25%;
            flex-grow: 1;

            text-align: center;
            letter-spacing: 1px;
            border: 1px solid #FFF;
            border-bottom: 1px solid rgba(26, 26, 26, 0.3);

            transition: .15s;

            cursor: pointer;
            &:hover {
              border-radius: 4px;
              border: 1px solid rgba(26, 26, 26, 0.3);
            }
          }
          .active {
            color: #FFF;
            background-color: #0077FF;
            border-radius: 4px;
          }
        }
      }
      .bottom {
        margin-top: 20px;
        // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        .header {
          display: flex;
          justify-content: space-between;
          .switch {
            font-size: 14px;
            color: #175199;
            cursor: pointer;
            i {
              font-weight: 600;
            }
          }
        }
        .recommend {
          display: flex;
          margin-top: 12px;
          img {
            align-self: center;
            width: 75px;
            height: 108px;
            border-radius: 4px;
            // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
          }
          .info {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
          }
        }
      }
      .top, .bottom {
        padding: 12px;
        background-color: #FFF;
        border-radius: 3px;
      }
    }
  }
}
</style>
