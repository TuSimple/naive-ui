import {
  h,
  defineComponent,
  ref,
  cloneVNode,
  nextTick,
  computed,
  CSSProperties,
  onMounted,
  watchEffect,
  onBeforeUnmount
} from 'vue'
import { indexMap } from 'seemly'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import { carouselLight } from '../styles'
import type { CarouselTheme } from '../styles'
import style from './styles/index.cssr'

const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  autoplay: Boolean,
  interval: {
    type: Number,
    default: 5000
  }
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const currentRef = ref(1)
    const lengthRef = { value: 1 }
    let timerId: number | null = null
    let inTransition = false
    // current from 0 to length + 1
    function next (): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      inTransition = true
      // no need for reset since transitionend handler will handle it
      currentRef.value++
    }
    function prev (): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      inTransition = true
      // no need for reset since transitionend handler will handle it
      currentRef.value--
    }
    function setCurrent (value: number): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      inTransition = true
      const { value: current } = currentRef
      if (current === 1 && value === lengthRef.value && value - current > 1) {
        currentRef.value--
      } else if (
        value === 1 &&
        current === lengthRef.value &&
        current - value > 1
      ) {
        currentRef.value++
      } else {
        currentRef.value = value
      }
      if (props.autoplay) {
        resetInterval()
      }
    }
    // slot    [ 0 1 2 ]
    // index   0 1 2 3 4
    // display 2 0 1 2 0
    function handleTransitionEnd (e: TransitionEvent): void {
      const target = e.target as HTMLDivElement
      if (target !== e.currentTarget) return
      const { value: current } = currentRef
      const { value: length } = lengthRef
      const nextCurrent =
        current === 0 ? length : current === length + 1 ? 1 : null
      if (nextCurrent !== null) {
        target.style.transition = 'none'
        currentRef.value = nextCurrent
        void nextTick(() => {
          void target.offsetWidth
          target.style.transition = ''
          inTransition = false
        })
      } else {
        inTransition = false
      }
    }
    function resetInterval (): void {
      if (timerId !== null) {
        window.clearInterval(timerId)
      }
      timerId = window.setInterval(() => {
        next()
      }, props.interval)
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.autoplay) {
          resetInterval()
        } else {
          if (timerId !== null) {
            window.clearInterval(timerId)
          }
        }
      })
    })
    onBeforeUnmount(() => {
      if (timerId !== null) {
        window.clearInterval(timerId)
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
      current: currentRef,
      lengthRef,
      prev,
      next,
      setCurrent,
      handleTransitionEnd,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { dotColor, dotColorActive, dotSize }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--dot-color': dotColor,
          '--dot-color-active': dotColorActive,
          '--dot-size': dotSize
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      current,
      lengthRef,
      $slots: { default: defaultSlot }
    } = this
    const children = defaultSlot?.().filter((v) => v) || []
    const { length } = children
    lengthRef.value = length
    const leftOverflowVNode = length ? cloneVNode(children[length - 1]) : null
    const rightOverflowVNode = length ? cloneVNode(children[0]) : null
    const total = length + 2
    return (
      <div
        class={`${mergedClsPrefix}-carousel`}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${mergedClsPrefix}-carousel__slides`}
          style={{
            width: `${total}00%`,
            transform: `translate3d(-${
              (100 / total) * (current % total)
            }%, 0, 0)`
          }}
          onTransitionend={this.handleTransitionEnd}
        >
          {[leftOverflowVNode, ...children, rightOverflowVNode].map(
            (vNode, i) => (
              <div data-index={i} style={{ width: `${100 / total}%` }} key={i}>
                {vNode}
              </div>
            )
          )}
        </div>
        <div class={`${mergedClsPrefix}-carousel__dots`}>
          {indexMap(length, (i) => (
            <div
              onClick={() => this.setCurrent(i + 1)}
              class={[
                `${mergedClsPrefix}-carousel__dot`,
                i + 1 === current && `${mergedClsPrefix}-carousel__dot--active`
              ]}
            />
          ))}
        </div>
      </div>
    )
  }
})
