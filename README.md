## hevue-img-preview 简介

> 本组件是一个基于 vue 编写的 vue 图片预览组件，支持 pc 和手机端，支持单图和多图预览，仅传入一个图片地址，即可实现图片预览效果。手机端支持单指拖拽和双指缩放。页面各组件颜色均可可自定义，实现个性化设计，如果能帮上你，希望可以移步 [GitHub](https://github.com/heyongsheng/hevue-img-preview) ，或者[码云](https://gitee.com/ihope_top/hevue-img-preview) 给个小星星，如果有任何使用意见或建议，也欢迎回复或者提交 issure

## 示例预览

> 在线预览网址 [https://heyongsheng.github.io/#/](https://heyongsheng.github.io/#/)

![](https://user-gold-cdn.xitu.io/2020/4/27/171b94b6a0f7b8dd?w=599&h=272&f=gif&s=1344649)

## 安装

```javascript
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
    mainBackground: 'rgba(0, 0, 0, .5)', // 整体背景颜色
})

# 多图预览
this.$hevueImgPreview({
    multiple: true, // 开启多图预览模式
    nowImgIndex: 1, // 多图预览，默认展示第二张图片
    imgList: ['1.png', '2.png', '3.png'], // 需要预览的多图数组
    mainBackground: 'rgba(0, 0, 0, .5)', // 整体背景颜色
})
```

具体可配置项如下

| 字段              | 值                                       | 备注                           |
| ----------------- | ---------------------------------------- | ------------------------------ |
| url               | 图片的本地或者线上地址，多图预览时可不传 | 预览的图片地址，多图预览时省略 |
| mainBackground    | `#fff` 或者 `rgba(255,255,255,.1)`       | 整体背景颜色（可选）           |
| controlColor      | `#fff` 或者 `rgba(255,255,255,.1)`       | 控制条字体颜色（可选）         |
| controlBackground | `#fff` 或者 `rgba(255,255,255,.1)`       | 控制条背景颜色 （可选）        |
| closeColor        | `#fff` 或者 `rgba(255,255,255,.1)`       | 关闭图标的颜色 （可选）        |
| multiple          | 布尔值 true/false                        | 是否多图预览                   |
| nowImgIndex       | Number 格式，如默认展示第二张，传入 1    | 多图预览时默认显示的图片下标   |
| imgList           | Array 格式 [url1, url2, url3]            | 多图预览时传入的数组           |
| keyboard          | 字符串 open/close                        | 是否开启键盘控制               |
| clickMaskCLose    | 字符串 open/close                        | 是否可以点击遮罩层关闭         |

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

\*如不考虑兼容性问题，上述的背景颜色均可接收渐变色

## 作者注

> 本人前端小白一枚，工作经验较少，所写东西尽量保证没 bug，但性能界面什么的可能没办法做到最优，如果您有什么使用中的建议或意见，欢迎反馈给我，可以加联系方式，也可以直接回复，或者到`GitHub`提个`issur`[建议此方法]，如果对您有所帮助，万分期待您能给个赞并且到`GitHub`给个小星星

> GitHub 链接：[https://github.com/heyongsheng/hevue-img-preview](https://github.com/heyongsheng/hevue-img-preview)

> 码云链接：[https://gitee.com/ihope_top/hevue-img-preview](https://gitee.com/ihope_top/hevue-img-preview)

作者 QQ：1378431028

QQ 群：595472617

作者微信：heyongsheng1996
![](https://user-gold-cdn.xitu.io/2020/4/27/171b950ccc0a1695?w=541&h=721&f=png&s=133763)