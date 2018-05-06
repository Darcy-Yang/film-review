<template>
  <div class="index-main">
    <Nav v-on:search="search" :placeholder="placeholder"/>
    <div class="main">
      <div class="top">
        <div class="selector">
          <span :class="type.selected ? 'active' : ''" v-for="(type, index) in types" :key="index" @click="getReview(type)">
            {{ type.name }}
          </span>
        </div>
        <div class="bottom">
          <div class="radio" v-for="(radio, index) in radios" :key="index">
            <input type="radio" name="radio" checked="true" @click="sort(radio)"/>
            <span>{{ radio.name }}</span>
          </div>
        </div>
      </div>
      <div class="left">
        <div class="content" v-for="review in reviews" :key="review.id">
          <div class="review-main">
            <div class="poster">
              <img v-if="review.rank.poster" :src="review.rank.poster" alt="poster" @click="jumpToDetail(review)"/>
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
        { name: '全部', selected: false },
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
      radios: [
        { name: '按点赞数排序', type: 'likeNum' },
        { name: '按热度排序', type: 'commentNum' },
        { name: '按时间排序', type: 'createdAt' }
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
      order: 'createdAt',
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getReview();
    this.types[0].selected = true;
  },
  methods: {
    async getReview(item) {
      if (item && item.selected) {
        item = null;
        this.type = '';
        this.types[0].selected = true;
        this.reviewPage = 1;
      };
      this.types.forEach(type => {
        if (type.name !== '全部') type.selected = false;
      });
      if (item) {
        item.selected = !item.selected;
        this.type = item.selected ? item.name : '';
        if (item.name === '全部') {
          this.type = '';
        } else {
          this.types[0].selected = false;
        }
      }
      if (this.type) (this.types.filter(type => type.name === this.type))[0].selected = true;
      try {
        const { pageCount, reviews } = await request('GET', `/review/${this.currentUser.id}`, {
          page: this.reviewPage,
          limit: this.limit,
          searchWord: this.searchWord,
          type: this.type,
          order: this.order
        })
        reviews.forEach(review => {
          review.updatedAt = review.updatedAt.split(' ')[0];
        });
        this.pageCount = pageCount;
        this.reviews = reviews;
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    async like(review) {
      try {
        await request('POST', `/like/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId
        });
        await request('POST', '/user/favor', {}, {
          id: this.currentUser.id,
          type: review.rank.type,
          movieId: review.rank.id
        });
        this.getReview();
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    async collect(review) {
      try {
        await request('POST', `/collect/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.user.id
        });
        await request('POST', '/user/favor', {}, {
          id: this.currentUser.id,
          type: review.rank.type,
          movieId: review.rank.id
        });
        this.getReview();
        this.$message('收藏成功');
      } catch (err) {
        this.$message(err.message, 'error');
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
    sort(radio) {
      this.order = radio.type;
      this.getReview();
    },
    search(val) {
      this.searchWord = val;
      this.getReview();
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
    async jumpToDetail(review) {
      await request('POST', '/user/favor', {}, {
        id: this.currentUser.id,
        type: review.rank.type,
        movieId: review.rank.id
      });
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
  // margin-top: 82px;
  margin-top: 1.3rem;
  .main {
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      margin: .2rem 7.5% .45rem;
      padding: .3rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: auto;
      color: #FFF;
      font-size: .28rem;
      line-height: 160%;
      background: linear-gradient(to bottom right, #6ABD78, #426ab3);
      border-radius: 4px;
      .selector {
        span {
          margin-left: 12px;
          transition: all .2s ease-in;
          cursor: pointer;
          &:hover {
            font-weight: 600;
          }
        }
        .active {
          color: orange;
        }
      }
      .bottom {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
      }
    }
    .left {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 90%;
      .content {
        margin: 0 0 24px 32px;
        display: flex;
        flex-direction: column;
        // width: 88%;
        width: 3.8rem;
        .review-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          // width: 220px;
          flex-wrap: wrap;

          border-radius: 6px;
          background-color: #FFF;
          box-shadow: 0 0 3px rgba(26, 26, 26, 0.4);
          .poster {
            position: relative;
            flex: 1;
            height: 4.6rem;
            background-color: #426AB3;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            cursor: pointer;
            img {
              // width: 220px;
              width: 100%;
              height: 100%;
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
              bottom: -0.38rem;
              right: 19px;

              width: .8rem;
              height: .8rem;
              font-size: .28rem;
              color: gray;
              background-color: #FFF;
              border-radius: 50%;
              .iconfont {
                font-size: .32rem;
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
              padding: 0 1rem 0 .2rem;
              font-size: .3rem;
              font-weight: 600;
              color: rgb(49, 56, 64);
            }
            .review-content {
              margin: 0.1rem 0 0.24rem 0;
              padding: 0 15px;

              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;

              font-size: .27rem;
              letter-spacing: .8px;
              color: #70757B;
            }
            .feature {
              display: flex;
              justify-content: space-around;
              padding: 10px 15px 0 15px;
              font-size: .28rem;
              color: gray;
              border-top: 1px dashed #70757B;
              .comment {
                .iconfont {
                  font-size: .3rem;
                  font-weight: 600;
                }
              }
              .collect {
                cursor: pointer;
                .iconfont {
                  font-size: .27rem;
                }
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
    @media screen and (max-device-width: 800px) {
      margin-top: 2.2rem;
      .left .content .review-main .info .feature {
        .comment .iconfont {
          font-size: .36rem;
        }
        .collect .iconfont {
          font-size: .3rem;
        }
      }
    }
  }
}
</style>
