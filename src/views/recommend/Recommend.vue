<template>
  <div class="recommend-main">
    <Nav/>
    <div class="recommend">
      <h3>为你推荐:</h3>
      <div class="recommend-list">
        <div class="recommend-content" v-for="recommend in recommends" :key="recommend.id">
          <div class="poster">
            <img :src="recommend.img_src" alt="poster"/>
            <div class="shadow">
              <span>{{ recommend.quote }}</span>
            </div>
          </div>
          <div class="info">
            <div class="arrow-up"></div>
            <div class="hole"></div>
            <div class="arrow-up media-arrow"></div>
            <div class="hole media-hole"></div>
            <span>{{ recommend.title }}</span>
            <span>{{ recommend.info }}</span>
            <div class="detail">
              <span>{{ recommend.area }}</span>
              <span>{{ recommend.time }}</span>
            </div>
            <div class="detail">
              <span>{{ recommend.star }}</span>
              <span>{{ recommend.type }}</span>
            </div>
            <span>{{ recommend.quote }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Recommend',
  components: {
    Nav,
  },
  data() {
    return {
      currentUser: null,
      recommends: [],
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getRecommend();
  },
  methods: {
    async getRecommend() {
      try {
        const { recommends } = await request('GET', `/rank/recommend/${this.currentUser.id}`);
        this.recommends = recommends;
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-main {
  min-height: 100vh;
  margin-top: 2rem;
  .recommend {
    margin: 65px auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    h3 {
      padding: .1rem .2rem;
      width: 1.6rem;
      color: #FFF;
      background: linear-gradient(to bottom right, #6ABD78, #426ab3);
      letter-spacing: .4px;
      border-radius: 4px;
    }
    .recommend-list {
      display: flex;
      overflow: scroll;
      .recommend-content {
        margin-right: 20px;
        &:hover {
          .info {
            display: flex;
          }
        }
        .poster {
          position: relative;
          width: 3.8rem;
          height: 5.68rem;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
          .shadow {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #FFF;
            background-color: rgba(61, 83, 99, .7);

            transition: all 1s;
            span {
              padding: 0 20px;
            }
          }
          &:hover {
            .shadow {
              opacity: 0;
            }
          }
        }
        .name {
          text-align: center;
        }
        .bottom {
          display: flex;
          justify-content: space-around;
        }
        .info {
          position: relative;
          margin-top: 50px;
          padding: 38px 12px 12px 16px;
          // display: flex;
          display: none;
          flex-direction: column;
          align-items: center;
          color: #FFF;
          background: linear-gradient(to bottom right, #6ABD78, #426ab3);
          border-radius: 4px;
          .arrow-up {
            position: absolute;
            top: -50px;
            width: 2px;
            height: 55px;
            background: linear-gradient(to bottom right, #6ABD78, #426ab3);
          }
          .hole {
            position: absolute;
            top: 6px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #FAFBFB;
          }
          .media-arrow {
            left: 6.7rem;
          }
          .media-hole {
            left: 6.6rem;
          }
          .media-arrow, .media-hole {
            display: none;
          }
          .detail {
            align-self: flex-start;
            span {
              margin-right: 20px;
            }
          }
        }
      }
    }
    @media screen and (max-device-width: 800px) {
      h3 {
        width: 2rem;
      }
      .recommend-list {
        flex-direction: column;
        .recommend-content {
          margin: 0 0 .4rem;
          .poster {
            width: 100%;
          }
          .info {
            margin-bottom: .2rem;
            .media-arrow, .media-hole {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
