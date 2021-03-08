/* * @Author: heyongsheng * @Date: 2020-04-22 15:40:32 * @Last Modified by:
heyongsheng * @Last Modified time: 2020-07-08 23:19:22 */
<template>
  <transition name="fade">
    <div
      class="hevue-wrap"
      id="hevue-wrap"
      v-if="show"
      ref="heImg"
      @mouseup="removeMove('pc')"
      @touchend="removeMove('mobile')"
      @click="clickMask"
      :style="'background:' + mainBackground"
    >
      <!-- 用于临时在手机端展示一些调试信息 -->
      <!-- <div>{{ logText }}</div> -->
      <div class="he-img-wrap">
        <img src="./loading.gif" v-show="imgState === 1" />
        <!-- <div class="iconfont loading">&#xe6b1;</div> -->
        <img
          :src="imgurl"
          ref="heImView"
          @click.stop=""
          v-show="imgState === 2"
          class="he-img-view"
          :style="
            'transform: scale(' +
              imgScale +
              ') rotate(' +
              imgRotate +
              'deg);margin-top:' +
              imgTop +
              'px;margin-left:' +
              imgLeft +
              'px;' +
              maxWH
          "
          @mousedown="addMove"
          @touchstart="addMoveMobile"
        />
        <div class="iconfont hevue-img-error" v-show="imgState === 3">
          &#xec0d;
        </div>
        <div
          class="iconfont he-close-icon"
          @click.stop="close"
          :style="'color:' + closeColor"
        >
          &#xe764;
        </div>
        <div
          class="arrow arrow-left iconfont"
          @click.stop="toogleImg(false)"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground"
        >
          &#xe620;
        </div>
        <div
          class="arrow arrow-right iconfont"
          @click.stop="toogleImg(true)"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground"
        >
          &#xe60d;
        </div>
        <div class="he-control-bar-wrap">
          <div
            class="he-control-bar"
            @click.stop
            :style="
              'color:' + controlColor + ';background: ' + controlBackground
            "
          >
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(-0.15)">
              &#xe65e;
            </div>
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(0.15)">
              &#xe65d;
            </div>
            <div
              class="he-control-btn iconfont"
              v-show="isFull"
              @click.stop="imgToggle"
            >
              &#xe698;
            </div>
            <div
              class="he-control-btn iconfont"
              v-show="!isFull"
              @click.stop="imgToggle"
            >
              &#xe86b;
            </div>
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(-90)">
              &#xe670;
            </div>
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(90)">
              &#xe66f;
            </div>
          </div>
        </div>

        <div
          class="he-control-num"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground"
        >
          {{ imgIndex + 1 }} / {{ imgList.length }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "hevue-img-preview",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clickMaskCLose: String,
    url: String,
    mainBackground: String, // 整体背景颜色
    controlColor: String, // 控制条字体颜色
    controlBackground: String, // 控制条背景颜色
    closeColor: String, // 关闭图标的颜色
    instance: Object,
    multiple: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: false
    },
    nowImgIndex: {
      type: Number,
      default: 0
    },
    imgList: Array
  },
  data() {
    return {
      // imgWidth: 0,
      // imgHeight: 0,
      imgScale: 1,
      imgTop: 0,
      imgLeft: 0,
      imgRotate: 0,
      isFull: false,
      maxWH: "max-width:100%;max-height:100%;",
      clientX: 0,
      clientY: 0,
      imgIndex: 0,
      canRun: true,
      imgurl: "",
      imgState: 1,
      logText: "",
      start: [
        {
          clientX: 217,
          clientY: 279,
          force: 1,
          identifier: 0,
          pageX: 217,
          pageY: 279,
          radiusX: 11.5,
          radiusY: 11.5,
          rotationAngle: 0,
          screenX: 493,
          screenY: 456
        },
        {
          clientX: 247,
          clientY: 273,
          force: 1,
          identifier: 0,
          pageX: 247,
          pageY: 273,
          radiusX: 11.5,
          radiusY: 11.5,
          rotationAngle: 0,
          screenX: 523,
          screenY: 450
        }
      ],
      mobileScale: 0 // 手指离开时图片的缩放比例
    };
  },
  mounted() {
    this.initImg();
  },
  watch: {
    url() {
      this.initImg();
    },
    show(newV) {
      if (newV) {
        this.$nextTick(_ => {
          let _dom = document.getElementById("hevue-wrap");
          _dom.onmousewheel = this.scrollFunc;
          // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
          document.body.addEventListener("DOMMouseScroll", this.scrollFunc);
          // 禁止火狐浏览器下拖拽图片的默认事件
          document.ondragstart = function() {
            return false;
          };
          // 判断是否多选
          if (this.multiple) {
            if (Array.isArray(this.imgList) && this.imgList.length > 0) {
              this.imgIndex = Number(this.nowImgIndex) || 0;
              // this.url = this.imgList[this.imgIndex]
              this.changeUrl(this.imgList[this.imgIndex], this.imgIndex);
            } else {
              console.error("imgList 为空或格式不正确");
            }
          } else {
            this.changeUrl(this.url);
            // var ImgObj = new Image()
            // ImgObj.src = this.url
            // if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
            //   return true
            // } else {
            //   console.error('传入图片地址不正确--组件hevue-img-preview')
            // }
          }
          // 判断是否开启键盘事件
          if (this.keyboard) {
            document.addEventListener("keydown", this.keyHandleDebounce);
          }
        });
      }
    }
  },
  methods: {
    close() {
      // this.$closehevueImgPreview()
      this.instance.show = false;
      this.initImg();
      this.maxWH = "max-width:100%;max-height:100%;";
      this.isFull = false;
      // 移除火狐浏览器下的鼠标滚动事件
      document.body.removeEventListener("DOMMouseScroll", this.scrollFunc);
      //恢复火狐及Safari浏览器下的图片拖拽
      document.ondragstart = null;
      // 移除键盘事件
      if (this.keyboard) {
        document.removeEventListener("keydown", this.keyHandleDebounce);
      }
    },
    initImg() {
      this.mobileScale = 1;
      this.imgScale = 1;
      this.imgRotate = 0;
      this.imgTop = 0;
      this.imgLeft = 0;
    },
    /**
     * 切换图片
     * true 下一张
     * false 上一张
     */
    toogleImg(bool) {
      if (bool) {
        this.imgIndex++;
        if (this.imgIndex > this.imgList.length - 1) {
          this.imgIndex = 0;
        }
      } else {
        this.imgIndex--;
        if (this.imgIndex < 0) {
          this.imgIndex = this.imgList.length - 1;
        }
      }
      // this.url = this.imgList[this.imgIndex]
      this.changeUrl(this.imgList[this.imgIndex], this.imgIndex);
    },
    // 改变图片地址
    changeUrl(url, index) {
      this.imgState = 1;
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 2;
          this.imgurl = url;
        } else if (index == undefined) {
          this.imgState = 2;
          this.imgurl = url;
        }
      };
      img.onerror = () => {
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 3;
        } else if (index == undefined) {
          this.imgState = 3;
        }
      };
    },
    // 旋转图片
    rotateFunc(deg) {
      this.imgRotate += deg;
    },
    // 图片缩放
    scaleFunc(num, bool) {
      if (this.imgScale <= 0.2 && num < 0) return;
      if (bool) {
        this.imgScale = num;
      } else {
        this.imgScale += num;
      }
    },
    // 图片原尺寸切换
    imgToggle() {
      this.initImg();
      if (this.isFull) {
        this.maxWH = "max-width:100%;max-height:100%;";
      } else {
        this.maxWH = "";
      }
      this.isFull = !this.isFull;
    },
    // 鼠标滚轮缩放
    scrollFunc(e) {
      e = e || window.event;
      // e.returnValue = false // ie
      // 火狐下没有wheelDelta，用detail代替，由于detail值的正负和wheelDelta相反，所以取反
      e.delta = e.wheelDelta || -e.detail;

      e.preventDefault();
      if (e.delta > 0) {
        //当滑轮向上滚动时
        this.scaleFunc(0.05);
      }
      if (e.delta < 0) {
        //当滑轮向下滚动时
        this.scaleFunc(-0.05);
      }
    },
    // 鼠标按下
    addMove(e) {
      e = e || window.event;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.$refs.heImg.onmousemove = this.moveFunc;
    },
    // 手指按下事件
    addMoveMobile(e) {
      e.preventDefault();
      e = e || window.event;
      if (e.touches.length > 1) {
        this.start = e.touches;
      } else {
        this.clientX = e.touches[0].pageX;
        this.clientY = e.touches[0].pageY;
      }
      // 添加手指拖动事件
      this.$refs.heImg.ontouchmove = this.moveFuncMobile;
    },
    // 鼠标拖动
    moveFunc(e) {
      e = e || window.event;
      e.preventDefault();
      let movementX = e.clientX - this.clientX;
      let movementY = e.clientY - this.clientY;
      // event.clientY;
      this.imgLeft += movementX * 2;
      this.imgTop += movementY * 2;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    },
    // 手指拖动
    moveFuncMobile(e) {
      e = e || window.event;
      // console.log(e);
      if (e.touches.length > 1) {
        var now = e.touches;
        var scale =
          this.getDistance(now[0], now[1]) /
          this.getDistance(this.start[0], this.start[1]);
        // this.mobileScale = scale;
        this.logText = `${scale},${this.mobileScale}`;
        // 判断是否手指缩放过，如果缩放过，要在上次缩放的比例基础上进行缩放
        if (this.mobileScale) {
          if (scale > 1) {
            // 放大
            this.scaleFunc(scale + this.mobileScale - 1, true);
          } else {
            // 缩小
            this.scaleFunc(scale * this.mobileScale, true);
          }
        } else {
          this.scaleFunc(scale, true);
        }
      } else {
        let touch = e.touches[0];
        e.preventDefault();
        let movementX = touch.pageX - this.clientX;
        let movementY = touch.pageY - this.clientY;
        event.clientY;
        this.imgLeft += movementX;
        this.imgTop += movementY;
        this.clientX = touch.pageX;
        this.clientY = touch.pageY;
      }
    },
    // 移除拖动事件
    removeMove(type) {
      if (type === "pc") {
        this.$refs.heImg.onmousemove = null;
      } else {
        this.mobileScale = this.imgScale;
        this.$refs.heImg.ontouchmove = null;
      }
    },
    keyHandleDebounce(e) {
      if (this.canRun) {
        // 如果this.canRun为true证明当前可以执行函数
        this.keyHandle(e);
        this.canRun = false; // 执行函数后一段时间内不可再次执行
        setTimeout(() => {
          this.canRun = true; // 等到了我们设定的时间之后，把this.canRun改为true，可以再次执行函数
        }, 300);
      }
    },
    // 键盘事件
    keyHandle(e) {
      var e = window.event || e;
      var key = e.keyCode || e.which || e.charCode;
      switch (key) {
        case 27: // esc
          this.close();
          break;
        case 65: // a键-上一张
          if (this.multiple) {
            this.toogleImg(false);
          }
          break;
        case 68: // d键-下一张
          if (this.multiple) {
            this.toogleImg(true);
          }
          break;
        case 87: // w键-放大
          this.scaleFunc(0.15);
          break;
        case 83: // s键-缩小
          this.scaleFunc(-0.15);
          break;
        case 81: // q键-逆时针旋转
          this.rotateFunc(-90);
          break;
        case 69: // e键-顺时针旋转
          this.rotateFunc(90);
          break;
        case 82: // r键-复位键
          this.initImg();
          break;

        default:
          break;
      }
    },
    // 点击遮罩层
    clickMask() {
      // console.log("hello");
      if (this.clickMaskCLose === "open") {
        this.close();
      }
    },
    //缩放 勾股定理方法-求两点之间的距离
    getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    }
  }
};
</script>

