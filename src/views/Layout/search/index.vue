<template>
  <div>
    <van-search

      show-action
      placeholder="请输入小区或地址"
      background="#21b97a"
    >
      <template #label>
        <van-button size="14px" to="/city"
          >北京<van-icon name="arrow-down"
        /></van-button>
      </template>
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20px" />
      </template>
      <template #action>
        <van-icon name="map-marked" color="#fff" size="20px" />
      </template>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #21b97a;
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
</style>
