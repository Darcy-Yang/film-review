<template>
  <div class="recommend-main">
    <Nav/>
    <div class="recommend">
      <h3>为你推荐:</h3>
      <div class="recommend-list">
        <div class="recommend-content" v-for="rank in ranks" :key="rank.id">
          <div class="poster">
            <img :src="rank.img_src" alt="poster"/>
            <div class="shadow">
              <span>{{ rank.quote }}</span>
            </div>
          </div>
          <!-- <div class="name">
            <span>{{ rank.title }}( {{ rank.area }} )</span>
          </div>
          <div class="bottom">
            <span>{{ rank.star }}</span>
            <span>{{ rank.type }}</span>
          </div> -->
          <div class="info">
            <div class="arrow-up"></div>
            <div class="hole"></div>
            <div class="arrow-up media-arrow"></div>
            <div class="hole media-hole"></div>
            <span>{{ rank.title }}</span>
            <span>{{ rank.info }}</span>
            <div class="detail">
              <span>{{ rank.area }}</span>
              <span>{{ rank.time }}</span>
            </div>
            <div class="detail">
              <span>{{ rank.star }}</span>
              <span>{{ rank.type }}</span>
            </div>
            <span>{{ rank.quote }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

import request from '@/utils/request';

export default {
  name: 'Recommend',
  components: {
    Nav,
  },
  data() {
    return {
      ranks: [],
    }
  },
  created() {
    this.getRecommend();
  },
  methods: {
    async getRecommend() {
      try {
        const { ranks } = await request('GET', '/rank', {
          limit: 10,
          type: '全部',
          area: '全部',
          time: '全部'
        });
        this.ranks = ranks;
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
  // background-color: #3D5363;
  // background: linear-gradient(to bottom right, #6ABD78, #426ab3);
  .recommend {
    margin: 65px auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    // color: #BDBDBD;
    h3 {
      padding: 4px 10px;
      width: 83px;
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
          cursor: pointer;
          img {
            width: 208px;
            height: 308px;
          }
          .shadow {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 308px;
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
          // width: 80%;
          // margin-left: 20px;
          flex-direction: column;
          color: #FFF;
          // background-color: rgba(0, 0, 0, .6);
          background: linear-gradient(to bottom right, #6ABD78, #426ab3);
          border-radius: 4px;
          .arrow-up {
            position: absolute;
            top: -55px;
            left: 100px;
            width: 2px;
            height: 55px;
            background: linear-gradient(to bottom right, #6ABD78, #426ab3);
            // border-left: 25px solid transparent;
            // border-right: 40px solid transparent;
            // border-bottom: 45px solid rgba(0, 0, 0, .6);
            // border-bottom: 45px solid linear-gradient(to bottom right, #6ABD78, #426ab3);
            // background: linear-gradient(to bottom right, #6ABD78, #426ab3);
          }
          .hole {
            position: absolute;
            top: 6px;
            left: 92px;
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
          margin-right: 0;
          .poster img {
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
