<template>
  <div class="comment-main">
    <img src="static/images/avatar.jpg" alt="avatar"/>
    <textarea placeholder="写下你精彩的评论..."></textarea>
  </div>
</template>

<script>
export default {
  name: 'Comment'
}
</script>

<style lang="less" scoped>
.comment-main {
  width: 42%;
  padding: 20px;
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  textarea {
    width: 91%;
    outline: none;
    resize: none;
  }
}
</style>
