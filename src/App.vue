<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
