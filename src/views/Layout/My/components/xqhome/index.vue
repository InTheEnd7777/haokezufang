<template>
  <div>
    <!-- title -->

    <div class="title">
      <van-nav-bar
        :title="mylist.community"
        left-arrow
        @click-left="onClickLeft"
        class="leaseTitle"
      />
    </div>

    <!-- swipe -->

    <div class="com-Swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ccc">
        <van-swipe-item v-for="item in mylistimg" :key="item">
          <img :src="`${URl}${item}`"
        /></van-swipe-item>
      </van-swipe>
    </div>

    <!-- tips -->

    <div class="tips">
      <p>{{ mylist.title }}</p>
      <van-tag type="success">{{ mylist.tags && mylist.tags[0] }}</van-tag>
      <div class="bord-info">
        <div class="one-info">
          <div class="fs">{{ mylist.price }}/月</div>
          <div class="fa">租金</div>
        </div>
        <div class="two-info">
          <div class="fs">{{ mylist.roomType }}</div>
          <div class="fa">房型</div>
        </div>
        <div class="th-info">
          <div class="fs">{{ mylist.size }}平米</div>
          <div class="fa">面积</div>
        </div>
      </div>
    </div>
    <!-- xiangqing -->
    <div class="xq">
      <van-row>
        <van-col span="12"><span>装修：精装</span></van-col>
        <van-col span="11"
          ><span
            >朝向：{{ mylist.oriented && mylist.oriented[0] }}</span
          ></van-col
        >
        <van-col span="12"
          ><span>楼层：{{ mylist.floor }}</span></van-col
        >
        <van-col span="11"><span>类型：普通住宅</span></van-col>
      </van-row>
    </div>
    <!-- ditu -->
    <div>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </div>

    <!-- 房屋配套 -->
    <div class="fwpt">
      <van-cell-group>
        <van-cell title="房屋配套" />
      </van-cell-group>
      <van-grid :column-num="5">
        <van-grid-item
          v-show="mylist1.includes(item.a)"
          v-for="(item, index) in icon1"
          :key="index"
          :text="item.a"
        >
          <template #icon><span :class="item.b"></span> </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 房源概况 -->
    <div class="fygk">
      <van-cell-group>
        <van-cell title="房源概况" />
      </van-cell-group>
      <van-row type="flex" align="center">
        <van-col span="5"
          ><van-image
            round
            width="60px"
            height="60px"
            src="http://liufusong.top:8080/img/avatar.png"
        /></van-col>
        <van-col span="14" class="q1"
          ><p>王女士</p>
          <span></span><span>已认证房主</span>
        </van-col>
        <van-col span="4"
          ><van-button plain hairline type="primary" size="small"
            >发消息</van-button
          ></van-col
        >
      </van-row>
      <div class="z2">
        {{ mylist.description }}
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="cnxh">
      <van-cell-group>
        <van-cell title="猜你喜欢" />
      </van-cell-group>
      <div class="z1">
        <van-row class="q1">
          <van-col span="8">
            <van-image
              width="120"
              height="100"
              src="http://liufusong.top:8080/img/message/1.png"
            />
          </van-col>
          <van-col span="16" class="w2">
            <p class="q2">安贞西里 三室一厅</p>
            <span class="q3">72.32m²/南 北/低楼层</span>
            <button class="q4">随时看房</button>
            <span class="q5">4500/月</span>
          </van-col>
        </van-row>
        <van-row class="q1">
          <van-col span="8">
            <van-image
              width="120"
              height="100"
              src="http://liufusong.top:8080/img/message/2.png"
            />
          </van-col>
          <van-col span="16" class="w2">
            <p class="q2">天居园 2室1厅</p>
            <span class="q3">83m²/南/高楼层</span>
            <button class="q4">近地铁</button>
            <span class="q5">7200/月</span>
          </van-col>
        </van-row>
        <van-row class="q1">
          <van-col span="8">
            <van-image
              width="120"
              height="100"
              src="http://liufusong.top:8080/img/message/3.png"
            />
          </van-col>
          <van-col span="16" class="w2">
            <p class="q2">角门甲4号院 1室1厅</p>
            <span class="q3">52m²/西南/低楼层</span>
            <button class="q4">集中供暖</button>
            <span class="q5">4300/月</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div v-if="isshow" class="footer-left" @click="addAddtoFavorites">
        <van-icon name="star" />收藏
      </div>
      <div v-else class="footer-left" @click="addAddtoFavorites">
        <van-icon name="star-o" color="#1989fa" />收藏
      </div>
      <div class="footer-left">在线咨询</div>
      <div class="footer-right">电话预约</div>
    </div>
  </div>
