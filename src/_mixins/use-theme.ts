/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  inject,
  computed,
  onBeforeMount,
  ComputedRef,
  Ref,
  PropType
} from 'vue'
import { merge } from 'lodash-es'
import { CNode } from 'css-render'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import globalStyle from '../_styles/global/index.cssr'
import { configProviderInjectionKey } from '../config-provider/src/context'
import type { GlobalTheme } from '../config-provider'
import type { ThemeCommonVars } from '../_styles/common'
import { cssrAnchorMetaName } from './common'
import { RtlItem } from '../config-provider/src/internal-interface'

export interface Theme<N, T = {}, R = any> {
  name: N
  common?: ThemeCommonVars
  peers?: R
  self?: (vars: ThemeCommonVars) => T
}

export interface ThemeProps<T> {
  theme: PropType<T>
  themeOverrides: PropType<ExtractThemeOverrides<T>>
  builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>
}

export interface ThemePropsReactive<T> {
  theme?: T
  themeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}

export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown>
  ? unknown extends U // self is undefined, ThemeVars is unknown
    ? {}
    : U
  : {}

export type ExtractPeerOverrides<T> = T extends Theme<unknown, unknown, infer V>
  ? {
      peers?: {
        [k in keyof V]?: ExtractThemeOverrides<V[k]>
      }
    }
  : T

// V is peers theme
export type ExtractMergedPeerOverrides<T> = T extends Theme<
unknown,
unknown,
infer V
>
  ? {
      [k in keyof V]?: ExtractPeerOverrides<V[k]>
    }
  : T

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> &
ExtractPeerOverrides<T> & { common?: ThemeCommonVars }

export function createTheme<N extends string, T, R> (
  theme: Theme<N, T, R>
): Theme<N, T, R> {
  return theme
}

type UseThemeProps<T> = Readonly<{
  theme?: T | undefined
  themeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}>

export type MergedTheme<T> = T extends Theme<unknown, infer V, infer W>
  ? {
      common: ThemeCommonVars
      self: V
      peers: W
      peerOverrides: ExtractMergedPeerOverrides<T>
    }
  : T

function useTheme<N, T, R> (
  resolveId: Exclude<keyof GlobalTheme, 'common' | 'name'>,
  mountId: string,
  style: CNode | undefined,
  defaultTheme: Theme<N, T, R>,
  props: UseThemeProps<Theme<N, T, R>>,
  clsPrefixRef?: Ref<string | undefined>,
  rtlEnabledRef?: Ref<RtlItem | undefined>
): ComputedRef<MergedTheme<Theme<N, T, R>>> {
  const ssrAdapter = useSsrAdapter()
  const NConfigProvider = inject(configProviderInjectionKey, null)
  if (style) {
    const mountStyle = (): void => {
      const clsPrefix = clsPrefixRef?.value
      style.mount({
        id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
        },
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter
      })
      if (!NConfigProvider?.preflightStyleDisabled) {
        globalStyle.mount({
          id: 'n-global',
          head: true,
          anchorMetaName: cssrAnchorMetaName,
          ssr: ssrAdapter
        })
      }
    }
    if (ssrAdapter) {
      mountStyle()
    } else {
      onBeforeMount(mountStyle)
    }
  }
  const mergedThemeRef = computed(() => {
    // keep props to make theme overrideable
    const {
      theme: { common: selfCommon, self, peers = {} } = {},
      themeOverrides: selfOverrides = {} as ExtractThemeOverrides<
      Theme<N, T, R>
      >,
      builtinThemeOverrides: builtinOverrides = {} as ExtractThemeOverrides<
      Theme<N, T, R>
      >
    } = props
    const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides
    const {
      common: globalCommon = undefined,
      [resolveId]: {
        common: globalSelfCommon = undefined,
        self: globalSelf = undefined,
        peers: globalPeers = {}
      } = {}
    } = NConfigProvider?.mergedThemeRef.value || {}
    const {
      common: globalCommonOverrides = undefined,
      [resolveId]: globalSelfOverrides = {}
    } = NConfigProvider?.mergedThemeOverridesRef.value || {}
    const {
      common: globalSelfCommonOverrides,
      peers: globalPeersOverrides = {}
    } = globalSelfOverrides
    const mergedCommon = merge(
      {},
      selfCommon || globalSelfCommon || globalCommon || defaultTheme.common,
      globalCommonOverrides,
      globalSelfCommonOverrides,
      selfCommonOverrides
    )
    const mergedSelf = merge(
      // {}, executed every time, no need for empty obj
      (self || globalSelf || defaultTheme.self)?.(mergedCommon) as T,
      builtinOverrides,
      globalSelfOverrides,
      selfOverrides
    )
    if (rtlEnabledRef?.value?.name) {
      Object.entries(mergedSelf).forEach(([key, val]) => {
        if (
          typeof val === 'string' &&
          key.search(/(margin|Margin|padding|Padding)/) > -1
        ) {
          const i = (val as string).split(' ')
          if (i.length === 4) {
            // @ts-expect-error
            mergedSelf[key] = [i[0], i[3], i[2], i[1]].join(' ')
          }
        }
      })
    }
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge(
        {},
        builtinOverrides.peers,
        globalPeersOverrides,
        peersOverrides
      )
    }
  })
  return mergedThemeRef
}

useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
} as const

/**
 * props.theme (Theme):
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 * provider.theme:
 * {
 *   common: CommonThemeVars,
 *   Button: Theme
 *   ...
 * }
 * defaultTheme:
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 *
 * props.themeOverrides (ThemeOverrides):
 * {
 *   common: CommonThemeVars,
 *   peers: { Component: ThemeOverrides },
 *   ...ThemeVars
 * }
 * provider.themeOverrides:
 * {
 *   common: CommonThemeVars,
 *   Component: ThemeOverrides
 *   ...
 * }
 *
 * mergedTheme:
 * {
 *   common: CommonThemeVars,
 *   self: ThemeVars,
 *   peers: { Component: Theme },
 *   overrides: { Component: ThemeOverrides }
 * }
 */
export default useTheme
