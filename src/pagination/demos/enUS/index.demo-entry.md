# Pagination

<!--single-column-->

Long data's friend.

## Demos

```demo
basic.vue
slot.vue
quick-jumper.vue
size.vue
size-picker.vue
disabled.vue
item-count.vue
prev.vue
prefix.vue
page-size-option.vue
```

## API

### Pagination Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-page | `number` | `1` | Current page in uncontrolled mode. |  |
| default-page-size | `number` | `10` | Page size in uncontrolled mode. |  |
| disabled | `boolean` | `false` | Whether to disable the pagination. |  |
| next | `(info: PaginationInfo) => VNodeChild` | `undefined` | Next page. |  |
| prev | `(info: PaginationInfo) => VNodeChild` | `undefined` | Previous page. |  |
| item-count | `number` | `undefined` | Total number. |  |
| label | `PaginationRenderLabel` | `undefined` | Item content. | 2.24.0 |
| page-count | `number` | `1` | Total pages. |  |
| page-sizes | `Array<number \| PaginationSizeOption>` | `[10]` | Number of items per page, can be customize. |  |
| page-size | `number` | `undefined` | Page size in controlled mode. |  |
| page-slot | `number` | `9` | The number of pages displayed. |  |
| page | `number` | `undefined` | Current page in controlled mode. |  |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Paging prefix. |  |
| show-quick-jumper | `boolean` | `false` | Whether to show fast jump. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | size of page item. | 2.29.0 |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Page suffix. |  |
| show-size-picker | `boolean` | `false` | Whether to show the selector of the number of items per page. |  |
| trigger-quick-jump-on- | `Array<'change'\|'blur'>` | `['change']` | Whether to jump to the page when the input is blurred. | NEXT_VERSION |
| on-update:page | `(page: number) => void` | `undefined` | Callback function when the current page changes. |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function when the current page size changes. |  |

#### PaginationRenderLabel Type

```ts
type PaginationRenderLabel = (
  info:
    | {
        type: 'fast-backward' | 'fast-forward'
        node: VNode
        active: boolean
      }
    | {
        type: 'page'
        node: number
        active: boolean
      }
) => VNodeChild
```

#### PaginationInfo Type

```ts
interface PaginationInfo {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}
```

### Pagination Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| goto | `()` | Fast jump text before quick jumper. | 2.27.0 |
| label | The same as `PaginationRenderLabel`'s parameters | Item content. | 2.24.0 |
| next | `(info: PaginationInfo)` | Next page. |  |
| prev | `(info: PaginationInfo)` | Previous page. |  |
| prefix | `(info: PaginationInfo)` | Page prefix. |  |
| suffix | `(info: PaginationInfo)` | Page suffix. |  |
