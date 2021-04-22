/*
 * @Author: 贺永胜
 * @Date: 2020-12-22 13:15:55
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2021-04-22 10:34:45
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
// import hevueImgPreview from './lib/index'
import hevueImgPreview from '../dist/hevue-img-preview.js'
Vue.use(hevueImgPreview)

new Vue({
  el: '#app',
  render: h => h(App)
})
