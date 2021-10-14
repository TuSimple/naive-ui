/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  ref,
  defineComponent,
  inject,
  VNode,
  watchEffect,
  onUnmounted,
  PropType,
  CSSProperties
} from 'vue'
import { pxfy, repeat } from 'seemly'
import { VirtualList, VirtualListInst } from 'vueuc'
import { c } from '../../../_utils/cssr'
import { NScrollbar, ScrollbarInst } from '../../../_internal'
import { formatLength } from '../../../_utils'
import {
  dataTableInjectionKey,
  RowKey,
  SummaryRowData,
  MainTableBodyRef,
  TmNode,
  ExpandedRow,
  BeforeExpandedRow
} from '../interface'
import { createRowClassName, getColKey, isColumnSorting } from '../utils'
import Cell from './Cell'
import ExpandTrigger from './ExpandTrigger'
import RenderSafeCheckbox from './BodyCheckbox'
import TableHeader from './Header'
import type { ColItem } from '../use-group-header'

type RowRenderInfo =
  | {
    summary: true
    rawNode: SummaryRowData
    key: RowKey
    disabled: boolean
  }
  | TmNode
  | ExpandedRow
  | BeforeExpandedRow

function flatten (rows: TmNode[], expandedRowKeys: RowKey[]): TmNode[] {
  const fRows: TmNode[] = []
  function traverse (rs: TmNode[]): void {
    rs.forEach((r) => {
      if (r.children && expandedRowKeys.includes(r.key)) {
        fRows.push(r)
        traverse(r.children)
      } else {
        fRows.push(r)
      }
    })
  }
  traverse(rows)
  return fRows
}

const VirtualListItemWrapper = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    cols: {
      type: Array as PropType<ColItem[]>,
      required: true
    },
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix, id, cols, onMouseenter, onMouseleave } = this
    return (
      <table
        style={{ tableLayout: 'fixed' }}
        class={`${clsPrefix}-data-table-table`}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
      >
        <colgroup>
          {cols.map((col) => (
            <col key={col.key} style={col.style}></col>
          ))}
        </colgroup>
        <tbody data-n-id={id} class={`${clsPrefix}-data-table-tbody`}>
          {this.$slots}
        </tbody>
      </table>
    )
  }
})

