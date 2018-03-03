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
        <div class="movies" v-for="i in 10" :key="i">
          <span>1.</span>
          <div class="left-content">
            <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1312700628.jpg" alt="image"/>
            <div class="score">
              <span>8.9</span>
            </div>
          </div>
          <div class="right-content">
            <span class="name">当幸福来敲门</span>
            <span>导演、主演信息</span>
            <span>2006/美国/剧情 传记 家庭</span>
            <span>570879 人评价</span>
            <span style="color: red;">平民励志片。增加 双引号 样式</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Rank',
  components: {
    Nav
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
        { name: '类别六', selected: false }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.rank-main {
  background-color: #F6F6F6;
  .content {
    display: flex;
    margin: 20px 0;
    flex-direction: column;
    align-items: center;
    .selector {
      display: flex;
      margin-bottom: 20px;
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
        margin-top: 20px;
        padding: 10px 20px 0 20px;
        width: 60%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        .left-content {
          img {
            margin: 0 30px 0 12px;
            width: 100px;
            height: 130px;
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
        }
      }
    }
  }
}
</style>
