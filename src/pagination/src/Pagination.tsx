/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  computed,
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  PropType,
  ref,
  toRef,
  VNodeChild,
  watchEffect
} from 'vue'
import { useMergedState } from 'vooks'
import { NPopselect } from '../../popselect'
import { NSelect } from '../../select'
import { InputInst, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import {
  BackwardIcon,
  FastBackwardIcon,
  FastForwardIcon,
  ForwardIcon,
  MoreIcon
} from '../../_internal/icons'
import type { ThemeProps } from '../../_mixins'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import type { PaginationTheme } from '../styles'
import { paginationLight } from '../styles'
import type { PageItem } from './utils'
import { createPageItemsInfo } from './utils'
import style from './styles/index.cssr'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import {
  call,
  resolveSlot,
  warn,
  warnOnce,
  createKey,
  smallerSize
} from '../../_utils'
import type { Size as InputSize } from '../../input/src/interface'
import type { Size as SelectSize } from '../../select/src/interface'
import {
  PaginationRenderLabel,
  PaginationSizeOption,
  RenderNext,
  RenderPrefix,
  RenderPrev,
  RenderSuffix,
  Size
} from './interface'
import { useRtl } from '../../_mixins/use-rtl'

export const paginationProps = {
  ...(useTheme.props as ThemeProps<PaginationTheme>),
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number,
  defaultPageSize: Number,
  pageSizes: {
    type: Array as PropType<Array<number | PaginationSizeOption>>,
    default () {
      return [10]
    }
  },
  showQuickJumper: Boolean,
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  disabled: Boolean,
  triggerQuickJumpOn: {
    type: Array as PropType<Array<'change' | 'blur'>>,
    default: () => ['change']
  },
  pageSlot: {
    type: Number,
    default: 9
  },
  prev: Function as PropType<RenderPrev>,
  next: Function as PropType<RenderNext>,
  prefix: Function as PropType<RenderPrefix>,
  suffix: Function as PropType<RenderSuffix>,
  label: Function as PropType<PaginationRenderLabel>,
  'onUpdate:page': [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  onUpdatePage: [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  'onUpdate:pageSize': [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  onUpdatePageSize: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onPageSizeChange: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onChange: [Function, Array] as PropType<MaybeArray<(page: number) => void>>
} as const

export type PaginationProps = ExtractPublicPropTypes<typeof paginationProps>

export default defineComponent({
  name: 'Pagination',
  props: paginationProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.pageCount !== undefined && props.itemCount !== undefined) {
          warn(
            'pagination',
            "`page-count` and `item-count` should't be specified together. Only `item-count` will take effect."
          )
        }
        if (props.onPageSizeChange) {
          warnOnce(
            'pagination',
            '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.'
          )
        }
        if (props.onChange) {
          warnOnce(
            'pagination',
            '`on-change` is deprecated, please use `on-update:page` instead.'
          )
        }
      })
    }
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const themeRef = useTheme(
      'Pagination',
      '-pagination',
      style,
      paginationLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef } = useLocale('Pagination')
    const selfRef = ref<HTMLElement | null>(null)
    const jumperRef = ref<InputInst | null>(null)
    const jumperValueRef = ref('')
    const uncontrolledPageRef = ref(props.defaultPage)
    const getDefaultPageSize = (): number => {
      const { defaultPageSize } = props
      if (defaultPageSize !== undefined) return defaultPageSize
      const pageSizeOption = props.pageSizes[0]
      if (typeof pageSizeOption === 'number') return pageSizeOption
      return pageSizeOption.value || 10
    }
    const uncontrolledPageSizeRef = ref(getDefaultPageSize())
    const mergedPageRef = useMergedState(
      toRef(props, 'page'),
      uncontrolledPageRef
    )
    const mergedPageSizeRef = useMergedState(
      toRef(props, 'pageSize'),
      uncontrolledPageSizeRef
    )
    const mergedPageCountRef = computed(() => {
      // item count has high priority, for it can affect prefix slot rendering
      const { itemCount } = props
      if (itemCount !== undefined) {
        return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value))
      }
      const { pageCount } = props
      if (pageCount !== undefined) return Math.max(pageCount, 1)
      return 1
    })

    const fastForwardActiveRef = ref(false)
    const fastBackwardActiveRef = ref(false)
    const showFastForwardMenuRef = ref(false)
    const showFastBackwardMenuRef = ref(false)

    const handleFastForwardMouseenter = (): void => {
      fastForwardActiveRef.value = true
      disableTransitionOneTick()
    }
    const handleFastForwardMouseleave = (): void => {
      fastForwardActiveRef.value = false
      disableTransitionOneTick()
    }
    const handleFastBackwardMouseenter = (): void => {
      fastBackwardActiveRef.value = true
      disableTransitionOneTick()
    }
    const handleFastBackwardMouseleave = (): void => {
      fastBackwardActiveRef.value = false
      disableTransitionOneTick()
    }
    const handleMenuSelect = (value: number): void => {
      doUpdatePage(value)
    }

    const pageItemsInfo = computed(() =>
      createPageItemsInfo(
        mergedPageRef.value,
        mergedPageCountRef.value,
        props.pageSlot
      )
    )

    watchEffect(() => {
      if (!pageItemsInfo.value.hasFastBackward) {
        fastBackwardActiveRef.value = false
        showFastBackwardMenuRef.value = false
      } else if (!pageItemsInfo.value.hasFastForward) {
        fastForwardActiveRef.value = false
        showFastForwardMenuRef.value = false
      }
    })

    const pageSizeOptionsRef = computed(() => {
      const suffix = localeRef.value.selectionSuffix
      return props.pageSizes.map((size) => {
        if (typeof size === 'number') {
          return {
            label: `${size} / ${suffix}`,
            value: size
          }
        } else {
          return size
        }
      })
    })
    const inputSizeRef = computed<InputSize>(() => {
      return (
        mergedComponentPropsRef?.value?.Pagination?.inputSize ||
        smallerSize(props.size)
      )
    })
    const selectSizeRef = computed<SelectSize>(() => {
      return (
        mergedComponentPropsRef?.value?.Pagination?.selectSize ||
        smallerSize(props.size)
      )
    })
    const startIndexRef = computed(() => {
      return (mergedPageRef.value - 1) * mergedPageSizeRef.value
    })
    const endIndexRef = computed(() => {
      const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1
      const { itemCount } = props
      if (itemCount !== undefined) {
        return endIndex > itemCount ? itemCount : endIndex
      }
      return endIndex
    })
    const mergedItemCountRef = computed(() => {
      const { itemCount } = props
      if (itemCount !== undefined) return itemCount
      return (props.pageCount || 1) * mergedPageSizeRef.value
    })
    const rtlEnabledRef = useRtl('Pagination', mergedRtlRef, mergedClsPrefixRef)

    const disableTransitionOneTick = (): void => {
      void nextTick(() => {
        const { value: selfEl } = selfRef
        if (!selfEl) return
        selfEl.classList.add('transition-disabled')
        void selfRef.value?.offsetWidth
        selfEl.classList.remove('transition-disabled')
      })
    }
    function doUpdatePage (page: number): void {
      if (page === mergedPageRef.value) return
      const { 'onUpdate:page': _onUpdatePage, onUpdatePage, onChange } = props
      if (_onUpdatePage) call(_onUpdatePage, page)
      if (onUpdatePage) call(onUpdatePage, page)
      // deprecated
      if (onChange) call(onChange, page)
      uncontrolledPageRef.value = page
    }
    function doUpdatePageSize (pageSize: number): void {
      if (pageSize === mergedPageSizeRef.value) return
      const {
        'onUpdate:pageSize': _onUpdatePageSize,
        onUpdatePageSize,
        onPageSizeChange
      } = props
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize)
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize)
      // deprecated
      if (onPageSizeChange) call(onPageSizeChange, pageSize)
      uncontrolledPageSizeRef.value = pageSize
      // update new page when overflows.
      // we may have different update strategy, but i've no time to impl it
      if (mergedPageCountRef.value < mergedPageRef.value) {
        doUpdatePage(mergedPageCountRef.value)
      }
    }
    function forward (): void {
      if (props.disabled) return
      const page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value)
      doUpdatePage(page)
    }
    function backward (): void {
      if (props.disabled) return
      const page = Math.max(mergedPageRef.value - 1, 1)
      doUpdatePage(page)
    }
    function fastForward (): void {
      if (props.disabled) return
      const page = Math.min(
        pageItemsInfo.value.fastForwardTo,
        mergedPageCountRef.value
      )
      doUpdatePage(page)
    }
    function fastBackward (): void {
      if (props.disabled) return
      const page = Math.max(pageItemsInfo.value.fastBackwardTo, 1)
      doUpdatePage(page)
    }
    function handleSizePickerChange (value: number): void {
      doUpdatePageSize(value)
    }
    function doQuikJump (): void {
      const page = parseInt(jumperValueRef.value)
      if (!Number.isNaN(page)) {
        doUpdatePage(Math.max(1, Math.min(page, mergedPageCountRef.value)))
        jumperValueRef.value = ''
      }
    }
    function handleQuickJumperKeyUp (e: KeyboardEvent): void {
      if (e.key === 'Enter') {
        doQuikJump()
        jumperRef.value?.blur()
      }
    }
    function handleQuickJumperOnBlur (): void {
      const { triggerQuickJumpOn } = props
      if (triggerQuickJumpOn.includes('blur')) {
        doQuikJump()
      }
    }
    function handlePageItemClick (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        case 'page':
          doUpdatePage(pageItem.label)
          break
        case 'fast-backward':
          fastBackward()
          break
        case 'fast-forward':
          fastForward()
          break
      }
    }
    function handleJumperInput (value: string): void {
      jumperValueRef.value = value.replace(/\D+/g, '')
    }
    watchEffect(() => {
      void mergedPageRef.value
      void mergedPageSizeRef.value
      disableTransitionOneTick()
    })
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        self: {
          buttonBorder,
          buttonBorderHover,
          buttonBorderPressed,
          buttonIconColor,
          buttonIconColorHover,
          buttonIconColorPressed,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          itemTextColorDisabled,
          itemColor,
          itemColorHover,
          itemColorPressed,
          itemColorActive,
          itemColorActiveHover,
          itemColorDisabled,
          itemBorder,
          itemBorderHover,
          itemBorderPressed,
          itemBorderActive,
          itemBorderDisabled,
          itemBorderRadius,
          jumperTextColor,
          jumperTextColorDisabled,
          buttonColor,
          buttonColorHover,
          buttonColorPressed,
          [createKey('itemPadding', size)]: itemPadding,
          [createKey('itemMargin', size)]: itemMargin,
          [createKey('inputWidth', size)]: inputWidth,
          [createKey('selectWidth', size)]: selectWidth,
          [createKey('inputMargin', size)]: inputMargin,
          [createKey('selectMargin', size)]: selectMargin,
          [createKey('jumperFontSize', size)]: jumperFontSize,
          [createKey('prefixMargin', size)]: prefixMargin,
          [createKey('suffixMargin', size)]: suffixMargin,
          [createKey('itemSize', size)]: itemSize,
          [createKey('buttonIconSize', size)]: buttonIconSize,
          [createKey('itemFontSize', size)]: itemFontSize,
          [`${createKey('itemMargin', size)}Rtl` as const]: itemMarginRtl,
          [`${createKey('inputMargin', size)}Rtl` as const]: inputMarginRtl
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-prefix-margin': prefixMargin,
        '--n-suffix-margin': suffixMargin,
        '--n-item-font-size': itemFontSize,
        '--n-select-width': selectWidth,
        '--n-select-margin': selectMargin,
        '--n-input-width': inputWidth,
        '--n-input-margin': inputMargin,
        '--n-input-margin-rtl': inputMarginRtl,
        '--n-item-size': itemSize,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-disabled': itemTextColorDisabled,
        '--n-item-text-color-hover': itemTextColorHover,
        '--n-item-text-color-active': itemTextColorActive,
        '--n-item-text-color-pressed': itemTextColorPressed,
        '--n-item-color': itemColor,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-disabled': itemColorDisabled,
        '--n-item-color-active': itemColorActive,
        '--n-item-color-active-hover': itemColorActiveHover,
        '--n-item-color-pressed': itemColorPressed,
        '--n-item-border': itemBorder,
        '--n-item-border-hover': itemBorderHover,
        '--n-item-border-disabled': itemBorderDisabled,
        '--n-item-border-active': itemBorderActive,
        '--n-item-border-pressed': itemBorderPressed,
        '--n-item-padding': itemPadding,
        '--n-item-border-radius': itemBorderRadius,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-jumper-font-size': jumperFontSize,
        '--n-jumper-text-color': jumperTextColor,
        '--n-jumper-text-color-disabled': jumperTextColorDisabled,
        '--n-item-margin': itemMargin,
        '--n-item-margin-rtl': itemMarginRtl,
        '--n-button-icon-size': buttonIconSize,
        '--n-button-icon-color': buttonIconColor,
        '--n-button-icon-color-hover': buttonIconColorHover,
        '--n-button-icon-color-pressed': buttonIconColorPressed,
        '--n-button-color-hover': buttonColorHover,
        '--n-button-color': buttonColor,
        '--n-button-color-pressed': buttonColorPressed,
        '--n-button-border': buttonBorder,
        '--n-button-border-hover': buttonBorderHover,
        '--n-button-border-pressed': buttonBorderPressed
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'pagination',
        computed(() => {
          let hash = ''
          const { size } = props
          hash += size[0]
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      selfRef,
      jumperRef,
      mergedPage: mergedPageRef,
      pageItems: computed(() => {
        return pageItemsInfo.value.items
      }),
      mergedItemCount: mergedItemCountRef,
      jumperValue: jumperValueRef,
      pageSizeOptions: pageSizeOptionsRef,
      mergedPageSize: mergedPageSizeRef,
      inputSize: inputSizeRef,
      selectSize: selectSizeRef,
      mergedTheme: themeRef,
      mergedPageCount: mergedPageCountRef,
      startIndex: startIndexRef,
      endIndex: endIndexRef,
      showFastForwardMenu: showFastForwardMenuRef,
      showFastBackwardMenu: showFastBackwardMenuRef,
      fastForwardActive: fastForwardActiveRef,
      fastBackwardActive: fastBackwardActiveRef,
      handleMenuSelect,
      handleFastForwardMouseenter,
      handleFastForwardMouseleave,
      handleFastBackwardMouseenter,
      handleFastBackwardMouseleave,
      handleJumperInput,
      handleBackwardClick: backward,
      handleForwardClick: forward,
      handlePageItemClick,
      handleSizePickerChange,
      handleQuickJumperKeyUp,
      handleQuickJumperOnBlur,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    // it's ok to expand all prop here since no slots' deps
    const {
      $slots,
      mergedClsPrefix,
      disabled,
      cssVars,
      mergedPage,
      mergedPageCount,
      pageItems,
      showSizePicker,
      showQuickJumper,
      mergedTheme,
      locale,
      inputSize,
      selectSize,
      mergedPageSize,
      pageSizeOptions,
      jumperValue,
      prev,
      next,
      prefix,
      suffix,
      label,
      handleJumperInput,
      handleSizePickerChange,
      handleBackwardClick,
      handlePageItemClick,
      handleForwardClick,
      handleQuickJumperKeyUp,
      handleQuickJumperOnBlur,
      onRender
    } = this
    onRender?.()
    const renderPrefix = ($slots.prefix as RenderPrefix | undefined) || prefix
    const renderSuffix = ($slots.suffix as RenderSuffix | undefined) || suffix
    const renderPrev = prev || $slots.prev
    const renderNext = next || $slots.next
    const renderLabel = label || $slots.label
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-pagination`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-pagination--rtl`,
          disabled && `${mergedClsPrefix}-pagination--disabled`
        ]}
        style={cssVars as CSSProperties}
      >
        {renderPrefix ? (
          <div class={`${mergedClsPrefix}-pagination-prefix`}>
            {renderPrefix({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })}
          </div>
        ) : null}
        <div
          class={[
            `${mergedClsPrefix}-pagination-item`,
            !renderPrev && `${mergedClsPrefix}-pagination-item--button`,
            (mergedPage <= 1 || mergedPage > mergedPageCount || disabled) &&
              `${mergedClsPrefix}-pagination-item--disabled`
          ]}
          onClick={handleBackwardClick}
        >
          {renderPrev ? (
            renderPrev({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })
          ) : (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{
                default: () =>
                  this.rtlEnabled ? <ForwardIcon /> : <BackwardIcon />
              }}
            </NBaseIcon>
          )}
        </div>
        {pageItems.map((pageItem, index) => {
          let contentNode: VNodeChild
          let onMouseenter: undefined | (() => void)
          let onMouseleave: undefined | (() => void)
          const { type } = pageItem
          switch (type) {
            case 'page':
              // eslint-disable-next-line no-case-declarations
              const pageNode = pageItem.label
              if (renderLabel) {
                contentNode = renderLabel({
                  type: 'page',
                  node: pageNode,
                  active: pageItem.active
                })
              } else {
                contentNode = pageNode
              }
              break
            case 'fast-forward':
              // eslint-disable-next-line no-case-declarations
              const fastForwardNode = this.fastForwardActive ? (
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{
                    default: () =>
                      this.rtlEnabled ? (
                        <FastBackwardIcon />
                      ) : (
                        <FastForwardIcon />
                      )
                  }}
                </NBaseIcon>
              ) : (
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <MoreIcon /> }}
                </NBaseIcon>
              )
              if (renderLabel) {
                contentNode = renderLabel({
                  type: 'fast-forward',
                  node: fastForwardNode,
                  active: this.fastForwardActive || this.showFastForwardMenu
                })
              } else {
                contentNode = fastForwardNode
              }
              onMouseenter = this.handleFastForwardMouseenter
              onMouseleave = this.handleFastForwardMouseleave
              break
            case 'fast-backward':
              // eslint-disable-next-line no-case-declarations
              const fastBackwardNode = this.fastBackwardActive ? (
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{
                    default: () =>
                      this.rtlEnabled ? (
                        <FastForwardIcon />
                      ) : (
                        <FastBackwardIcon />
                      )
                  }}
                </NBaseIcon>
              ) : (
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <MoreIcon /> }}
                </NBaseIcon>
              )
              if (renderLabel) {
                contentNode = renderLabel({
                  type: 'fast-backward',
                  node: fastBackwardNode,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                })
              } else {
                contentNode = fastBackwardNode
              }
              onMouseenter = this.handleFastBackwardMouseenter
              onMouseleave = this.handleFastBackwardMouseleave
              break
          }
          const itemNode = (
            <div
              key={index}
              class={[
                `${mergedClsPrefix}-pagination-item`,
                pageItem.active && `${mergedClsPrefix}-pagination-item--active`,
                type !== 'page' &&
                  ((type === 'fast-backward' && this.showFastBackwardMenu) ||
                    (type === 'fast-forward' && this.showFastForwardMenu)) &&
                  `${mergedClsPrefix}-pagination-item--hover`,
                disabled && `${mergedClsPrefix}-pagination-item--disabled`,
                type === 'page' &&
                  `${mergedClsPrefix}-pagination-item--clickable`
              ]}
              onClick={() => handlePageItemClick(pageItem)}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseleave}
            >
              {contentNode}
            </div>
          )
          if (
            type === 'page' &&
            !pageItem.mayBeFastBackward &&
            !pageItem.mayBeFastForward
          ) {
            return itemNode
          } else {
            const key =
              pageItem.type === 'page'
                ? pageItem.mayBeFastBackward
                  ? 'fast-backward'
                  : 'fast-forward'
                : pageItem.type
            return (
              <NPopselect
                key={key}
                trigger="hover"
                virtualScroll
                style={{ width: '60px' }}
                theme={mergedTheme.peers.Popselect}
                themeOverrides={mergedTheme.peerOverrides.Popselect}
                builtinThemeOverrides={{
                  peers: {
                    InternalSelectMenu: {
                      height: 'calc(var(--n-option-height) * 4.6)'
                    }
                  }
                }}
                nodeProps={() => ({
                  style: {
                    justifyContent: 'center'
                  }
                })}
                show={
                  type === 'page'
                    ? false
                    : type === 'fast-backward'
                      ? this.showFastBackwardMenu
                      : this.showFastForwardMenu
                }
                onUpdateShow={(value) => {
                  if (type === 'page') return
                  if (value) {
                    if (type === 'fast-backward') {
                      this.showFastBackwardMenu = value
                    } else {
                      this.showFastForwardMenu = value
                    }
                  } else {
                    this.showFastBackwardMenu = false
                    this.showFastForwardMenu = false
                  }
                }}
                options={pageItem.type !== 'page' ? pageItem.options : []}
                onUpdateValue={this.handleMenuSelect}
                scrollable
                internalShowCheckmark={false}
              >
                {{ default: () => itemNode }}
              </NPopselect>
            )
          }
        })}
        <div
          class={[
            `${mergedClsPrefix}-pagination-item`,
            !renderNext && `${mergedClsPrefix}-pagination-item--button`,
            {
              [`${mergedClsPrefix}-pagination-item--disabled`]:
                mergedPage < 1 || mergedPage >= mergedPageCount || disabled
            }
          ]}
          onClick={handleForwardClick}
        >
          {renderNext ? (
            renderNext({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              itemCount: this.mergedItemCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex
            })
          ) : (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{
                default: () =>
                  this.rtlEnabled ? <BackwardIcon /> : <ForwardIcon />
              }}
            </NBaseIcon>
          )}
        </div>
        {showSizePicker ? (
          <NSelect
            internalShowCheckmark={false}
            size={selectSize}
            placeholder=""
            options={pageSizeOptions}
            value={mergedPageSize}
            disabled={disabled}
            theme={mergedTheme.peers.Select}
            themeOverrides={mergedTheme.peerOverrides.Select}
            onUpdateValue={handleSizePickerChange}
          />
        ) : null}
        {showQuickJumper ? (
          <div class={`${mergedClsPrefix}-pagination-quick-jumper`}>
            {resolveSlot(this.$slots.goto, () => [locale.goto])}
            <NInput
              ref="jumperRef"
              value={jumperValue}
              onUpdateValue={handleJumperInput}
              size={inputSize}
              placeholder=""
              disabled={disabled}
              theme={mergedTheme.peers.Input}
              themeOverrides={mergedTheme.peerOverrides.Input}
              onKeyup={handleQuickJumperKeyUp}
              onBlur={handleQuickJumperOnBlur}
            />
          </div>
        ) : null}
        {renderSuffix ? (
          <div class={`${mergedClsPrefix}-pagination-suffix`}>
            {renderSuffix({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })}
          </div>
        ) : null}
      </div>
    )
  }
})
