/*
 * @Author: heyongsheng 
 * @Date: 2020-04-22 15:40:32 
 * @Last Modified by: heyongsheng
 * @Last Modified time: 2020-04-26 16:02:23
 */
<template>
  <transition name="fade">
    <div
      class="hevue-wrap"
      id="hevue-wrap"
      v-if="show"
      ref="heImg"
      @mouseup="removeMove"
      :style="'background:' + mainBackground"
    >
      <div class="he-img-wrap">
        <img
          :src="url"
          ref="heImView"
          class="he-img-view"
          :style="'transform: scale('+imgScale+') rotate('+imgRotate+'deg);margin-top:'+imgTop+'px;margin-left:'+imgLeft+'px;' + maxWH"
          @mousedown="addMove"
        />
        <div class="iconfont he-close-icon" @click="close" :style="'color:'+closeColor">&#xe764;</div>
        <div
          class="he-control-bar"
          :style="'color:' + controlColor + ';background: '+controlBackground"
        >
          <div class="he-control-btn iconfont" @click="scaleFunc(-0.15)">&#xe65e;</div>
          <div class="he-control-btn iconfont" @click="scaleFunc(0.15)">&#xe65d;</div>
          <div class="he-control-btn iconfont" v-show="isFull" @click="imgToggle">&#xe698;</div>
          <div class="he-control-btn iconfont" v-show="!isFull" @click="imgToggle">&#xe86b;</div>
          <div class="he-control-btn iconfont" @click="rotateFunc(-90)">&#xe670;</div>
          <div class="he-control-btn iconfont" @click="rotateFunc(90)">&#xe66f;</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'hevue-img-preview',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    url: String,
    mainBackground: String, // 整体背景颜色
    controlColor: String, // 控制条字体颜色
    controlBackground: String, // 控制条背景颜色
    closeColor: String, // 关闭图标的颜色
    instance: Object
  },
  data () {
    return {
      // imgWidth: 0,
      // imgHeight: 0,
      imgScale: 1,
      imgTop: 0,
      imgLeft: 0,
      imgRotate: 0,
      isFull: false,
      maxWH: 'max-width:100%;max-height:100%;',
      clientX: 0,
      clientY: 0
    }
  },
  mounted () {
    this.initImg()

  },
  watch: {
    url () {
      this.initImg()
    },
    show (newV) {
      if (newV) {
        this.$nextTick(_ => {
          let _dom = document.getElementById('hevue-wrap')
          _dom.onmousewheel = this.scrollFunc
          // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替
          document.body.addEventListener("DOMMouseScroll", this.scrollFunc)
          // 禁止火狐浏览器下拖拽图片的默认事件
          document.ondragstart = function () { return false }
        })
      }
    }
  },
  methods: {
    close () {
      // this.$closehevueImgPreview()
      this.instance.show = false
      this.initImg()
      this.maxWH = 'max-width:100%;max-height:100%;'
      this.isFull = false
      // 移除火狐浏览器下的鼠标滚动事件
      document.body.removeEventListener("DOMMouseScroll", this.scrollFunc)
      //恢复火狐及Safari浏览器下的图片拖拽
      document.ondragstart = null
    },
    initImg () {
      this.imgScale = 1
      this.imgRotate = 0
      this.imgTop = 0
      this.imgLeft = 0
    },
    // 旋转图片
    rotateFunc (deg) {
      this.imgRotate += deg
    },
    // 图片缩放
    scaleFunc (num) {
      if (this.imgScale <= .2 && num < 0) return
      this.imgScale += num
    },
    // 图片原尺寸切换
    imgToggle () {
      this.initImg()
      if (this.isFull) {
        this.maxWH = 'max-width:100%;max-height:100%;'
      } else {
        this.maxWH = ''
      }
      this.isFull = !this.isFull
    },
    scrollFunc (e) {

      e = e || window.event
      // e.returnValue = false // ie
      // 火狐下没有wheelDelta，用detail代替，由于detail值的正负和wheelDelta相反，所以取反
      e.delta = e.wheelDelta || -e.detail

      e.preventDefault()
      if (e.delta > 0) { //当滑轮向上滚动时
        this.scaleFunc(0.015)
      }
      if (e.delta < 0) { //当滑轮向下滚动时
        this.scaleFunc(-0.015)
      }
    },
    addMove (e) {
      e = e || window.event
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.$refs.heImg.onmousemove = this.moveFunc
    },
    removeMove () {
      this.$refs.heImg.onmousemove = null
    },
    moveFunc (e) {
      e = e || window.event
      e.preventDefault()
      let movementX = e.clientX - this.clientX
      let movementY = e.clientY - this.clientY
      event.clientY
      this.imgLeft += movementX
      this.imgTop += movementY
      this.clientX = e.clientX
      this.clientY = e.clientY
    }
  }
}
</script>

<style scoped>
/* @import './font/iconfont.css'; */
@import '//at.alicdn.com/t/font_1776686_rwjnz23j7wf.css';
.hevue-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.he-img-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.he-img-view {
  transition: transform 0.3s;
}
.he-close-icon {
  position: absolute;
  right: 50px;
  top: 50px;
  font-size: 46px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.he-close-icon:hover {
  transform: rotate(90deg);
}
.he-control-bar {
  width: 233px;
  height: 44px;
  bottom: 10%;
  left: 50%;
  padding: 0 22px;
  margin-left: -139px;
  position: absolute;
  border-radius: 22px;
  /* display: flex;
  justify-content: space-between; */
}
.he-control-btn {
  line-height: 44px;
  font-size: 24px;
  cursor: pointer;
  padding: 0 9px;
  display: inline-block;
  transition: all 0.2s;
}
.he-control-btn:hover {
  transform: scale(1.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>