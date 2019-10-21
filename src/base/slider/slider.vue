<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === idx}" v-for="(dot, idx) in dots" :key="idx"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from 'utils/dom'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      currentPageIndex: 0,
      dots: []
    }
  },
  mounted() {
    process.nextTick(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    })
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      const className = 'slider-item'
      const sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      let width = 0
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, className)
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      // 无缝滚动
      if (this.loop && !isResize) {
        // 实现无缝滚动需要在额外多加两屏宽度
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        // 横向滚动
        scrollX: true,
        // 纵向滚动
        scrollY: false,
        // 惯性滑动
        momentum: false,
        // 这个配置是为了做 Slide 组件用的
        snap: {
          // 循环 无缝滚动
          loop: true,
          // 两边边界 阈值
          threshold: 0.3,
          // 切换过渡时间
          speed: 400
        }
        // click: true
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          this._play()
        }
      })
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable";

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
