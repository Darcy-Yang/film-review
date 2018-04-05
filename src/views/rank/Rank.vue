<template>
  <div class="rank-main">
    <Nav :leftStyle="leftStyle"/>
    <div class="content">
      <div class="selector">
        <div class="type classify">
          <span>类型</span>
          <div class="contents">
            <span>全部</span>
            <span v-for="(item, index) in selectors" :key="index">{{ item.name }}</span>
          </div>
        </div>
        <div class="area classify">
          <span>地区</span>
          <div class="contents">
            <span>全部</span>
            <span v-for="(item, index) in selectors" :key="index">{{ item.name }}</span>
          </div>
        </div>
        <div class="times classify">
          <span>时间</span>
          <div class="contents">
            <span>全部</span>
            <span v-for="(item, index) in selectors" :key="index">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="movies" v-for="(movie, index) in ranks" :key="index">
          <span>{{ movie.order }}</span>
          <div class="left-content">
            <img :src='movie.img_src' alt="image"/>
            <div class="score">
              <span>{{ movie.star }}</span>
            </div>
          </div>
          <div class="right-content">
            <span class="name">{{ movie.title }}</span>
            <span>{{ movie.info }}</span>
            <span>{{ movie.type }}</span>
            <span>{{ movie.votes }}</span>
            <span class="quote">{{ movie.quote }}</span>
          </div>
        </div>
        <!-- <pagination :pageCount="pageCount"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import Pagination from '@/components/Pagination';

import request from '@/utils/request';
import event from '@/utils/event';

export default {
  name: 'Rank',
  components: {
    Nav,
    Pagination,
  },
  data () {
    return {
      leftStyle: 'margin-left: 206px;',
      selectors: [
        { name: '类别一', selected: false },
        { name: '类别二', selected: false },
        { name: '类别三', selected: false },
        { name: '类别四', selected: false },
        { name: '类别五', selected: false },
        { name: '类别六', selected: false },
      ],
      limit: 10,
      currentPage: 1,
      pageCount: 0,
      ranks: [],
    }
  },
  created() {
    this.getRank();
  },
  methods: {
    async getRank() {
      try {
        const { ranks, count } = await request('POST', '/rank', { page: this.currentPage });
        this.pageCount = Math.ceil(count / 10);
        this.ranks = ranks;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.$root.$on('currentPage', (val) => {
      this.currentPage = val;
      this.getRank();
    })
  },
}
</script>

<style lang="less" scoped>
.rank-main {
  background-color: #F6F6F6;
  .content {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    .selector {
      display: flex;
      margin-bottom: 36px;
      padding: 20px;
      padding-top: 0;
      width: 60%;
      flex-direction: column;

      background-color: #FFF;
      border-radius: 3px;
      .classify {
        display: flex;
        margin-top: 20px;
        .contents {
          span {
            margin-left: 30px;
            color: gray;
            cursor: pointer;
            &:first-child {
              padding: 2px 4px;
              color: #FFF;
              background-color: #2196FF;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .list {
      display: flex;
      width: 100%;
      // padding: 20px;
      flex-direction: column;
      align-items: center;
      // align-items: flex-start;
      .movies {
        display: flex;
        margin-bottom: 20px;
        padding: 10px 20px 0 20px;
        width: 60%;
        background-color: #FFF;
        border-radius: 3px;
        // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        .left-content {
          img {
            margin: 0 30px 0 12px;
            width: 100px;
            height: 130px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #BDBDBD;
          }
          .score {
            position: relative;
            top: -26px;
            left: 12px;
            width: 100px;
            font-weight: 600;
            text-align: right;
            color: orange;
            background-color: rgba(128, 128, 128, .8);
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            span {
              margin-right: 6px;
            }
          }
        }
        .right-content {
          display: flex;
          flex-direction: column;
          span {
            margin-top: 6px;
            font-size: 14px;
          }
          .name {
            margin-top: 0;
            font-size: 18px;
            font-weight: 600;
          }
          .quote {
            font-style: italic;
          }
        }
      }
    }
  }
}
</style>
