# 穿梭框 Transfer

<!--single-column-->

左、右、左、右...像我这么无聊的人能玩一整天。

## 演示

```demo
basic.vue
large-data.vue
size.vue
filterable.vue
icon.vue
```

## API

### Transfer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `true` | 是否禁用 |
| filterable | `boolean` | `false` | 是否可过滤 |
| filter | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | 一个简单的标签字符串匹配函数 | 搜索时使用的过滤函数 |
| options | `Array<TransferOption>` | `[]` | 配置选项内容，详情见 TransferOption Type |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| source-filter-placeholder | `string` | `undefined` | 源项搜索框中的占位符 |
| source-title | `string` | `'源项'` | 源项标题 |
| target-filter-placeholder | `string` | `undefined` | 目标项搜索框中的占位符 |
| target-title | `string` | `'目标项'` | 目标项标题 |
| value | `Array<string \| number> \| null` | `undefined` | 受控模式下的值 |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | 值发生改变时的回调 |
| virtual-scroll | `boolean` | `false` | 是否启用虚拟滚动 |

#### TransferOption Type

| 属性     | 类型               | 说明                     |
| -------- | ------------------ | ------------------------ |
| label    | `string`           | 选项中用以页面显示的名称 |
| value    | `string \| number` | 所有选项中唯一的 `value` |
| disabled | `boolean`          | 是否禁用这个选项         |

### TransferOption Slots

| 名称         | 参数 | 说明           | 版本         |
| ------------ | ---- | -------------- | ------------ |
| back-icon    | `()` | 左箭头图标插槽 | NEXT_VERSION |
| forward-icon | `()` | 右箭头图标插槽 | NEXT_VERSION |
