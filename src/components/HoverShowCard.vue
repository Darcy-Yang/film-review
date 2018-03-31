<template>
  <div class="hover-show" :style="cardStyle">
    <div class="top">
      <img src="static/images/avatar.jpg" alt="avatar"/>
      <span>{{ name }}</span>
    </div>
    <div class="bottom">
      <div class="intro">
        <span>一句话介绍自己</span>
      </div>
      <div class="experience">
        <div class="field">
          <span>影评</span>
          <span>3</span>
        </div>
        <div class="field">
          <span>台词</span>
          <span>2</span>
        </div>
        <div class="field">
          <span>获得赞同</span>
          <span>2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverShowCard',
  props: {
    cardStyle: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.hover-show {
  // display: flex;
  display: none;
  position: absolute;
  padding: 4px 12px;
  flex-direction: column;

  width: 246px;
  border-radius: 4px;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(26, 26, 26, .3);

  z-index: 2;
  img, span {
    cursor: default;
  }
  .top {
    display: flex;
    padding: 6px 0 10px 0;
    align-items: center;
    border-bottom: 1px solid #BDBDBD;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    span {
      margin-left: 12px;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .bottom {
    margin: 8px 0;
    .intro {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .experience {
      margin-top: 4px;
      display: flex;
      justify-content: space-around;
      .field {
        margin-right: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
