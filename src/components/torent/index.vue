<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <span class="iconfont icon-youjiantou"></span>
      </template>
    </van-nav-bar>
    <van-cell title="房源信息" size="large" color="#4fc08d" />
    <van-cell
      title="小区名称"
      is-link
      value="请输入小区名称"
      @click="btnHousinginquiry"
    />
    <van-field
      v-model="number"
      type="number"
      label="租金"
      placeholder="请输入租金/月"
    >
      <template #value> 123 </template>
    </van-field>
    <van-field
      v-model="number1"
      type="number"
      label="建筑面积"
      placeholder="请输入建筑面积"
      value="34324"
    >
    </van-field>
    <!-- 户型 -->
    <div>
      <van-cell is-link title="户型" @click="show = true" v-model="huxing" />
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
      /></van-popup>
    </div>
    <!-- //所在楼层 -->
    <div>
      <van-cell
        is-link
        title="所在楼层"
        @click="show1 = true"
        v-model="louceng"
      />
      <van-popup v-model="show1" position="bottom" :style="{ height: '30%' }">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm1"
          @cancel="onCancel1"
      /></van-popup>
    </div>
    <!-- 朝向 -->
    <div>
      <van-cell
        is-link
        title="朝向"
        @click="show2 = true"
        v-model="chaoxiang"
      />
      <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
          @cancel="onCancel2"
      /></van-popup>
    </div>
    <van-cell-group>
      <van-cell-group>
        <van-cell title="房屋标题" />
      </van-cell-group>
      <van-field
        rows="2"
        autosize
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        show-word-limit
      />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="房屋图像" />
    </van-cell-group>

    <van-field name="uploader">
      <template #input>
        <van-uploader />
      </template>
    </van-field>
    <div>
      <van-cell-group>
        <van-cell title="房屋配置" />
      </van-cell-group>
      <!-- 房屋配置 -->
      <div>
        <van-grid :column-num="5">
          <van-grid-item
            :text="item"
            v-for="(item, index) in columns3"
            :key="index"
          >
            <template #icon> <span :class="classfw[index]"></span> </template
          ></van-grid-item>
        </van-grid>
      </div>
      <!-- 房屋描述 -->
      <van-cell title="房屋描述" />
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        placeholder="请输入房屋描述信息"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { torent } from '@/api/user'
import '@/assets/icon/iconfont.css'
export default {
  data () {
    return {
      number: '',
      number1: '',
      show: false,
      show1: false,
      show2: false,
      columns: [], // 户型
      columns1: [], // 楼层
      columns2: [], // 朝向
      columns3: [], // 房屋配置
      classfw: [
        'iconfont icon-dianshiji',
        'iconfont icon-bingxiang',
        'iconfont icon-xiyiji',
        'iconfont icon-kongtiao',
        'iconfont icon-haofangtuo400iconfont2reshuiqi',
        'iconfont icon-shafa',
        'iconfont icon-nuanqi',
        'iconfont icon-wifi',
        'iconfont icon-yigui',
        'iconfont icon-meiqitianranqi'
      ], // 房屋配置类名
      huxing: '',
      louceng: '',
      chaoxiang: '',
      message: ''
    }
  },
  created () {
    this.torent()
  },
  methods: {
    btnHousinginquiry () {
      this.$router.push('/housinginquiry')
    },
    onClickLeft () {
      this.$router.back()
    },
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
    },
    onSelect1 (item) {
      this.show1 = false
    },
    onSelect2 (item) {
      this.show1 = false
    },
    async torent () {
      try {
        const { data } = await torent()
        console.log(data)
        // 户型
        const mylist = data.body.roomType
        const columns = Array.from(mylist, ({ label }) => label)
        this.columns = columns
        // 楼层
        const mylist2 = data.body.floor
        const columns1 = Array.from(mylist2, ({ label }) => label)
        // console.log(this.louceng)
        this.columns1 = columns1
        // 朝向
        const mylist3 = data.body.oriented
        const columns2 = Array.from(mylist3, ({ label }) => label)
        this.columns2 = columns2
        // 房屋配置
        const mylist4 = data.body.supporting
        const columns3 = Array.from(mylist4, ({ label }) => label)
        this.columns3 = columns3
        // console.log(columns3)
      } catch (error) {}
    },
    onCancel () {
      this.show = false
    },
    onConfirm (value) {
      this.huxing = value

      this.show = false
    },
    onConfirm1 (value) {
      this.louceng = value
      this.show1 = false
    },
    onCancel1 () {
      this.show1 = false
    },
    onConfirm2 (value) {
      this.chaoxiang = value
      this.show2 = false
    },
    onCancel2 () {
      this.show2 = false
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
</style>
