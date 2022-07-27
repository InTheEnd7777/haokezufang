<template>
  <div>
    <div>
      <van-image
        fit="contain"
        src="https://img2.baidu.com/it/u=1266933116,1372139730&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=294"
      />
      <!-- //登录的盒子 -->
      <div class="denglu" v-if="islogin">
        <van-image width="60" round height="60" :src="avatar" />
        <p>{{ list.nickname }}</p>

        <van-button v-if="islogin" type="primary" @click="tuichubtn"
          >退出
        </van-button>

        <div class="gif">
          <a href="javascript:;">编辑个人资料</a>
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
      <!-- 未登录的盒子 -->
      <div class="denglu" v-else>
        <van-image
          width="60"
          round
          height="60"
          src="https://avatars.githubusercontent.com/u/106913059?v=4"
        />
        <p>游客</p>
        <van-button type="primary" to="/login">登录 </van-button>
      </div>
      <div class="list">
        <van-grid :column-num="3" :border="false">
          <van-grid-item>
            <van-grid-item icon="star" text="我的收藏" @click="collect" />
          </van-grid-item>
          <van-grid-item>
            <van-grid-item icon="wap-home" text="我的出租" @click="rent" />
          </van-grid-item>
          <van-grid-item>
            <van-grid-item icon="clock" text="看房记录" />
          </van-grid-item>
          <van-grid-item>
            <van-grid-item icon="card" text="成为房主" />
          </van-grid-item>
          <van-grid-item>
            <van-grid-item icon="manager" text="个人资料" />
          </van-grid-item>
          <van-grid-item>
            <van-grid-item icon="audio" text="联系我们" />
          </van-grid-item>
        </van-grid>
      </div>
      <div class="imgnav">
        <van-image
          width="320"
          fit="contain"
          center
          src="http://liufusong.top:8080/img/profile/join.png"
        />
      </div>
    </div>
    <!-- //未登录的页面 -->
  </div>
</template>

<script>
import { mylist } from '@/api/user'
import '@/utils/routeguard'
// import { getmycollect } from '@/api'
export default {
  data () {
    return {
      nickname: '',
      avatar: '',
      list: {}
    }
  },
  computed: {
    islogin () {
      return !!this.$store.state.user.token
    }
  },

  methods: {
    async getmylist () {
      if (this.islogin) {
        try {
          const res = await mylist(this.$store.state.user.token)
          this.list = res.data.body
          // console.log(this.list)
          // console.log(res)
          // this.besaurl = res.config.baseURL
          this.nickname = res.data.body.nickname
          const imgurl = res.data.body.avatar
          const baseurl = res.config.baseURL
          this.avatar = `${baseurl}${imgurl}`
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    },
    tuichubtn () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          mseeage: '是否退出该账号'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    collect () {
      this.$router.push('/collect')
    },
    rent () {
      this.$router.push('/rent')
    }
  },

  created () {
    this.getmylist()
  }
}
</script>

<style scoped lang="less">
.imgnav {
  display: flex;
  flex-direction: column;
  :deep(.van-image) {
    align-self: center;
  }
}
.list {
  margin-top: 60px;
}
.gif {
  font-size: 15px;
  display: block;
  text-align: center;
  a {
    color: #999;
  }
}
.denglu {
  position: absolute;
  top: 100px;
  left: 30px;
  width: 85%;
  height: 170px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px #f3f3f3;

  p {
    font-size: 11px;
    position: absolute;
    margin-top: 50px;
    align-self: center;
  }
  :deep(.van-image) {
    position: absolute;
    top: -30px;
    align-self: center;
  }
  :deep(.van-button--normal) {
    width: 76px;
    align-self: center;
    margin-bottom: 10px;
    height: 30px;
    margin-top: 80px;
  }
  .bianji {
    margin-left: 100px;
  }
}
</style>
