<template>
  <div>
    <van-nav-bar
      title="收藏列表"
      left-arrow
      class="hedear"
      @click-left="onclick"
      color="#fff"
    ></van-nav-bar>
    <van-row class="q1" v-for="(item, index) in mylist" :key="index">
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
import { getmycollect } from '@/api/myshoucang'
export default {
  data () {
    return {
      mylist: [],
      baseurl: ''
    }
  },
  created () {
    this.getmycollect()
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    onclick () {
      this.$router.back()
    },
    async getmycollect () {
      try {
        const res = await getmycollect(this.user.token)
        this.mylist = res.data.body
        // console.log(res)
        // console.log(this.mylist)
        // const imgurl = res.data.body.houseImg
        // console.log(imgurl)

        const baseurl = res.config.baseURL
        this.baseurl = baseurl
        // this.avatar = `${baseurl}${imgurl}`
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
