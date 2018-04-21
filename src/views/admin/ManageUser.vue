<template>
  <div class="user-main">
    <div class="top">
      <h3>用户管理 ( {{ allUser.length }} )</h3>
    </div>
    <div class="content">
      <div class="header list">
        <div class="hole"></div>
        <span v-for="(item, index) in descriptions" :key="index * -1">
          {{ item }}
        </span>
        <span class="operation"></span>
      </div>
      <div class="list" v-for="(user, index) in allUser" :class="index % 2 === 0 ? 'odd' : ''" :key="index">
        <div class="hole" :class="user.selected ? 'active' : ''" @click="user.selected = !user.selected"></div>
        <avatar-and-name :avatarStyle="avatarStyle" :avatar="user.avatar" :name="user.name"/>
        <span>3</span>
        <span>6</span>
        <span class="time">{{ user.createdAt }}</span>
        <span class="time">{{ user.updatedAt }}</span>
        <div class="operation">
          <i class="iconfont icon-browse"></i>
          <i class="iconfont icon-delete" @click="deleteUser(user)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarAndName from '@/components/AvatarAndName';

import request from '@/utils/request';

export default {
  name: 'ManageUser',
  components: {
    AvatarAndName,
  },
  data () {
    return {
      avatarStyle: 'width: 36px; height: 36px;',
      descriptions: ['用户', '影评数', '台词数', '注册时间', '上次登录时间'],
      allUser: [],
      count: 0,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const { count, allUser } = await request('GET', '/user', { page: 1, limit: 10 });
      this.allUser = allUser;
      this.count = count;
    },
    async deleteUser(user) {
      const that = this;
      const confirm = this.$confirm({
        message: `确认删除 ${user.name} 吗?`,
        buttons: [{
          action: function () {
            confirm.closeConfirm().then(function (res) {
              return;
            });
          }
        },
        {
          action: function () {
            confirm.closeConfirm().then(async function (res) {
              try {
                await request('DELETE', `/delete/${user.id}`);
                that.getUser();
                that.$message('删除成功');
              } catch (err) {
                that.$message(err.message, 'error');
              }
            });
          }
        }]
      })
    },
  },
}
</script>

<style lang="less" scoped>
.user-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    margin: 9px 0;
    text-align: left;
    width: 80%;
    h3 {
      // margin-top: 20px;
      color: #7E8282;
      letter-spacing: .4px;
    }
  }
  .content {
    // margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    background-color: #FBFBFB;
    border: 1px solid #BDBDBD;
    border-radius: 4px;
    .list {
      display: flex;
      align-items: center;
      padding: 14px;
      padding-right: 0;
      text-align: center;
      border-bottom: 1px solid #BDBDBD;
      &:hover {
        .operation i {
          display: block;
        }
      }
      &:last-child {
        border-bottom: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .hole {
        margin-right: 18px;
        padding: 0;
        flex: none;
        width: 18px;
        height: 18px;
        border: 1px solid #BDBDBD;
        border-radius: 50%;

        cursor: pointer;
      }
      .active {
        background-color: #2E84fA;
      }
      .time {
        font-size: 14px;
        color: #8590A6;
      }
      .operation {
        display: flex;
        justify-content: space-around;
        flex: 0.5;
        height: 22px;
        i {
          display: none;
          font-size: 18px;
          cursor: pointer;
          &:first-child {
            margin-left: 6px;
          }
          &:last-child {
            margin-right: 6px;
          }
          &:hover {
            color: #0077FF;
          }
        }
      }
      div, span {
        flex: 1;
        padding-left: 16px;
      }
    }
    .odd {
      background-color: #FFF;
    }
    .header {
      padding: 14px 0 14px 14px;
      background-color: #FBFBFB;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      span {
        border-left: 1px solid #BDBDBD;
      }
    }
  }
}
</style>
