<template>
  <div class="rank-main">
    <Nav v-on:search="search" :placeholder="placeholder"/>
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
        <div class="movies" v-for="(movie, index) in ranks" :key="index" @click="jumpToDetail(movie)">
          <div class="main-content">
            <div class="poster">
              <img v-if="movie.poster" :src='movie.poster' alt="poster"/>
              <div class="preview" v-else>
                <span>{{ movie.title }}</span>
              </div>
              <div class="hover-show">
                <span>{{ movie.title }}</span>
              </div>
            </div>
            <div class="info">
              <span class="title">{{ movie.title }}</span>
              <div class="votes">
                <span class="star">{{ movie.star ? movie.star : '评分暂无' }}</span>
                <span>{{ movie.votes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination v-if="pageCount > 1" :pageCount="pageCount"/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import Pagination from '@/components/Pagination';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Rank',
  components: {
    Nav,
    Pagination,
  },
  data () {
    return {
      placeholder: '影名',
      searchWord: '',
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
      limit: 15,
      currentPage: 1,
      currentUser: null,
      searchType: '全部',
      searchArea: '全部',
      searchTime: '全部',
      pageCount: 0,
      ranks: [],
    }
  },
  created() {
    this.getRank();
    const { user } = getUser();
    this.currentUser = user;
  },
  methods: {
    search(val) {
      this.searchWord = val;
      this.getRank();
    },
    async getRank() {
      try {
        const { ranks, count } = await request('GET', '/rank', {
          page: this.currentPage,
          limit: this.limit,
          searchWord: this.searchWord,
          type: this.searchType,
          area: this.searchArea,
          time: this.searchTime
        });
        this.pageCount = Math.ceil(count / this.limit);
        this.ranks = ranks;
      } catch (err) {
        this.$message(err.message, 'error');
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
    async jumpToDetail(movie) {
      const review = { rank: null };
      review.rank = movie;
      review.movieId = movie.id;
      await request('POST', '/user/favor', {}, {
        id: this.currentUser.id,
        type: movie.type,
        movieId: movie.id
      });
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
  margin-top: 2rem;
  min-height: 100vh;
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
      color: gray;
      flex-direction: column;
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
            color: #2196FF;
            border-bottom: 2px solid #BDBDBD;
          }
        }
      }
    }
    .list {
      margin: 0 auto 20px auto;
      display: flex;
      width: 80%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .movies {
        position: relative;
        display: flex;
        margin: .16rem .6rem .16rem 0;
        border-radius: 3px;
        cursor: pointer;
        .main-content {
          display: flex;
          flex-direction: column;
          .poster {
            position: relative;
            img {
              width: 3.2rem;
              height: 4.8rem;
              border-radius: 4px;
              box-shadow: 0 12px 16px rgba(26, 26, 26, .4);

              cursor: pointer;
            }
            .preview {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 12px;
              width: 136px;
              height: 200px;
              color: #FFF;
              background-color: #426AB3;
              border-radius: 4px;
              box-shadow: 0 12px 16px #1A1A1A;
            }
            .hover-show {
              display: none;
              position: absolute;
              top: 0;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              padding: 0 20px;

              width: 2.667rem;
              height: 4.8rem;
              color: #FFF;
              word-break: break-all;
              background-color: rgba(128, 128, 128, .8);
              border-radius: 4px;
              .title {
                margin-top: 4px;
                padding-left: 8px;
              }
            }
            &:hover {
              .hover-show {
                display: flex;
              }
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            color: gray;
            .title {
              margin: 16px 0 4px 0;
              font-size: .3rem;
              font-weight: 600;
            }
            .votes {
              &:first-letter {
                font-size: 22px;
              }
              .star {
                color: orange;
              }
              span:last-child {
                margin-left: 12px;
                font-size: 13px;
                letter-spacing: .4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
