# 菜单 Menu

没有吃的。

<!--single-column-->

## 演示

```demo
horizontal.vue
select.vue
render-label.vue
default-expanded-keys.vue
indent.vue
collapse.vue
inverted.vue
long-label.vue
accordion.vue
router-link.vue
customize-field.vue
expand-selected-option.vue
hidden.vue
```

## API

### Menu Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` | 是否使用手风琴模式 |  |
| children-field | `string` | `'children'` | children 的字段名 |  |
| collapsed-icon-size | `number` | `24` | 菜单折叠时图标的大小，如果未设定则使用 `icon-size` 代替 |  |
| collapsed-width | `number` | `48` | 折叠后菜单的宽度 |  |
| collapsed | `boolean` | `false` | 菜单是否折叠，值在菜单为垂直时有用 |  |
| default-expand-all | `boolean` | `false` | 是否展开全部菜单 |  |
| default-expanded-keys | `Array<string>` | `[]` | 在非受控状态下默认展开的子菜单标识符数组 |  |
| default-value | `string \| null` | `null` | 非受控模式下的默认值 |  |
| dropdown-placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | 仅在 `mode='horizontal'` 模式下生效 |  |
| dropdown-props | `DropdownProps` | `undefined` | 菜单折叠或 `mode='horizontal'` 模式时 Dropdown 的 props，请参考 [Dropdown Props](dropdown#Dropdown-Props) |  |
| expanded-keys | `Array<string>` | `undefined` | 展开的子菜单标识符数组，如果设定了，菜单的展开将会进入受控状态，`default-expanded-keys` 不会生效 |  |
| expand-icon | `(option: MenuOption) => VNodeChild` | `undefined` | 批量处理菜单展开图标的渲染 |  |
| icon-size | `number` | `20` | 菜单未折叠时图标的大小 |  |
| indent | `number` | `32` | 菜单每级的缩进 |  |
| inverted | `boolean` | `false` | 使用反转样式 |  |
| key-field | `string` | `'key'` | key 的字段名 |  |
| label-field | `string` | `'label'` | label 的字段名 |  |
| options | `Array<MenuOption \| MenuDividerOption \| MenuGroupOption>` | `[]` | 菜单的数据 |  |
| node-props | `(option: MenuOption \| MenuGroupOption) => object` | `undefined` | 节点的 DOM 属性生成函数 | 2.28.3 |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单的布局方式 |  |
| render-extra | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | 批量处理菜单额外部分渲染 |  |
| render-icon | `(option: MenuOption) => VNodeChild` | `undefined` | 批量处理菜单图标渲染 |  |
| render-label | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | 批量处理菜单标签渲染 |  |
| root-indent | `number` | `32` | 菜单第一级的缩进，如果没有设定，使用 `indent` 代替 |  |
| value | `string \| null` | `undefined` | 菜单当前的选中值 |  |
| watch-props | `Array<'defaultValue' \| 'defaultExpandedKeys'>` | `undefined` | 需要检测变更的默认属性，检测后组件状态会更新。注意：`watch-props` 本身不是响应式的 |  |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` 是展开菜单项的 `key` 的数组 |  |
| on-update:value | `(key: string, item: MenuOption) => void` | `undefined` | 选中菜单的回调，`key` 是选中菜单项的 `key`，`item` 是菜单项原始数据 |  |

#### MenuOption Properties

| 名称      | 类型                                   | 说明             |
| --------- | -------------------------------------- | ---------------- |
| children? | `Array<MenuOption \| MenuGroupOption>` | 子选项           |
| disabled? | `boolean`                              | 是否禁用菜单项   |
| hidden?   | `boolean`                              | 是否隐藏菜单项   |
| extra?    | `string \| (() => VNodeChild)`         | 菜单项的额外部分 |
| icon?     | `() => VNode`                          | 菜单项的图标     |
| key       | `string`                               | 菜单项的标识符   |
| label     | `string \| (() => VNodeChild)`         | 菜单项的内容     |

#### MenuGroupOption Properties

| 名称     | 类型                                   | 说明                     |
| -------- | -------------------------------------- | ------------------------ |
| children | `Array<MenuOption \| MenuGroupOption>` | 子菜单，**必填！**       |
| key      | `string`                               | 菜单项的标识符           |
| label    | `string \| (() => VNodeChild)`         | 菜单项的内容             |
| type     | `'group'`                              | 菜单项的类型，**必填！** |

#### MenuDividerOption Properties

| 名称  | 类型             | 说明                     |
| ----- | ---------------- | ------------------------ |
| key   | `string`         | 菜单项的标识符           |
| props | `HTMLAttributes` | 分割线的属性             |
| type  | `'divider'`      | 菜单项的类型，**必填！** |

### Menu Methods

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| showOption | `(key?: string \| number) => void` | 展开菜单，确保设定的元素被显示，如果不传入 `key` 会当前选中元素 | 2.27.0 |
