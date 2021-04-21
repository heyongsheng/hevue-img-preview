/*
 * @Author: heyongsheng
 * @Date: 2020-04-22 15:40:42
 * @Last Modified by: heyongsheng
 * @Last Modified time: 2020-07-08 22:49:13
 */
import Vue from "vue";
import VueToast from "./hevue-img-preview.vue";

const ToastConstructor = Vue.extend(VueToast);

let instance

const ImgPreview = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }
  options.show = true
  instance = new ToastConstructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
};

const install = (Vue, opts = {}) => {
  Vue.prototype.$hevueImgPreviewConfig = opts
  Vue.prototype.$hevueImgPreview = ImgPreview;
};

if (typeof window !== "undefined" && window.Vue) {
  // window.Vue.use(install);
  install(window.Vue)
}

export default install;