export default defineComponent({
  name: 'DataTableBody',
  props: {
    onResize: Function as PropType<(e: ResizeObserverEntry) => void>,
    showHeader: Boolean,
    flexHeight: Boolean
  },
  setup (props) {
    const {
      mergedExpandedRowKeysRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      scrollXRef,
      colsRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      rowClassNameRef,
      leftActiveFixedColKeyRef,
      rightActiveFixedColKeyRef,
      renderExpandRef,
      hoverKeyRef,
      summaryRef,
      mergedSortStateRef,
      virtualScrollRef,
      componentId,
      scrollPartRef,
      mergedTableLayoutRef,
      hasChildrenRef,
      firstContentfulColIndexRef,
      indentRef,
      rowPropsRef,
      maxHeightRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doCheck,
      doUncheck
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListRef = ref<VirtualListInst | null>(null)
    let lastSelectedKey: string | number = ''
    function handleCheckboxUpdateChecked (
      tmNode: { key: RowKey },
      checked: boolean,
      shiftKey: boolean
    ): void {
      if (shiftKey) {
        const lastIndex = paginatedDataRef.value.findIndex(
          (item) => item.key === lastSelectedKey
        )
        if (lastIndex !== -1) {
          const currentIndex = paginatedDataRef.value.findIndex(
            (item) => item.key === tmNode.key
          )
          const start = Math.min(lastIndex, currentIndex)
          const end = Math.max(lastIndex, currentIndex)
          const rowKeysToCheck: RowKey[] = []
          paginatedDataRef.value.slice(start, end + 1).forEach((r) => {
            if (!r.disabled) {
              rowKeysToCheck.push(r.key)
            }
          })
          if (checked) {
            doCheck(rowKeysToCheck)
          } else {
            doUncheck(rowKeysToCheck)
          }
          lastSelectedKey = tmNode.key
          return
        }
      }

      if (checked) {
        doCheck(tmNode.key)
      } else {
        doUncheck(tmNode.key)
      }
      lastSelectedKey = tmNode.key
    }
    function getScrollContainer (): HTMLElement | null {
      if (virtualScrollRef.value) {
        return virtualListContainer()
      }
      const { value } = scrollbarInstRef
      if (value) return value.containerRef
      return null
    }
    function handleUpdateExpanded (key: RowKey): void {
      const { value: mergedExpandedRowKeys } = mergedExpandedRowKeysRef
      const index = mergedExpandedRowKeys.indexOf(key)
      const nextExpandedKeys = Array.from(mergedExpandedRowKeys)
      if (~index) {
        nextExpandedKeys.splice(index, 1)
      } else {
        nextExpandedKeys.push(key)
      }
      doUpdateExpandedRowKeys(nextExpandedKeys)
    }
    function handleMouseleaveTable (): void {
      hoverKeyRef.value = null
    }
    function handleMouseenterTable (): void {
      scrollPartRef.value = 'body'
    }
    function virtualListContainer (): HTMLElement {
      const { value } = virtualListRef
      return value?.listElRef as HTMLElement
    }
    function virtualListContent (): HTMLElement {
      const { value } = virtualListRef
      return value?.itemsElRef as HTMLElement
    }
    function handleVirtualListScroll (e: Event): void {
      handleTableBodyScroll(e)
      scrollbarInstRef.value?.sync()
    }
    function handleVirtualListResize (e: ResizeObserverEntry): void {
      const { onResize } = props
      if (onResize) onResize(e)
      scrollbarInstRef.value?.sync()
    }
    const exposedMethods: MainTableBodyRef = {
      getScrollContainer
    }
    // manually control shadow style to avoid rerender
    const style = c([
      ({ props: cProps }: { props: Record<string, string> }) =>
        c([
          cProps.leftActiveFixedColKey === null
            ? null
            : c(
                `[data-n-id="${cProps.componentId}"] [data-col-key="${cProps.leftActiveFixedColKey}"]::after`,
                {
                  boxShadow: 'var(--box-shadow-after)'
                }
            ),
          cProps.rightActiveFixedColKey === null
            ? null
            : c(
                `[data-n-id="${cProps.componentId}"] [data-col-key="${cProps.rightActiveFixedColKey}"]::before`,
                {
                  boxShadow: 'var(--box-shadow-before)'
                }
            )
        ])
    ])
    let fixedStyleMounted = false
    watchEffect(() => {
      const { value: leftActiveFixedColKey } = leftActiveFixedColKeyRef
      const { value: rightActiveFixedColKey } = rightActiveFixedColKeyRef
      if (
        !fixedStyleMounted &&
        leftActiveFixedColKey === null &&
        rightActiveFixedColKey === null
      ) {
        return
      }
      style.mount({
        id: `n-${componentId}`,
        force: true,
        props: {
          leftActiveFixedColKey,
          rightActiveFixedColKey,
          componentId
        }
      })
      fixedStyleMounted = true
    })
    onUnmounted(() => {
      style.unmount({
        id: `n-${componentId}`
      })
    })
    return {
      componentId,
      scrollbarInstRef,
      virtualListRef,
      summary: summaryRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollX: scrollXRef,
      cols: colsRef,
      paginatedData: paginatedDataRef,
      rawPaginatedData: rawPaginatedDataRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeys: mergedExpandedRowKeysRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
      mergedTableLayout: mergedTableLayoutRef,
      hasChildren: hasChildrenRef,
      firstContentfulColIndex: firstContentfulColIndexRef,
      indent: indentRef,
      rowProps: rowPropsRef,
      maxHeight: maxHeightRef,
      setHeaderScrollLeft,
      handleMouseenterTable,
      handleVirtualListScroll,
      handleVirtualListResize,
      handleMouseleaveTable,
      virtualListContainer,
      virtualListContent,
      handleTableBodyScroll,
      handleCheckboxUpdateChecked,
      handleUpdateExpanded,
      ...exposedMethods
    }
  },
  render () {
    const {
      mergedTheme,
      scrollX,
      mergedClsPrefix,
      virtualScroll,
      maxHeight,
      mergedTableLayout,
      flexHeight,
      onResize,
      setHeaderScrollLeft
    } = this
    const scrollable =
      scrollX !== undefined || maxHeight !== undefined || flexHeight

    // For a basic table with auto layout whose content may overflow we will
    // make it scrollable, which differs from browser's native behavior.
    // For native behavior, see
    // https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
    const isBasicAutoLayout = !scrollable && mergedTableLayout === 'auto'
    const xScrollable = scrollX !== undefined || isBasicAutoLayout

    const contentStyle: CSSProperties = {
      minWidth: formatLength(scrollX) || '100%'
    }
    if (scrollX) contentStyle.width = '100%'
    return (
      <NScrollbar
        ref="scrollbarInstRef"
        scrollable={scrollable || isBasicAutoLayout}
        class={`${mergedClsPrefix}-data-table-base-table-body`}
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        contentStyle={contentStyle}
        container={virtualScroll ? this.virtualListContainer : undefined}
        content={virtualScroll ? this.virtualListContent : undefined}
        horizontalRailStyle={{ zIndex: 3 }}
        verticalRailStyle={{ zIndex: 3 }}
        xScrollable={xScrollable}
        onScroll={virtualScroll ? undefined : this.handleTableBodyScroll}
        internalOnUpdateScrollLeft={setHeaderScrollLeft}
        onResize={onResize}
      >
        {{
          default: () => {
            // 用于记录合并行时需要忽略的行内单元格
            const cordToPass: Record<number, number[]> = {}
            // coordinate to related hover keys
            const cordKey: Record<number, Record<number, RowKey[]>> = {}
            const {
              cols,
              paginatedData,
              mergedTheme,
              fixedColumnLeftMap,
              fixedColumnRightMap,
              currentPage,
              rowClassName,
              mergedSortState,
              mergedExpandedRowKeys,
              componentId,
              showHeader,
              hasChildren,
              firstContentfulColIndex,
              rowProps,
              handleMouseenterTable,
              handleMouseleaveTable,
              renderExpand,
              summary,
              handleCheckboxUpdateChecked,
              handleUpdateExpanded
            } = this
            const { length: colCount } = cols
            const rowIndexToKey: Record<number, RowKey> = {}
            paginatedData.forEach((tmNode, rowIndex) => {
              rowIndexToKey[rowIndex] = tmNode.key
            })

            let mergedData: RowRenderInfo[]

            // if there is children in data, we should expand mergedData first

            const mergedPaginationData = hasChildren
              ? flatten(paginatedData, mergedExpandedRowKeys)
              : paginatedData

            // 表格总结栏处理 ----------------------------------------- start ---->
            if (summary) {
              const summaryRows = summary(this.rawPaginatedData)
              if (Array.isArray(summaryRows)) {
                mergedData = [
                  ...mergedPaginationData,
                  ...summaryRows.map((row, i) => ({
                    summary: true as const,
                    rawNode: row,
                    key: `__n_summary__${i}`,
                    disabled: true
                  }))
                ]
              } else {
                mergedData = [
                  ...mergedPaginationData,
                  {
                    summary: true,
                    rawNode: summaryRows,
                    key: '__n_summary__',
                    disabled: true
                  }
                ]
              }
            } else {
              mergedData = mergedPaginationData
            }
            // 表格总结栏处理 ----------------------------------------- end ---->

            // 缩进样式 ----------------------------------------- start ---->
            const indentStyle = hasChildren
              ? { width: pxfy(this.indent) }
              : undefined
            // 缩进样式 ----------------------------------------- end ---->

            const { length: rowCount } = mergedData

            const renderRow = (
              rowInfo: RowRenderInfo,
              rowIndex: number,
              isVirtual: boolean
            ): VNode => {
              const isExpandedRow = 'isExpandedRow' in rowInfo
              const { rawNode: rowData, key: rowKey } = rowInfo
              // 如果此行是展开行，直接返回展开行的结构
              if (isExpandedRow) {
                return (
                  <tr
                    class={`${mergedClsPrefix}-data-table-tr`}
                    key={`${rowKey}__expand`}
                  >
                    <td
                      class={[
                        `${mergedClsPrefix}-data-table-td`,
                        `${mergedClsPrefix}-data-table-td--last-col`,
                        rowIndex + 1 === rowCount &&
                          `${mergedClsPrefix}-data-table-td--last-row`
                      ]}
                      colspan={colCount}
                    >
                      {renderExpand!(rowData, rowIndex)}
                    </td>
                  </tr>
                )
              }
              const isSummary = 'summary' in rowInfo
              const expanded = 'expanded' in rowInfo
              const isBeforeExpandedRow = 'isBeforeExpandedRow' in rowInfo
              const props = rowProps ? rowProps(rowData, rowIndex) : undefined
              const mergedRowClassName =
                typeof rowClassName === 'string'
                  ? rowClassName
                  : createRowClassName(rowData, rowIndex, rowClassName)
              const row = (
                <tr
                  onMouseenter={() => {
                    this.hoverKey = rowKey
                  }}
                  key={rowKey}
                  class={[
                    `${mergedClsPrefix}-data-table-tr`,
                    mergedRowClassName
                  ]}
                  {...props}
                >
                  {cols.map((col, colIndex) => {
                    // 检查当前单元格是否因为合并单元格而需要跳过
                    if (!isVirtual && rowIndex in cordToPass) {
                      const cordOfRowToPass = cordToPass[rowIndex]
                      const indexInCordOfRowToPass =
                        cordOfRowToPass.indexOf(colIndex)
                      if (~indexInCordOfRowToPass) {
                        cordOfRowToPass.splice(indexInCordOfRowToPass, 1)
                        return null
                      }
                    }

                    // 这里是 跨列、跨行 操作，优化后的虚拟滚动支持跨列，不支持跨行
                    const { column } = col
                    const colKey = getColKey(col)
                    // If there is no rowSpan
                    // virtual list should have a fast path
                    const { rowSpan, colSpan } = column
                    // 计算当前单元格的跨列
                    const mergedColSpan = isSummary
                      ? rowInfo.rawNode[colKey]?.colSpan || 1 // optional for #1276
                      : colSpan
                        ? colSpan(rowData, rowIndex)
                        : 1
                    // 计算当前单元格的跨行
                    const mergedRowSpan = isSummary
                      ? rowInfo.rawNode[colKey]?.rowSpan || 1 // optional for #1276
                      : rowSpan
                        ? rowSpan(rowData, rowIndex)
                        : 1
                    // 是否为最后一个单元格
                    const isLastCol = colIndex + mergedColSpan === colCount
                    // 是否为最后一行
                    const isLastRow = rowIndex + mergedRowSpan === rowCount
                    const isCrossRowTd = mergedRowSpan > 1
                    if (isCrossRowTd) {
                      cordKey[rowIndex] = {
                        [colIndex]: []
                      }
                    }
                    if (mergedColSpan > 1 || isCrossRowTd) {
                      for (
                        let i = rowIndex;
                        i < rowIndex + mergedRowSpan;
                        ++i
                      ) {
                        if (isCrossRowTd) {
                          cordKey[rowIndex][colIndex].push(rowIndexToKey[i])
                        }
                        for (
                          let j = colIndex;
                          j < colIndex + mergedColSpan;
                          ++j
                        ) {
                          if (i === rowIndex && j === colIndex) continue
                          if (!(i in cordToPass)) {
                            cordToPass[i] = [j]
                          } else {
                            cordToPass[i].push(j)
                          }
                        }
                      }
                    }
                    const hoverKey = isCrossRowTd ? this.hoverKey : null
                    const { ellipsis } = column
                    return (
                      <td
                        key={colKey}
                        style={{
                          textAlign: column.align || undefined,
                          left: pxfy(fixedColumnLeftMap[colKey]?.start),
                          right: pxfy(fixedColumnRightMap[colKey]?.start)
                        }}
                        colspan={mergedColSpan}
                        rowspan={isVirtual ? undefined : mergedRowSpan}
                        data-col-key={colKey}
                        class={[
                          `${mergedClsPrefix}-data-table-td`,
                          column.className,
                          isSummary &&
                            `${mergedClsPrefix}-data-table-td--summary`,
                          ((hoverKey !== null &&
                            cordKey[rowIndex][colIndex].includes(hoverKey)) ||
                            isColumnSorting(column, mergedSortState)) &&
                            `${mergedClsPrefix}-data-table-td--hover`,
                          column.fixed &&
                            `${mergedClsPrefix}-data-table-td--fixed-${column.fixed}`,
                          column.align &&
                            `${mergedClsPrefix}-data-table-td--${column.align}-align`,
                          {
                            [`${mergedClsPrefix}-data-table-td--ellipsis`]:
                              ellipsis === true ||
                              // don't add ellipsis class if tooltip exists
                              (ellipsis && !ellipsis.tooltip),
                            [`${mergedClsPrefix}-data-table-td--selection`]:
                              column.type === 'selection',
                            [`${mergedClsPrefix}-data-table-td--expand`]:
                              column.type === 'expand',
                            [`${mergedClsPrefix}-data-table-td--last-col`]:
                              isLastCol,
                            [`${mergedClsPrefix}-data-table-td--last-row`]:
                              isLastRow && !isBeforeExpandedRow
                          }
                        ]}
                      >
                        {hasChildren && colIndex === firstContentfulColIndex
                          ? [
                              repeat(
                                isSummary ? 0 : rowInfo.level,
                                <div
                                  class={`${mergedClsPrefix}-data-table-indent`}
                                  style={indentStyle}
                                />
                              ),
                              isSummary || !rowInfo.children ? (
                                <div
                                  class={`${mergedClsPrefix}-data-table-expand-placeholder`}
                                />
                              ) : (
                                <ExpandTrigger
                                  class={`${mergedClsPrefix}-data-table-expand-trigger`}
                                  clsPrefix={mergedClsPrefix}
                                  expanded={expanded}
                                  onClick={() => {
                                    handleUpdateExpanded(rowKey)
                                  }}
                                />
                              )
                            ]
                          : null}
                        {column.type === 'selection' ? (
                          !isSummary ? (
                            <RenderSafeCheckbox
                              key={currentPage}
                              rowKey={rowKey}
                              disabled={rowInfo.disabled}
                              onUpdateChecked={(checked: boolean, e) =>
                                handleCheckboxUpdateChecked(
                                  rowInfo,
                                  checked,
                                  e.shiftKey
                                )
                              }
                            />
                          ) : null
                        ) : column.type === 'expand' ? (
                          !isSummary ? (
                            !column.expandable ||
                            column.expandable?.(rowData, rowIndex) ? (
                              <ExpandTrigger
                                clsPrefix={mergedClsPrefix}
                                expanded={expanded}
                                onClick={() => handleUpdateExpanded(rowKey)}
                              />
                                ) : null
                          ) : null
                        ) : (
                          <Cell
                            index={rowIndex}
                            row={rowData}
                            column={column}
                            isSummary={isSummary}
                            mergedTheme={mergedTheme}
                          />
                        )}
                      </td>
                    )
                  })}
                </tr>
              )

              return row
            }

            // 展开行数据化 ----------------------------------------- start ---->
            const newMergedData: RowRenderInfo[] = []
            mergedData.forEach((rowInfo, index) => {
              const expanded = mergedExpandedRowKeys.includes(rowInfo.key)
              if (renderExpand && expanded) {
                // 单独赋值的都是不可枚举的参数
                newMergedData.push(
                  {
                    ...rowInfo,
                    isBeforeExpandedRow: true,
                    expanded: expanded,
                    disabled: rowInfo.disabled,
                    key: rowInfo.key
                  },
                  {
                    ...rowInfo,
                    isExpandedRow: true,
                    disabled: rowInfo.disabled,
                    key: rowInfo.key
                  }
                )
              } else {
                newMergedData.push(rowInfo)
              }
            })
            // 展开行数据化 ----------------------------------------- end ---->
            if (!virtualScroll) {
              const rows = newMergedData.map((rowInfo, rowIndex) => {
                return renderRow(rowInfo, rowIndex, false)
              })
              return (
                <table
                  class={`${mergedClsPrefix}-data-table-table`}
                  onMouseleave={handleMouseleaveTable}
                  onMouseenter={handleMouseenterTable}
                  style={{
                    tableLayout: this.mergedTableLayout
                  }}
                >
                  <colgroup>
                    {cols.map((col) => (
                      <col key={col.key} style={col.style}></col>
                    ))}
                  </colgroup>
                  {showHeader ? <TableHeader discrete={false} /> : null}
                  <tbody
                    data-n-id={componentId}
                    class={`${mergedClsPrefix}-data-table-tbody`}
                  >
                    {rows}
                  </tbody>
                </table>
              )
            } else {
              // Please note that the current virtual scroll mode impl
              // not very performant, since it supports all the feature of table.
              // If we can bailout some path it will be much faster. Since it
              // need to generate all vnodes before using the virtual list.
              return (
                <VirtualList
                  ref="virtualListRef"
                  items={newMergedData}
                  itemSize={28}
                  visibleItemsTag={VirtualListItemWrapper}
                  visibleItemsProps={{
                    clsPrefix: mergedClsPrefix,
                    id: componentId,
                    cols,
                    onMouseenter: handleMouseenterTable,
                    onMouseleave: handleMouseleaveTable
                  }}
                  showScrollbar={false}
                  onResize={this.handleVirtualListResize}
                  onScroll={this.handleVirtualListScroll}
                  itemsStyle={contentStyle}
                  itemResizable
                >
                  {{
                    default: ({
                      item,
                      index
                    }: {
                      item: RowRenderInfo
                      index: number
                    }) => renderRow(item, index, true)
                  }}
                </VirtualList>
              )
            }
          }
        }}
      </NScrollbar>
    )
  }
})
