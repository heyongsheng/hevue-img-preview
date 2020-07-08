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
      let obj = {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592150754468&di=007303c2184d2fcd9743a285c03d5f78&imgtype=0&src=http%3A%2F%2Fimg001.hc360.cn%2Fm2%2FM06%2F59%2FCD%2FwKhQclQmgkaEWFaoAAAAADeUpXU923.jpg',
        nowImgIndex: 0,
        multiple: false,
        keyboard: true,
        imgList: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592150754468&di=007303c2184d2fcd9743a285c03d5f78&imgtype=0&src=http%3A%2F%2Fimg001.hc360.cn%2Fm2%2FM06%2F59%2FCD%2FwKhQclQmgkaEWFaoAAAAADeUpXU923.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592150754464&di=1f138376111424a5c27a9b670cbfa262&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F49%2F20%2F97%2Fpic_lib%2Fs960x639%2F14s960x639.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592150885064&di=3b8c79295faa6502bff2bf0a0b5feb23&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853'
        ],
      }
      // obj = {
      //   url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592150754468&di=007303c2184d2fcd9743a285c03d5f78&imgtype=0&src=http%3A%2F%2Fimg001.hc360.cn%2Fm2%2FM06%2F59%2FCD%2FwKhQclQmgkaEWFaoAAAAADeUpXU923.jpg'
      // }
      this.$hevueImgPreview(obj)
    }
  }
}
</script>

<style>
</style>
