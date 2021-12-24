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
let hevueImgPreviewConfig

const ImgPreview = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }
  options.show = true
  // 优先采取局部配置，其次采取全局配置
  Object.keys(hevueImgPreviewConfig).map(name => {
    if ( options[name] == undefined) {
      options[name] = hevueImgPreviewConfig[name]
    }
  })

  instance = new ToastConstructor({
    data: options
  })
  instance.$mount()
  let dom = instance.$el
  document.body.appendChild(dom)
  return instance
};

const install = (Vue, opts = {}) => {
  hevueImgPreviewConfig = opts
  Vue.prototype.$hevueImgPreview = ImgPreview;
};

if (typeof window !== "undefined" && window.Vue) {
  // window.Vue.use(install);
  install(window.Vue)
}

export default install;
