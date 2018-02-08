<template>
  <div class="list-main">
    <div class="content" v-for="(item, index) in contents" :key="index">
      <div class="describe">
        <div class="title">
          <span>标题</span>
        </div>
        <span>内容简介内容简介内容简介内容简介内容简介内容简介</span>
      </div>
      <div class="avatar">
        <img src="static/images/avatar.jpg" alt="avatar"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      contents: []
    }
  },
  created () {
    this.contents.length = 12
  }
}
</script>

<style lang="less" scoped>
.list-main {
  display: flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  .content {
    display: flex;
    margin: 20px 30px;
    padding: 6px;
    width: 300px;

    background-color: #FFF;
    border-radius: 3px;
    transition: .1s ease-in;
    cursor: pointer;
    .describe {
      .title {
        text-align: center;
      }
    }
    .avatar {
      img {
        width: 80px;
        border-radius: 3px;
      }
    }
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 0 10px grey;
    }
  }
}
</style>
