import Vue from 'vue'
import App from './App.vue'
import hevueImgPreview from './lib/index'
Vue.use(hevueImgPreview)

new Vue({
  el: '#app',
  render: h => h(App)
})
