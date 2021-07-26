import { InjectionKey, Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { TransferTheme } from '../styles'

export type OptionValue = string | number
export interface Option {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface CheckedStatus {
  checked: boolean
  indeterminate: boolean
  disabled?: boolean
}

export type Filter = (
  pattern: string,
  option: Option,
  from: 'source' | 'target'
) => boolean

export interface TransferInjection {
  mergedClsPrefixRef: Ref<string>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  disabledRef: Ref<boolean | undefined>
  mergedThemeRef: Ref<MergedTheme<TransferTheme>>
  srcCheckedValuesRef: Ref<OptionValue[]>
  tgtCheckedValuesRef: Ref<OptionValue[]>
  srcOptsRef: Ref<Option[]>
  tgtOptsRef: Ref<Option[]>
  srcCheckedStatusRef: Ref<CheckedStatus>
  tgtCheckedStatusRef: Ref<CheckedStatus>
  handleSrcCheckboxClick: (checked: boolean, value: OptionValue) => void
  handleTgtCheckboxClick: (checked: boolean, value: OptionValue) => void
}

export const transferInjectionKey: InjectionKey<TransferInjection> =
  Symbol('transfer')

export type OnUpdateValue = (value: OptionValue[]) => void
