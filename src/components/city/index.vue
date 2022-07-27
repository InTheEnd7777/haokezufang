<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <span class="iconfont icon-youjiantou"></span>
      </template>
    </van-nav-bar>
    <van-index-bar :sticky="false" class="q1">
      <van-index-anchor
        v-for="(item, index) in firstNameList"
        :key="index"
        :index="index"
      >
        <span>{{ item.length == 0 ? '' : index }}</span>
        <van-cell
          class="citylistzz"
          @click="chooseCity(citem)"
          v-for="(citem, cindex) in item"
          :key="cindex"
          :title="citem"
        ></van-cell>
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getcitylist } from '@/api'
const pinyin = require('js-pinyin')
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
export default {
  data () {
    return {
      // indexList: ['热门城市'],
      mylist: [],
      FirstPin: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      nameFirst: [],
      cityNameList: [],
      firstNameList: []
    }
  },
  created () {
    this.getcitylist()
  },
  methods: {
    // tocity () {},
    onClickLeft () {
      this.$router.back()
    },
    async getcitylist () {
      try {
        const res = await getcitylist(1)
        // console.log(res)
        this.mylist = res.data.body
        // console.log(this.mylist)
        this.mylist.forEach((item) => {
          this.cityNameList.push(item.label)
          // console.log((item.short).substring(0, 1))
        })
        // console.log(this.cityNameList)
        //= ========================================
        const firstName = {}
        this.FirstPin.forEach((item) => {
          firstName[item] = []
          this.cityNameList.forEach((el) => {
            const first = pinyin.getFullChars(el).substring(0, 1)
            this.nameFirst.push(first)
            if (first === item) {
              firstName[item].push(el)
            }
          })
          this.firstNameList = firstName
        })
        console.log(this.firstNameList)
      } catch (error) {
        console.log(error)
      }
    },

    chooseCity (name) {
      this.$router.back({
        home: 'home',
        params: {
          cname: name
        }
      })
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
.q1 {
  :deep(.van-index-anchor) {
    color: #e5e5e5;
    font-weight: 700;
    font-size: 15px;
  }
  :deep(.van-cell) {
    left: -15px;
    font-size: 18px;
    font-weight: 400;
  }
  :deep(.van-index-bar__index) {
    padding-top: 7px;
  }
  :deep(.index-active) {
    color: #fff;
    background-color: #21b97a;
    border-radius: 100%;
    display: inline-block;
    font-size: 12px;
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
}
</style>
