<template>
    <div class="wrap-about">about</div>
    <tag :text="text" :theme="theme"></tag>
    <tag :text="text"></tag>
    <tag :text="text"></tag>
</template>
<script lang="ts" setup>
// import tag from './tag.vue'

const text = ref('庚云')
const theme = ref('black')
</script>
<style lang="less" scoped>
.wrap-about{
    background: @bg;
    color: @tc;
}
</style>