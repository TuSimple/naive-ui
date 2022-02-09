import { computed, ComputedRef, ref } from 'vue'
import type { DataTableSetupProps } from './DataTable'
import type {
  RowKey,
  TableSelectionColumn,
  InternalRowData,
  TmNode
} from './interface'
import { call } from '../../_utils'
import { TreeMate } from 'treemate'
import { getCheckedKeysRows } from './utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheck (
  props: DataTableSetupProps,
  data: {
    selectionColumnRef: ComputedRef<TableSelectionColumn | null>
    paginatedDataRef: ComputedRef<TmNode[]>
    treeMateRef: ComputedRef<TreeMate<InternalRowData>>
  }
) {
  const { paginatedDataRef, treeMateRef, selectionColumnRef } = data
  const uncontrolledCheckedRowKeysRef = ref(props.defaultCheckedRowKeys)
  const mergedCheckState = computed(() => {
    const { checkedRowKeys } = props
    return treeMateRef.value.getCheckedKeys(
      checkedRowKeys === undefined
        ? uncontrolledCheckedRowKeysRef.value
        : checkedRowKeys,
      {
        cascade: props.cascade
      }
    )
  })

  const mergedCheckedRowKeysRef = computed(
    () => mergedCheckState.value.checkedKeys
  )
  const mergedInderminateRowKeysRef = computed(
    () => mergedCheckState.value.indeterminateKeys
  )
  const mergedCheckedRowKeySetRef = computed(() => {
    return new Set(mergedCheckedRowKeysRef.value)
  })
  const mergedInderminateRowKeySetRef = computed(() => {
    return new Set(mergedInderminateRowKeysRef.value)
  })
  const countOfCurrentPageCheckedRowsRef = computed(() => {
    const { value: mergedCheckedRowKeySet } = mergedCheckedRowKeySetRef
    return paginatedDataRef.value.reduce((total, tmNode) => {
      const { key, disabled } = tmNode
      return total + (!disabled && mergedCheckedRowKeySet.has(key) ? 1 : 0)
    }, 0)
  })
  const countOfCurrentPageDisabledRowsRef = computed(() => {
    return paginatedDataRef.value.filter((item) => item.disabled).length
  })
  const someRowsCheckedRef = computed(() => {
    const { length } = paginatedDataRef.value
    const { value: mergedInderminateRowKeySet } = mergedInderminateRowKeySetRef
    return (
      (countOfCurrentPageCheckedRowsRef.value > 0 &&
        countOfCurrentPageCheckedRowsRef.value <
          length - countOfCurrentPageDisabledRowsRef.value) ||
      paginatedDataRef.value.some((rowData) =>
        mergedInderminateRowKeySet.has(rowData.key)
      )
    )
  })
  const allRowsCheckedRef = computed(() => {
    const { length } = paginatedDataRef.value
    return (
      countOfCurrentPageCheckedRowsRef.value !== 0 &&
      countOfCurrentPageCheckedRowsRef.value ===
        length - countOfCurrentPageDisabledRowsRef.value
    )
  })
  const headerCheckboxDisabledRef = computed(() => {
    return paginatedDataRef.value.length === 0
  })
  function doUpdateCheckedRowKeys (
    keys: RowKey[],
    rowData: InternalRowData[]
  ): void {
    const {
      'onUpdate:checkedRowKeys': _onUpdateCheckedRowKeys,
      onUpdateCheckedRowKeys,
      onCheckedRowKeysChange
    } = props
    if (_onUpdateCheckedRowKeys) call(_onUpdateCheckedRowKeys, keys, rowData)
    if (onUpdateCheckedRowKeys) call(onUpdateCheckedRowKeys, keys, rowData)
    if (onCheckedRowKeysChange) call(onCheckedRowKeysChange, keys, rowData)
    uncontrolledCheckedRowKeysRef.value = keys
  }
  function doCheck (rowKey: RowKey | RowKey[]): void {
    if (props.loading) return
    const checkedKeys = treeMateRef.value.check(
      rowKey,
      mergedCheckedRowKeysRef.value,
      {
        cascade: props.cascade
      }
    ).checkedKeys
    const rowData = getCheckedKeysRows(checkedKeys, treeMateRef.value)
    doUpdateCheckedRowKeys(checkedKeys, rowData)
  }
  function doUncheck (rowKey: RowKey | RowKey[]): void {
    if (props.loading) return
    const checkedKeys = treeMateRef.value.uncheck(
      rowKey,
      mergedCheckedRowKeysRef.value,
      {
        cascade: props.cascade
      }
    ).checkedKeys
    const rowData = getCheckedKeysRows(checkedKeys, treeMateRef.value)
    doUpdateCheckedRowKeys(checkedKeys, rowData)
  }
  function doCheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column || props.loading) return
    const rowKeysToCheck: RowKey[] = []
    const rowData: InternalRowData[] = []
    ;(checkWholeTable
      ? treeMateRef.value.treeNodes
      : paginatedDataRef.value
    ).forEach((tmNode) => {
      if (!tmNode.disabled) {
        rowKeysToCheck.push(tmNode.key)
        rowData.push(tmNode.rawNode)
      }
    })
    // alway cascade, to emit correct row keys
    doUpdateCheckedRowKeys(
      treeMateRef.value.check(rowKeysToCheck, mergedCheckedRowKeysRef.value, {
        cascade: true
      }).checkedKeys,
      rowData
    )
  }
  function doUncheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column || props.loading) return
    const rowKeysToUncheck: RowKey[] = []
    ;(checkWholeTable
      ? treeMateRef.value.treeNodes
      : paginatedDataRef.value
    ).forEach((tmNode) => {
      if (!tmNode.disabled) {
        rowKeysToUncheck.push(tmNode.key)
      }
    })
    // alway cascade, to emit correct row keys
    const checkedKeys = treeMateRef.value.uncheck(
      rowKeysToUncheck,
      mergedCheckedRowKeysRef.value,
      {
        cascade: true
      }
    ).checkedKeys
    const rowData = getCheckedKeysRows(checkedKeys, treeMateRef.value)
    doUpdateCheckedRowKeys(checkedKeys, rowData)
  }
  return {
    mergedCheckedRowKeySetRef,
    mergedCheckedRowKeysRef,
    mergedInderminateRowKeySetRef,
    someRowsCheckedRef,
    allRowsCheckedRef,
    headerCheckboxDisabledRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll,
    doCheck,
    doUncheck
  }
}
