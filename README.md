## hevue-img-preview 简介

<div class="img-inline-wrap" style='margin-top: 20px;'>
<a href='https://github.com/heyongsheng/hevue-img-preview'><img src='https://img.shields.io/github/stars/heyongsheng?style=social' alt='star'></img></a>
<!-- <a href='https://github.com/heyongsheng/hevue-img-preview'><img alt="GitHub forks" src="https://img.shields.io/github/forks/heyongsheng/hevue-img-preview?style=social"></img></a>  -->
<a href='https://gitee.com/ihope_top/hevue-img-preview/stargazers'><img src='https://gitee.com/ihope_top/hevue-img-preview/badge/star.svg?theme=dark' alt='star'></img></a> 
<a href='https://www.npmjs.com/package/hevue-img-preview'><img src='https://img.shields.io/npm/dm/hevue-img-preview.svg' alt='downloads'></img></a>
<a href='https://gitee.com/ihope_top/hevue-img-preview/stargazers'><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/heyongsheng/hevue-img-preview"></a>
<a href='https://www.npmjs.com/package/hevue-img-preview'><img src='https://img.shields.io/badge/License-MIT-green' alt='downloads'></img></a>
<a href='#'><img src='https://img.shields.io/badge/Vue2-%2365b687?logo=Vue.js&logoColor=white'></img></a>
<a href='#'><img src='https://img.shields.io/badge/Vue3-%2365b687?logo=Vue.js&logoColor=white'></img></a>
</div>

中文 | [English](./README.en.md)

hevue-img-preview是一个基于 vue 编写的 vue 图片预览组件，已对vue2和vue3同时兼容，支持 pc 和手机端，支持单图和多图预览，仅传入一个图片地址，即可实现图片预览效果。手机端支持单指拖拽和双指缩放。页面各组件颜色均可自定义，实现个性化设计，如果能帮上你，希望可以移步 [GitHub](https://github.com/heyongsheng/hevue-img-preview) ，或者[码云](https://gitee.com/ihope_top/hevue-img-preview) 给个小星星，如果有任何使用意见或建议，也欢迎回复或者提交 issure

特色：

`单图预览` `多图预览` `单图预览` `缩略图` `快捷键` `自定义旋转` `切换图片事件回调` `关闭事件回调` `PC端` `移动端` `保存图片` `自定义样式`

## 官方文档

> 中国用户请访问 [https://img-preview-doc.it1996.com](https://img-preview-doc.it1996.com)
> 国际用户请访问 [https://heyongsheng.github.io/en](https://heyongsheng.github.io/en)
> 本文档仅介绍部分使用方式，更多请访问官方文档

## 安装

使用npm进行安装

```bash
npm install hevue-img-preview
```

在main.js进行全局引入

```javascript
// vue2.x
import hevueImgPreview from 'hevue-img-preview/v2' 
Vue.use(hevueImgPreview)

// vue3.x
import hevueImgPreview from 'hevue-img-preview/v3' 
const app = createApp(App)
app.use(hevueImgPreview)
app.mount('#app')
```

## 使用

在组件中进行使用

***vue2***

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

***vue3***

```html
<img :src="url" @click="previewImg(url)">
```

```javascript
import { previewImages } from 'hevue-img-preview/v3' // [!code focus]

const handleClick = () => { // [!code focus]
  previewImages('/1.png') // [!code focus]
}
```

### 配置项

预览方法接受参数可以为单个图片路径，也可以为图片数组，或以下配置项

| 属性名                   | 说明            | 类型         | 默认值   |
| --------------------- | ------------- | ---------- | ----- |
| imgList               | 预览的图片地址       | `array`    | -     |
| nowImgIndex           | 传入多图时当前图片的下标  | `number`   | 0     |
| thumbnail             | 显示缩略图         | `boolean`  | true  |
| controlBar            | 底部控制条配置       | `array`    | []    |
| closeBtn              | 显示右上角关闭按钮     | `boolean`  | true  |
| arrowBtn              | 显示左右切换按钮      |            |       |
| clickMaskCLose        | 点击遮罩层是否关闭图片预览 | `boolean`  | true  |
| disabledImgRightClick | 禁止图片右击事件      | `boolean`  | false |
| disableTransition     | 禁止过渡效果        | `boolean`  | false |
| customStyle           | 自定义样式         | `object`   | -     |
| themeName             | 主题名称          | `string`   | -     |
| closeFn               | 插件关闭回调函数      | `Function` | -     |
| changeFn              | 多图切换回调函数      | `Function` | -     |
| locale                | 语言            | `string`   | zhCN  |

## 更新日志

### 7.0.0

- 新增底部预览图
- 新增支持cdn方式引入
- 新增禁用图片右击事件
- 新增底部控制条下载功能
- 新增底部控制条单个控制项的显示控制
- 新增底部控制条左右切换功能（仅多图预览时生效）
- 新增底部控制条自定义角度旋转
- 底部控制条新增快捷键键位帮助
- 新增预置主题
- 新增大量交互的过渡效果（可禁用）
- 新增双语支持
- 优化自定义样式支持，可控制项更多
- 优化图片切换逻辑，已加载过的图片再次切换时不会重新加载
- 优化vue2及vue3的全局使用及局部使用方式

### 6.1.0

支持切换图片及关闭图片回调函数，想起请阅读文档

### 6.0.0

组件兼容vue3.x

### 5.0.2

组件支持实例化，调用组件将返回组件实例，支持直接通过实例关闭弹窗

```javascript
const hevueImgPreviewEl = this.$hevueImgPreview(...)
hevueImgPreviewEl.close()
```

## 反馈与支持

如果您在使用过程中有任何问题或建议都可以提交issue，或者通过一下方式进行交流。

作者 QQ：1378431028

QQ 群：595472617

邮箱：1378431028@qq.com

作者微信：heyongsheng1996
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57478efc7ace4a8c9e27081a26f2c8cf~tplv-k3u1fbpfcp-zoom-1.image)
