<template>
  <div>
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height="100px"
    >
      <van-swipe-item v-for="item in lunbolist" :key="item.id"
        ><img :src="`${baseurl}${item.imgSrc}`" alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="q1">
      <van-search
        show-action
        placeholder="请输入小区或地址"
        background="transparent"
      >
        <template #label>
          <van-button size="14px" to="/city"
            >{{ name }}<van-icon name="arrow-down"
          /></van-button>
        </template>
        <template #left>
          <van-icon name="arrow-left" color="#fff" size="20px" />
        </template>
        <template #action>
          <van-icon name="map-marked" color="#333" size="20px" />
        </template>
      </van-search>
    </div>
    <van-grid :border="false" class="q2">
      <van-grid-item
        ><template #icon>
          <div class="q3">
            <img src="../../../assets/all.png" alt="" /></div
        ></template>
        <template #text>整租 </template>
      </van-grid-item>
      <van-grid-item
        ><template #icon>
          <div class="q3">
            <img src="../../../assets/each.png" alt="" />
          </div>
        </template>
        <template #text>合租 </template>
      </van-grid-item>
      <van-grid-item
        ><template #icon>
          <div class="q3"><img src="../../../assets/local.png" alt="" /></div>
        </template>
        <template #text>地图找房 </template>
      </van-grid-item>
      <van-grid-item
        ><template #icon>
          <div class="q3">
            <img src="../../../assets/rent.png" alt="" @click="torent" /></div
        ></template>
        <template #text>去出租</template>
      </van-grid-item>
    </van-grid>
    <div class="q4">
      <van-cell title="单元格" value="更多" class="q4" />
      <div class="w1">
        <van-row gutter="20" type="flex">
          <van-col span="12" v-for="item in lunbolist1" :key="item.id">
            <van-row style="margin: 5px 0" class="w2">
              <van-col span="2"></van-col>
              <van-col span="8"
                ><van-image
                  width="50"
                  height="50"
                  :src="`${baseurl}${item.imgSrc}`"
                />
              </van-col>
              <van-col span="10" size="10px" class="w2">
                <p>{{ item.title }}</p>
                <p>{{ item.desc }}</p></van-col
              >
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getswiper, getRentalGroup } from '@/api'
export default {
  data () {
    return {
      baseurl: '',
      lunbolist: [],
      baseurl1: '',
      lunbolist1: [],
      name: '北京'
    }
  },
  created () {
    this.getswiper()
    this.getRentalGroup()
  },
  methods: {
    torent () {
      this.$router.push('/torent')
    },
    async getswiper () {
      try {
        const res = await getswiper()

        this.baseurl = res.config.baseURL
        this.lunbolist = res.data.body
        // console.log(this.lunbolist)
      } catch (error) {
        this.$toast.fail('请重新刷新')
      }
    },
    async getRentalGroup () {
      try {
        const res = await getRentalGroup()
        this.baseurl1 = res.config.baseURL
        this.lunbolist1 = res.data.body
      } catch (error) {
        this.$toast.fail('请重新刷新')
      }
    }
  }
}
</script>
<style scoped lang="less">
.my-swipe {
  height: 200px;
  img {
    width: 100%;
  }
}
.q1 {
  position: absolute;
  top: 5px;
  left: 20px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-nav-bar {
  :deep(.van-nav-bar__left) {
    color: #fff;
  }
}
.van-button--default {
  color: #323233;
  background-color: #f7f8fa;
  border: aliceblue;
  font-size: 16px;
  height: 20px;
  top: -4px;
}
.q2 {
  :deep(.van-grid-item__icon-wrapper) {
    margin-bottom: 5px;
  }
  .q3 {
    border-radius: 50%;
    background-color: #f2fbf7;
    height: 70px;
    width: 70px;
    text-align: center;
    margin-top: 10px;
    img {
      width: 60px;
    }
  }
  :deep(.van-grid-item__icon-wrapper) {
    font-size: 50px;
    text-align: center;
    color: #02af67;
  }
  :deep(.van-grid-item) {
    font-size: 10px;
  }
}
.q4 {
  background-color: #eee;
  .w1 {
    .w2 {
      font-size: 10px;
      background-color: #fff;
    }
  }
}
</style>
