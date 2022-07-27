<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left> <span class="iconfont icon-guanbi"></span> </template>
    </van-nav-bar>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        placeholder="请输入用户名"
        :rules="usernameRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="passwordRules"
      />
      <div style="margin: 16px">
        <van-button block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { usernameRules, passwordRules } from './rules'
export default {
  data () {
    return {
      username: '',
      password: '',
      usernameRules,
      passwordRules
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '登陆中',
        forbidClicks: true
      })

      try {
        const res = await login(this.username, this.password)
        if (res.data.status === 200) {
          // console.log(res)
          this.$toast.success(res.data.description)
          this.$store.commit('setUser', res.data.body)
          this.onClickLeft()
        } else {
          this.$toast.fail(res.request.description)
        }
      } catch (e) {
        console.log(e.message)
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #21b97a;
  color: #fff;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 20px;
  }
}
.van-button--block {
  display: block;
  width: 100%;
  background-color: #1cb676;
  color: #fff;
  font-size: 20px;
  height: 55px;
}
.van-cell {
  height: 60px;
  line-height: 55px;
  font-size: 20px;
}
</style>
