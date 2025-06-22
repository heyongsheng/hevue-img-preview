<!--
 * @Author: 贺永胜
 * @Date: 2021-04-19 16:39:30
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2025-06-22 16:02:51
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
  <div
    class="hevue-imgpreview-wrap"
    id="hevue-imgpreview-wrap"
    v-if="visible"
    ref="heImg"
    @mouseup="removeMove('pc')"
    @touchend="removeMove('mobile')"
  >
    <div
      class="hevue-img-mask"
      @click.stop="clickMask"
      :class="{ heShow: showTranstion }"
    ></div>
    <div class="he-img-wrap" :class="{ heShow: showTranstion }">
      <div
        class="heimgfont hevue-img-status-icon rotate-animation"
        v-show="imgState === 1"
      >
        &#xe6b1;
      </div>
      <!-- <div class="heimgfont loading">&#xe6b1;</div> -->
      <!-- ref="heImView" -->
      <transition-group name="fade" v-if="vueVersion > 2">
        <img
          :src="item.url"
          @click.stop
          :key="item.index"
          v-for="item in needLoadImg"
          v-show="imgState === 2 && imgIndex == item.index"
          :ref="'heImg' + item.index"
          class="he-img-view"
          :style="
            [imgIndex, fromIndex].includes(item.index) ? getImgPostion : maxWH
          "
          @contextmenu="imgContextMenu"
          @mousedown="addMove"
          @touchstart="addMoveMobile"
        />
      </transition-group>
      <template v-else>
        <img
          :src="item.url"
          @click.stop
          :key="item.index"
          v-for="item in needLoadImg"
          v-show="imgState === 2 && imgIndex == item.index"
          :ref="'heImg' + item.index"
          class="he-img-view"
          :style="
            [imgIndex, fromIndex].includes(item.index) ? getImgPostion : maxWH
          "
          @contextmenu="imgContextMenu"
          @mousedown="addMove"
          @touchstart="addMoveMobile"
        />
      </template>
      <!-- 图片加载失败 -->
      <div class="heimgfont hevue-img-status-icon" v-show="imgState === 3">
        &#xec0d;
      </div>
      <!-- 关闭按钮 -->
      <div
        class="heimgfont he-close-icon"
        @click.stop="close({ way: 'closeBtn' })"
        v-if="closeBtn"
      >
        &#xe608;
      </div>
      <!-- 左箭头 -->
      <div
        class="arrow arrow-left heimgfont"
        @click.stop="prevNextHandle(false, 'arrow-btn')"
        v-if="arrowBtn && multiple"
      >
        &#xe620;
      </div>
      <!-- 右箭头 -->
      <div
        class="arrow arrow-right heimgfont"
        @click.stop="prevNextHandle(true, 'arrow-btn')"
        v-if="arrowBtn && multiple"
      >
        &#xe60d;
      </div>
      <!-- 底部控制 -->
      <div class="he-bottom-wrap">
        <!-- 自定义旋转跳 -->
        <transition name="fade">
          <div class="hevue-custom-rotate-wrap" v-show="showHevueImgRotate">
            <span class="hevue-custom-range-label">{{ imgRotate }}°</span>
            <input
              class="hevue-custom-range"
              v-model.number="imgRotate"
              type="range"
              id="vol"
              min="0"
              max="360"
              orient="vertical"
            />
          </div>
        </transition>
        <!-- 控制条 -->
        <div @click.stop class="he-control-bar" v-if="controlBar.length">
          <div
            class="he-control-btn heimgfont"
            v-for="(item, key) in controlbarShowItems"
            :key="key"
            @click.stop="item.handle()"
            v-html="item.icon"
            v-show="item.show()"
            :title="item.title"
          ></div>
        </div>
        <!-- 缩略图 -->
        <div class="he-imglist-wrap" v-show="thumbnail && multiple">
          <div class="he-imglist" :style="{ left: getThumbLeft() + 'px' }">
            <div
              class="he-img-item"
              v-for="(item, key) in imgList"
              :key="key"
              @click="toogleImg(key, 'thumb')"
              :class="{ active: key == imgIndex }"
            >
              <img
                :src="item"
                class="he-img-item-img"
                @contextmenu="imgContextMenu"
              />
            </div>
          </div>
        </div>
        <!-- 页码指示器 -->
        <div class="he-control-num" v-if="controlBar.length && multiple">
          {{ imgIndex + 1 }} / {{ imgList.length }}
        </div>
      </div>
      <!-- 快捷键提示 -->
      <transition name="fade">
        <div class="hevue-img-help-wrap" v-show="showHevueImgHelp">
          <div
            class="hevue-img-help-item"
            v-for="item in shortcutList"
            :key="item.keyName"
          >
            <div class="hevue-img-help-item-label">{{ item.keyName }}：</div>
            <div class="hevue-img-help-item-desc">{{ item.desc }}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as vue from 'vue'
