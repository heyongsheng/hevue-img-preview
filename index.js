/*
 * @Author: 贺永胜
 * @Date: 2020-04-22 15:40:42
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-07-21 16:21:47
 * @Descripttion: 
 */
import VueToast from "./hevue-img-preview.vue";

let imgApp
let hevueImgPreviewConfig
let instance
let vueVersion

const ImgPreview = (options = {}) => {

  if (typeof options === 'string') {
    options = {
      url: options
    };
  }

  // 优先采取局部配置，其次采取全局配置
  Object.keys(hevueImgPreviewConfig).map(name => {
    if ( options[name] == undefined) {
      options[name] = hevueImgPreviewConfig[name]
    }
  })

  if (vueVersion > 2) {
    if (!imgApp.hevueImgPreviewInstalled) {
      const parent = document.createElement('div')
      instance = imgApp.mount(parent)
      imgApp.hevueImgPreviewInstalled = true
      let dom = instance.$el
      document.body.appendChild(dom)
    }
  
    Object.keys(options).map(name => {
      instance[name] = options[name]
    })
  } else {
    instance = new imgApp({
      data: options
    })
    instance.$mount()
    let dom = instance.$el
    document.body.appendChild(dom)
  }
  
  instance.show()
  return instance
}

const install = async (app, opts = {}) => {

  hevueImgPreviewConfig = opts
  
  vueVersion = app.version.split(".")[0]
  if (vueVersion > 2) {
    let {createApp} = await import("vue");
    imgApp = createApp(VueToast)
    app.config.globalProperties.$hevueImgPreview = ImgPreview;
  } else {
    let _vue = await (await import("vue")).default;
    imgApp = _vue.extend(VueToast)
    _vue.prototype.$hevueImgPreview = ImgPreview;
  }    
};



if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default install;