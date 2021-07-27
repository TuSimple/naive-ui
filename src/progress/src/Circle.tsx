import {
  h,
  defineComponent,
  PropType,
  computed,
  CSSProperties,
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon
} from '../../_internal/icons'
import { Status } from './interface'

const iconMap = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />
}

export default defineComponent({
  name: 'ProgressCircle',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    status: {
      type: String as PropType<Status>,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    fillColor: String,
    railColor: String,
    railStyle: [String, Object] as PropType<string | CSSProperties>,
    percentage: {
      type: Number,
      required: true
    },
    processing: Boolean,
    showIndicator: {
      type: Boolean,
      required: true
    },
    indicatorTextColor: String,
    unit: String,
    viewBoxWidth: {
      type: Number,
      required: true
    }
  },
  setup (props, { slots }) {
    const strokeDasharrayRef = computed(() => {
      return `${Math.PI * props.percentage}, ${props.viewBoxWidth * 8}`
    })
    const processingFillStrokeDasharrayRef = ref<string>('')
    const timer = ref<number>(0)
    const setProcessingTimer = (): void => {
      let speed = 1
      timer.value = window.setInterval(() => {
        if (!processingFillStrokeDasharrayRef.value) {
          processingFillStrokeDasharrayRef.value = `0, ${
            props.viewBoxWidth * 8
          }`
        } else {
          const strokeDasharrayVal: number = parseFloat(
            processingFillStrokeDasharrayRef.value.split(',')[0]
          )
          let num =
            strokeDasharrayVal + Math.PI * props.percentage * 0.001 * speed++
          if (num > Math.PI * props.percentage) {
            num = 0
            speed = 1
          }
          processingFillStrokeDasharrayRef.value = `${num}, ${
            props.viewBoxWidth * 8
          }`
        }
      }, 20)
    }
    const clearProcessingTimer = (): void => {
      window.clearInterval(timer.value as any)
    }
    onMounted(() => {
      props.processing && setProcessingTimer()
    })
    onUnmounted(() => {
      props.processing && clearProcessingTimer()
    })
    return () => {
      const {
        fillColor,
        railColor,
        railStyle,
        strokeWidth,
        status,
        percentage,
        showIndicator,
        indicatorTextColor,
        unit,
        clsPrefix
      } = props
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div class={`${clsPrefix}-progress-graph-circle`}>
              <svg viewBox="0 0 110 110">
                <g>
                  <path
                    class={`${clsPrefix}-progress-graph-circle-rail`}
                    d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                    stroke-width={strokeWidth * 1.1}
                    stroke-linecap="round"
                    fill="none"
                    style={
                      [
                        {
                          strokeDashoffset: 0,
                          stroke: railColor
                        },
                        railStyle
                      ] as any
                    }
                  />
                </g>
                <g>
                  <path
                    class={[
                      `${clsPrefix}-progress-graph-circle-fill`,
                      percentage === 0 &&
                        `${clsPrefix}-progress-graph-circle-fill--empty`
                    ]}
                    d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                    stroke-width={strokeWidth * 1.1}
                    stroke-linecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: strokeDasharrayRef.value,
                      strokeDashoffset: 0,
                      stroke: fillColor
                    }}
                  />
                </g>
                {props.processing ? (
                  <g>
                    <path
                      class={[
                        `${clsPrefix}-progress-graph-circle-processing-fill`
                      ]}
                      d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                      stroke-width={strokeWidth * 1.1}
                      stroke-linecap="round"
                      fill="none"
                      style={{
                        strokeDasharray: processingFillStrokeDasharrayRef.value,
                        strokeDashoffset: 0
                      }}
                    />
                  </g>
                ) : null}
              </svg>
            </div>
          </div>
          {showIndicator ? (
            <div>
              {slots.default ? (
                <div class={`${clsPrefix}-progress-custom-content`} role="none">
                  {slots.default()}
                </div>
              ) : status !== 'default' ? (
                <div class={`${clsPrefix}-progress-icon`} aria-hidden>
                  <NBaseIcon clsPrefix={clsPrefix}>
                    {{
                      default: () => iconMap[status]
                    }}
                  </NBaseIcon>
                </div>
              ) : (
                <div
                  class={`${clsPrefix}-progress-text`}
                  style={{
                    color: indicatorTextColor
                  }}
                  role="none"
                >
                  <span class={`${clsPrefix}-progress-text__percentage`}>
                    {percentage}
                  </span>
                  <span class={`${clsPrefix}-progress-text__unit`}>{unit}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
