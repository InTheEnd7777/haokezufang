<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-arrow
      class="hedear"
      @click-left="onclick"
      color="#fff"
    ></van-nav-bar>

    <van-row
      class="q1"
      v-for="(item, index) in thismylist"
      :key="index"
      @click="$router.push(`/xqhome/${item.houseCode}`)"
    >
      <van-col span="8">
        <van-image
          width="120"
          height="80"
          :src="`${baseurl}${item.houseImg}`"
        />
      </van-col>
      <van-col span="16" class="w2">
        <p class="q2">{{ item.title }}</p>
        <span class="q3">{{ item.desc }}</span>
        <button class="q4">{{ item.tags[0] }}</button>
        <span class="q5">{{ item.price }}/月</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getmyrent } from '@/api'
export default {
  data () {
    return {
      baseurl: '',
      thismylist: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getmyrent()
  },
  methods: {
    onclick () {
      this.$router.back()
    },
    async getmyrent () {
      this.$toast.loading({
        message: '加载中',
        forbidClicks: true
      })

      try {
        const res = await getmyrent(this.user.token)
        // console.log(res)
        this.thismylist = res.data.body
        // console.log(this.thismylist)

        this.$toast.success(res.data.description)

        this.baseurl = res.config.baseURL
      } catch (error) {
        this.$toast.fail('请重新进入')
      }
    }
  }
}
</script>

<style scoped lang="less">
.hedear {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 20px;
  }
  :deep(.van-nav-bar) {
    color: #fff;
  }
}
.q1 {
  border-bottom: 1px solid #f6f6f6;
  padding: 10px 0;
  .w1 {
    padding: 10px 0;
  }
  .w2 {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .q2 {
      font-size: 10px;
      font-weight: 700;
    }
    .q3 {
      margin-top: -6px;

      color: #bfcada;
      font-size: 8px;
    }
    .q4 {
      margin-top: 2px;
      color: #83ddea;
      background-color: #e1f5f8;
      border: #fff;
      font-size: 2px;
      height: 19px;
      width: 50px;
    }
    .q5 {
      margin-top: 2px;

      color: red;
      font-size: 10px;
    }
  }
}
</style>
