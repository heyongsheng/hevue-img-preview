/*
 * @Author: heyongsheng 
 * @Date: 2020-04-22 15:40:42 
 * @Last Modified by: heyongsheng
 * @Last Modified time: 2020-04-23 09:57:22
 */
import Vue from 'vue'
import VueToast from './hevue-img-preview.vue'

const ToastConstructor = Vue.extend(VueToast)

const instance = new ToastConstructor().$mount()

const pageScroll = (() => {
  const fn = (e) => {
    let evt = e || window.event
    evt.preventDefault()
    evt.stopPropagation()
  }
  let islock = false

  return {
    lock (el) {
      if (islock) return
      islock = true;
      (el || document).addEventListener('mousewheel', fn);
      (el || document).addEventListener('touchmove', fn)
    },
    unlock (el) {
      islock = false;
      (el || document).removeEventListener('mousewheel', fn);
      (el || document).removeEventListener('touchmove', fn)
    }
  }
})()

ToastConstructor.prototype.closeToast = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  //恢复滚动
  pageScroll.unlock()

  typeof this.callback === 'function' && this.callback()
}

const Toast = (options = {}) => {
  instance.mes = options.mes
  instance.timeout = ~~options.timeout || 2000
  instance.callback = options.callback

  document.body.appendChild(instance.$el)

  //禁止滚动
  pageScroll.lock()

  const timer = setTimeout(() => {
    clearTimeout(timer)
    instance.closeToast()
  }, instance.timeout + 100)
}

const install = (Vue) => {
  Vue.prototype.$hevueImgPreview = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install