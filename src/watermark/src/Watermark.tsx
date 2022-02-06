import { h, defineComponent, PropType, ref } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ExtractPublicPropTypes, warnOnce } from '../../_utils'
import { watermarkLight, WatermarkTheme } from '../styles'
import style from './styles/index.cssr'

const watermarkProps = {
  ...(useTheme.props as ThemeProps<WatermarkTheme>),
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 64
  },
  zIndex: {
    type: Number,
    default: 10
  },
  gapX: {
    type: Number,
    default: 212
  },
  gapY: {
    type: Number,
    default: 222
  },
  offsetTop: Number,
  offsetLeft: Number,
  rotate: {
    type: Number,
    default: -22
  },
  image: String,
  content: String,
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,.15)'
  },
  fontFamily: {
    type: String,
    default: 'sans-serif'
  },
  fontWeight: {
    type: [String, Number] as PropType<'normal' | 'light' | 'weight' | number>,
    default: 'normal'
  },
  fontSize: {
    type: [Number, String] as PropType<number | string>,
    default: 16
  },
  fontStyle: {
    type: [String, Number] as PropType<
    'normal' | 'italic' | 'oblique' | number
    >,
    default: 'normal'
  }
} as const

export type WatermarkProps = ExtractPublicPropTypes<typeof watermarkProps>

export default defineComponent({
  name: 'Watermark',
  props: watermarkProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const {
      gapX,
      gapY,
      zIndex,
      width,
      height,
      offsetTop,
      offsetLeft,
      rotate,
      image,
      content,
      fontColor,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle
    } = props
    const base64UrlRef = ref('')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const ratio = window.devicePixelRatio || 1
    const canvasWidth = gapX + width
    const canvasHeight = gapY + height
    const canvasOffsetLeft = offsetLeft || gapX / 2
    const canvasOffsetTop = offsetTop || gapY / 2
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    if (ctx) {
      ctx.scale(ratio, ratio)
      ctx.translate(canvasOffsetLeft, canvasOffsetTop)
      ctx.rotate(rotate * (Math.PI / 180))
      if (image) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.referrerPolicy = 'no-referrer'
        img.src = image
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height)
          base64UrlRef.value = canvas.toDataURL()
        }
      } else if (content) {
        ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${height} ${fontFamily}`
        ctx.fillStyle = fontColor
        ctx.fillText(content, 0, 0)
        base64UrlRef.value = canvas.toDataURL()
      }
    } else {
      warnOnce('Watermark:', 'Canvas is not supported in this browser.')
    }
    useTheme('Watermark', '-watermark', style, watermarkLight, props)
    return () => (
      <div class={`${mergedClsPrefixRef.value}-watermark-container`}>
        {slots.default?.()}
        <div
          class={`${mergedClsPrefixRef.value}-watermark`}
          style={{
            zIndex: zIndex,
            backgroundSize: `${gapX + width}px`,
            backgroundImage: `url(${base64UrlRef.value})`
          }}
        ></div>
      </div>
    )
  }
})