<style scoped>
@import "./iconfont/iconfont.css";
/* @import '//at.alicdn.com/t/font_1776686_mw0jz39v97.css'; */
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
  z-index: 999999;
}
.he-img-wrap {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.he-img-view {
  /* transition: transform 0.3s; */
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
.arrow {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  font-size: 28px;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.2s;
}
.arrow:hover {
  opacity: 0.8;
  font-size: 32px;
}
.arrow-left {
  left: 50px;
}
.arrow-right {
  right: 50px;
}
.he-close-icon:hover {
  transform: rotate(90deg);
}
.he-control-bar-wrap {
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 10%;
  left: 0;
}
.he-control-bar {
  height: 44px;
  bottom: 10%;
  padding: 0 22px;
  /* position: absolute; */
  /* left: 50%; */
  /* display: flex;
  justify-content: space-between; */
  display: flex;
  border-radius: 22px;
  margin: 0 auto;

  /* display: flex;
  justify-content: space-between; */
}
.he-control-num {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  padding: 0 22px;
  font-size: 16px;
  border-radius: 15px;
}
.he-control-btn {
  line-height: 44px;
  font-size: 24px;
  cursor: pointer;
  padding: 0 9px;
  /* display: inline-block; */
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
.hevue-img-error {
  font-size: 56px;
  color: #ccc;
}
</style>
