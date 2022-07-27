<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/search">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/layout/news"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item icon="chat-o" to="/layout/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<!-- <van-icon name="newspaper-o" /> -->
<script>
export default {}
</script>

<style></style>
