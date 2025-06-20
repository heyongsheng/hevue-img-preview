import Preview from '../hevue-img-preview.vue'
import Vue from 'vue'

// 全局配置
let hevueImgPreviewConfig = {}
export function previewImages(options) {
  if (typeof options === 'string') {
    options = {
      imgList: [options],
    }
  } else if (Array.isArray(options)) {
    options = {
      imgList: options,
    }
  }

  // 优先采取局部配置，其次采取全局配置
  Object.keys(hevueImgPreviewConfig).forEach((name) => {
    if (options[name] === undefined) {
      options[name] = hevueImgPreviewConfig[name]
    }
  })

  const old = document.getElementById('hevue-img-preview-container')
  if (old) old.remove()

  // const container = document.createElement('div')
  // container.id = 'hevue-img-preview-container'
  // // 如果用户传入了 zIndex，则使用用户传入的 zIndex，否则使用默认值
  // container.style.zIndex = options.zIndex || '9999'
  // document.body.appendChild(container)

  const app = Vue.extends(Preview)
  const instance = new app({
    data: options,
  })
  instance.$mount()
  let dom = instance.$el
  document.body.appendChild(dom)

  instance.show()
  return instance
}

export default {
  install(app, opts = {}) {
    hevueImgPreviewConfig = opts
    app.prototype.$hevueImgPreview = previewImages
  },
}