export default {
  name: 'hevue-img-preview',
  data() {
    return {
      // imgWidth: 0,
      // imgHeight: 0,
      vue,
      showHevueImgRotate: false, // 是否显示自定义旋转
      visible: false, // 插件显示，默认为false
      imgScale: 1,
      imgTop: 0,
      imgLeft: 0,
      imgRotate: 0,
      isFull: false,
      maxWH: {
        'max-width': '100%',
        'max-height': '100%',
      },
      clientX: 0,
      clientY: 0,
      imgIndex: 0,
      canRun: true,
      imgurl: '',
      imgState: 1,
      start: [{}, {}],
      fromIndex: 0, // 切换图片前的下标
      mobileScale: 0, // 手指离开时图片的缩放比例
      // 以下内容为用户传入配置
      // show: true, // 插件显示，默认为false
      //url: '', // 预览图片的地址 7.0 开始废弃
      imgList: [],
      nowImgIndex: 0,
      thumbnail: true, // 是否显示缩略图，默认true
      controlBar: [],
      closeBtn: true,
      arrowBtn: true,
      keyboard: true,
      clickMaskCLose: true, // 是否点击遮罩关闭，默认true
      closeFn: null, // 关闭回调函数
      changeFn: null, // 切换图片回调函数
      customStyle: [], // 自定义样式
      disabledImgRightClick: false, // 禁止图片右击
      // 以上为配置项
      showTranstion: false,
      needLoadImg: [],
      showHevueImgHelp: false,
      shortcutList: [
        {
          keyNum: 27,
          keyName: 'Esc',
          desc: '退出预览',
          handle: () => {
            this.close({ way: 'esc' })
          },
        },
        {
          keyNum: 65,
          keyName: 'A',
          desc: '上一张',
          handle: () => {
            if (this.multiple) {
              this.prevNextHandle(false, 'key-a')
            }
          },
        },
        {
          keyNum: 68,
          keyName: 'D',
          desc: '下一张',
          handle: () => {
            if (this.multiple) {
              this.prevNextHandle(true, 'key-d')
            }
          },
        },
        {
          keyNum: 87,
          keyName: 'W',
          desc: '放大',
          handle: () => {
            this.scaleFunc(0.15)
          },
        },
        {
          keyNum: 83,
          keyName: 'S',
          desc: '缩小',
          handle: () => {
            this.scaleFunc(-0.15)
          },
        },
        {
          keyNum: 37,
          keyName: '←',
          desc: '上一张',
          handle: () => {
            if (this.multiple) {
              this.prevNextHandle(false, 'key-a')
            }
          },
        },
        {
          keyNum: 39,
          keyName: '→',
          desc: '下一张',
          handle: () => {
            if (this.multiple) {
              this.prevNextHandle(true, 'key-d')
            }
          },
        },
        {
          keyNum: 38,
          keyName: '↑',
          desc: '放大',
          handle: () => {
            this.scaleFunc(0.15)
          },
        },
        {
          keyNum: 40,
          keyName: '↓',
          desc: '缩小',
          handle: () => {
            this.scaleFunc(-0.15)
          },
        },
        {
          keyNum: 81,
          keyName: 'Q',
          desc: '逆时针旋转',
          handle: () => {
            this.rotateFunc(-90)
          },
        },
        {
          keyNum: 69,
          keyName: 'E',
          desc: '顺时针旋转',
          handle: () => {
            this.rotateFunc(90)
          },
        },
        {
          keyNum: 82,
          keyName: 'R',
          desc: '复位',
          handle: () => {
            this.initImg()
          },
        },
      ],
      controlbarAllItems: [
        {
          key: 'zoomOut',
          icon: '&#xe65e;',
          title: '缩小',
          show: () => true,
          handle: () => {
            this.scaleFunc(-0.15)
          },
        },
        {
          key: 'zoomIn',
          icon: '&#xe65d;',
          title: '放大',
          show: () => true,
          handle: () => {
            this.scaleFunc(0.15)
          },
        },
        {
          key: 'rotateLeft',
          icon: '&#xe662;',
          title: '向左旋转',
          show: () => true,
          handle: () => {
            this.rotateFunc(-90)
          },
        },
        {
          key: 'customRotate',
          icon: '&#xe927;',
          title: '自定义旋转',
          show: () => true,
          handle: () => {
            this.showHevueImgRotate = !this.showHevueImgRotate
          },
        },
        {
          key: 'rotateRight',
          icon: '&#xe663;',
          title: '向右旋转',
          show: () => true,
          handle: () => {
            this.rotateFunc(90)
          },
        },
        {
          key: 'reset',
          icon: '&#xe86b;',
          title: '复位',
          show: () => true,
          handle: () => {
            this.initImg()
          },
        },
        {
          key: 'prev',
          icon: '&#xe62f;',
          title: '上一个',
          show: () => () => this.multiple,
          handle: () => {
            this.prevNextHandle(false, 'control-bar')
          },
        },
        {
          key: 'next',
          icon: '&#xe62e;',
          title: '下一个',
          show: () => () => this.multiple,
          handle: () => {
            this.prevNextHandle(true, 'control-bar')
          },
        },
        {
          key: 'download',
          icon: '&#xe694;',
          title: '下载',
          show: () => true,
          handle: () => {
            this.downloadIamge()
          },
        },
        {
          key: 'help',
          icon: '&#xe626;',
          title: '帮助',
          show: () => {
            return this.keyboard
          },
          handle: () => {
            this.showHevueImgHelp = !this.showHevueImgHelp
          },
        },
      ],
    }
  },
  created() {},
  mounted() {
    this.initImg()
  },
  computed: {
    vueVersion() {
      return parseInt(this.vue.version)
    },
    controlbarShowItems() {
      return this.controlBar.map((item) => {
        let target = this.controlbarAllItems.find((i) => i.key === item)
        return target
      })
    },
    multiple() {
      return Array.isArray(this.imgList) && this.imgList.length > 1
    },
    getImgPostion() {
      return {
        ...this.maxWH,
        transform: `scale(${this.imgScale}) rotate(${this.imgRotate}deg)`,
        marginTop: this.imgTop + 'px',
        marginLeft: this.imgLeft + 'px',
      }
    },
  },
  watch: {
    customStyle: {
      handler(newV) {
        let styleArr = Object.entries(newV)
        this.$nextTick(() => {
          if (styleArr.length > 0) {
            styleArr.forEach((item) => {
              let key = item[0]
              let value = item[1]
              let el = document.querySelector('.hevue-imgpreview-wrap')
              if (el) {
                el.style.setProperty(key, value)
              }
            })
          }
        })
      },
      immediate: true,
      deep: true,
    },
    url() {
      this.initImg()
    },
    visible: {
      handler(newV) {
        if (newV) {
          this.$nextTick(() => {
            let _dom = document.getElementById('hevue-imgpreview-wrap')
            _dom.onmousewheel = this.scrollFunc
            // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
            document.body.addEventListener('DOMMouseScroll', this.scrollFunc)
            // 禁止火狐浏览器下拖拽图片的默认事件
            document.ondragstart = function () {
              return false
            }
            // 判断用户传入controlBar是否是空数组，如果是则显示所有控制项
            if (Array.isArray(this.controlBar)) {
              if (this.controlBar.length === 0) {
                this.controlBar = this.controlbarAllItems.map(
                  (item) => item.key
                )
              }
            } else {
              this.controlBar = []
            }
            // 兼容旧版本url传入方式

            if (this.url && (!this.imgList || this.imgList.length === 0)) {
              this.imgList = [this.url]
            }
            this.imgIndex = Number(this.nowImgIndex) || 0
            this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
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
    show() {
      this.visible = true
      // this.showTranstion = true
      setTimeout(() => {
        this.showTranstion = true
      }, 20)
    },
    close(data) {
      this.showTranstion = false
      setTimeout(() => {
        this.initImg()
        // this.isFull = false;
        // 移除火狐浏览器下的鼠标滚动事件
        document.body.removeEventListener('DOMMouseScroll', this.scrollFunc)
        //恢复火狐及Safari浏览器下的图片拖拽
        document.ondragstart = null
        // 移除键盘事件
        if (this.keyboard) {
          document.removeEventListener('keydown', this.keyHandleDebounce)
        }
        this.visible = false
        this.closeFn && this.closeFn(data)
        this.showHevueImgHelp = false
        this.imgList = []
      }, 500)
    },
    initImg() {
      this.mobileScale = 1
      this.imgScale = 1
      this.imgRotate = 0
      this.imgTop = 0
      this.imgLeft = 0
    },
    // 图片右击事件
    imgContextMenu(e) {
      e = e || window.event
      if (this.disabledImgRightClick) {
        e.preventDefault()
      }
      // 阻止浏览器默认的右键菜单
      // if (e.stopPropagation) {
      //   e.stopPropagation()
      // } else {
      //   e.cancelBubble = true
      // }
    },
    /**
     * 切换图片
     * true 下一张
     * false 上一张
     */
    prevNextHandle(bool, way) {
      let result = 0
      if (bool) {
        result = this.imgIndex + 1
        if (result > this.imgList.length - 1) {
          result = 0
        }
      } else {
        result = this.imgIndex - 1
        if (result < 0) {
          result = this.imgList.length - 1
        }
      }
      this.toogleImg(result, way, bool)
    },
    /**
     * 切换图片
     * index 要切换的图片的下标
     * way 触发方式
     */
    toogleImg(index, way, bool) {
      if (this.imgIndex === index) {
        return
      }

      this.fromIndex = this.imgIndex
      let fromIndex = this.imgIndex
      this.imgIndex = index
      let type = way == 'thumb' ? 'thumb' : bool ? 'next' : 'prev'
      this.changeFn &&
        this.changeFn({
          type,
          fromImgIndex: fromIndex,
          fromImgUrl: this.imgList[fromIndex],
          toImgIndex: this.imgIndex,
          toImgUrl: this.imgList[this.imgIndex],
          way,
        })
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
      let target = this.needLoadImg.find((item) => item.index == index)
      if (target) {
        this.imgState = 2
        // this.getDominantColorWithFilter(this.$refs['heImg' + index][0])
      } else {
        this.imgState = 1
        this.needLoadImg.push({
          url,
          index,
        })
        this.$nextTick(() => {
          let targetImg = this.$refs['heImg' + index][0]
          targetImg.onload = () => {
            // 如果加载出来图片当下标不是当前显示图片当下标，则不予显示（用户点击过快当时候，会出现用户点到第三张了，此时第一张图片才加载完当情况）
            if (index != undefined && index == this.imgIndex) {
              this.imgState = 2
              // this.imgurl = url
            } else if (index == undefined) {
              this.imgState = 2
              // this.imgurl = url
            }
            // this.getDominantColorWithFilter(this.$refs['heImg' + index][0])
          }
          targetImg.onerror = () => {
            if (index != undefined && index == this.imgIndex) {
              this.imgState = 3
            } else if (index == undefined) {
              this.imgState = 3
            }
          }
        })
      }
      return

      // this.imgState = 1
      // let img = new Image()
      // img.src = url
      // img.onload = () => {
      //   // 如果加载出来图片当下标不是当前显示图片当下标，则不予显示（用户点击过快当时候，会出现用户点到第三张了，此时第一张图片才加载完当情况）
      //   if (index != undefined && index == this.imgIndex) {
      //     this.imgState = 2
      //     this.imgurl = url
      //   } else if (index == undefined) {
      //     this.imgState = 2
      //     this.imgurl = url
      //   }
      // }
      // img.onerror = () => {
      //   if (index != undefined && index == this.imgIndex) {
      //     this.imgState = 3
      //   } else if (index == undefined) {
      //     this.imgState = 3
      //   }
      // }
    },
    // 获取缩略图距离左侧距离
    getThumbLeft() {
      return -(this.imgIndex * 100 + 50)
    },
    // 旋转图片
    rotateFunc(deg) {
      let newVal = +this.imgRotate + deg
      if (newVal > 360) {
        newVal = newVal - 360
      } else if (newVal < 0) {
        newVal = 360 + newVal
      }

      this.imgRotate = newVal
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
        this.maxWH = {
          'max-width': '100%',
          'max-height': '100%',
        }
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
        }, 100)
      }
    },
    // 键盘事件
    keyHandle(e) {
      e = window.event || e
      var key = e.keyCode || e.which || e.charCode
      let target = this.shortcutList.find((item) => item.keyNum === key)
      if (target) {
        target.handle()
      }
    },
    // 点击遮罩层
    clickMask() {
      if (this.clickMaskCLose) {
        this.close({ way: 'mask' })
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
      image.onload = function () {
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
      image.onerror = function (err) {
        console.log('图片信息不正确或图片服务器禁止访问')
        console.log(err)
      }

      image.src = this.imgList[this.imgIndex]
      // if (this.multiple) {
      //   image.src = this.imgList[this.imgIndex]
      // } else {
      //   image.src = this.url
      // }
    },
    // 获取图片主色调
    isValidColor(r, g, b, a) {
      if (a < 128) return false // 半透明以下跳过
      const brightness = (r + g + b) / 3
      if (brightness > 240 || brightness < 15) return false // 太亮或太暗
      return true
    },

    getDominantColorWithFilter(img) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const maxDim = 100
      const scale = Math.min(
        maxDim / img.naturalWidth,
        maxDim / img.naturalHeight,
        1
      )
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const colorMap = {}
      let maxCount = 0
      let dominantColor = ''

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]

        if (!this.isValidColor(r, g, b, a)) continue

        const key = `${r},${g},${b}`
        colorMap[key] = (colorMap[key] || 0) + 1

        if (colorMap[key] > maxCount) {
          maxCount = colorMap[key]
          dominantColor = key
        }
      }
      // dominantColor = this.adjustColor(
      //   dominantColor.split(',').map(Number),
      //   0.9
      // )
      const el = document.querySelector('.hevue-imgpreview-wrap.glass')
      el.style.setProperty(
        '--hevueimg-main-text-color',
        `rgb(${dominantColor}, .7)`
      )
      el.style.setProperty(
        '--hevueimg-main-text-color',
        `rgb(${dominantColor}, .5)`
      )
      return dominantColor // 格式如 "123,45,67"
    },
    rgbToHsl(r, g, b) {
      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
      let h,
        s,
        l = (max + min) / 2

      if (max === min) {
        h = s = 0 // 灰
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      return [h * 360, s, l]
    },
    hslToRgb(h, s, l) {
      h /= 360
      let r, g, b

      if (s === 0) {
        r = g = b = l // 灰
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1 / 6) return p + (q - p) * 6 * t
          if (t < 1 / 2) return q
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
          return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    },
    adjustColor(rgb, targetL = 0.5) {
      const [h, s] = this.rgbToHsl(...rgb)
      const balancedRGB = this.hslToRgb(h, s, targetL)
      return balancedRGB
    },
  },
}
</script>

<style scoped>
@import './iconfont/iconfont.css';
@import './css/default.css';
</style>
