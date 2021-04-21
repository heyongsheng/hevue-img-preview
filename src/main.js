/*
 * @Author: 贺永胜
 * @Date: 2020-12-22 13:15:55
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2021-04-21 16:37:49
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import hevueImgPreview from './lib/index'
Vue.use(hevueImgPreview, {
  keyboard: true,
  clickMaskCLose: true,
  mainBackground: 'rgba(0,0,0,.4)'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
