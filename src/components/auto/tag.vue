<template>
  <div class="wrap-tag">
    <span ref="tagRef" v-bind="props" class="tag"></span>
  </div>
</template>

<script lang="ts" setup>
// import { ref, onMounted, defineProps} from 'vue'

let tagRef = ref<HTMLElement>()
let props = defineProps({
  text:{
    type: String,
    default: null,
  },
  theme:{
    type: String,
    default: null,
    required: false
  },
})
onMounted(() => {
  setText()
  setTheme()
})
const setText = () => {
  tagRef.value!.innerHTML = props.text
}

const setTheme = () => {
  tagRef.value!.style.background = props.theme
}
</script>

<style lang="less" scoped>
.wrap-tag{
  margin: 30px;
}
.tag {
  padding:10px;
  font-size: 18px;
  background: red;
  color: #fff;
  border-radius: 5px;
}
</style>