<!--
 * @Author: 贺永胜
 * @Date: 2021-04-19 16:39:30
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2021-04-23 21:19:26
 * @Description: file content
-->

<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 -->

<template>
  <transition name="fade">
    <div
      class="hevue-imgpreview-wrap"
      id="hevue-imgpreview-wrap"
      v-if="show"
      ref="heImg"
      @mouseup="removeMove('pc')"
      @touchend="removeMove('mobile')"
      @click.stop="clickMask"
    >
      <div class="he-img-wrap">
        <div
          class="iconfont hevue-img-status-icon rotate-animation"
          v-show="imgState === 1"
        >
          &#xe6b1;
        </div>
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
        <!-- 图片加载失败 -->
        <div
          class="iconfont hevue-img-status-icon"
          v-show="imgState === 3"
        >
          &#xec0d;
        </div>
        <!-- 关闭按钮 -->
        <div
          class="iconfont he-close-icon"
          @click.stop="close"
          v-if="closeBtn"
        >
          &#xe608;
        </div>
        <!-- 左箭头 -->
        <div
          class="arrow arrow-left iconfont"
          @click.stop="toogleImg(false)"
          v-if="arrowBtn && multiple"
        >
          &#xe620;
        </div>
        <!-- 右箭头 -->
        <div
          class="arrow arrow-right iconfont"
          @click.stop="toogleImg(true)"
          v-if="arrowBtn && multiple"
        >
          &#xe60d;
        </div>
        <!-- 控制条 -->
        <div class="he-control-bar-wrap" v-if="controlBar">
          <div
            class="he-control-bar"
            @click.stop
          >
            <!-- 缩小 -->
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(-0.15)">
              &#xe65e;
            </div>
            <!-- 放大 -->
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(0.15)">
              &#xe65d;
            </div>
            <!-- 复位 -->
            <div
              class="he-control-btn iconfont"
              v-show="isFull"
              @click.stop="imgToggle"
            >
              &#xe698;
            </div>
            <!-- 复位 -->
            <div
              class="he-control-btn iconfont"
              v-show="!isFull"
              @click.stop="imgToggle"
            >
              &#xe86b;
            </div>
            <!-- 左转 -->
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(-90)">
              &#xe670;
            </div>
            <!-- 右转 -->
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(90)">
              &#xe66f;
            </div>
            <!-- 下载 -->
            <!-- <div class="he-control-btn iconfont" @click.stop="downloadIamge">
              &#xe694;
            </div> -->
          </div>
        </div>
        <!-- 页码指示器 -->
        <div
          class="he-control-num"
          v-if="controlBar && multiple"
        >
          {{ imgIndex + 1 }} / {{ imgList.length }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'hevue-img-preview',
  data() {
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
      clientY: 0,
      imgIndex: 0,
      canRun: true,
      imgurl: '',
      imgState: 1,
      start: [{}, {}],
      mobileScale: 0, // 手指离开时图片的缩放比例
      // 以下内容为用户传入配置
      show: false, // 插件显示，默认为false
      url: '', // 预览图片的地址
      nowImgIndex: 0,
      multiple: false,
      imgList: [],
      // 以下为可全局配置
      controlBar: true,
      closeBtn: true,
      arrowBtn: true,
      keyboard: false,
      clickMaskCLose: false, // 是否点击遮罩关闭，默认false
    }
  },
  mounted() {
    this.initImg()
  },
  watch: {
    url() {
      this.initImg()
    },
    show: {
      handler(newV) {
        if (newV) {
          this.$nextTick(() => {
            let _dom = document.getElementById('hevue-imgpreview-wrap')
            _dom.onmousewheel = this.scrollFunc
            // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
            document.body.addEventListener('DOMMouseScroll', this.scrollFunc)
            // 禁止火狐浏览器下拖拽图片的默认事件
            document.ondragstart = function() {
              return false
            }
            // 判断是否多图
            if (this.multiple) {
              if (Array.isArray(this.imgList) && this.imgList.length > 0) {
                this.imgIndex = Number(this.nowImgIndex) || 0
                // this.url = this.imgList[this.imgIndex]
                this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
              } else {
                // console.error("imgList 为空或格式不正确");
              }
            } else {
              this.changeUrl(this.url)
            }
            // 判断是否开启键盘事件
            if (this.keyboard) {
              document.addEventListener('keydown', this.keyHandleDebounce)
            }
          })
        }
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      // this.initImg();
      // this.maxWH = "max-width:100%;max-height:100%;";
      // this.isFull = false;
      // 移除火狐浏览器下的鼠标滚动事件
      document.body.removeEventListener('DOMMouseScroll', this.scrollFunc)
      //恢复火狐及Safari浏览器下的图片拖拽
      document.ondragstart = null
      // 移除键盘事件
      if (this.keyboard) {
        document.removeEventListener('keydown', this.keyHandleDebounce)
      }
      this.show = false
    },
    initImg() {
      this.mobileScale = 1
      this.imgScale = 1
      this.imgRotate = 0
      this.imgTop = 0
      this.imgLeft = 0
    },
    /**
     * 切换图片
     * true 下一张
     * false 上一张
     */
    toogleImg(bool) {
      if (bool) {
        this.imgIndex++
        if (this.imgIndex > this.imgList.length - 1) {
          this.imgIndex = 0
        }
      } else {
        this.imgIndex--
        if (this.imgIndex < 0) {
          this.imgIndex = this.imgList.length - 1
        }
      }
      // this.url = this.imgList[this.imgIndex]
      this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
    },
    // 改变图片地址
    /**
     * @description:
     * @param {String} url 要显示的图片的url
     * @param {Number} index 当前显示当图片下标，防止用户点击切换图片过快
     * @return {*}
     */
    changeUrl(url, index) {
      this.imgState = 1
      let img = new Image()
      img.src = url
      img.onload = () => {
        // 如果加载出来图片当下标不是当前显示图片当下标，则不予显示（用户点击过快当时候，会出现用户点到第三张了，此时第一张图片才加载完当情况）
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 2
          this.imgurl = url
        } else if (index == undefined) {
          this.imgState = 2
          this.imgurl = url
        }
      }
      img.onerror = () => {
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 3
        } else if (index == undefined) {
          this.imgState = 3
        }
      }
    },
    // 旋转图片
    rotateFunc(deg) {
      this.imgRotate += deg
    },
    // 图片缩放
    scaleFunc(num, bool) {
      if (this.imgScale <= 0.2 && num < 0) return
      if (bool) {
        this.imgScale = num
      } else {
        this.imgScale += num
      }
    },
    // 图片原尺寸切换
    imgToggle() {
      this.initImg()
      if (this.isFull) {
        this.maxWH = 'max-width:100%;max-height:100%;'
      } else {
        this.maxWH = ''
      }
      this.isFull = !this.isFull
    },
    // 鼠标滚轮缩放
    scrollFunc(e) {
      e = e || window.event
      // e.returnValue = false // ie
      // 火狐下没有wheelDelta，用detail代替，由于detail值的正负和wheelDelta相反，所以取反
      e.delta = e.wheelDelta || -e.detail

      e.preventDefault()
      if (e.delta > 0) {
        //当滑轮向上滚动时
        this.scaleFunc(0.05)
      }
      if (e.delta < 0) {
        //当滑轮向下滚动时
        this.scaleFunc(-0.05)
      }
    },
    // 鼠标按下
    addMove(e) {
      e = e || window.event
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.$refs.heImg.onmousemove = this.moveFunc
    },
    // 手指按下事件
    addMoveMobile(e) {
      e.preventDefault()
      e = e || window.event
      if (e.touches.length > 1) {
        this.start = e.touches
      } else {
        this.clientX = e.touches[0].pageX
        this.clientY = e.touches[0].pageY
      }
      // 添加手指拖动事件
      this.$refs.heImg.ontouchmove = this.moveFuncMobile
    },
    // 鼠标拖动
    moveFunc(e) {
      e = e || window.event
      e.preventDefault()
      let movementX = e.clientX - this.clientX
      let movementY = e.clientY - this.clientY
      // event.clientY;
      this.imgLeft += movementX * 2
      this.imgTop += movementY * 2
      this.clientX = e.clientX
      this.clientY = e.clientY
    },
    // 手指拖动
    moveFuncMobile(e) {
      e = e || window.event
      // console.log(e);
      if (e.touches.length > 1) {
        var now = e.touches
        var scale =
          this.getDistance(now[0], now[1]) /
          this.getDistance(this.start[0], this.start[1])
        // 判断是否手指缩放过，如果缩放过，要在上次缩放的比例基础上进行缩放
        if (this.mobileScale) {
          if (scale > 1) {
            // 放大
            this.scaleFunc(scale + this.mobileScale - 1, true)
          } else {
            // 缩小
            this.scaleFunc(scale * this.mobileScale, true)
          }
        } else {
          this.scaleFunc(scale, true)
        }
      } else {
        let touch = e.touches[0]
        e.preventDefault()
        let movementX = touch.pageX - this.clientX
        let movementY = touch.pageY - this.clientY
        // event.clientY;
        this.imgLeft += movementX * 2
        this.imgTop += movementY * 2
        this.clientX = touch.pageX
        this.clientY = touch.pageY
      }
    },
    // 移除拖动事件
    removeMove(type) {
      if (type === 'pc') {
        this.$refs.heImg.onmousemove = null
      } else {
        this.mobileScale = this.imgScale
        this.$refs.heImg.ontouchmove = null
      }
    },
    keyHandleDebounce(e) {
      if (this.canRun) {
        // 如果this.canRun为true证明当前可以执行函数
        this.keyHandle(e)
        this.canRun = false // 执行函数后一段时间内不可再次执行
        setTimeout(() => {
          this.canRun = true // 等到了我们设定的时间之后，把this.canRun改为true，可以再次执行函数
        }, 300)
      }
    },
    // 键盘事件
    keyHandle(e) {
      e = window.event || e
      var key = e.keyCode || e.which || e.charCode
      switch (key) {
        case 27: // esc
          this.close()
          break
        case 65: // a键-上一张
          if (this.multiple) {
            this.toogleImg(false)
          }
          break
        case 68: // d键-下一张
          if (this.multiple) {
            this.toogleImg(true)
          }
          break
        case 87: // w键-放大
          this.scaleFunc(0.15)
          break
        case 83: // s键-缩小
          this.scaleFunc(-0.15)
          break
        case 81: // q键-逆时针旋转
          this.rotateFunc(-90)
          break
        case 69: // e键-顺时针旋转
          this.rotateFunc(90)
          break
        case 82: // r键-复位键
          this.initImg()
          break

        default:
          break
      }
    },
    // 点击遮罩层
    clickMask() {
      // console.log("hello");
      if (this.clickMaskCLose) {
        this.close()
      }
    },
    //缩放 勾股定理方法-求两点之间的距离
    getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY
      return Math.sqrt(x * x + y * y)
    },
    /**
     * @description:
     * @param {String} imgsrc
     * @param {*} name
     * @return {*}
     */
    downloadIamge() {
      //下载图片地址和图片名
      let image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function() {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL('image/png') //得到图片的base64编码数据
        let a = document.createElement('a') // 生成一个a元素
        let event = new MouseEvent('click') // 创建一个单击事件
        a.download = 'photo' + +new Date() // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.onerror = function(err) {
        console.log('图片信息不正确或图片服务器禁止访问')
        console.log(err)
      }
      if (this.multiple) {
        image.src = this.imgList[this.imgIndex]
      } else {
        image.src = this.url
      }
    },
  },
}
</script>

<style scoped>
@import './iconfont/iconfont.css';
@import './css/default.css';
</style>
