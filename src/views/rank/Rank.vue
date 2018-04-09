<template>
  <div class="rank-main">
    <Nav :leftStyle="leftStyle"/>
    <div class="content">
      <div class="selector">
        <div class="type classify">
          <span>类型</span>
          <div class="contents">
            <span v-for="(item, index) in types" :class="item.selected ? 'actived' : ''" :key="index" @click="choose(item, 'types')">{{ item.name }}</span>
          </div>
        </div>
        <div class="area classify">
          <span>地区</span>
          <div class="contents">
            <span v-for="(item, index) in areas" :class="item.selected ? 'actived' : ''" :key="index" @click="choose(item, 'areas')">{{ item.name }}</span>
          </div>
        </div>
        <div class="times classify">
          <span>时间</span>
          <div class="contents">
            <span v-for="(item, index) in times" :class="item.selected ? 'actived' : ''" :key="index" @click="choose(item, 'times')">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="movies" v-for="(review, index) in ranks" :key="index">
          <span>{{ review.order }}</span>
          <div class="left-content">
            <img :src='review.img_src' alt="image"/>
            <div class="score">
              <span>{{ review.star }}</span>
            </div>
          </div>
          <div class="right-content">
            <span class="name" @click="jumpToDetail(review)">{{ review.title }}</span>
            <span>{{ review.info }}</span>
            <span>{{ review.type }}</span>
            <span>{{ review.votes }}</span>
            <span class="quote">{{ review.quote }}</span>
          </div>
        </div>
        <pagination v-if="pageCount > 1" :pageCount="pageCount"/>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import Pagination from '@/components/Pagination';

import request from '@/utils/request';

export default {
  name: 'Rank',
  components: {
    Nav,
    Pagination,
  },
  data () {
    return {
      leftStyle: 'margin-left: 206px;',
      types: [
        { name: '全部', selected: true },
        { name: '剧情', selected: false },
        { name: '科幻', selected: false },
        { name: '爱情', selected: false },
        { name: '喜剧', selected: false },
        { name: '动作', selected: false },
        { name: '悬疑', selected: false },
        { name: '动画', selected: false },
        { name: '传记', selected: false },
        { name: '纪录片', selected: false },
      ],
      areas: [
        { name: '全部', selected: true },
        { name: '中国大陆', selected: false },
        { name: '香港', selected: false },
        { name: '台湾', selected: false },
        { name: '美国', selected: false },
        { name: '日本', selected: false },
        { name: '韩国', selected: false },
        { name: '印度', selected: false },
        { name: '意大利', selected: false },
        { name: '新西兰', selected: false },
      ],
      times: [
        { name: '全部', value: '全部', selected: true },
        { name: '2010年之后', value: [2010, 2018], selected: false },
        { name: '2000～2010年', value: [2000, 2010], selected: false },
        { name: '90年代', value: [1990, 1999], selected: false },
        { name: '80年代', value: [1980, 1989], selected: false },
        { name: '70年代', value: [1970, 1979], selected: false },
        { name: '70年代之前', value: 1970, selected: false },
      ],
      limit: 10,
      currentPage: 1,
      searchType: '全部',
      searchArea: '全部',
      searchTime: '全部',
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
        const { ranks, count } = await request('POST', '/rank', {
          page: this.currentPage,
          type: this.searchType,
          area: this.searchArea,
          time: this.searchTime
        });
        this.pageCount = Math.ceil(count / 10);
        this.ranks = ranks;
      } catch (err) {
        console.log(err);
      }
    },
    choose(item, category) {
      if (category === 'types') {
        this.types.forEach(item => item.selected = false);
      } else if (category === 'areas') {
        this.areas.forEach(item => item.selected = false);
      } else if (category === 'times') {
        this.times.forEach(item => item.selected = false);
      }
      item.selected = true;
      this.searchType = this.types.filter(item => item.selected)[0].name;
      this.searchArea = this.areas.filter(item => item.selected)[0].name;
      this.searchTime = this.times.filter(item => item.selected)[0].value;
      this.getRank();
    },
    jumpToDetail(review) {
      this.$router.push({ name: 'Review', params: { review } });
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
            padding: 2px 4px;
            color: gray;
            cursor: pointer;
          }
          .actived {
            padding: 2px 4px;
            color: #FFF;
            background-color: #2196FF;
            border-radius: 3px;
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

            cursor: pointer;
            &:hover {
              color: #0077FF;
            }
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
