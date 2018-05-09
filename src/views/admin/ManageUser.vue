<template>
  <div class="user-main">
    <div class="top">
      <h3>用户管理 ( {{ allUser.length }} )</h3>
      <List :descriptions="descriptions" :lists="allUser" :keys=keys v-on:delete="deleteUser" v-on:deleteBatch="deleteBatch">
      </List>
    </div>
  </div>
</template>

<script>
import AvatarAndName from '@/components/AvatarAndName';
import List from '@/components/List';

import request from '@/utils/request';

export default {
  name: 'ManageUser',
  components: {
    AvatarAndName,
    List,
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
  computed: {
    keys() {
      const keys = [
        'reviewCount', 'wordsCount', 'createdAt', 'updatedAt'
      ];
      return keys;
    },
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
                await request('DELETE', `/user/delete/${user.id}`);
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
    async deleteBatch(ids) {
      const that = this;
      const confirm = this.$confirm({
        message: `确认删除选中吗?`,
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
                await request('DELETE', `/user/delete/batch/${ids.join(' ')}`);
                that.getUser();
                that.$message('批量删除成功');
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
    margin: 18px 0; /*px*/
    text-align: left;
    width: 80%;
    h3 {
      // margin-top: 20px;
      color: #7E8282;
      letter-spacing: .8px; /*px*/
    }
  }
}
</style>
