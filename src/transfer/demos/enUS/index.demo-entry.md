# Transfer

<!--single-column-->

Left, right, right, left... I'm a simple man, and I can play this all day.

## Demos

```demo
basic.vue
large-data.vue
size.vue
filterable.vue
icon.vue
```

## API

### Transfer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value. |
| disabled | `boolean` | `true` | Disabled state. |
| filterable | `boolean` | `false` | Filterable state. |
| filter | `function` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. |
| options | `Array<TransferOption>` | `[]` | For configuration options, see the TransferOption Type below. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| source-filter-placeholder | `string` | `undefined` | Placeholder for the source items search box. |
| source-title | `string` | `'Source'` | Source items title. |
| target-filter-placeholder | `string` | `undefined` | Placeholder for the target items search box. |
| target-title | `string` | `'Target'` | Target items title. |
| value | `Array<string \| number> \| null` | `undefined` | Value when being set manually. |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. |
| virtual-scroll | `boolean` | `false` | Enable virtual scrolling. |

#### TransferOption Type

| Property | Type               | Description                    |
| -------- | ------------------ | ------------------------------ |
| label    | `string`           | The option's label to display. |
| value    | `string \| number` | The option's unique value.     |
| disabled | `boolean`          | The option's disabled state.   |

### TransferOption Slots

| Name         | Parameters | Description           | Version      |
| ------------ | ---------- | --------------------- | ------------ |
| back-icon    | `()`       | icon of arrow back    | NEXT_VERSION |
| forward-icon | `()`       | icon of arrow forward | NEXT_VERSION |
