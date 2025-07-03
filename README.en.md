## hevue-img-preview Introduction

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

[中文](./README.md) | English

hevue-img-preview is a Vue-based image preview component that is compatible with both Vue 2 and Vue 3. It supports PC and mobile devices, single and multiple image previews, and can achieve image preview effects by simply passing in an image URL. On mobile devices, it supports single-finger dragging and two-finger zooming. The colors of all components on the page can be customized for personalized design. If this helps you, please consider giving a star on [GitHub](https://github.com/heyongsheng/hevue-img-preview) or [Gitee](https://gitee.com/ihope_top/hevue-img-preview). If you have any suggestions or feedback, feel free to reply or submit an issue.

Features:

`Single Image Preview` `Multiple Image Preview` `Thumbnail` `Keyboard Shortcuts` `Custom Rotation` `Image Switch Event Callback` `Close Event Callback` `PC` `Mobile` `Save Image` `Custom Styles`

## Official Documentation

> For Chinese users, visit [https://img-preview-doc.it1996.com](https://img-preview-doc.it1996.com)
> For international users, visit [https://heyongsheng.github.io/en](https://heyongsheng.github.io/en)
> This document only introduces partial usage methods. For more, please visit the official documentation.

## Installation

Install via npm:

```bash
npm install hevue-img-preview
```

In `main.js`, import globally:

```javascript
// Vue 2.x
import hevueImgPreview from 'hevue-img-preview/v2' 
Vue.use(hevueImgPreview)

// Vue 3.x
import hevueImgPreview from 'hevue-img-preview/v3' 
const app = createApp(App)
app.use(hevueImgPreview)
app.mount('#app')
```

## Usage

Use in components:

***Vue 2***

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

***Vue 3***

```html
<img :src="url" @click="previewImg(url)">
```

```javascript
import { previewImages } from 'hevue-img-preview/v3' // [!code focus]

const handleClick = () => { // [!code focus]
  previewImages('/1.png') // [!code focus]
}
```

### Configuration Options

The preview method accepts parameters that can be a single image URL, an array of images, or the following configuration options:

| Property Name          | Description                | Type         | Default Value |
| --------------------- | ------------------------- | ---------- | ------------- |
| imgList               | Image URLs for preview    | `array`    | -             |
| nowImgIndex           | Index of the current image when multiple images are passed | `number`   | 0             |
| thumbnail             | Show thumbnail            | `boolean`  | true          |
| controlBar            | Bottom control bar configuration | `array`    | []            |
| closeBtn              | Show close button in the top-right corner | `boolean`  | true          |
| arrowBtn              | Show left/right switch buttons |            |               |
| clickMaskCLose        | Close image preview by clicking the mask layer | `boolean`  | true          |
| disabledImgRightClick | Disable right-click on images | `boolean`  | false         |
| disableTransition     | Disable transition effects | `boolean`  | false         |
| customStyle           | Custom styles             | `object`   | -             |
| themeName             | Theme name                | `string`   | -             |
| zIndex                | Plug-in level          | `number`   | 9999  |
| closeFn               | Callback function for closing the plugin | `Function` | -             |
| changeFn              | Callback function for switching images | `Function` | -             |
| locale                | Language                  | `string`   | zhCN          |

## Changelog

### 7.0.0

- Added bottom preview thumbnails
- Added support for CDN imports
- Added option to disable right-click on images
- Added download functionality in the bottom control bar
- Added individual control item visibility in the bottom control bar
- Added left/right switching functionality in the bottom control bar (effective only for multiple image previews)
- Added custom angle rotation in the bottom control bar
- Added keyboard shortcut help in the bottom control bar
- Added preset themes
- Added numerous transition effects (can be disabled)
- Added bilingual support
- Optimized support for custom styles with more controllable items
- Optimized image switching logic; images already loaded will not reload when switched again
- Optimized global and local usage methods for Vue 2 and Vue 3

### 6.1.0

Added callback functions for switching images and closing images. Please read the documentation for details.

### 6.0.0

Component compatibility with Vue 3.x

### 5.0.2

Component supports instantiation. Calling the component will return the component instance, which supports directly closing the popup via the instance.

```javascript
const hevueImgPreviewEl = this.$hevueImgPreview(...)
hevueImgPreviewEl.close()
```

## Feedback and Support

If you encounter any issues or have suggestions during use, you can submit an issue or communicate through the following methods:

Email: 1378431028@qq.com
