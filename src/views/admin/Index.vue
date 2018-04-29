<template>
  <div class="index-main">
    <div class="left">
      <div class="top">
        <img src="static/images/favicon.png" alt="favicon"/>
        <span>后台管理</span>
      </div>
      <LeftBar/>
    </div>
    <div class="right">
      <div class="top">
        <div class="left-part">
          <i class="iconfont icon-search-reverse"></i>
          <input type="text" placeholder="搜索用户..."/>
        </div>
        <div class="right-part">
          <button>
            <i class="iconfont icon-create"></i>创建用户
          </button>
          <img src="static/images/avatar.jpg" alt="avatar"/>
        </div>
      </div>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
import LeftBar from '@/components/AdminLeftBar'

export default {
  name: 'Index',
  components: {
    LeftBar
  }
}
</script>

<style lang="less" scoped>
.index-main {
  display: flex;
  background-color: #F6F6F6;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
    height: 100vh;
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: .4rem 0;
      // text-align: center;
      color: #FFF;
      // background-color: #2E84fA;
      background: linear-gradient(to bottom right, #6ABD78, #426ab3);
      img {
        margin-right: 8px;
        width: .8rem;
      }
    }
  }
  .right {
    width: 85%;
    height: 100vh;
    background-color: #FBFBFB;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40px 0; /*px*/
      width: 100%;
      // height: 100%;
      background-color: #FFF;
      box-shadow: 4px 0 6px rgba(26, 26, 26, .6); /*px*/
      .left-part {
        margin-left: 5%;
        padding: 8px; /*px*/
        border-bottom: 2px solid #BDBDBD; /*px*/
        i {
          font-weight: 600;
          color: #A4A4A4;
        }
        input {
          margin-left: 16px; /*px*/
          font-size: 32px; /*px*/
          border: none;
          outline: none;
          background-color: inherit;
        }
        input::-webkit-input-placeholder {
          color: #A4A4A4;
        }
      }
      .right-part {
        margin-right: 5%;
        display: flex;
        align-items: center;
        button {
          margin-right: 40px; /*px*/
          padding: 20px 0; /*px*/
          width: 216px; /*px*/
          font-size: 28px; /*px*/
          color: #FFF;
          background-color: #2E84fA;
          border: none;
          outline: none;
          border-radius: 44px; /*px*/

          cursor: pointer;
          i {
            margin-right: 12px; /*px*/
          }
        }
        img {
          width: 80px; /*px*/
          height: 80px; /*px*/
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