</template>

<script>
import { housedetails } from '@/api/user'
import { AddtoFavorites } from '@/api/myshoucang'
import '@/assets/icon/iconfont.css'
export default {
  computed: {},
  data () {
    return {
      id: this.$route.params.id,
      mylist: [],
      mylist1: [],
      mylistimg: [],
      URl: '',
      icon1: [
        { a: '衣柜', b: 'iconfont icon-yigui' },
        { a: '洗衣机', b: 'iconfont icon-xiyiji' },
        { a: '空调', b: 'iconfont icon-kongtiao' },
        { a: '天然气', b: 'iconfont icon-meiqitianranqi' },
        { a: '冰箱', b: 'iconfont icon-bingxiang' },
        { a: '暖气', b: 'iconfont icon-nuanqi' },
        { a: '电视', b: 'iconfont icon-dianshiji' },
        { a: '热水器', b: 'iconfont icon-haofangtuo400iconfont2reshuiqi' },
        { a: '宽带', b: 'iconfont icon-kuandai' },
        { a: '沙发', b: 'iconfont icon-shafa' }
      ],
      houseCode: '',
      isshow: '',

      status: ''
    }
  },
  created () {
    this.housedetails()
  },
  methods: {
    // 返回上一级
    onClickLeft () {
      this.$router.go(-1)
    },
    async housedetails () {
      const res = await housedetails(this.id)
      this.mylist = res.data.body
      this.mylist1 = this.mylist.supporting
      this.mylistimg = this.mylist.houseImg
      this.URl = res.config.baseURL
      console.log(this.mylist)
      console.log(res)
      // console.log(111)
      this.houseCode = res.data.body.houseCode
    },
    async addAddtoFavorites () {
      this.$toast.loading({
        message: '加载中....',
        forbidClicks: true
      })
      try {
        const res = await AddtoFavorites(
          this.$store.state.user.token,
          this.houseCode
        )
        this.status = res.data.status
        console.log(this.status)

        if (this.status === 200) {
          this.isshow = true
          this.$toast.success('添加收藏成功')
        }
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
body {
  font-size: 18px;
}
// title
.leaseTitle {
  background-color: #21b97a;
  :deep(.van-nav-bar__arrow) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
// swipe
.com-Swipe {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 10px;
    line-height: 249px;
    width: 100%;
    text-align: center;
    background-color: #39a9ed;
    height: 249px;
  }
  :deep(.van-swipe__indicators) {
    top: 0.32rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
// tips
.tips {
  padding: 15px;
  p {
    font-size: 15px;
  }
  .van-tag--success {
    text-align: center;
    width: 40px;
    padding: 2px 2px 1px 5px;
    color: #39becd;
    background: #e1f5f8;
  }
  .bord-info {
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    padding: 15px 0;
    .fs {
      font-size: 12px;
      font-weight: 400;
      color: red;
    }
    .fa {
      font-size: 8px;
    }
  }
}
// xiangqing
.xq {
  font-size: 15px;
  margin-left: 20px;
  span {
    font-size: 10px;
    color: #c4a6a6;
  }
}
// 房屋配套
.fwpt {
  margin-top: 15px;
}
// 房源概况
.fygk {
  font-size: 15px;
  margin-left: 8px;
  margin-right: 8px;
  padding-top: 15px;
  .q1 {
    p {
      font-size: 8px;
    }
    span {
      font-size: 8px;
      color: red;
    }
  }
  div {
    font-size: 13px;
    font-weight: 400;
  }
  .z2 {
    margin-top: 15px;
    margin-left: 15px;
  }
}
// 猜你喜欢
.cnxh {
  padding-top: 15px;
  padding: 0 15px;
  .q1 {
    border-bottom: 1px solid #f6f6f6;
    padding: 10px 0;
    .w2 {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .q2 {
        font-size: 10px;
        font-weight: 700;
      }
      .q3 {
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
        width: 60px;
      }
      .q5 {
        margin-top: 2px;

        color: red;
        font-size: 10px;
      }
    }
  }
}
.z1 {
  margin-bottom: 70px;
}
// 底部
// footer
.footer {
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 17px;
  color: #999;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #cecece;
  background-color: #fff;
  overflow: hidden;
  .footer-left {
    height: 100%;
    line-height: 50px;
    border-right: 1px solid #cecece;
    flex: 1;
    text-align: center;
  }
  .footer-right {
    height: 100%;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
    color: #fff;
    background-color: #21b97a;
    flex: 1;
  }
}
</style>
