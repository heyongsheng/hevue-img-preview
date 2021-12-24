## hevue-img-preview 简介


[![](https://img.shields.io/npm/dm/hevue-img-preview.svg)](https://www.npmjs.com/package/hevue-img-preview)
[![](https://img.shields.io/github/v/release/heyongsheng/hevue-img-preview)](https://www.npmjs.com/package/hevue-img-preview)
[![](https://img.shields.io/badge/License-MIT-green)](https://www.npmjs.com/package/hevue-img-preview)

> 本组件是一个基于 vue 编写的 vue 图片预览组件，支持 pc 和手机端，支持单图和多图预览，仅传入一个图片地址，即可实现图片预览效果。手机端支持单指拖拽和双指缩放。如果能帮上你，希望可以移步 [GitHub](https://github.com/heyongsheng/hevue-img-preview) ，或者[码云](https://gitee.com/ihope_top/hevue-img-preview) 给个小星星，如果有任何使用意见或建议，也欢迎回复或者提交 issue

## 官方文档

> 官方使用文档请访问 [https://heyongsheng.github.io/#/](https://heyongsheng.github.io/#/)

## 安装

使用npm进行安装
``` bash
npm install hevue-img-preview
```

在main.js进行全局引入
```javascript
import hevueImgPreview from 'hevue-img-preview'
Vue.use(hevueImgPreview)
```

在组件中进行使用
```html
<img :src="url" @click="previewImg(url)">
```
```javascript
methods: {
	previewImg (url) {
		this.$hevueImgPreview(url)
	}
}
```

## 使用

> this.\$hevueImgPreview() 方法可以接收一个字符串类型的 url，或者对象类型的配置，具体使用方法如下

- 接收一个地址字符串`this.$hevueImgPreview(url)`

```Javascript
this.$hevueImgPreview('https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg') // 线上地址
this.$hevueImgPreview('./img/logo.jpeg') // 本地地址
```

- 接收一个对象`this.$hevueImgPreview(options)`

```Javascript
# 单图预览
this.$hevueImgPreview({
    url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
})

# 多图预览
this.$hevueImgPreview({
    multiple: true, // 开启多图预览模式
    nowImgIndex: 1, // 多图预览，默认展示第二张图片
    imgList: ['1.png', '2.png', '3.png'], // 需要预览的多图数组
})
```

### 配置项

| 字段              | 类型    | 默认值               | 备注                           |
| ----------------- | ------- | -------------------- | ------------------------------ |
| url               | String  | 无                   | 预览的图片地址，多图预览时省略 |
| multiple          | Boolean | false                | 是否多图预览                   |
| nowImgIndex       | Number  | 0                    | 多图预览时默认显示的图片下标   |
| imgList           | Array   | 无                   | 多图预览时传入的图片数组       |
| keyboard          | Boolean | false                | 是否开启键盘控制               |
| clickMaskCLose    | Boolean | false                | 是否可以点击遮罩层关闭         |
| controlBar        | Boolean | true                 | 是否显示控制条及页码         |
| closeBtn          | Boolean | true                 | 是否显示关闭按钮         |
| arrowBtn          | Boolean | true                | 是否显示左右翻页按钮         |

#### 全局配置

对于某些配置，例如开启键盘事件，点击遮罩层关闭，我们可能要全局保持统一，但却需要在每一次调用时重复配置，为了解决这个问题，我们提供了全局配置项，您可以在引入插件的时候，将全局配置项作为第二个参数传入即可，以免再每次调用的时候重复配置。

```javascript
// main.js
import hevueImgPreview from 'hevueImgPreview'
Vue.use(hevueImgPreview, {
  keyboard: true,
  clickMaskCLose: true
  ...
})
```


如开启键盘控制事件后，相对应功能控制按键如下

| 按键 | 功能
| ----------------- | ----------------------------------------
| w | 放大
| s | 缩小
| a | 上一张
| d | 下一张
| q | 逆时针旋转
| e | 顺时针旋转
| r | 图片复位
| esc | 关闭图片预览

*如不考虑兼容性问题，上述的背景颜色均可接收渐变色*

## 更新日志

### 5.0.2

组件支持实例化，调用组件将返回组件实例，支持直接通过实例关闭弹窗
```javascript
const hevueImgPreviewEl = this.$hevueImgPreview(...)
hevueImgPreviewEl.close()
```

## 作者注

> 本人前端小白一枚，工作经验较少，所写东西尽量保证没 bug，但性能界面什么的可能没办法做到最优，如果您有什么使用中的建议或意见，欢迎反馈给我，可以加联系方式，也可以直接回复，或者到`GitHub`提个`issue`[建议此方法]，如果对您有所帮助，万分期待您能给个赞并且到`GitHub`给个小星星

> GitHub 链接：[https://github.com/heyongsheng/hevue-img-preview](https://github.com/heyongsheng/hevue-img-preview)

> 码云链接：[https://gitee.com/ihope_top/hevue-img-preview](https://gitee.com/ihope_top/hevue-img-preview)

作者 QQ：1378431028

QQ 群：595472617

作者微信：heyongsheng1996
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57478efc7ace4a8c9e27081a26f2c8cf~tplv-k3u1fbpfcp-zoom-1.image)
