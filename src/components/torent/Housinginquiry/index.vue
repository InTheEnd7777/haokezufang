<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="inputfn"
      />
    </form>
  </div>
</template>

<script>
import { querythecommunity } from '@/api/user'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async inputfn () {
      try {
        const name = this.value
        const res = await querythecommunity(name)
        console.log(res)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
