import {
  h,
  defineComponent,
  ref,
  provide,
  cloneVNode,
  computed,
  CSSProperties,
  onBeforeUnmount,
  PropType,
  VNode,
  watch,
  withDirectives,
  vShow,
  Transition,
  toRef,
  nextTick,
  onMounted,
  watchEffect
} from 'vue'
import { on, off } from 'evtd'
import { useConfig, useTheme, ThemeProps } from '../../_mixins'
import { flatten, ExtractPublicPropTypes } from '../../_utils'
import { carouselLight, CarouselTheme } from '../styles'
import { VResizeObserver } from 'vueuc'
import { carouselMethodsInjectionKey } from './interface'
import {
  calculateSize,
  getNextIndex,
  getPrevIndex,
  getDisplayIndex,
  isTouchEvent,
  getRealityIndex
} from './utils'
import { extend } from 'lodash'
import style from './styles/index.cssr'
import NCarouselDots from './CarouselDots'
import NCarouselArrow from './CarouselArrow'
import NCarouselItem from './CarouselItem'

const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  defaultIndex: {
    type: Number,
    default: 0
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  showArrow: Boolean,
  dotStyle: {
    type: String as PropType<'dot' | 'line' | 'progress' | 'never'>,
    default: 'dot'
  },
  dotPlacement: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom'
  },
  slidesPerView: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  centeredSlides: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  autoplay: Boolean,
  interval: {
    type: Number,
    default: 5000
  },
  loop: {
    type: Boolean,
    default: true
  },
  effect: {
    type: String as PropType<'slide' | 'fade' | 'card'>,
    default: 'slide'
  },
  speed: {
    type: Number,
    default: 300
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  transitionTimingFunction: String,
  transitionName: String,
  draggable: {
    type: Boolean,
    default: true
  },
  mousewheel: Boolean,
  keyboard: Boolean,
  onChange: Function as PropType<(current: number, from: number) => void>
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

// only one carousel is allowed to trigger touch globally
let globalDragging = false

function clampValue (value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    // dom
    const selfElRef = ref<HTMLDivElement | null>(null)
    const slidesElRef = ref<HTMLElement[]>([])

    // When users need to customize the transition, we center each slide
    const userWantControlRef = computed(() => !!props.transitionName)
    // side by side slides
    const translateableRef = computed(
      () => !userWantControlRef.value && props.effect === 'slide'
    )
    // slides per view
    const displaySlidesPerViewRef = computed(() =>
      props.centeredSlides ||
      props.effect === 'fade' ||
      userWantControlRef.value
        ? 1
        : props.slidesPerView
    )
    // We automatically calculate total view for special slides per view
    const autoSlideSizeRef = computed(
      () =>
        displaySlidesPerViewRef.value === 'auto' ||
        (props.slidesPerView === 'auto' && props.centeredSlides)
    )
    // Because of the nature of the loop slide work,
    // we need to add duplicates to the left and right of the carousel
    // slot    [ 0 1 2 ]
    // display 2 0 1 2 0
    // index   0 1 2 3 4
    const duplicatedableRef = computed(
      // only duplicate the copy operation in `slide` mode,
      // because other effects have special process
      () => translateableRef.value && props.loop
    )

    const perViewSizeRef = ref({ width: 0, height: 0 })

    const sizeAxisRef = computed(() =>
      props.direction === 'vertical' ? 'height' : 'width'
    )
    const slideSizesRef = computed(() => {
      const { value: slidesEl } = slidesElRef
      const { length } = slidesEl
      if (!length) return []
      if (autoSlideSizeRef.value) {
        return slidesEl.map(slide => calculateSize(slide))
      }
      const { value: slidesPerView } = displaySlidesPerViewRef
      const { value: axis } = sizeAxisRef
      const { value: perViewSize } = perViewSizeRef
      let slideSize = perViewSize[axis]
      if (slidesPerView !== 'auto') {
        const { spaceBetween } = props
        // percentage of view
        const percentage = 1 / Math.max(1, slidesPerView)
        const remaining = perViewSize[axis] - (slidesPerView - 1) * spaceBetween
        slideSize = remaining * percentage
      }
      return slidesEl.map(() => ({ ...perViewSize, [axis]: slideSize }))
    })

    // The translate required to reach each slide
    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      const { length } = slideSizes
      if (!length) return []
      const { centeredSlides, spaceBetween } = props
      const { value: axis } = sizeAxisRef
      const { [axis]: perViewSize } = perViewSizeRef.value
      let previousTranslate = 0
      return slideSizes.map(({ [axis]: slideSize }) => {
        let translate = previousTranslate
        // centered
        if (centeredSlides) {
          translate += (slideSize - perViewSize) / 2
        }
        previousTranslate += slideSize + spaceBetween
        return translate
      })
    })

    const slideStylesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      const { length } = slideSizes
      if (!length) return []
      const { direction } = props
      const isVertical = direction === 'vertical'
      const { value: axis } = sizeAxisRef
      if (userWantControlRef.value) {
        return slideSizes.map(size => ({
          [axis]: `${size[axis]}px`
        }))
      }
      const { effect, spaceBetween, speed, transitionTimingFunction } = props
      const directionAxis = isVertical ? 'top' : 'left'
      const spaceAxis = isVertical ? 'bottom' : 'right'
      const { value: slideTranlates } = slideTranlatesRef
      const { value: realityIndex } = realityIndexRef
      const prevIndex = getPrevRealityIndex(realityIndex)
      const nextIndex = getNextRealityIndex(realityIndex)
      const slideStyles: Record<string, any> = []
      for (let i = 0; i < length; i++) {
        const size = slideSizes[i][axis]
        const style: Record<string, any> = {
          [axis]: `${size}px`,
          [`margin-${spaceAxis}`]: `${spaceBetween}px`,
          transitionDuration: `${speed}ms`,
          transitionTimingFunction: transitionTimingFunction
        }
        if (effect === 'fade') {
          const offset = slideTranlates[i]
          extend(style, {
            opacity: i === realityIndex ? 1 : 0,
            [directionAxis]: `${-offset}px`
          })
        } else if (effect === 'card') {
          const offset = slideTranlates[i]
          const active = i === realityIndex
          let opacity = active ? 1 : 0
          let translate = 0
          let translateZ = active ? 0 : -400
          if (i < realityIndex) {
            translate = -size * 0.5
          } else if (i > realityIndex) {
            translate = size * 0.5
          }
          if (i === prevIndex) {
            opacity = 0.4
            translate = -size * 0.5
            translateZ = -200
          } else if (i === nextIndex) {
            opacity = 0.4
            translate = size * 0.5
            translateZ = -200
          }
          extend(style, {
            opacity,
            [directionAxis]: `${-offset}px`,
            transform: `${
              isVertical
                ? `translateY(${translate}px)`
                : `translateX(${translate}px)`
            } translateZ(${translateZ}px)`,
            zIndex: active ? 1 : 0
          })
        }
        slideStyles.push(style)
      }
      return slideStyles
    })

    // total
    const totalViewRef = computed(() => {
      const { value: slidesPerView } = displaySlidesPerViewRef
      const { length: originLength } = slidesElRef.value
      if (slidesPerView !== 'auto') {
        return originLength - slidesPerView + 1
      } else {
        const { value: slideSizes } = slideSizesRef
        const { length } = slideSizes
        if (!length) return originLength
        const axis = props.direction === 'vertical' ? 'height' : 'width'
        const { [axis]: perViewSize } = perViewSizeRef.value
        let lastViewSize = slideSizes[slideSizes.length - 1][axis]
        const { value: translates } = slideTranlatesRef
        let i = length
        while (i > 1 && lastViewSize < perViewSize) {
          i--
          lastViewSize += translates[i] - translates[i - 1]
        }
        return Math.max(i + 1, 1)
      }
    })
    const displayTotalViewRef = computed(() => {
      const { value: totalView } = totalViewRef
      return duplicatedableRef.value && totalView > 3
        ? totalView - 2
        : totalView
    })

    // index
    const initializeIndex =
      props.defaultIndex + (duplicatedableRef.value ? 1 : 0)
    const displayIndexRef = ref(
      getDisplayIndex(
        initializeIndex,
        totalViewRef.value,
        duplicatedableRef.value
      )
    )
    const virtualIndexRef = ref(initializeIndex)
    const realityIndexRef = ref(initializeIndex)

    // record the translate of each slide, so that it can be restored at touch
    let previousTranslate = 0

    function slideToRealityIndex (index: number, duration = props.speed): void {
      const { value: length } = totalViewRef
      if (
        (index = clampValue(index, 0, length - 1)) !== realityIndexRef.value
      ) {
        const { value: lastDisplayIndex } = displayIndexRef
        const displayIndex = (displayIndexRef.value = getDisplayIndex(
          index,
          totalViewRef.value,
          duplicatedableRef.value
        ))
        virtualIndexRef.value = index
        realityIndexRef.value = getRealityIndex(
          displayIndex,
          duplicatedableRef.value
        )
        if (translateableRef.value) {
          translateTo(index, duration)
        } else {
          fixTranslate()
        }
        if (displayIndex !== lastDisplayIndex) {
          props.onChange?.(displayIndex, lastDisplayIndex)
        }
      }
    }
    function getPrevRealityIndex (
      current: number = realityIndexRef.value
    ): number | null {
      return getPrevIndex(current, totalViewRef.value, props.loop)
    }
    function getNextRealityIndex (
      current: number = realityIndexRef.value
    ): number | null {
      return getNextIndex(current, totalViewRef.value, props.loop)
    }

    // slide to
    function slideTo (index: number): void {
      const realityIndex = getRealityIndex(index, duplicatedableRef.value)
      if (
        index !== displayIndexRef.value ||
        realityIndex !== realityIndexRef.value
      ) {
        slideToRealityIndex(realityIndex)
      }
    }
    function slidePrev (): void {
      const prevIndex = getPrevRealityIndex()
      if (prevIndex !== null) {
        slideToRealityIndex(prevIndex)
      }
    }
    function slideNext (): void {
      const nextIndex = getNextRealityIndex()
      if (nextIndex !== null) {
        slideToRealityIndex(nextIndex)
      }
    }

    // translate to
    // translate
    const translateStyleRef = ref({
      transform: '',
      transitionDuration: '',
      transitionTimingFunction: ''
    })
    let inTransition = false
    function updateTranslate (translate: number, duration = 0): void {
      const isVersical = props.direction === 'vertical'
      translateStyleRef.value = {
        transform: isVersical
          ? `translateY(${-translate}px)`
          : `translateX(${-translate}px)`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: props.transitionTimingFunction || ''
      }
    }
    function fixTranslate (): void {
      if (translateableRef.value) {
        translateTo(realityIndexRef.value)
      } else if (previousTranslate !== 0) {
        updateTranslate((previousTranslate = 0))
      }
    }
    function translateTo (index: number, duration = props.speed): void {
      inTransition = true
      updateTranslate(getTranslate(index), duration)
      previousTranslate = getTranslate(realityIndexRef.value)
    }
    function getTranslate (index: number): number {
      let translate = previousTranslate
      // Deal with auto slides pre view
      if (index >= totalViewRef.value - 1) {
        translate = getLastViewTranslate()
      } else {
        translate = slideTranlatesRef.value[index] || 0
      }
      return translate
    }
    function getLastViewTranslate (): number {
      if (displaySlidesPerViewRef.value === 'auto') {
        const { value: translates } = slideTranlatesRef
        const lastTranslate = translates[translates.length - 1]
        const { value: axis } = sizeAxisRef
        const { [axis]: perViewSize } = perViewSizeRef.value
        let overallSize = 0
        if (lastTranslate === undefined) {
          overallSize = perViewSize
        } else {
          const { value: slideSizes } = slideSizesRef
          overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis]
        }
        // Bring the last slide to the edge
        return overallSize - perViewSize
      } else {
        const { value: translates } = slideTranlatesRef
        const lastTranslate = translates[totalViewRef.value - 1]
        return lastTranslate
      }
    }

    // autoplay
    let autoplayTimer: NodeJS.Timeout | null = null
    function resetAutoplay (cleanOnly?: boolean): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
      const { autoplay, interval } = props
      if (autoplay && interval && !cleanOnly) {
        autoplayTimer = setInterval(slideNext, interval)
      }
    }
    function mesureAutoplay (): void {
      const { autoplay } = props
      if (!autoplayTimer && autoplay) {
        resetAutoplay()
      } else if (!autoplay || !displayTotalViewRef.value) {
        resetAutoplay(true)
      }
    }

    // provide
    function isRealityPrev (slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getPrevRealityIndex() === index
    }
    function isRealityNext (slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getNextRealityIndex() === index
    }
    function isRealityActive (slideOrIndex: HTMLElement | number): boolean {
      return realityIndexRef.value === getSlideIndex(slideOrIndex)
    }
    function isDisabledPrev (): boolean {
      return getPrevRealityIndex() === null
    }
    function isDisabledNext (): boolean {
      return getNextRealityIndex() === null
    }
    function getSlideIndex (slideOrIndex: HTMLElement | number): number {
      return typeof slideOrIndex === 'number'
        ? slideOrIndex
        : slidesElRef.value.indexOf(slideOrIndex)
    }
    function getSlideStyle (slide: HTMLElement | number): any {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        return slideStylesRef.value[index]
      }
    }
    function addSlide (slide: HTMLElement): void {
      slidesElRef.value.push(slide)
    }
    function removeSlide (slide: HTMLElement): void {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        slidesElRef.value.splice(index, 1)
      }
    }
    provide(carouselMethodsInjectionKey, {
      slideTo,
      slidePrev: () => {
        // wait transition end
        if (!inTransition || !duplicatedableRef.value) slidePrev()
      },
      slideNext: () => {
        // wait transition end
        if (!inTransition || !duplicatedableRef.value) slideNext()
      },
      isPrev: isRealityPrev,
      isNext: isRealityNext,
      isActive: isRealityActive,
      isDisabledPrev,
      isDisabledNext,
      getSlideIndex,
      addSlide,
      removeSlide,
      getSlideStyle
    })

    // slot props
    function getPrevDisplayIndex (
      current: number = displayIndexRef.value
    ): number | null {
      return getPrevIndex(current, displayTotalViewRef.value, props.loop)
    }
    function getNextDisplayIndex (
      current: number = displayIndexRef.value
    ): number | null {
      return getNextIndex(current, displayTotalViewRef.value, props.loop)
    }
    function isDisplayActive (index: number): boolean {
      return displayIndexRef.value === index
    }
    function isDisplayPrev (index: number): boolean {
      const prevRealityIndex = getPrevRealityIndex(index)
      return prevRealityIndex !== null && prevRealityIndex === index
    }
    function isDisplayNext (index: number): boolean {
      const nextRealityIndex = getNextRealityIndex(index)
      return nextRealityIndex !== null && nextRealityIndex === index
    }
    const slotPropsRef = computed(() => ({
      total: displayTotalViewRef.value,
      current: displayIndexRef.value,
      slideTo,
      slidePrev,
      slideNext,
      isDisabledPrev,
      isDisabledNext,
      isActive: isDisplayActive,
      isPrev: isDisplayPrev,
      isNext: isDisplayNext,
      getPrevIndex: getPrevDisplayIndex,
      getNextIndex: getNextDisplayIndex
    }))

    // drag
    let dragStartX = 0
    let dragStartY = 0
    let dragOffset = 0
    let dragStartTime = 0
    let dragging = false
    function handleTouchstart (event: MouseEvent | TouchEvent): void {
      if (globalDragging) return
      dragging = true
      globalDragging = true
      dragStartTime = Date.now()
      // pause autoplay
      resetAutoplay(true)
      if (
        event.type !== 'touchstart' &&
        !(event.target as HTMLElement).isContentEditable
      ) {
        event.preventDefault()
      }
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      if (props.direction === 'vertical') {
        dragStartY = touchEvent.clientY
      } else {
        dragStartX = touchEvent.clientX
      }
      on('touchmove', document, handleTouchmove)
      on('touchend', document, handleTouchend)
      on('touchcancel', document, handleTouchend)
      on('mousemove', document, handleTouchmove)
      on('mouseup', document, handleTouchend)
    }
    function handleTouchmove (event: MouseEvent | TouchEvent): void {
      const isVertical = props.direction === 'vertical'
      const axis = isVertical ? 'height' : 'width'
      const perViewSize = perViewSizeRef.value[axis]
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      const offset = isVertical
        ? touchEvent.clientY - dragStartY
        : touchEvent.clientX - dragStartX
      dragOffset = clampValue(offset, -perViewSize, perViewSize)
      if (translateableRef.value) {
        // why there will be afterimages when dragging...
        updateTranslate(previousTranslate - dragOffset, 0)
      }
    }
    function handleTouchend (): void {
      const duration = Date.now() - dragStartTime
      const axis = props.direction === 'vertical' ? 'height' : 'width'
      const { value: realityIndex } = realityIndexRef
      const { value: translateable } = translateableRef
      let currentIndex: number | null = realityIndex
      if (!inTransition && translateable && dragOffset !== 0) {
        const currentTranslate = previousTranslate - dragOffset
        const translates = [
          ...slideTranlatesRef.value.slice(0, totalViewRef.value - 1),
          getLastViewTranslate()
        ]
        let prevOffset = null
        for (let i = 0; i < translates.length; i++) {
          const offset = Math.abs(translates[i] - currentTranslate)
          if (prevOffset !== null && prevOffset < offset) {
            break
          }
          prevOffset = offset
          currentIndex = i
        }
      }
      if (currentIndex === realityIndex) {
        const perViewSize = perViewSizeRef.value[axis]
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > perViewSize / 2 || dragOffset / duration > 0.4) {
          currentIndex = getPrevRealityIndex(realityIndex)
        } else if (
          dragOffset < -perViewSize / 2 ||
          dragOffset / duration < -0.4
        ) {
          currentIndex = getNextRealityIndex(realityIndex)
        }
      }
      if (currentIndex !== null && currentIndex !== realityIndex) {
        slideToRealityIndex(currentIndex)
      } else {
        fixTranslate()
      }
      resetDragStatus()
      mesureAutoplay()
    }
    function resetDragStatus (): void {
      if (dragging) {
        dragging = false
        globalDragging = false
      }
      dragStartX = 0
      dragStartY = 0
      dragOffset = 0
      dragStartTime = 0
      off('touchmove', document, handleTouchmove)
      off('touchend', document, handleTouchend)
      off('touchcancel', document, handleTouchend)
      off('mousemove', document, handleTouchmove)
      off('mouseup', document, handleTouchend)
    }

    function handleTransitionEnd (): void {
      const { value: virtualIndex } = virtualIndexRef
      const { value: realityIndex } = realityIndexRef
      if (inTransition && virtualIndex !== realityIndex) {
        translateTo(realityIndex, 0)
      } else {
        resetAutoplay()
      }
      inTransition = false
    }
    function handleMousewheel (event: WheelEvent): void {
      event.preventDefault()
      if (inTransition) return
      if (props.mousewheel && props.direction === 'vertical') {
        const deltaY = event.deltaY
        if (deltaY >= 100 && !isDisabledNext()) {
          slideNext()
        } else if (deltaY <= -100 && !isDisabledPrev()) {
          slidePrev()
        }
      }
    }
    function handleResize (): void {
      perViewSizeRef.value = calculateSize(selfElRef.value as HTMLElement, true)
      resetAutoplay()
    }
    function handleSlideResize (): void {
      if (autoSlideSizeRef.value) {
        slideSizesRef.effect.scheduler?.()
        slideSizesRef.effect.run()
      }
    }

    onMounted(() => {
      watchEffect(() => mesureAutoplay())
    })
    onBeforeUnmount(() => {
      resetDragStatus()
      resetAutoplay(true)
    })
    watch(toRef(props, 'activeIndex'), index => slideTo(index), {
      immediate: true
    })
    watch(
      duplicatedableRef,
      () => void nextTick(() => slideTo(displayIndexRef.value))
    )
    watch(slideTranlatesRef, () => {
      if (translateableRef.value) {
        fixTranslate()
      }
    })
    watch(translateableRef, value => {
      if (!value) {
        // If the current mode does not support translate, reset the position of the wrapper
        updateTranslate((previousTranslate = 0))
      } else {
        fixTranslate()
      }
    })
    const themeRef = useTheme(
      'Carousel',
      'Carousel',
      style,
      carouselLight,
      props
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      duplicatedable: duplicatedableRef,
      userWantControl: userWantControlRef,
      autoSlideSize: autoSlideSizeRef,
      displayIndex: displayIndexRef,
      realityIndex: realityIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      handleTouchstart,
      handleTransitionEnd,
      handleMousewheel,
      handleResize,
      handleSlideResize,
      slotProps: slotPropsRef,
      // public methods
      slideTo,
      slidePrev,
      slideNext,
      isActive: isDisplayActive,
      isPrev: isDisplayPrev,
      isNext: isDisplayNext,
      getPrevIndex: getPrevDisplayIndex,
      getNextIndex: getNextDisplayIndex,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            dotSize,
            dotColor,
            dotColorActive,
            dotColorFocus,
            dotLineSize,
            dotLineSizeActive,
            dotProgressSize,
            dotProgressColor,
            dotProgressColorActive,
            arrowColor
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-dot-color': dotColor,
          '--n-dot-color-focus': dotColorFocus,
          '--n-dot-color-active': dotColorActive,
          '--n-dot-size': dotSize,
          '--n-dot-line-size': dotLineSize,
          '--n-dot-line-size-active': dotLineSizeActive,
          '--n-dot-progress-size': dotProgressSize,
          '--n-dot-progress-color': dotProgressColor,
          '--n-dot-progress-color-active': dotProgressColorActive,
          '--n-arrow-color': arrowColor
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      showArrow,
      autoSlideSize,
      userWantControl,
      slideStyles,
      dotStyle,
      dotPlacement,
      draggable,
      slotProps,
      $slots: { default: defaultSlots, dots: dotsSlot, arrow: arrowSlot }
    } = this
    const children = (defaultSlots && flatten(defaultSlots())) || []
    let slides = filterCarouselItem(children)
    if (!slides.length) {
      slides = children.map((children, i) => (
        <NCarouselItem>
          {{
            default: () => cloneVNode(children)
          }}
        </NCarouselItem>
      ))
    }
    const { length: realityLength } = slides
    if (realityLength > 1 && this.duplicatedable) {
      slides.push(duplicateSlide(slides[0], 0, 'append'))
      slides.unshift(
        duplicateSlide(slides[realityLength - 1], realityLength - 1, 'prepend')
      )
    }
    if (autoSlideSize) {
      slides = slides.map(slide => (
        <VResizeObserver onResize={this.handleSlideResize}>
          {{
            default: () => slide
          }}
        </VResizeObserver>
      ))
    }
    return (
      <div
        ref='selfElRef'
        class={[
          `${mergedClsPrefix}-carousel`,
          `${mergedClsPrefix}-carousel--${dotPlacement}`,
          `${mergedClsPrefix}-carousel--${this.direction}`,
          {
            [`${mergedClsPrefix}-carousel--usercontrol`]: userWantControl,
            [`${mergedClsPrefix}-carousel--3d`]:
              !userWantControl && this.effect === 'card'
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <VResizeObserver onResize={this.handleResize}>
          {{
            default: () => (
              <div
                class={`${mergedClsPrefix}-carousel__slides`}
                role='listbox'
                style={this.translateStyle}
                onMousedown={draggable ? this.handleTouchstart : undefined}
                onTouchstart={draggable ? this.handleTouchstart : undefined}
                onWheel={this.mousewheel ? this.handleMousewheel : undefined}
                onTransitionend={this.handleTransitionEnd}
              >
                {userWantControl
                  ? slides.map((slide, i) => (
                    <div style={slideStyles[i]}>
                      {withDirectives(
                        <Transition name={this.transitionName}>
                          {{
                            default: () => slide
                          }}
                        </Transition>,
                        [[vShow, this.isActive(i)]]
                      )}
                    </div>
                  ))
                  : slides}
              </div>
            )
          }}
        </VResizeObserver>
        {dotStyle !== 'never' &&
          (dotsSlot ? (
            dotsSlot(slotProps)
          ) : (
            <NCarouselDots
              trigger={this.trigger}
              total={slotProps.total}
              current={slotProps.current}
              dotStyle={dotStyle}
              dotPlacement={dotPlacement}
            />
          ))}
        {showArrow &&
          (arrowSlot ? (
            arrowSlot(slotProps)
          ) : (
            <NCarouselArrow
              direction={this.direction}
              keyboard={this.keyboard}
            />
          ))}
      </div>
    )
  }
})

function filterCarouselItem (
  vnodes: VNode[],
  carouselItems: VNode[] = []
): VNode[] {
  if (Array.isArray(vnodes)) {
    vnodes.forEach(vnode => {
      if (vnode.type && (vnode.type as any).name === 'CarouselItem') {
        carouselItems.push(vnode)
      }
    })
  }
  return carouselItems
}

function duplicateSlide (
  child: VNode,
  index: number,
  position: 'prepend' | 'append'
): VNode {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index}-${position}`
  })
}
