# hevue-img-preview 简介

> 本组件是一个基于 vue 编写的 vue 图片预览组件，支持单图和多图预览，仅传入一个图片地址，即可实现图片预览效果，比较适合给文章及页面的所有图片添加预览效果。预览背景色，关闭按钮颜色，控制条的背景也和字体颜色都可自定义，兼容 ie9+，火狐，Safari，谷歌浏览器，支持多图预览。如果能帮上你，希望可以移步[码云](https://gitee.com/ihope_top/hevue-img-preview) 给个小星星，如果有任何使用意见或建议，也欢迎回复或者提交 issure

## 示例预览

> 在线预览网址 [https://heyongsheng.github.io/#/](https://heyongsheng.github.io/#/)

![](https://user-gold-cdn.xitu.io/2020/4/27/171b94b6a0f7b8dd?w=599&h=272&f=gif&s=1344649)

## 安装

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

## 使用

> this.\$hevueImgPreview() 方法可以接收一个字符串类型的 url，或者对象类型的配置，具体使用方法如下

- 接收一个地址字符串`this.$hevueImgPreview(url)`

```
this.$hevueImgPreview('https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg') // 线上地址
this.$hevueImgPreview('./img/logo.jpeg') // 本地地址
```

- 接收一个对象`this.$hevueImgPreview(options)`

```
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

\*如不考虑兼容性问题，上述的背景颜色均可接收渐变色

## 作者注

> 本人前端小白一枚，工作经验较少，所写东西尽量保证没 bug，但性能界面什么的可能没办法做到最优，如果您有什么使用中的建议或意见，欢迎反馈给我，可以加联系方式，也可以直接回复，或者提个`issur`[建议此方法]，如果对您有所帮助，万分期待您能给个给个小星星，您的支持是我前进的最大动力，如果能到最下面打赏一下，祝你一生平安，永不脱发

> 码云链接：[https://gitee.com/ihope_top/hevue-img-preview](https://gitee.com/ihope_top/hevue-img-preview)

**添加请备注 码云**

作者 QQ：1378431028

QQ 群：595472617

作者微信：heyongsheng1996
![](https://user-gold-cdn.xitu.io/2020/4/27/171b950ccc0a1695?w=541&h=721&f=png&s=133763)

最后不要脸的要个打赏【金额随意，一分钱也行哟，嘿嘿】

![](https://user-gold-cdn.xitu.io/2020/6/14/172b382762fb0b51?w=990&h=1540&f=jpeg&s=251410)

![](https://user-gold-cdn.xitu.io/2020/6/14/172b382dc66777fa?w=1118&h=1534&f=png&s=128571)
