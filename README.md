# hevue-img-preview 简介

> 本组件基于 vue 编写，仅传入一个图片地址，即可实现图片预览效果，预览背景色，关闭按钮颜色，控制条的背景也和字体颜色都可自定义，兼容 ie9+，火狐，Safari，谷歌浏览器。如果能帮上你，希望可以移步 [GitHub](https://github.com/heyongsheng) https://github.com/heyongsheng 给个小星星

## 使用方法

```
# 安装
npm install hevue-img-preview --save

# main.js 引入
import hevueImgPreview from 'hevue-img-preview'
Vue.use(hevueImgPreview)

# 使用
给任意对象添加任意事件，例如
<img :src="src" @click="previewImg(url)">
即可在事件里调用方法进行预览
methods: {
	previewImg (url) {
		this.$hevueImgPreview(url)
	}
}

```

## 可配置项

> this.\$hevueImgPreview() 方法可以接收一个字符串类型的 url，或者对象类型的配置，具体使用方法如下

- `this.$hevueImgPreview('img.png')`

- `this.$hevueImgPreview({url: 'img.png'})` _可配置项如下_

| 字段              | 值                                                         | 备注           |
| ----------------- | ---------------------------------------------------------- | -------------- |
| url               | `http://shiliqingshan.com/web/static/img/logo.1f4d568.png` | 图片地址       |
| mainBackground    | `#fff` 或者 `rgba(255,255,255,.1)`                         | 整体背景颜色   |
| controlColor      | `#fff` 或者 `rgba(255,255,255,.1)`                         | 控制条字体颜色 |
| controlBackground | `#fff` 或者 `rgba(255,255,255,.1)`                         | 控制条背景颜色 |
| closeColor        | `#fff` 或者 `rgba(255,255,255,.1)`                         | 关闭图标的颜色 |

## 作者注

> 在开发的过程中，为了性能和兼容性，其实舍弃了很多东西，例如背景的高斯模糊`background-filter`, 和字体颜色及背景颜色的渐变。不过为了满足大家个性化的要求，本插件尽量的做到了个性化定制，可以自己搭配出符合项目主题的配色，如果有疑问，也可以加入 QQ 群：595472617 进行反馈!
