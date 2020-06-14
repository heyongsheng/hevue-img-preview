import Vue from 'vue'
import App from './App.vue'
import hevueImgPreview from './lib/index'
import 'babel-polyfill'
Vue.use(hevueImgPreview)

new Vue({
  el: '#app',
  render: h => h(App)
})
