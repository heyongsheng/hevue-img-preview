<template>
  <div id="app">
    <button
      @click="showImg('https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg')"
    >点击</button>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
    <p>hl</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showImg (url) {
      this.$hevueImgPreview(url)
    }
  }
}
</script>

<style>
</style>
