# CHANGELOG

## NEXT_VERSION

### Fixes

### Feats

- `n-menu` 新增 `hidden` 属性，用于隐藏菜单，关闭 [#3334](https://github.com/TuSimple/naive-ui/issues/3334)

## 2.32.0

### Breaking Changes

- `n-transfer` 的 UI 完全重构，原本的 transfer 组件被重命名为 `n-legacy-transfer`，并将在下个主版本被移除。

### Fixes

- 修复 `n-date-picker` 在范围模式下点击禁用的确认按钮会取消选择中的状态，关闭 [#3254](https://github.com/TuSimple/naive-ui/issues/3254)
- 修复 `n-button` 的 `focusable` 属性不生效，关闭 [#3292](https://github.com/TuSimple/naive-ui/issues/3292)
- 修复 `n-upload` 的 `on-error` 和 `on-finish` 属性不允许 `() => void` 类型，关闭 [#3290](https://github.com/TuSimple/naive-ui/issues/3290)
- 修复 `n-select` 的 placeholder 过长时可能溢出
- 修复 `n-input` 在 `type="textarea"` 并且 `:autosize="true"` 时添加 prefix 后内容没有对齐，关闭 [#3238](https://github.com/TuSimple/naive-ui/issues/3238)
- 修复 `n-select` 当在同时设置 `filterable` 和 `multiple` 时点击 `action` 焦点丢失的问题，关闭 [#3247](https://github.com/TuSimple/naive-ui/issues/3247)
- 修复 `n-carousel` 在 `autoplay` 为 `true` 时 `hover` 不停止播放，关闭 [#3304](https://github.com/TuSimple/naive-ui/issues/3304)
- 修复 `n-tree` 在选中节点时设定 `expanded-keys` 时可能会抛出异常，关闭 [#3319](https://github.com/TuSimple/naive-ui/issues/3319)
- 修复 `n-avatar` 加载失败时依然显示 placeholder，关闭 [#3315](https://github.com/TuSimple/naive-ui/issues/3315)
- 修复 `n-input-number` 按住按钮时重复注册 `mouseup` 事件
- 修复所有组件导出的 props 类型属性都是 `readonly` 的
- 修复 `n-tree` 的 `check-on-click` 属性有时不生效
- 修复 `n-progress` 的 `offset-degree` 表现不正确

### Feats

- `n-checkbox-group` 的 `on-update:value` 属性增加触发变更的 checkbox 的值到参数中，关闭 [#3277](https://github.com/TuSimple/naive-ui/issues/3277)
- `n-tree` 支持 RTL
- `n-input` 新增 `scrollTo` 方法，关闭 [#3280](https://github.com/TuSimple/naive-ui/issues/3280)
- `n-legacy-grid` 支持 RTL
- `n-statistic` 支持 RTL
- `n-thing` 支持 RTL
- `n-transfer` 新增 `render-source-label` 属性
- `n-transfer` 新增 `render-target-label` 属性
- `n-transfer` 新增 `render-source-list` 属性
- `n-scrollbar` 支持 RTL
- `useDialog` 支持 `onEsc` 属性
- `n-watermark` 新增 `global-rotate` 属性
- `n-notification` 新增 `keepAliveOnHover` 属性，用于设置鼠标移入时是否保持通知框显示，关闭 [#3249](https://github.com/TuSimple/naive-ui/issues/3249)

## 2.31.0

### Breaking Changes

- `n-date-picker` 的 `clearable` 属性在 `action` 属性没有设置时，会控面板清空按钮的显隐，关闭 [#1196](https://github.com/TuSimple/naive-ui/issues/1196)
- `n-button` 的 `native-focus-behavior` 属性默认值改为“不是 Safari”

### Fixes

- 修复 `n-data-table` 的列的 `render` 属性的 `index` 参数当使用产开行时序列异常，关闭 [#3153](https://github.com/TuSimple/naive-ui/issues/3153)
- 修复 `n-data-table` 在虚拟滚动模式下列 `colSpan` 没有正确生效，关闭 [#3052](https://github.com/TuSimple/naive-ui/issues/3052)
- 修复 `n-data-table` 在虚拟滚动模式下 `summary` 行不显示，关闭 [#3202](https://github.com/TuSimple/naive-ui/issues/3202)
- 修复 `n-carousel` 在 `effect` 为 `fade` 时幻灯片之间的层级关系错误问题，关闭 [#3227](https://github.com/TuSimple/naive-ui/issues/3227)
- 修复 `n-carousel` 在 IOS 下无法滑动问题，关闭 [#3106](https://github.com/TuSimple/naive-ui/issues/3106)
- 修复 `n-carousel` 在渲染时丢失内容元素大小问题，关闭 [#3078](https://github.com/TuSimple/naive-ui/issues/3078)
- 修复 `n-cascader` 的搜索菜单没有显示节点路径，关闭 [#3220](https://github.com/TuSimple/naive-ui/issues/3220)
- 修复 `n-cascader` 的 `filter` 属性接收到的 `path` 可能有误
- 修复 `n-date-picker` 在 `type="quarterrange"` 和 `type="quarter"` 时菜单季度文案不一致，关闭 [#3217](https://github.com/TuSimple/naive-ui/issues/3217)
- 修复 `n-notification` 在内容高度超过屏幕后的关闭动画
- 修复 `n-dropdown` 禁用的选项有 hover 样式
- 修复 `n-dropdown` 菜单出现可能会闪
- 修复 `n-dropdown` 菜单的 transform origin 在 Chrome 上可能不正确
- 修复 `n-radio-button` 光标样式可能不正确，关闭 [#3243](https://github.com/TuSimple/naive-ui/issues/3243)
- 修复 `n-input` 在 disabled 状态下在 Safari 上文本颜色过浅，关闭 [#3241](https://github.com/TuSimple/naive-ui/issues/3241)
- 修复 `n-input` 的分割符可能折行
- 修复所有组件的 `user-select` 样式属性在 Safari 的效果
- 修复 `n-data-table` 在虚拟滚动模式下会阻止页面滚动
- 修复 `n-button` 在 Firefox 下没有按下的效果

### Feats

- `n-avatar` 新增 `lazy` 属性
- `n-avatar` 新增 `intersection-observer-options` 属性
- `n-number-animation` 新增 `on-finish` 属性
- `n-notification` 支持 RTL
- 导出所有组件的 props 对象
- `n-popover` 新增 `footer-style` 属性，用于设置底部内容的样式
- `n-popover` 新增 `footer` 插槽，用于设置底部内容，关闭 [#3188](https://github.com/TuSimple/naive-ui/issues/3188)
- `n-dropdown` 新增 `menu-props`，关闭 [#2885](https://github.com/TuSimple/naive-ui/issues/2885)
- `n-data-table` 的列属性增加 `multiple` 属性使得表格选择支持单选模式，关闭 [#3056](https://github.com/TuSimple/naive-ui/issues/3056)
- `n-date-picker` 在选择结束日期过程中禁止点击确认按钮，关闭 [#3226](https://github.com/TuSimple/naive-ui/issues/3226)
- `n-tree` 新增 `check-on-click` 属性来控制可选状态下的选中交互方式，关闭 [#2968](https://github.com/TuSimple/naive-ui/issues/2968)
- `n-tree` 新增 `accrodion` 属性，关闭 [#3129](https://github.com/TuSimple/naive-ui/issues/3129)
- `n-countdown` 新增 `reset` 方法，关闭 [#3228](https://github.com/TuSimple/naive-ui/issues/3228)
- `n-drawer` 新增 `resizable` 属性
- `n-drawer` 新增 `default-height` 属性
- `n-drawer` 新增 `default-width` 属性
- `n-drawer` 新增 `on-update:height` 属性
- `n-drawer` 新增 `on-update:width` 属性
- 更新 ukUA locale

## 2.30.8

### Fixes

- 修复 `n-select` 菜单的 transition 样式，关闭 [#3211](https://github.com/TuSimple/naive-ui/issues/3211)

## 2.30.7

### Fixes

- 修复 `n-tabs` 的 `bar-width` 属性在设置 `0` 时失效，关闭 [#3171](https://github.com/TuSimple/naive-ui/issues/3171)
- 修复 `n-drawer` 使用 `show-mask` 属性时控制台出现 warning，关闭 [#3172](https://github.com/TuSimple/naive-ui/issues/3172)
- 修复 `n-button` 放入 ellipsis 的容器中时不能正确显示，关闭 [#3178](https://github.com/TuSimple/naive-ui/issues/3178).
- 修复 `n-select` 在 `form` 中，多选的情况下，在 input 元素中按下 Enter 键会导致选项被清除，关闭 [#3169](https://github.com/TuSimple/naive-ui/issues/3169)
- 修复 `n-select` 的 `filter` 属性不生效，关闭 [#3175](https://github.com/TuSimple/naive-ui/issues/3175)
- 修复 `n-modal` 在不使用任何 preset 的时候遮罩可能覆盖住内容，关闭 [#3204](https://github.com/TuSimple/naive-ui/issues/3204)
- 修复 `n-button` 在图标过大或者过小时未对齐
- 修复 `n-select` 创建的选项可能出现多次，关闭 [#3206](https://github.com/TuSimple/naive-ui/issues/3206)

### Feats

- `n-date-picker` `type` 属性支持 `'quarterrange'` 和 `'yearrange'`
- `n-tree-select` 新增 `render-prefix` 属性
- `n-tree-select` 新增 `render-suffix` 属性
- `n-tree-select` 新增 `render-switcher-icon` 属性
- `n-tree-select` 新增 `node-props` 属性
- `n-tree-select` 新增 `render-label` 属性，关闭 [#3197](https://github.com/TuSimple/naive-ui/issues/3197)
- `n-tree-select` 新增 `render-tag` 属性
- `n-notification` 新增 `titleFontSize`、`metaFontSize`、`descriptionFontSize` 主题变量

## 2.30.6

### Fixes

- 修复 `n-color-picker` 手动输入 alpha 值时不生效
- 修复某些组件在 `__VUE_OPTIONS_API__` 设为 `false` 时工作不正常的问题，关闭 [#3146](https://github.com/TuSimple/naive-ui/issues/3146)
- 修复 `n-grid` 在 SSR 页面挂载后不会正确的适配响应式，关闭 [#2462](https://github.com/TuSimple/naive-ui/issues/2462)
- 修复 `n-modal` 在同时打开多个的时候点击某个遮罩，`on-mask-click` 会对每一个都触发，关闭 [#3147](https://github.com/TuSimple/naive-ui/issues/3147)
- 修复 `n-data-table` 的列的 `ellipsis` 属性类型不接受 `style` 属性
- 修复 `n-data-table` 在列同时设为 `ellipsis` 和 `fixed` 时会丢失固定列的阴影
- 修复 `n-image` 的 `lazy` 属性在 Safari 和 Firefox 上工作不正常

## 2.30.5

### Fixes

- 修复 `n-input-group-label` 的内容在 `n-drawer-content` 嵌套中异常，关闭 [#3115](https://github.com/TuSimple/naive-ui/issues/3115)
- 修复 `n-back-top` 在使用 `show` 时控制台报警告，关闭 [#3122](https://github.com/TuSimple/naive-ui/issues/3122)
- 修复 `volar.d.ts` 组件全局类型为 `any`
- 修复 `n-grid-item` 使用 `v-show` 可能存在显示状态不正确的问题，关闭 [#3123](https://github.com/TuSimple/naive-ui/issues/3123)
- 修复 `n-select` 在可清空状态下使用输入法输入，移入鼠标后输入文字会消失

### Feats

- 🌟 `n-image` 新增 `lazy` 属性，关闭 [#3055](https://github.com/TuSimple/naive-ui/issues/3055)
- `n-image` 新增 `intersection-observer-options` 属性
- `n-image` 新增 `placeholder` slot
- 导出 `NTooltipInst` 类型
- `n-data-table` 新增 `render-cell` 属性，关闭 [#3095](https://github.com/TuSimple/naive-ui/issues/3095)
- `n-space` 新增 `wrap-item` 属性
- `n-data-table` 的 `on-update:checked-row-keys` 会传出行数据，关闭 [#2215](https://github.com/TuSimple/naive-ui/issues/2215)，关闭 [#2265](https://github.com/TuSimple/naive-ui/pull/2265)

## 2.30.4

### Fixes

- 修复 `n-button` 在设定 `:focusable="false"` 后点击仍然会聚焦，关闭 [#3071](https://github.com/TuSimple/naive-ui/issues/3071)
- 修复 `n-data-table` 固定的选择列在设定了非默认宽度的情况下可能和其他列重叠，关闭 [#3067](https://github.com/TuSimple/naive-ui/issues/3067)
- 修复 `n-popselect` 在选择完关闭菜单后没有触发 `on-update:show`
- 修复 `n-popselect` 的宽度不能通过 `style` 配置
- 修复 `n-date-picker` 在设定了 `is-date-disabled` 后年月的快速跳转可能会被禁用，关闭 [#3068](https://github.com/TuSimple/naive-ui/issues/3068)
- 修复 `n-layout` 在 `keep-alive` 中使用的时候不会维持滚动状态
- 修复 `n-layout-sider` 在 `keep-alive` 中使用的时候不会维持滚动状态
- 修复 `n-tree` 可能重复发送异步数据请求
- 修复 `n-tree` 在设定 `expand-on-click` 之后异步展开报错，关闭 [#3089](https://github.com/TuSimple/naive-ui/issues/3089)
- 修复 `n-slider` 使用键盘聚焦触发 tooltip 的时候没有动画
- 修复 `n-slider` 在 mark 出现在最右侧的时候换行不正常
- 修复 `n-upload` 内部的链接会出现原生 focus-visible 的 outline 样式
- 修复 `n-upload` 在 `list-type="image-card"` 时会出现 slot 相关 warning
- 修复 `n-upload` 在 `list-type="image-card"` 图片的边角会溢出列表项
- 修复 `n-dynamic-tags` 的 `on-create` 属性不生效
- 修复 Chrome 102 版本引入的虚拟滚动卡顿问题，关闭 [#3048](https://github.com/TuSimple/naive-ui/issues/3048)
- 修复 `n-upload-dragger` 在禁用状态下过于透明

### Feats

- 🌟 `n-pagination` 新增快速跳转的下拉菜单
- 🌟 `n-input` 新增 `allow-input` 属性
- 🌟 `n-data-table` 新增 `default-expand-all` 属性，关闭 [#3073](https://github.com/TuSimple/naive-ui/issues/3073)
- 🌟 `n-modal` 在内部带有弹出层组件例如 `n-select` 的时候可以正确处理 esc 键按下的情况，关闭 [#2973](https://github.com/TuSimple/naive-ui/issues/2973)
- `n-tree-select` 新增 `arrow` slot，关闭 [#3084](https://github.com/TuSimple/naive-ui/issues/3084)
- `n-cascader` 在点击 checkbox 后会显示对应的子菜单，关闭 [#3079](https://github.com/TuSimple/naive-ui/issues/3079)
- `n-upload` 在达到最大文件数量限制后会禁用 dragger
- `n-select` 新增 `node-props` 属性
- `n-popselect` 新增 `node-props` 属性
- `n-popselect` 新增 `virtual-scroll` 属性
- `n-data-table` 新增 `scrollTo` 方法，关闭 [#2570](https://github.com/TuSimple/naive-ui/issues/2570)
- `n-slider` 新增 `thumb` 插槽

## 2.30.3

### Fixes

- 修复 `n-cascader` 溢出标签的 popover 在设定 `filterable` 后无法滚动，关闭 [#3061](https://github.com/TuSimple/naive-ui/issues/3061)
- 修复 `n-drawer` 的 `show-mask` 传入 `'transparent'` 会报 warning
- 修复 `n-calendar` 点击不在当前月份的日期不会调用 `on-panel-change`，关闭 [#3063](https://github.com/TuSimple/naive-ui/issues/3063)

### Feats

- 🌟 提供 UMD 打包
- `n-cascader` 在单选状态下会展开选中的值，关闭 [#3058](https://github.com/TuSimple/naive-ui/issues/3058)
- `n-space` 在可能的情况下会使用 `gap` CSS 属性，关闭 [#3053](https://github.com/TuSimple/naive-ui/issues/3053)

## 2.30.2

### Fixes

- 修复 `n-select` 每次关闭菜单时会重新计算选项，提升了性能

## 2.30.1

### Feats

- `n-menu` 新增 `arrowColorChildActiveHover`, `itemIconColorChildActiveHoverHorizontal`, `itemIconColorChildActiveHover`,`itemTextColorChildActiveHoverHorizontal`, `itemTextColorChildActiveHover`, `arrowColorChildActiveHoverInverted`, `itemIconColorChildActiveHoverHorizontalInverted`, `itemIconColorChildActiveHoverInverted`,`itemTextColorChildActiveHoverHorizontalInverted`, `itemTextColorChildActiveHoverInverted` 主题变量，关闭 [#2929](https://github.com/TuSimple/naive-ui/issues/2929)

### Fixes

- 修复 `n-menu` `node-props` 属性没有添加到 `role="menuitem"` 的元素上，而是添加到了里层元素
- 修复 `n-menu` `node-props` 对 `type="group"` 的选项不生效

## 2.30.0

### Breaking Changes

- 主题变量 `closeColor`、`closeColorHover`、`closeColorPressed` 重命名为 `closeIconColor`、`closeIconColorHover`、`closeIconColorPressed`，`closeColorHover`、`closeColorPressed` 仍然保留，控制关闭按钮的背景颜色
- `n-tag` 的 `colorXxx` 主题变量重命名为 `colorBorderedXxx`，`colorXxx` 仍然保留，控制不带边框标签的颜色

### Fixes

- 修复 `createDiscreteApi` 中传入 `'loadingBar'` 不生效
- 修复 `n-popover` 在切换主题时关闭背景颜色突变
- 修复 `n-select` 多选时选框大小改变时菜单位置没有同步
- 修复 `n-scrollbar` 无法显示横向滚动条，关闭 [#3047](https://github.com/TuSimple/naive-ui/issues/3047)
- 修复 `n-tree` 在 `:block-line="true"` 并且 `:selectable="true"` 时节点的点击样式优先级高于激活样式
- 修复 `n-slider` 在边界情况下可能泄露事件监听器
- 修复 `n-data-table` 在 `keep-alive` 组件中使用重新激活时不会恢复滚动位置，关闭 [#2522](https://github.com/TuSimple/naive-ui/issues/2522)
- 修复 `n-image` 在图像过大时缩放比例不够大
- 修复 `n-menu` 下拉菜单选项在选项后代被激活的状况下的文字样式
- 修复 `n-input` 的 `input-props` 属性设定 `class` 和 `style` 不生效

### Feats

- 🌟 `n-time-picker` 新增 `time-zone` 属性，关闭 [#293](https://github.com/TuSimple/naive-ui/issues/293)
- 🌟 `n-input-number` 新增 `parse` 属性
- 🌟 `n-input-number` 新增 `format` 属性
- 🌟 `n-input-number` 新增 `precision` 属性，关闭 [#2068](https://github.com/TuSimple/naive-ui/issues/2068)、[#1859](https://github.com/TuSimple/naive-ui/issues/1859)
- 🌟 `n-image` 新增展示图片原始大小的开关，关闭 [#3023](https://github.com/TuSimple/naive-ui/issues/3023)
- 🌟 所有组件的关闭按钮使用了新样式、并且可以聚焦
- 所有组件的选择菜单或下拉菜单使用了新的选项样式
- `n-tag` 新增 `icon` 插槽
- `n-tag` 新增 `strong` 属性
- `n-tag` 在暗色背景下 `:bordered="false"` 时增加背景颜色，关闭 [#1699](https://github.com/TuSimple/naive-ui/issues/1699)
- `n-time` 新增 `time-zone` 属性
- `n-breadcrumb-item` 新增 `clickable` 属性
- `n-breadcrumb-item` 使用新样式，新增 `itemLineHeight`、`itemBorderRadius`、`itemColorHover`、`itemColorPressed` 主题变量
- `n-notification` 优化标题过长时的样式
- `n-drawer` 优化标题过长时的样式
- `n-dialog` 优化标题过长时的样式
- `n-card` 优化标题过长时的样式

## 2.29.1

### Fixes

- 修复 `n-tree` 使用 `pattern` 属性过滤树节点时报错, 关闭 [#2960](https://github.com/TuSimple/naive-ui/issues/2960)
- 修复 `n-watermark` 在全局配置了 `cls-prefix` 时失效
- 修复 `n-dropdown` 在 `:show-arrow="true"` 情况下不显示箭头的问题，关闭[#2977](https://github.com/TuSimple/naive-ui/issues/2977)
- 修复 `n-upload-dragger` 没有占据满宽度
- 修复 `n-global-style` 没有清空 body 的 padding 和 margin
- 修复 `n-modal` 在显示时被卸载不会清除 body 的 overflow，关闭 [#3015](https://github.com/TuSimple/naive-ui/issues/3015)
- 修复键盘操作在特定的老旧浏览器无法使用
- 修复 `n-tabs` 的 `justify-content` 为 `'start'`、 `'end'` 和 `'center'` 时缺少 padding
- 修复 `n-tabs` 在 `justify-content`、`size` 切换时指示条的位置没有更新
- 修复 `n-switch` 在 `disabled` 切换时没有过渡效果
- 修复 `n-modal` & `n-drawer` 在输入法输入过程中按 Esc 会关闭，关闭 [#2989](https://github.com/TuSimple/naive-ui/issues/2989)
- 修复 `n-date-picker` 在选择日期时间范围的过程中还可以选择时间，关闭 [#3004](https://github.com/TuSimple/naive-ui/issues/3004)
- 修复 `n-pagination` 在 `:page-count="0"` 是显示有问题，关闭 [#2970](https://github.com/TuSimple/naive-ui/issues/2970)
- 修复 `n-date-picker` 在 `type="datetimerange"` 时 `shortcuts` 会被 `default-time` 覆盖，关闭 [#3020](https://github.com/TuSimple/naive-ui/issues/3020)
- 修复 `n-image-group` 在 SSR 下无法切换图片
- 修复 `n-tabs` 在 `display-directive="show"` 和 `:animated="true"` 的时候动画切换高度有时没有过渡，关闭 [#3035](https://github.com/TuSimple/naive-ui/issues/3035)
- 修复 `n-select` 在单选时搜索时字体略小
- 修复 `n-select` 的计数标签在溢出内容少的时候弹出内容过高
- 修复 `n-date-picker` 在 `type="monthrange"` 时第一次选中时滚动状态没有对齐
- 修复 `n-form-item` 的必填星号可以被选中
- 修复 `n-list` 在暗色模式下的 `n-popover` 中颜色不正确

### Feats

- 🌟 `n-select` 新增 `label-field` 属性，关闭 [#3018](https://github.com/TuSimple/naive-ui/issues/3018)
- 🌟 `n-select` 新增 `value-field` 属性，关闭 [#3018](https://github.com/TuSimple/naive-ui/issues/3018)
- 🌟 `n-steps` 新增 `on-update:current` 属性
- 🌟 `n-date-picker` 新增 `panel` 属性
- 🌟 `n-data-table` 新增 `on-scroll` 属性，关闭 [#3025](https://github.com/TuSimple/naive-ui/issues/3025)
- 🌟 `FormItemRule` 新增 `renderMessage` 属性，关闭 [#2525](https://github.com/TuSimple/naive-ui/issues/2525)
- 🌟 新增 `createDiscreteApi` 在 setup 外使用 message、notification、dialog、loading bar
- `n-scrollbar` 新增 `trigger` 属性
- `n-input-number` 新增 `button-placement` 属性
- `n-select` 新增 `children-field` 属性，关闭 [#3018](https://github.com/TuSimple/naive-ui/issues/3018)
- `n-upload` 新增 `trigger-style` 属性
- `n-dropdown` 新增 `node-props` 属性
- `n-dropdown` 新增 `render-option` 属性
- `n-upload` 新增 `is-error-state` 属性，关闭 [#2975](https://github.com/TuSimple/naive-ui/issues/2975)
- `n-date-picker` 的 `shortcuts` 属性支持 readonly tuple 类型
- `n-step` 新增 `disabled` 属性
- `n-calendar` 新增 `header` slot，关闭 [#3036](https://github.com/TuSimple/naive-ui/issues/3036)
- `n-tree` 新增 `expand-on-click` 属性， [#2949](https://github.com/TuSimple/naive-ui/issues/2949)

## 2.29.0

### Breaking Changes

- 由于 `n-pagination` 支持了 `size` 属性，因此 `n-pagination` 的部分主题变量名称进行了调整

### Fixes

- 修复 `n-menu` 使用 `render-icon` 函数返回值为 `true` 时渲染不正确
- 修复 `n-tabs` 的 `tabFontWeightActive` 主题变量应用在全部 tab 上了，关闭 [#2926](https://github.com/TuSimple/naive-ui/issues/2926)
- 修复 `n-tree-select` 的 `default-expand-all` 不生效
- 修复 `n-upload` 的 `accept` 属性对拖拽场景不生效，关闭 [#2919](https://github.com/TuSimple/naive-ui/issues/2919)
- 修复 `n-calendar` 的 `on-panel-change` 在点击“今天”的时候返回的 `month` 不正确
- 修复 `n-time` 在 SSR 下由于无法导入 `getTimezoneOffset` 报错的问题，关闭 [#2545](https://github.com/TuSimple/naive-ui/issues/2545)
- 修复 `n-transfer` 搜索框的 box-shadow 被切断
- 修复 `n-time-picker` 在 blur 后输入框不合法的值不会被清除

### Feats

- `n-notification-provider` 的 `placement` 属性支持 `'top'` 和 `'bottom'`，关闭 [#2930](https://github.com/TuSimple/naive-ui/issues/2930)
- `n-pagination` 新增 `size` 属性，关闭 [#2888](https://github.com/TuSimple/naive-ui/issues/2888)
- `n-config-provider` 新增 `preflight-style-disabled` 属性
- `n-pagination` 快速跳转的页码超出范围时取最大值、最小值，关闭 [#2928](https://github.com/TuSimple/naive-ui/issues/2928)
- `n-pagination` 中快速跳转的输入字符只允许纯数字，关闭 [#2928](https://github.com/TuSimple/naive-ui/issues/2928)
- `n-color-picker` 新增 `on-confirm` 属性
- `n-input` 新增 `clear-icon` slot
- `n-date-picker` 新增 `date-icon` 插槽，关闭 [#2668](https://github.com/TuSimple/naive-ui/issues/2668)
- `n-date-picker` 新增 `separator` 插槽，关闭 [#2668](https://github.com/TuSimple/naive-ui/issues/2668)

### i18n

- 新增 nlNL locale

## 2.28.4

### Fixes

- 修复 `n-theme-editor` 内容不能滚动

## 2.28.3

### Fixes

- 修复 `n-menu` 的 `dropdown-props` 无法覆盖 `n-dropdown` 的 `size` 属性，关闭 [#2868](https://github.com/TuSimple/naive-ui/issues/2868)
- 修复 `n-switch` 切换状态时 loading 动画异常，关闭 [#2870](https://github.com/TuSimple/naive-ui/issues/2870)
- 修复 `n-data-table` 在页数设定超过数据内容时，不显示内容，关闭 [#2840](https://github.com/TuSimple/naive-ui/issues/2840)
- 修复 `n-data-table` 的 `cellProps` 泛型类型不正确
- 修复 `n-data-table` 的 `work-break` 样式为 `break-word`
- 修复 `n-list` 的 `n-merged-color` 样式不正常
- 修复 `MessageReactive` 的 `destroy` 方法在 message 消失后调用会抛错
- 修复 `n-ellpisis` 在恰好触发省略的时候无法弹出 tooltip，关闭 [#1393](https://github.com/TuSimple/naive-ui/issues/1393)、[#2899](https://github.com/TuSimple/naive-ui/issues/2899)
- 修复 `n-tree` 无法使用 `width: fit-content;` 的样式，关闭 [#2875](https://github.com/TuSimple/naive-ui/issues/2875)
- 修复 `n-dropdown` 的 `on-update:show` 会被触发两次，关闭 [#2905](https://github.com/TuSimple/naive-ui/issues/2905)
- 修复 `n-select` 在选框清空后依然可以通过 enter 键选中值
- 修复 `n-data-table` 的 `selection` 和 `expand` 列不能设置宽度
- 修复 `n-checkbox` 中有可以被选中的空格
- 修复 `DescriptionsProps` 拼错成了 `DescriptionProps`
- 修复 `n-icon` 缺少 `IconProps`
- 修复 `n-icon-wrapper` 缺少 `IconWrapperProps`
- 修复 `n-countdown` 在 `precision=0` 时显示比实际快一秒，关闭 [#2910](https://github.com/TuSimple/naive-ui/issues/2910)

### Feats

- `n-menu` 新增 `node-props` 属性
- `n-switch` 新增 `rubber-band` 属性
- `n-space` 的 `justify` 支持 `'space-evenly'`
- `n-popover` 新增 `content-style` 属性
- `n-popover` 新增 `header-style` 属性
- `n-popover` 新增 `scrollable` 属性
- `n-select` 和 `n-cascader` 和 `n-tree-select` 的溢出计数 tag 弹出内容可以滚动
- `n-data-table` 新增 `pagination-behavior-on-filter` 属性
- `n-date-picker` 属性 `type` 支持 `monthrange` 选项
- `n-date-picker` 新增 `on-clear` 属性
- `n-date-picker` 新增 `on-confirm` 属性，关闭 [#2852](https://github.com/TuSimple/naive-ui/issues/2852)
- `n-data-table` 的 `columns` 的元素支持 `minWidth` 属性
- `n-tree` 新增 `checkbox-placement` 属性
- `n-tree-select` 新增 `loading` 属性, 关闭 [#2857](https://github.com/TuSimple/naive-ui/issues/2857)
- `n-modal` 新增 `block-scroll` 属性
- `n-modal` 新增 `block-scroll` 属性，关闭 [#2556](https://github.com/TuSimple/naive-ui/issues/2556)
- `n-drawer` 新增 `block-scroll` 属性，关闭 [#2556](https://github.com/TuSimple/naive-ui/issues/2556)
- `n-drawer` 新增 `show-mask` 属性，关闭 [#2556](https://github.com/TuSimple/naive-ui/issues/2556)
- `useDialog().xxx` 支持 `blockScroll` 属性，关闭 [#2556](https://github.com/TuSimple/naive-ui/issues/2556)
- `useDialog().xxx` 支持 `autoFocus` 属性
- `n-button` 新增 `native-focus-behavior` 属性，关闭 [#2882](https://github.com/TuSimple/naive-ui/issues/2882)
- `n-time-picker` 新增 `on-confirm` 属性
- `n-time-picker` 新增 `on-clear` 属性
- `n-time-picker` 新增 `on-update:show` 属性
- `n-time-picker` 新增 `show` 属性
- `n-date-picker` 新增 `on-update:show` 属性
- `n-date-picker` 新增 `show` 属性
- `n-date-picker` 新增 `default-calendar-start-time` 属性，关闭 [#2732](https://github.com/TuSimple/naive-ui/issues/2732)
- `n-date-picker` 新增 `default-calendar-end-time` 属性，关闭 [#2732](https://github.com/TuSimple/naive-ui/issues/2732)
- `n-date-picker` 新增 `bind-calendar-months` 属性，关闭 [#2751](https://github.com/TuSimple/naive-ui/issues/2751)
- `n-upload` 新增 `directory` 属性
- `n-upload` 新增 `directory-dnd` 属性
- `UploadFileInfo` 新增 `fullPath` 和 `batchId` 属性
- `DataTableBaseColumn` 新增 `tree` 属性，关闭 [#2757](https://github.com/TuSimple/naive-ui/issues/2757)

## 2.28.2

### Fixes

- 修复 `date-picker` `actions` 的类型不能为 `null`
- 修复 `time-picker` `actions` 的类型不能为 `null`
- 修复 `n-tree-select` 的无意义 warning
- 修复 `n-tree-select` 的 `allow-checking-not-loaded` 属性不生效
- 修复 `n-tree-select` 在 `:allow-checking-not-loaded="true"` 的情况下菜单可能和选框位置不同步
- 修复 `n-cascader` 在 `:allow-checking-not-loaded="true"` 的情况下菜单可能和选框位置不同步

## 2.28.1

### Fixes

- 修复 `notification` 在 SSR 模式下第一个之后的 icon 都不会展示，关闭 [#2793](https://github.com/TuSimple/naive-ui/issues/2793)
- 修复 `dialog` 在 SSR 模式下第一个之后的 icon 都不会展示
- 修复 `n-drawer` 和 `n-modal` 在 `:autofocus="true"` 情况下打开时可能溢出屏幕
- 修复 `n-tree-select` 在使用 `children-field` 时过滤器不生效，关闭 [#2789](https://github.com/TuSimple/naive-ui/issues/2789)
- 修复 `n-tree-select` 清空搜索值时搜索命中样式未更新
- 修复 `n-tree-select` 在 `check-strategy="child"` 和 `:cascade="false"` 时非叶节点依然可以被选择，关闭 [#2780](https://github.com/TuSimple/naive-ui/issues/2780)
- 修复 `n-select` 的 `empty` slot 中 `n-input` 无法聚焦，关闭 [#2812](https://github.com/TuSimple/naive-ui/issues/2812)
- 修复 `n-select` 菜单在全屏模式下不可见，关闭 [#2722](https://github.com/TuSimple/naive-ui/issues/2722)
- 修复 `n-color-picker` 的 `value` 属性类型不能为 `null`
- 修复 `n-table` 在不同属性切换时边框颜色突变

### Feats

- `n-input-number` 新增 `add-icon` 和 `minus-icon` 插槽，关闭 [#2668](https://github.com/TuSimple/naive-ui/issues/2668)
- `n-dynamic-input` 添加 `RTL` 支持
- `n-table` 添加 `RTL` 支持
- `n-collapse-transition` 添加 `RTL` 支持
- `n-tree` 新增 `show-irrelevant-nodes` 属性，关闭 [#2764](https://github.com/TuSimple/naive-ui/issues/2764)
- `n-tree-select` 新增 `allow-checking-not-loaded` 属性
- `n-cascader` 新增 `allow-checking-not-loaded` 属性
- `n-tree` 新增 `allow-checking-not-loaded` 属性
- `n-button-group` 添加 `RTL` 支持

### i18n

- 新增 ptBR locale
- 新增 koKR locale

## 2.28.0

### Breaking Changes

- `n-time` 使用 `date-fns` 的 `formatDistanceStrict` 代替 `formatDistance`，关闭 [#2703](https://github.com/TuSimple/naive-ui/issues/2703)

### Fixes

- 修复 `n-tabs` 中嵌套 `n-tabs`，内部的线条会有一次多余的动画，关闭 [#2689](https://github.com/TuSimple/naive-ui/issues/2689)
- 修复 `n-popconfirm` body 没有内容时外边距的异常，关闭 [#2690](https://github.com/TuSimple/naive-ui/issues/2690)
- 修复 `n-tree-select` 无意义 warning
- 修复 `n-calendar` 的禁用单元格可以被点击，关闭 [#2686](https://github.com/TuSimple/naive-ui/issues/2686)
- 修复 message 在 SSR 模式下第一个之后的 icon 都不会展示，关闭 [#2721](https://github.com/TuSimple/naive-ui/issues/2721)
- 修复 `n-popconfirm` 的 `positive-button-props` 和 `negative-button-props` 属性缺乏响应式，关闭 [#2753](https://github.com/TuSimple/naive-ui/issues/2753)
- 修复 `n-step` 有多余的主题变量类名
- 修复 `n-steps` 垂直水平相互嵌套样式错乱
- 修复 `n-popconfirm` 的 `positive-text` & `negetive-text` 不允许 `null` 类型
- 修复 `n-color-picker` 的面板关闭会被 `mousedown.stop` 阻止，关闭 [#2709](https://github.com/TuSimple/naive-ui/issues/2709)
- 修复 `n-tabs` 切换动画在 `display-directive='show'` 的时候不正常，关闭 [#2718](https://github.com/TuSimple/naive-ui/issues/2718)

### Feats

- `n-radio` 新增 `label` 属性，关闭 [#2707](https://github.com/TuSimple/naive-ui/issues/2707)
- `n-drawer` 新增 `on-after-enter` 和 `on-after-leave` 属性，关闭 [#2698](https://github.com/TuSimple/naive-ui/issues/2698)
- `n-date-table` 新增 `paginate-single-page` 属性，关闭 [#2043](https://github.com/TuSimple/naive-ui/issues/2043)
- `n-pagination` 添加 `RTL` 支持
- `n-alert` 添加 `RTL` 支持
- `n-data-table` 新增 `allow-checking-not-loaded` 属性，关闭 [#2758](https://github.com/TuSimple/naive-ui/issues/2758)

## 2.27.0

### Breaking Changes

- `n-menu` 进行了一些样式改动

### Fixes

- 修复 `n-data-table` 使用 `expand` 类型时，行错乱的问题，关闭 [#2631](https://github.com/TuSimple/naive-ui/issues/2631)
- 修复 `n-popconfirm` 缺少 `setShow` 和 `syncPosition` 方法
- 修复 `n-popselect` 缺少 `setShow` 和 `syncPosition` 方法
- 修复 `n-menu` 主题 peers 缺少 `Dropdown`
- 修复 `n-color-picker` 不能输入 0 作为单位的值，关闭 [#2680](https://github.com/TuSimple/naive-ui/issues/2680)
- 修复 `n-tree` 在使用虚拟滚动时滚动条长度存在问题，关闭 [#2673](https://github.com/TuSimple/naive-ui/issues/2673)
- 修复 `n-layout-sider` 的 `content-style` 不能覆盖 `overflow: auto` 属性，关闭 [#2671](https://github.com/TuSimple/naive-ui/issues/2671)
- 修复 `n-date-picker` 在 `month` 和 `quarter` 模式下暗黑模式的 disabled 的面板时间显示有问题
- 修复 `n-dropdown` `onUpdateShow` 不生效
- 修复 `n-auto-complete` `onSelect` 在 `onUpdate:value` 后被触发
- 修复 `n-data-table` `onUpdate:filters` 的类型中 `initiatorColumn` 是可选选参数

### Feats

- `n-tree-select` 新增 `on-load` 属性，关闭 [#2550](https://github.com/TuSimple/naive-ui/issues/2550)
- `n-data-table` 新增 `on-load` 属性
- `n-cascader` 添加 `menu-props` 属性，关闭 [#2600](https://github.com/TuSimple/naive-ui/issues/2600)
- `n-cascader` 添加 `filter-menu-props` 属性，关闭 [#2600](https://github.com/TuSimple/naive-ui/issues/2600)
- `n-badge` 新增 `value` slot
- `n-form` 新增 `validate-messages` 属性
- `n-data-table` 的 column 支持 `cellProps` 属性，关闭 [#2625](https://github.com/TuSimple/naive-ui/issues/2625)
- `n-step` 增加类名用于区分状态
- `n-popconfirm` 新增 `negative-button-props` 属性，关闭 [#2642](https://github.com/TuSimple/naive-ui/issues/2642)
- `n-popconfirm` 新增 `positive-button-props` 属性，关闭 [#2642](https://github.com/TuSimple/naive-ui/issues/2642)
- `n-pagination` 新增 `goto` slot
- `n-input` 新增 `password-visible-icon` slot
- `n-input` 新增 `password-invisible-icon` slot
- `n-select` 新增 `status` 属性
- `n-input-number` 新增 `status` 属性
- `n-auto-complete` 新增 `status` 属性
- `n-cascader` 新增 `status` 属性
- `n-date-picker` 新增 `status` 属性
- `n-time-picker` 新增 `status` 属性
- `n-mention` 新增 `status` 属性
- `n-tree-select` 新增 `status` 属性
- `n-menu` 新增 `showOption` 方法，关闭 [#2562](https://github.com/TuSimple/naive-ui/issues/2562)
- `n-dynamic-tags` 的 `value` 属性支持对象类型的选项
- `n-dynamic-tags` 新增 `render-tag` 属性，关闭 [#2526](https://github.com/TuSimple/naive-ui/issues/2526)
- `n-dynamic-tags` 新增 `on-create` 属性，关闭 [#2576](https://github.com/TuSimple/naive-ui/issues/2576)
- `n-date-picker` 新增 `time-picker-props` 属性，关闭 [#2660](https://github.com/TuSimple/naive-ui/issues/2660)
- `n-tabs` 新增 `trigger` 属性，关闭 [#2679](https://github.com/TuSimple/naive-ui/issues/2679)
- `n-menu` 新增 `itemColorHover`, `itemColorActiveHover`, `itemTextColorActiveHover`, `itemTextColorHorizontal`, `itemTextColorHoverHorizontal`, `itemTextColorActiveHorizontal`, `itemTextColorActiveHoverHorizontal`, `itemTextColorChildActiveHorizontal`, `itemIconColorActiveHover`, `itemIconColorHorizontal`, `itemIconColorHoverHorizontal`, `itemIconColorActiveHorizontal`, `itemIconColorActiveHoverHorizontal`, `itemIconColorChildActiveHorizontal`, `arrowColorActiveHover`, `itemColorHoverInverted`, `itemColorActiveHoverInverted`, `itemTextColorActiveHoverInverted`, `itemTextColorHorizontalInverted`, `itemTextColorHoverHorizontalInverted`, `itemTextColorChildActiveHorizontalInverted`, `itemTextColorActiveHorizontalInverted`, `itemTextColorActiveHoverHorizontalInverted`, `itemIconColorActiveHoverInverted`, `itemIconColorHorizontalInverted`, `itemIconColorHoverHorizontalInverted`, `itemIconColorActiveHorizontalInverted`, `itemIconColorActiveHoverHorizontalInverted`, `itemIconColorChildActiveHorizontalInverted`, `arrowColorActiveHoverInverted` 主题变量，关闭 [#2598](https://github.com/TuSimple/naive-ui/issues/2598)
- `n-carousel` 新增 `next-slide-style` 和 `prev-slide-style` 属性，关闭 [#2340](https://github.com/TuSimple/naive-ui/issues/2340)
- `n-dialog` 新增 `negative-button-props` 属性
- `n-dialog` 新增 `positive-button-props` 属性
- `n-tabs` 新增 `animated` 属性

### i18n

- 新增 thTH locale.

## 2.26.4

### Fixes

- 修复 `n-tree-select` 在 multiple 模式下不能删除 default-value 属性包含父节点的选项，关闭 [#2605](https://github.com/TuSimple/naive-ui/issues/2605)
- 修复 `n-tree` 在移除节点时可能抛出异常，关闭 [#2597](https://github.com/TuSimple/naive-ui/issues/2597)
- 修复 `useDialog` 中使用带有弹出层的元素有异常的焦点管理行为，关闭 [#2612](https://github.com/TuSimple/naive-ui/issues/2612)
- 修复 `n-tree-select` 当 `check-strategy` 为 `'child'` 时有的节点不能被点击
- 修复 `n-tree-select` 在 `check-strategy` 不为 `'all'` 的时候从选框中删除时发出的值可能和 `check-strategy` 不对应

### Feats

- `useDialog` 支持 `closeOnEsc` 属性
- `n-data-table` 导出 `DataTableFilterState` 类型
- `n-data-table` 导出 `DataTableSortState` 类型

## 2.26.3

### Fixes

- 修复 `n-button` loading 图标漂移

## 2.26.2

### Fixes

- 修复 `n-cascader` 节点箭头 loading 显示过久
- 修复 `n-select` 菜单不随主题变化
- 修复 `n-tabs` 不能没有子节点，关闭 [#809](https://github.com/TuSimple/naive-ui/issues/809)
- 修复 `n-menu` 切换主题时在 chrome 99 内字体颜色异常，关闭 [#2563](https://github.com/TuSimple/naive-ui/issues/2563)，这实际上是一个 chrome 的问题，我们进行了临时的修复
- 修复 `n-date-picker` 仅 `'date'` 类型的扩大日期点击触发范围

### Feats

- `n-dynamic-tags` 的 `input` slot 新增 `deactivate` 属性，关闭 [#2575](https://github.com/TuSimple/naive-ui/issues/2575)
- `n-space` 添加 `RTL` 支持
- `n-avatar-group` 添加 `RTL` 支持
- `n-badge` 添加 `RTL` 支持
- `n-radio` 添加 `RTL` 支持
- `n-auto-complete` 新增 `focus` 方法
- `n-auto-complete` 新增 `blur` 方法

## 2.26.1

### Fixes

- 修复 `base-loading` 动画会被 js 堵塞，关闭 [#2506](https://github.com/TuSimple/naive-ui/issues/2506)
- 修复 `n-time` 由于无法导入 `getTimezoneOffset` 报错的问题，关闭 [#2545](https://github.com/TuSimple/naive-ui/issues/2545)
- 修复 `n-modal` 遮罩出现没有动画
- 修复 `n-timeline` 在水平和非水平嵌套时的样式冲突，关闭 [#2549](https://github.com/TuSimple/naive-ui/issues/2549)
- 修复 `n-tree` 箭头和 loading 切换时动画不完整

### Feats

- `n-time-line-item` 新增 `line-type` 属性，关闭 [#2548](https://github.com/TuSimple/naive-ui/issues/2548)
- `n-step` 新增 `icon` slot，关闭 [#2547](https://github.com/TuSimple/naive-ui/issues/2547)
- `n-input-number` 新增 `autofocus` 属性，关闭 [#2551](https://github.com/TuSimple/naive-ui/issues/2551)
- `n-date-picker` 扩大日期点击触发范围，关闭 [#2552](https://github.com/TuSimple/naive-ui/issues/2552)

## 2.26.0

### Breaking Changes

- 修复 `n-tooltip` 箭头和主体之间的间隙，`n-tooltip` 不再能使用半透明的颜色

### Feats

- `n-popover` 新增 `arrow-point-to-center` 属性
- `n-config-provider` 新增 `inline-theme-disabled` 属性

## 2.25.8

### Fixes

- 修复 `useMessage` 丢失样式

## 2.25.7

### Fixes

- 修复 `n-time-picker` 在 `"actions="null"` 时依然显示操作栏
- 修复 `n-input` 在 `type="text"` 并且 `autosize` 被设定时文字内容可能溢出，关闭 [#2505](https://github.com/TuSimple/naive-ui/issues/2505)
- 修复 `n-upload` 将 `file` 字段放于其他 `FormData` 字段之前，关闭 [#2504](https://github.com/TuSimple/naive-ui/issues/2504)
- 修复 `n-button` rtl 支持
- 修复 `n-form-item-row` 不能调用 `n-form-item` 的方法

### Feats

- `n-collapse` 添加 `RTL` 支持
- `useMessage` 新增 `create` 方法
- `useMessage` 新增 `showIcon` 属性，关闭 [#2495](https://github.com/TuSimple/naive-ui/issues/2495)
- `useMessage` 支持 `'default'` 的 `type`
- `n-checkbox` 支持内容折行，关闭 [#2419](https://github.com/TuSimple/naive-ui/issues/2419)
- `n-radio` 支持内容折行，关闭 [#2419](https://github.com/TuSimple/naive-ui/issues/2419)
- `n-checkbox` 添加 `RTL` 支持
- `n-input` 添加 `RTL` 支持
- `n-input-number` 添加 `RTL` 支持

## 2.25.5 (2022-02-24)

### Fixes

- 修复 `n-col` 在 `span=6` 时不能正确的换行，关闭 [#2497](https://github.com/TuSimple/naive-ui/issues/2497)
- 修复 `n-tabs` 在内容过多时底部边框在滚动区域不显示，关闭 [#2500](https://github.com/TuSimple/naive-ui/issues/2500)

## 2.25.3 (2022-02-23)

### Fixes

- 修复 `n-switch` 在自定义选中值的时候无法使用键盘操作
- 修复 `n-data-table` 放在 popover 内使用固定列滚动内容覆盖
- 修复 `n-data-table` 当 `filterOptions` 值为 0 时过滤不生效, 关闭 [#2392](https://github.com/TuSimple/naive-ui/issues/2392)
- 修复 `n-data-table` 当 selection column 为某个 column 的子 column 时无法点击全选复选框
- 修复 `n-table` 动态增加时 `border-color` 的样式异常，关闭 [#2403](https://github.com/TuSimple/naive-ui/issues/2403)
- 修复 `n-tree` 的 `default-expand-all` 对于动态数据不生效
- 修复 `n-form` 当 `model.xxx` 为 `undefined` 的时候会使用 `null` 作为验证值，关闭 [#2486](https://github.com/TuSimple/naive-ui/issues/2486)
- 修复 `n-input` focus 样式优先级低于 hover，关闭 [#2480](https://github.com/TuSimple/naive-ui/issues/2480)
- 修复 `n-data-table` 在使用 keep-alive 组件中使用虚拟滚动的显示问题，关闭 [#2183](https://github.com/TuSimple/naive-ui/issues/2183)
- 修复 `notification` 出现的动画

### Feats

- `n-tree-select` 新增 `clear-filter-after-select` 属性
- `n-cascader` 新增 `clear-filter-after-select` 属性
- `n-switch` 新增 `icon` 插槽
- `n-switch` 新增 `checked-icon` 插槽
- `n-switch` 新增 `unchecked-icon` 插槽
- `n-tabs` 的 CSS 变量使用 `n` 作为前缀
- 新增 `n-watermark` 组件，关闭 [#1745](https://github.com/TuSimple/naive-ui/issues/1745)
- `n-scrollbar` 新增 `scrollBy` 方法，关闭 [#2435](https://github.com/TuSimple/naive-ui/issues/2435)
- `n-data-table` 的 `summary` 属性的 value 值支持 `VNodeChild`，关闭 [#2339](https://github.com/TuSimple/naive-ui/issues/2339)
- `n-input-number` 可以使用长按来改变值，关闭 [#1293](https://github.com/TuSimple/naive-ui/issues/1293)
- `n-description` 新增 `titleTextColor` 主题变量

### i18n

- 新增 skSK locale
- 完善 frFR locale

## 2.25.2 (2022-02-11)

### Fixes

- 移除 `resolveSlot` 中无用的 `console.log`
- 修复 `n-tag` 在 `checkable=true` 时缺少背景色
- 修复 `n-tree` 在 `happydom` 测试环境下由于 `Image` 对象报错
- 修复 `n-select` `max-tag-count` 标签尺寸和 `n-select` size 不同

### Feats

- `n-progress` 的 `type` 属性新增 `dashboard` 类型
- `n-progress` 新增 `gap-degree` 属性
- `n-progress` 新增 `gap-offset-degree` 属性
- `n-select` 新增 `clear-filter-after-select` 属性，关闭 [#2352](https://github.com/TuSimple/naive-ui/issues/2352)

### i18n

- 新增 plPL locale，关闭 [#2354](https://github.com/TuSimple/naive-ui/issues/2354)
- 新增 eo locale

## 2.25.1 (2022-02-06)

### i18n

- 新增 enGB locale
- 完善 deDE locale

## 2.25.0 (2022-02-04)

### Breaking Changes

- 重构了 `n-carousel` 带箭头时的样式

### Fixes

- 修复 `n-color-picker` 色阶和不透明度调整滑块 box-shadow 被轨道 box-shadow 影响
- 修复 `n-form-item` feedback DOM 内容为空依然有 padding
- 修复 `n-button` 在 safari 下显示有多余 margin
- 修复 `n-form` 的 rules 和 `n-form-item` 的 rule 中的 `validator` 与 `asyncValidator` 函数的 `rule` 类型不为 `FormItemRule` 类型， 关闭 [#2299](https://github.com/TuSimple/naive-ui/issues/2299)
- 修复 `n-log` 在内容过长时不折行，关闭 [#2298](https://github.com/TuSimple/naive-ui/issues/2298)
- 修复 `n-log` 未导出 `LogInst` 类型
- 修复 `n-popselect` action slot & empty slot 不生效
- 修复 `n-data-table` 不能使用百分比列宽
- 修复 `n-select` 在可过滤，关闭菜单并且没有选中任何值的时候选框会空一下
- 修复 `n-select` 在动态创建选项时关闭菜单后创建中的选项未清空
- 修复 `n-select` 在 `show=false` 和 `filterable=true` 时无法输入内容，关闭 [#1723](https://github.com/TuSimple/naive-ui/issues/1723)
- 修复 `n-dropdown` 在 `trigger="manual"` 时有额外 margin
- 修复 `web-types.json` 中 `n-h1` ~ `n-h6` 的名称
- 修复 `n-select` 在输入法激活时按退格键会删除选项
- 修复 `n-select` 在特定情况下打开菜单后会将禁用的选项作为待选选项

### Feats

- `n-tabs` 的 `justify-content` 新增类型 `start` `center` `end`
- `n-auto-complete` 新增 `placement` 属性
- `n-cascader` 新增 `placement` 属性
- `n-color-picker` 新增 `placement` 属性
- `n-date-picker` 新增 `placement` 属性
- `n-mention` 新增 `placement` 属性
- `n-select` 新增 `placement` 属性
- `n-slider` 新增 `placement` 属性
- `n-time-picker` 新增 `placement` 属性
- `n-tree-select` 新增 `placement` 属性
- `n-card` 新增 `header-extra-style` 属性
- `n-popover` 新增 `keep-alive-on-hover` 属性，关闭 [#2326](https://github.com/TuSimple/naive-ui/issues/2326)
- `n-input` 新增 `status` 属性
- 新增 `n-icon-wrapper` 组件
- `n-popover` 导出 `PopoverPlacement` 类型
- `n-drawer` 导出 `DrawerPlacement` 类型
- `n-dynamic-tags` 新增 `input-props` 属性
- `n-notification-provider` 新增 `container-style` 属性
- `n-notification-provider` 导出 `NotificationPlacement` 类型
- `n-notification-provider` 导出 `NotificationType` 类型
- `n-tabs` 新增 `bar-width` 属性
- `n-dynamic-input` 新增 `create-button-props` 属性
- `n-dynamic-input` 新增 `create-button-default` slot
- `n-dynamic-input` 新增 `create-button-icon` slot
- `n-dynamic-input` 新增 `show-sort-button` 属性，关闭 [#2121](https://github.com/TuSimple/naive-ui/issues/2121)
- `n-select` 可以作为标签输入框使用
- `n-select` 导出 `SelectRenderLabel` 类型
- `n-select` 导出 `SelectRenderOption` 类型
- `n-select` 导出 `SelectRenderTag` 类型
- `n-tree` 新增 `node-props` 属性

## 2.24.7 (2022-01-28)

### Fixes

- `n-popselect` 设定 `width="trigger"` 不生效

### i18n

- 更新 jaJP locale
- 更新 deDE locale

## 2.24.6 (2022-01-26)

### Feats

- `n-icon` 新增 `component` 属性

### Fixes

- 修复 `n-dynamic-input` 当 max 为 0 时可以添加子项， 关闭 [#2271](https://github.com/TuSimple/naive-ui/issues/2271)
- 修复 `n-dialog` 有无用的 `console.log`

## 2.24.5 (2022-01-25)

### Fixes

- `n-input` 在类型为 `textarea` 时 placeholder 无法换行
- `n-date-picker` 面板年和月之前缺少空格

### Feats

- `n-color-picker` 新增 `disabled` 属性
- `n-date-picker` 快速跳转面板增加触发背景区域

## 2.24.4 (2022-01-24)

### Fixes

- 更新 vueuc 版本

## 2.24.3 (2022-01-24)

### Fixes

- 修复 `n-layout-sider` 边框没有 transition

## 2.24.2 (2022-01-24)

### Fixes

- 修复 `n-layout-sider` 在折叠时仍占据 1px 宽度
- 修复 `n-code` 在 `word-wrap=true` 时不切分单词
- 修复 `n-tab-pane` 的 tab 区会继承 `attrs`， 关闭 [#2221](https://github.com/TuSimple/naive-ui/issues/2221)
- 修复 `n-image` 在预览时仍可滚动背景，关闭 [#2241](https://github.com/TuSimple/naive-ui/issues/2241)
- 修复 `n-input` 在被浏览器自动填充的时候仍然展示 placeholder，关闭 [#2234](https://github.com/TuSimple/naive-ui/issues/2234)
- 修复 `n-input` 在 `type="textarea"` 时 placeholder 换行问题
- 修复 `n-avatar-group` 超出 max 之后显示少一人，关闭 [#2244](https://github.com/TuSimple/naive-ui/issues/2244)
- 修复 `n-calendar` 再点击今天按钮后不触发 `on-panel-change`
- 修复 `n-drawer` 在设定 `mask-closable=false` 时无法被 esc 键关闭，关闭 [#2233](https://github.com/TuSimple/naive-ui/issues/2233)

### Feats

- `n-page-header` 新增 `back` 插槽，关闭 [#2176](https://github.com/TuSimple/naive-ui/issues/2176)
- `n-select` 新增 `reset-menu-on-options-change` 属性，关闭 [#2168](https://github.com/TuSimple/naive-ui/issues/2168)
- `n-select` 新增 `arrow` 插槽，关闭 [#2201](https://github.com/TuSimple/naive-ui/issues/2201)
- `n-carousel` `effect` 属性支持 `'card'`
- `n-input` 在 `type="textarea"` 不再使用原生滚动条，关闭 [#2242](https://github.com/TuSimple/naive-ui/issues/2242)，关闭 [#1172](https://github.com/TuSimple/naive-ui/issues/1172)
- `n-number-animation` 新增 `locale` 属性，用于设置国际化语言，关闭 [#2181](https://github.com/TuSimple/naive-ui/issues/2181)
- `n-number-animation` 跟随 config provider 国际化
- 导出 `lightTheme`
- `n-time-picker` 新增 `icon` 插槽，关闭 [#2228](https://github.com/TuSimple/naive-ui/issues/2228)
- `n-tab-pane` 新增 `tab-props` 属性，关闭 [#2221](https://github.com/TuSimple/naive-ui/issues/2221)
- 新增 `CustomThemeCommonVars` 用于拓展 `useThemeVars`
- `n-slider` 新增 `show-tooltip` 属性，关闭 [#2212](https://github.com/TuSimple/naive-ui/issues/2212)
- `n-select` 新增 `on-update:show` 属性
- `n-select` 新增 `focus` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-select` 新增 `blur` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-date-picker` 新增 `focus` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-date-picker` 新增 `blur` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-time-picker` 新增 `focus` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-time-picker` 新增 `blur` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-checkbox` 新增 `focus` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-checkbox` 新增 `blur` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-cascader` 新增 `focus` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-cascader` 新增 `blur` 方法，关闭 [#2202](https://github.com/TuSimple/naive-ui/issues/2202)
- `n-upload` 新增 `input-props` 属性，关闭 [#2204](https://github.com/TuSimple/naive-ui/issues/2204)
- `n-data-table` 列增加 `render-sorter-icon` 属性，关闭 [#1785](https://github.com/TuSimple/naive-ui/issues/1785)
- `n-data-table` 列增加 `render-sorter` 属性，关闭 [#1785](https://github.com/TuSimple/naive-ui/issues/1785)
- `n-date-picker` 在 `date`、`datetime`、`daterange`、`datetimerange` 类型下可以快速导航到特定的年和月
- `n-modal` 新增 `close-on-esc` 属性
- `n-modal` 新增 `auto-focus` 属性
- `n-modal` 新增 `trap-focus` 属性
- `n-modal` 新增 `on-esc` 属性
- `n-drawer` 新增 `close-on-esc` 属性
- `n-drawer` 新增 `auto-focus` 属性
- `n-drawer` 新增 `trap-focus` 属性
- `n-drawer` 新增 `on-esc` 属性
- `n-upload` 新增 `clear` 方法，关闭 [#2247](https://github.com/TuSimple/naive-ui/issues/2247)

### i18n

- 新增 esAR locale
- 新增 itIT locale

## 2.24.1 (2022-01-12)

### Fixes

- 修复安装错误

## 2.24.0 (2022-01-12)

### Breaking Changes

- 修复 `type PageHeaderProps` 命名，原先错拼为 `PageHeaderPorps`
- `n-image` 主题变量的 `iconColor` 重命名为 `toolbarIconColor`

### Fixes

- 修复 `n-carousel` 只有一张图片仍显示 `dot` 的问题，关闭 [#1777](https://github.com/TuSimple/naive-ui/issues/1777)
- 修复 `n-upload` `on-finish` 回调中 `event` 的类型应为 `ProgressEvent`
- 修复 `n-upload` 不允许 200 之外的 2xx 响应状态码
- 修复 `n-form` 当 `validate` 使用了 `validateCallback` 时调用 Promise 方法无效
- 修复 `n-input-number` 输入以 0 结尾的整数不更新，关闭 [#2115](https://github.com/TuSimple/naive-ui/issues/2115)
- 修复 `n-back-top` 允许 `listen-to` 为 `document`
- 修复 `n-data-table` 在 loading 时可以点击内容，关闭 [#2134](https://github.com/TuSimple/naive-ui/issues/2134)
- 修复 `n-checkbox` 在 safari 显示 indeterminate 图标
- 修复 `n-progress` `line` 类型的进度条中的文字未居中，关闭 [#2138](https://github.com/TuSimple/naive-ui/issues/2138)
- 修复 `n-message` 的 `MessageReactive` 类型缺少 `type` 参数
- 修复 `n-select` 与 `n-input` `padding` 不一致，关闭 [#2149](https://github.com/TuSimple/naive-ui/issues/2149)
- 修复 `n-tooltip` 用于 `n-select` `render-option` 时控制台报错，关闭 [#1436](https://github.com/TuSimple/naive-ui/issues/1436)
- 修复 `n-select` 在 safari 中使用 `render-option` 时 ResizeObserver 报错，关闭 [#1671](https://github.com/TuSimple/naive-ui/issues/1671)
- 修复 `n-carousel` 无法快速响应多次滑动，关闭 [#1892](https://github.com/TuSimple/naive-ui/issues/1892)
- 修复 `n-carousel` 边界样式, 关闭 [#1866](https://github.com/TuSimple/naive-ui/issues/1866)
- 修复 `n-carousel` 触屏下轮播内容无法点击问题, 关闭 [#1882](https://github.com/TuSimple/naive-ui/issues/1882)
- 修复 `n-color-picker` 在空值的情况下默认模式只能为 rgb

### Feats

- `n-code` 新增 `word-wrap` 属性，关闭 [#2111](https://github.com/TuSimple/naive-ui/issues/2111)
- `n-modal` 新增 `z-index` 属性，关闭 [#2088](https://github.com/TuSimple/naive-ui/issues/2088)
- `n-drawer` 新增 `z-index` 属性
- `n-drawer` 新增 wai-aria 支持
- `useMessage` 新增 `render` 选项
- `n-data-table` `TableColumn` 支持 `string` 类型的 `width`，关闭 [#2102](https://github.com/TuSimple/naive-ui/issues/2102)
- `n-calendar` 新增 `on-panel-change` 属性，关闭 [#2082](https://github.com/TuSimple/naive-ui/issues/2082)
- `n-upload` 新增 `on-error` 属性
- `n-pagination` 新增 `label` 插槽
- `n-tabs` 新增 `syncBarPosition` 方法，关闭 [#2120](https://github.com/TuSimple/naive-ui/issues/2120)
- `n-form`、`n-form-item` 的 `label-width` 选项支持 `auto` 属性，关闭 [#2087](https://github.com/TuSimple/naive-ui/issues/2087)
- `n-result` 新增 `icon` 插槽，关闭 [#2130](https://github.com/TuSimple/naive-ui/issues/2130)
- `n-date-picker` 新增 `value-format` 属性，关闭 [#2076](https://github.com/TuSimple/naive-ui/issues/2076)
- `n-date-picker` 新增 `formatted-value` 属性
- `n-date-picker` 新增 `default-formatted-value` 属性
- `n-date-picker` 新增 `on-update:formatted-value` 属性
- `n-date-picker` `on-update:value` 属性会传出格式化后的值
- `n-image` 新增 `show-toolbar-tooltip` 属性
- `n-image` 新增更多主题变量，关闭 [#1531](https://github.com/TuSimple/naive-ui/issues/1531)
- `n-upload` 新增 `image-group-props` 属性
- `n-progress` 新增 `offset-degree` 属性，关闭 [#2010](https://github.com/TuSimple/naive-ui/issues/2010)
- `n-form-item` 新增 `feedback` 插槽，关闭 [#1142](https://github.com/TuSimple/naive-ui/issues/1142)
- `n-form-item` `require-mark-placement` 新增 `'right-hanging'` 选项，关闭 [#2094](https://github.com/TuSimple/naive-ui/issues/2094)
- `n-cascader` 新增 `render-label` 属性，关闭 [#2048](https://github.com/TuSimple/naive-ui/issues/2048)
- `n-auto-complete` 新增 `render-option` 属性，关闭 [#1629](https://github.com/TuSimple/naive-ui/issues/1629)
- `n-auto-complete` 新增 `render-label` 属性，关闭 [#1629](https://github.com/TuSimple/naive-ui/issues/1629)
- `n-tree` 新增 `render-switcher-icon` 属性，关闭 [#1551](https://github.com/TuSimple/naive-ui/issues/1551)
- `n-message` 导出 `MessageType` 类型
- `n-time-picker` 新增 `value-format` 属性
- `n-time-picker` 新增 `formatted-value` 属性
- `n-time-picker` 新增 `on-update:formatted-value` 属性
- `n-time-picker` 新增 `default-formatted-value` 属性
- `n-carousel` 新增 `default-index` 属性
- `n-carousel` 新增 `current-index` 属性
- `n-carousel` 新增 `show-arrow` 属性
- `n-carousel` 新增 `dot-type` 属性, 关闭 [#1931](https://github.com/TuSimple/naive-ui/issues/1931)
- `n-carousel` 新增 `dot-placement` 属性, 关闭 [#1462](https://github.com/TuSimple/naive-ui/issues/1462)
- `n-carousel` 新增 `slides-per-view` 属性
- `n-carousel` 新增 `space-between` 属性
- `n-carousel` 新增 `centered-slides` 属性
- `n-carousel` 新增 `direction` 属性, 关闭 [#1931](https://github.com/TuSimple/naive-ui/issues/1931)
- `n-carousel` 新增 `loop` 属性
- `n-carousel` 新增 `effect` 属性, 关闭 [#1159](https://github.com/TuSimple/naive-ui/issues/1159)
- `n-carousel` 新增 `transition-props` 属性, 关闭 [#1159](https://github.com/TuSimple/naive-ui/issues/1159)
- `n-carousel` 新增 `transition-style` 属性, 关闭 [#1159](https://github.com/TuSimple/naive-ui/issues/1159)
- `n-carousel` 新增 `draggable` 属性
- `n-carousel` 新增 `touchable` 属性
- `n-carousel` 新增 `mousewheel` 属性
- `n-carousel` 新增 `keyboard` 属性
- `n-carousel` 新增 `show-dots` 属性
- `n-carousel` 新增 `on-update:current-index` 属性
- `n-carousel` 新增 `arrow` 插槽
- `n-carousel` 新增 `dots` 插槽
- `n-color-picker` 新增 `label` 插槽
- `n-color-picker` 新增 `render-label` 属性
- `n-form-item` 新增 `label-props` 属性
- 新增 volar 类型支持

## 2.23.2 (2021-12-29)

### Feats

- 可以通过 `<meta name="naive-ui-style" />` 控制组件样式的位置
- `n-empty` 新增 `show-icon` 属性
- `n-modal` 增加可访问性支持，关闭 [#1877](https://github.com/TuSimple/naive-ui/issues/1877)
- 新增 `n-avatar-group`
- `n-input-number` 支持 `loading` 状态
- 新增`n-countdown` 组件
- 新增`n-number-animation` 组件，关闭 [#1465](https://github.com/TuSimple/naive-ui/issues/1465)
- `n-pagination` 在不传 itemCount 时会根据 pageSize 和 pageCount 估计一个，关闭 [#2044](https://github.com/TuSimple/naive-ui/issues/2044)
- `n-statistic` 新增 `tabular-nums` 属性
- `n-cascader` 新增 `on-update:show` 属性，关闭 [#2049](https://github.com/TuSimple/naive-ui/issues/2049)
- `n-scrollbar` 的 CSS 变量使用 `n` 作为前缀
- `n-popconfirm` 的 CSS 变量使用 `n` 作为前缀
- `n-gradient-text` 的 CSS 变量使用 `n` 作为前缀
- `n-form` 的 CSS 变量使用 `n` 作为前缀
- `n-pagination` 的 CSS 变量使用 `n` 作为前缀
- `n-loading-bar` 的 CSS 变量使用 `n` 作为前缀
- `n-empty` 的 CSS 变量使用 `n` 作为前缀
- `n-list` 的 CSS 变量使用 `n` 作为前缀
- `n-layout` 的 CSS 变量使用 `n` 作为前缀
- `n-message` 的 CSS 变量使用 `n` 作为前缀
- `n-mention` 的 CSS 变量使用 `n` 作为前缀
- `n-menu` 的 CSS 变量使用 `n` 作为前缀
- `n-popover` 的 CSS 变量使用 `n` 作为前缀
- `n-transfer` 的 CSS 变量使用 `n` 作为前缀
- `n-table` 的 CSS 变量使用 `n` 作为前缀
- `n-statistic` 的 CSS 变量使用 `n` 作为前缀
- `n-code` 的 CSS 变量使用 `n` 作为前缀
- `n-breadcrumb` 的 CSS 变量使用 `n` 作为前缀
- `n-slider` 的 CSS 变量使用 `n` 作为前缀
- `n-spin` 的 CSS 变量使用 `n` 作为前缀
- `n-select` 的 CSS 变量使用 `n` 作为前缀
- `n-result` 的 CSS 变量使用 `n` 作为前缀
- `n-calendar` 的 CSS 变量使用 `n` 作为前缀
- `n-card` 的 CSS 变量使用 `n` 作为前缀
- `n-cascader` 的 CSS 变量使用 `n` 作为前缀
- `n-color-picker` 的 CSS 变量使用 `n` 作为前缀
- `n-checkbox` 的 CSS 变量使用 `n` 作为前缀
- `n-data-table` 的 CSS 变量使用 `n` 作为前缀
- `n-date-picker` 的 CSS 变量使用 `n` 作为前缀
- `n-descriptions` 的 CSS 变量使用 `n` 作为前缀
- `n-drawer` 的 CSS 变量使用 `n` 作为前缀
- `n-dropdown` 的 CSS 变量使用 `n` 作为前缀
- `n-rate` 的 CSS 变量使用 `n` 作为前缀
- `n-radio` 的 CSS 变量使用 `n` 作为前缀
- `n-progress` 的 CSS 变量使用 `n` 作为前缀
- `n-skeleton` 的 CSS 变量使用 `n` 作为前缀
- `n-collapse` 的 CSS 变量使用 `n` 作为前缀
- `n-collapse-transition` 的 CSS 变量使用 `n` 作为前缀
- `n-thing` 的 CSS 变量使用 `n` 作为前缀
- `n-carousel` 的 CSS 变量使用 `n` 作为前缀
- `n-page-header` 的 CSS 变量使用 `n` 作为前缀
- `n-image` 的 CSS 变量使用 `n` 作为前缀
- `n-input` 的 CSS 变量使用 `n` 作为前缀
- `n-icon` 的 CSS 变量使用 `n` 作为前缀
- `n-modal` 的 CSS 变量使用 `n` 作为前缀
- `n-notification` 的 CSS 变量使用 `n` 作为前缀

### Fixes

- 修复 `n-form-item-gi` 的 `validate` 不生效，关闭 [#1901](https://github.com/TuSimple/naive-ui/issues/1901)
- 修复 `n-card` action 部分的 border-radius 样式
- 修复 `n-code` 不设定 language 时内容重复添加，关闭 [#2034](https://github.com/TuSimple/naive-ui/issues/2034)
- 修复 `n-tabs` `tabTextColorActiveSegment` 和 `tabTextColorHoverSegment` 主题变量不生效，关闭 [#2038](https://github.com/TuSimple/naive-ui/issues/2038)
- 修复 `n-image` 卸载时可能未解绑键盘事件监听器
- 修复 `n-image` 在仅有一张图片时按 esc 无法退出预览，关闭 [#2042](https://github.com/TuSimple/naive-ui/issues/2042)
- 修复 `n-drawer-content` 的内容区域默认无法滚动，关于 [#2003](https://github.com/TuSimple/naive-ui/issues/2003)
- 修复 `n-popover` 手动指定多个 popover 有 相同 zindex 并关闭时控制台打印错误，关闭 [#2050](https://github.com/TuSimple/naive-ui/issues/2050)
- 修复 `n-transfer` 在虚拟滚动模式下没有滚动条
- 修复 `n-input-number` 不能输入以 0 结尾的小数

## 2.23.1 (2021-12-20)

### Fixes

- 修复 `n-transfer` 在自定义高度后内部列表和容器高度不一致，关闭 [#1879](https://github.com/TuSimple/naive-ui/issues/1879)
- 修复 `n-skeleton` 和 `n-gradient-text` 在某些较老的浏览器导致运行错误，关闭 [#1867](https://github.com/TuSimple/naive-ui/issues/1867)
- 修复 `n-data-table` 中列的 ellipsis 属性对于 `n-ellipsis` 的属性支持不全，关闭 [#1891](https://github.com/TuSimple/naive-ui/issues/1891)
- 修复 `n-form` 的 `blankHeightXxx` 主题变量没有跟随 `common.heightXxx`，关闭 [#1880](https://github.com/TuSimple/naive-ui/issues/1880)
- 修复 `n-date-picker` 面板中的日期输入未使用国际化的 `dateFormat`，关闭 [#1793](https://github.com/TuSimple/naive-ui/issues/1793)
- 修复 `n-log` 主题切换文字颜色 transition

### Feats

- `n-back-top` 的 CSS 变量使用 `n` 作为前缀
- `n-steps` 的 CSS 变量使用 `n` 作为前缀
- `n-switch` 的 CSS 变量使用 `n` 作为前缀
- `n-auto-complete` 的 CSS 变量使用 `n` 作为前缀
- `n-log` 的 CSS 变量使用 `n` 作为前缀
- `n-timeline` 的 CSS 变量使用 `n` 作为前缀
- `n-time-picker` 的 CSS 变量使用 `n` 作为前缀
- `n-avatar` 的 CSS 变量使用 `n` 作为前缀
- `n-dynamic-tags` 的 CSS 变量使用 `n` 作为前缀
- `n-tag` 的 CSS 变量使用 `n` 作为前缀
- `n-dialog` 的 CSS 变量使用 `n` 作为前缀
- `n-upload` 的 CSS 变量使用 `n` 作为前缀
- `n-tree` 的 CSS 变量使用 `n` 作为前缀
- `n-tree-select` 的 CSS 变量使用 `n` 作为前缀

## 2.23.0 (2021-12-17)

### Breaking Changes

- `n-switch` 在 `loading` 状态不可再被点击，关闭 [#1853](https://github.com/TuSimple/naive-ui/issues/1853)

### Fixes

- 修复 `n-data-table` 在未设置 max-height 的情况下横向滚动条消失, 关闭 [#1857](https://github.com/TuSimple/naive-ui/issues/1857)
- 修复 `n-input-number` 不能输入为负数的小数，关闭 [#1858](https://github.com/TuSimple/naive-ui/issues/1858)
- 修复 `n-dialog` 点击回车键反复弹出新弹窗，关闭 [#1559](https://github.com/TuSimple/naive-ui/issues/1559)

### Feats

- `n-divider` 的 CSS 变量使用 `n` 作为前缀
- `typography` 的 CSS 变量使用 `n` 作为前缀
- `n-badge` 的 CSS 变量使用 `n` 作为前缀

## 2.22.0 (2021-12-15)

### Breaking Changes

- `n-button` 在 `loading` 状态不可再被点击，关闭 [#1628](https://github.com/TuSimple/naive-ui/issues/1628)

### Fixes

- 修复 `n-alert` 的 `header` 插槽 无法正常显示
- 修复 `n-data-table` 的分页器 `onUpdatePageSize` 属性未被触发, 关闭 [#1774](https://github.com/TuSimple/naive-ui/issues/1774)
- 修复 `n-data-table` loading 时可以选中行, 关闭 [#1812](https://github.com/TuSimple/naive-ui/issues/1812)
- 修复 `n-tag` 行高过低导致内容截断
- 修复 `n-select` 设定 `filterable` 后选项过长显示出错，关闭 [#1823](https://github.com/TuSimple/naive-ui/issues/1823)
- 修复 `n-page-header` 在不显示头部时内容有 margin-top，关闭 [#1795](https://github.com/TuSimple/naive-ui/issues/1795)
- 修复 `n-avatar` `color` 属性不生效
- 修复 `n-avatar` 内部图标尺寸不正确
- 修复 `n-image` 缺少 scoped style 的 scope-id，关闭 [#1788](https://github.com/TuSimple/naive-ui/issues/1788)
- 修复 `n-radio` 的点击事件会被触发两次，关闭 [#1680](https://github.com/TuSimple/naive-ui/issues/1680)
- 修复 `n-data-table` 当表格为空表格并且设置 min-height 时布局显示错乱，关闭 [#1809](https://github.com/TuSimple/naive-ui/issues/1809)
- 修复 `n-data-table` 总结行有 hover 样式
- 修复 `n-data-table` 固定 group column box-shadow 错误和 right fixed column 的渲染顺序错误，关闭 [#1832](https://github.com/TuSimple/naive-ui/issues/1832)
- 修复 `n-anchor` 的 hover & active 的样式
- 修复 `n-data-table` 在无数据时头部固定列的样式

### Feats

- `n-tree-select` 新增 `menu-props` 属性
- `n-tree-select` 新增 `action` 插槽, 关闭 [#1765](https://github.com/TuSimple/naive-ui/issues/1765)
- `n-tree-select` 新增 `empty` 插槽
- `n-cascader` 新增 `empty` 插槽
- `n-popselect` 新增 `action` 插槽
- `n-popselect` 新增 `empty` 插槽
- `n-data-table` 点击表头半选的勾选框之后会全选，关闭 [#1827](https://github.com/TuSimple/naive-ui/issues/1827)
- `n-button` 的 CSS 变量使用 `n` 作为前缀, 关闭 [#1808](https://github.com/TuSimple/naive-ui/issues/1808)
- `n-date-picker` 新增 `default-time` 属性
- `n-alert` 的 CSS 变量使用 `n` 作为前缀
- `n-date-picker` 属性 `type` 支持 `quarter` 选项
- `n-anchor` 的 CSS 变量使用 `n` 作为前缀

### i18n

- 新增 zhTW locale

## 2.21.5 (2021-12-07)

### Fixes

- 修复 `n-input` 点击清除按钮时不触发 `change` 事件，关闭 [#1754](https://github.com/TuSimple/naive-ui/issues/1754)
- 修复 `n-input-number` 按压上、下方向键改变数值时光标移动的问题，关闭 [#1759](https://github.com/TuSimple/naive-ui/issues/1759)

### Feats

- `n-date-picker` 跟随国际化变化默认日期格式

### i18n

- 新增 frFR locale

## 2.21.4 (2021-12-06)

### Fixes

- 修复 `n-date-picker` 在 `type` 为 `year` 时没有正确的 placeholder
- 修复 `n-element` 未导出 `NEl` 别名
- 修复 `n-upload` 在 `image-card` 模式下，达到最大上传数量后仍然展示上传按钮，关闭 [#1744](https://github.com/TuSimple/naive-ui/issues/1744)
- 修复 `n-form` 的 `FormValidate` 类型缺少 `shouldRuleBeApplied` 参数，关闭 [#1747](https://github.com/TuSimple/naive-ui/issues/1747)
- 修复 `n-upload` 在 `image-card` 模式时在表格中被展示为垂直的样式，关闭 [#1746](https://github.com/TuSimple/naive-ui/issues/1746).
- 修复 `n-upload` 文件列表在不显示触发区域的时候的 margin-top
- 修复 `n-upload` 在响应为 4xx 的情况下文件显示正常状态，关闭 [#1741](https://github.com/TuSimple/naive-ui/issues/1741)

### Feats

- `n-upload` 新增 `show-trigger` 属性
- `n-data-table` 展示树形数据时会忽略长度为 0 的 `children`，关闭 [#1703](https://github.com/TuSimple/naive-ui/issues/1703)

## 2.21.3 (2021-12-03)

### Fixes

- 修复 `n-theme-editor` 点击 button 组件时报错，关闭 [#1708](https://github.com/TuSimple/naive-ui/issues/1708)
- 修复 `n-input` 的颜色在安卓微信浏览器下异常, 关闭 [#1705](https://github.com/TuSimple/naive-ui/issues/1705)
- 修复 `n-input` 的 `borderHover` 主题变量不生效， 关闭 [#1704](https://github.com/TuSimple/naive-ui/issues/1704)
- 修复 `n-dialog` 的 `content` 内容为英文时的换行问题
- 修复 `n-input-number` 不能输入小数值
- 修复 `n-data-table` 的表头和主体可能有错误的圆角，关闭 [#1712](https://github.com/TuSimple/naive-ui/issues/1712)
- 修复 `n-button` `colorOpacityXxx` 主题变量不为 string 类型

### Feats

- `n-switch` 新增 `rail-style` 属性，关闭 [#1718](https://github.com/TuSimple/naive-ui/issues/1718)
- `n-image` 新增 `preview-disabled` 属性，关闭 [#1647](https://github.com/TuSimple/naive-ui/issues/1647)
- `n-image` 新增 `on-load` & `on-error` 属性
- `n-image` 新增 `fallback-src` 属性
- `n-data-table` 新增 `on-update:expanded-row-keys` 属性
- `n-tree` 新增 `watch-props` 属性

## 2.21.2 (2021-11-29)

### Fixes

- 修复 `n-slider` tooltip 禁用时机错误问题
- 修复 `n-slider` 填充色样式错误问题，关闭 [#1670](https://github.com/TuSimple/naive-ui/issues/1670)
- 修复 `n-data-table` 的分页器 `onUpdatePage` 属性会被触发两次, 关闭 [#1666](https://github.com/TuSimple/naive-ui/issues/1666)
- 修复 `n-log` 的 `trim` 属性不能独立使用
- 修复 `n-slider` 对于数值精度的处理问题
- 修复 `n-date-picker` 当 `time-picker` 输入为空时报错，关闭 [#1678](https://github.com/TuSimple/naive-ui/issues/1678)
- 修复 `n-popover` `trigger` 为 `focus` 时不生效
- 修复 `n-scrollbar` 点击在滚动条上时会消失一次
- 修复 `n-popover` 样式中有不合法的行
- 修复 `n-popover` `flip=false` 不生效
- 修复 `n-input-number` 在设定 `max` 或 `min` 后在输入过程中无法输入中间值，关闭 [#1664](https://github.com/TuSimple/naive-ui/issues/1664)
- 修复 `n-input-number` 在连读多次输入超过 `min` 或 `max` 范围的数字后，显示的值不转化为合法值

### Feats

- `n-input-number` 新增 `keyboard` 属性
- 新增 `tableColorStriped` 主题变量，关闭 [#1686](https://github.com/TuSimple/naive-ui/issues/1686)
- `n-notification-provider` 新增 `max` & `placement` 属性
- `n-notification` 新增 `detroyAll` 方法，关闭 [#333](https://github.com/TuSimple/naive-ui/issues/333)
- `n-layout-sider` 新增 `on-after-enter` 和 `on-after-leave` 属性，关闭 [#1241](https://github.com/TuSimple/naive-ui/issues/1241)
- `n-upload` 新增 `custom-request` 属性，关闭 [#1389](https://github.com/TuSimple/naive-ui/issues/1389)
- `n-data-table` 新增 `expanded-row-keys` 属性
- `n-popover` 提供更强的自动位置调整能力，关闭 [#1520](https://github.com/TuSimple/naive-ui/issues/1520)、[#1643](https://github.com/TuSimple/naive-ui/issues/1643)
- `n-input-number` 新增 `update-value-on-input` 属性，关闭 [#1662](https://github.com/TuSimple/naive-ui/issues/1662)
- `n-auto-complete` 新增 `prefix` & `suffix` 插槽

## 2.21.1 (2021-11-23)

### Fixes

- 修复 `n-image` 当放大很大的时候拖动图片移动位置不正确
- 修复 `n-data-table` 在某些行展开后出现的样式问题
- 修复 `n-data-table` 未能正确展开树形数据，关闭 [#1644](https://github.com/TuSimple/naive-ui/issues/1644)

## 2.21.0 (2021-11-21)

### Breaking Changes

- 移除了 `NButton.fontWeightText` & `NButton.fontWeightGhost` 主题变量，如果你需要调整字重，可以使用 `n-button` 的 `strong` 属性

### Feats

- `n-tag` 新增 `avatar` 插槽
- `n-data-table` 新增 `striped` 属性，关闭 [#1552](https://github.com/TuSimple/naive-ui/issues/1552)
- `n-table` 新增 `striped` 属性，关闭 [#1552](https://github.com/TuSimple/naive-ui/issues/1552)
- `n-slider` 新增 `vertical` 属性，关闭 [#1468](https://github.com/TuSimple/naive-ui/issues/1468)
- `n-slider` 新增 `reverse` 属性
- `n-slider` 的 `step` 属性支持 `mark` 选项
- 绕过 Vitejs SSR 渲染问题，关于 [#636](https://github.com/TuSimple/naive-ui/issues/636)
- `n-button` 新增 `strong` 属性
- `n-button` 新增 `secondary` 属性
- `n-button` 新增 `tertiary` 属性
- `n-button` 新增 `quaternary` 属性
- `n-auto-complete` 新增 `input-props` 属性，关闭 [#1610](https://github.com/TuSimple/naive-ui/issues/1610)
- `n-avatar` 新增 `fallback-src` 属性，关闭 [#702](https://github.com/TuSimple/naive-ui/issues/702)
- `n-avatar` 新增 `on-error` 属性
- `n-input` 新增 `select` 方法，关闭[#1328](https://github.com/TuSimple/naive-ui/issues/1328)
- 新增 `n-tab` 组件，关闭 [#1630](https://github.com/TuSimple/naive-ui/issues/1630)
- `n-switch` 新增 `round` 属性，关闭 [#1469](https://github.com/TuSimple/naive-ui/issues/1469)
- `n-step` 新增 `title` 插槽
- `n-menu` 支持 `divider` 类型的选项

### Fixes

- 修复 `suffix` 内部组件 `loading` 属性的默认值
- 修复 `n-space` 没有子节点的时候还被展示，关闭 [#1605](https://github.com/TuSimple/naive-ui/issues/1605)
- 修复 `n-radio` 缺少 `onUpdateChecked` 属性
- 修复 `n-dropdown` 动画闪烁问题，关闭 [#1600](https://github.com/TuSimple/naive-ui/issues/1600)
- 修复 `n-data-table` 的 `clearSorter` 方法没有被正常导出
- 修复 `n-global-style` SSR 报错
- 修复 `n-button` 按下 Enter 会出发两次 click 时间 [#1626](https://github.com/TuSimple/naive-ui/issues/1626)

## 2.20.3 (2021-11-15)

### Fixes

- 修复 `n-grid` 收缩时后缀 girdItem 设置的 span 不起作用，关闭 [#1530](https://github.com/TuSimple/naive-ui/issues/1530)
- 修复 `n-button` 使用 `circle` 属性时在特定场景异常收缩的问题，关闭 [#1557](https://github.com/TuSimple/naive-ui/issues/1557)
- 修复 `input-props` 对于 `type` 属性无法生效的问题，关闭 [#1553](https://github.com/TuSimple/naive-ui/issues/1553)

### Feats

- `n-menu` 添加箭头颜色区分选中未选中，关闭 [#1535](https://github.com/TuSimple/naive-ui/issues/1535)
- `n-menu` 新增 `watch-props` 属性，关闭 [#1536](https://github.com/TuSimple/naive-ui/issues/1536)
- `n-date-picker` 属性 `type` 支持 `year` 选项

### i18n

- 新增 `createLocale` 方法允许用户自定义国际化，关闭 [#1525](https://github.com/TuSimple/naive-ui/issues/1525)

## 2.20.2 (2021-11-05)

### Feats

- `n-modal` 新增 `transform-origin` 属性，关闭 [#1498](https://github.com/TuSimple/naive-ui/issues/1498)
- `n-tabs` 新增 `pane-class` 属性，关闭 [#1500](https://github.com/TuSimple/naive-ui/issues/1500)

### Fixes

- 修复 `n-alert` `contentTextColor` 和 `titleTextColor` 的类型主题变量不起作用，关闭 [#1495](https://github.com/TuSimple/naive-ui/issues/1495)
- 修复 `n-time-picker` 当选择面板通过确认按钮关闭时不会触发 blur 事件, closes [#1499](https://github.com/TuSimple/naive-ui/issues/1499)
- 修复 `n-upload` `UploadFileInfo` 的 `thumbnailUrl` 字段不起作用，关闭 [#1495](https://github.com/TuSimple/naive-ui/issues/1245)
- 修复 `n-button` `keyboard` 属性不起作用，关闭 [#1508](https://github.com/TuSimple/naive-ui/issues/1508)
- 修复 `n-upload` 实例缺少 `openOpenFileDialog` 方法

### i18n

- 新增 deDE locale
- 新增 nbNO locale

## 2.20.1 (2021-11-01)

### Fixes

- 修复 `n-tabs` 在新增 tab 后切换 tab 无法生效，关闭 [#1417](https://github.com/TuSimple/naive-ui/issues/1417)
- 修复 `n-tree` 当指定`children-field`时过滤不生效，关闭 [#1477](https://github.com/TuSimple/naive-ui/issues/1477)
- 修复 `n-cascader` 在自定义字段和 `multiple` 一起使用时无法删除选项
- 修复 `n-select` 使用 `on-create` 创建的选项字段不正确，关闭 [#1482](https://github.com/TuSimple/naive-ui/issues/1482)
- 修复 `n-select` 在过滤状态下点击选项菜单闪动

### Feats

- `n-select` 新增 `menu-props` 属性，关闭 [#1475](https://github.com/TuSimple/naive-ui/issues/1475)
- `n-image` 的 `toolbar` 增加关闭图标，关闭 [#1412](https://github.com/TuSimple/naive-ui/issues/1412)
- `n-tree` 的 `on-load` 属性在 `remote` 模式下 `expanded-keys` 属性改变时被触发，关闭 [#1339](https://github.com/TuSimple/naive-ui/issues/1339)

## 2.20.0 (2021-10-28)

### Breaking Changes

- `n-collapsed-transition` 的 `collapsed` 属性被废弃，请使用 `show` 属性代替，关闭 [#1407](https://github.com/TuSimple/naive-ui/issues/1407)

### Fixes

- 修复 `n-log` `font-size` 属性不生效，关闭 [#1416](https://github.com/TuSimple/naive-ui/issues/1416)
- 修复 `n-loading-bar` 设定 `loading-bar-style` 后不调用 `start` 也会显示一次
- 修复 `n-date-picker` `separator` 不生效，关闭 [#1456](https://github.com/TuSimple/naive-ui/issues/1456)

### Feats

- `n-data-table` 优化底层渲染的逻辑，提升组件性能
- `n-date-picker` 的 `shortcuts` 属性支持传入回调函数
- `n-tab-pane` 属性 `display-directive` 支持 `show:lazy` 选项，关闭 [#1374](https://github.com/TuSimple/naive-ui/issues/1374)
- `n-input` 的 `count` 插槽 s 支持 text 类型，关闭 [#1440](https://github.com/TuSimple/naive-ui/issues/1440)

### i18n

- 新增 idID locale

## 2.19.11 (2021-10-21)

### Fixes

- 修复 `n-upload` 在达到最大文件数量后无法删除文件，关闭 [#1401](https://github.com/TuSimple/naive-ui/issues/1401)

### Feats

- `n-tabs` 新增 `on-before-leave` 属性，关闭 [#1337](https://github.com/TuSimple/naive-ui/issues/1337)
- `n-color-picker` 新增 `show-preview` 属性，关闭 [#1281](https://github.com/TuSimple/naive-ui/issues/1281)

## 2.19.9 (2021-10-18)

### Fixes

- 修复 `n-collapse` 在 `n-collapse-item` 使用 `v-if` 时展开状态丢失，关闭 [#1387](https://github.com/TuSimple/naive-ui/issues/1387)
- 修复 `n-dialog` 的关闭按钮会被内容遮盖，关闭 [#1381](https://github.com/TuSimple/naive-ui/issues/1381)
- 修复 `n-upload` 上传失败后重试时文件为 `null`，关闭 [#1316](https://github.com/TuSimple/naive-ui/issues/1316)
- 修复 `n-cascader` 的 `filter` 属性不生效
- 修复 `n-cascader` 的 `label-field` 属性使 `filter` 失效
- 修复 `n-cascader` 的 `separator` 属性对于过滤菜单无效

### Feats

- `n-menu` 新增 `dropdown-props` 属性，关闭 [#1345](https://github.com/TuSimple/naive-ui/issues/1345)
- `n-input` 新增 `count` 插槽，关闭 [#1314](https://github.com/TuSimple/naive-ui/issues/1314)
- `n-time-picker` 新增 `use-12-hours` 属性，关闭 [#547](https://github.com/TuSimple/naive-ui/issues/547)
- `n-input-number` 新增 `focus` 和 `blur` 方法
- `n-config-provider` 新增 `breakpoints` 属性，关闭 [#1379](https://github.com/TuSimple/naive-ui/issues/1379)

## 2.19.8 (2021-10-14)

### Fixes

- 修复 `n-data-table` `fixed` 样式在表头分组不生效的问题，关闭 [#1341](https://github.com/TuSimple/naive-ui/issues/1341)
- 修复 `n-data-table` 多级表头右侧边框重复
- 修复 `n-scrollbar` 不支持 `scrollTo`，关闭 [#1346](https://github.com/TuSimple/naive-ui/issues/1346)
- 修复 `n-ellipsis` 的 `expand-trigger` 属性在内容不显示提示并且 `tooltip = false` 的时候禁用鼠标样式的问题，关闭 [#1299](https://github.com/TuSimple/naive-ui/issues/1299)
- 修复 `n-upload` 的 `disabled` 属性的样式问题，关闭 [#1237](https://github.com/TuSimple/naive-ui/issues/1237)

### Feats

- `n-auto-complete` 新增 `get-show` 属性，关闭 [#1292](https://github.com/TuSimple/naive-ui/issues/1292)
- `n-select` 新增 `input-props` 属性，关闭 [#1351](https://github.com/TuSimple/naive-ui/issues/1351)
- `n-color-picker` 新增 `swatches` 属性，有关 [#1281](https://github.com/TuSimple/naive-ui/issues/1281)
- `n-upload` 新增 `max` 属性

### i18n

- 新增 jaJP locale

## 2.19.7 (2021-10-12)

### Fixes

- 修复 `n-ellipsis` 的 `expand-trigger` 属性在内容不显示提示的时候禁用鼠标样式的问题，关闭 [#1299](https://github.com/TuSimple/naive-ui/issues/1299)
- 修复 `n-select` `fallback-option` 属性类型，关闭 [#1327](https://github.com/TuSimple/naive-ui/issues/1327)
- 修复 `n-modal` `on-after-enter` 不生效

## 2.19.6 (2021-10-10)

### Fixes

- 修复 `n-menu` 对于 `default-expanded-keys` 的错误警报
- 修复 `useThemeVars` 有时无法使用，关闭 [#1309](https://github.com/TuSimple/naive-ui/issues/1309)
- 修复 `<ul>` 元素的 `list-style` 样式

### Feats

- `n-cascader` 值改变时回调函数提供上层节点的全部 options 值，关闭 [#1235](https://github.com/TuSimple/naive-ui/issues/1235)
- `n-layout` 和 `n-layout-sider` 增加 `on-scroll` 属性，关闭 [#1232](https://github.com/TuSimple/naive-ui/issues/1232)

## 2.19.5 (2021-10-07)

### Fixes

- 修复 `n-form-item` 中组件内容过长影响 `n-form-item` 宽度
- 修复 `n-layout-sider` 中 `arrow-circle` 的 icon 样式
- 修复 `n-upload` 的 `show-preview-button` 属性失效，关闭 [#1238](https://github.com/TuSimple/naive-ui/issues/1238)
- 修复 `n-date-picker` 的 `date` 类型的 `action` 验证错误
- 修复 `n-data-table` 在 `selection` 和 `summary` 一起使用时报错，关闭 [#1276](https://github.com/TuSimple/naive-ui/issues/1276)
- 修复 `n-data-table` 勾选列的宽度在设为 fixed 时候塌陷，关闭 [#1283](https://github.com/TuSimple/naive-ui/issues/1283)
- 修复 `n-popconfirm` 不能被嵌套于 `n-tooltip` 内，关闭 [#872](https://github.com/TuSimple/naive-ui/issues/872).
- 修复 `n-popselect` 勾选图标覆盖了文本，关闭 [#1282](https://github.com/TuSimple/naive-ui/issues/1282)
- 修复 `n-pagination` `buttonColor` 主题变量不生效

### Feats

- `n-breadcrumb-item` 新增 `href` 属性
- `n-descriptions` 新增 `separator` 属性，关闭 [#1263](https://github.com/TuSimple/naive-ui/issues/1263)
- `n-dropdown` 新增 `key-field` 属性
- `n-dropdown` 新增 `label-field` 属性
- `n-dropdown` 新增 `children-field` 属性
- `n-menu` 新增 `key-field` 属性
- `n-menu` 新增 `label-field` 属性
- `n-menu` 新增 `children-field` 属性
- `n-data-table` 支持使用访问属性路径作为列的 key，关闭 [#1271](https://github.com/TuSimple/naive-ui/issues/1271)
- `n-switch` 新增 `checked-value` 属性，关闭 [#1234](https://github.com/TuSimple/naive-ui/issues/1234)
- `n-switch` 新增 `unchecked-value` 属性，关闭 [#1234](https://github.com/TuSimple/naive-ui/issues/1234)
- `n-checkbox` 新增 `checked-value` 属性，关闭 [#1234](https://github.com/TuSimple/naive-ui/issues/1234)
- `n-checkbox` 新增 `unchecked-value` 属性，关闭 [#1234](https://github.com/TuSimple/naive-ui/issues/1234)
- 新增 `n-collapse-transition` 组件，关闭 [#829](https://github.com/TuSimple/naive-ui/issues/829)
- 新增 `n-scrollbar` 组件
- `n-dropdown` 支持 `type='render'` 的选项
- `n-data-table` 支持多列排序
- `n-date-picker` 新增 `first-day-of-week` 属性
- `n-date-picker` 属性 `type` 支持 `month` 选项
- `n-popover` 新增 `to` 属性
- `n-tree` 的 `on-update:indeterminateKeys` 回调新增选项信息
- `n-tree` 的 `on-update:expandedKeys` 回调新增选项信息
- `n-tree` 的 `on-update:checkedKeys` 回调新增选项信息
- `n-tree` 的 `on-update:selectedKeys` 回调新增选项信息

## 2.19.3 (2021-09-28)

### Fixes

- 修复 `n-data-table` 当最后一列未设置 `ellipsis` 时省略失效，关闭 [#934](https://github.com/TuSimple/naive-ui/issues/934)
- 修复 `n-grid-item` 响应式不生效
- 修复 `n-tabs` 在尺寸改变后没有更新滚动阴影状态，关闭 [#1224](https://github.com/TuSimple/naive-ui/issues/1224)

### Feats

- `n-grid-item` 在 `span` 为 0 的时候隐藏，关闭 [#1220](https://github.com/TuSimple/naive-ui/issues/1220)
- `n-grid` 新增 `item-responsive` 属性

## 2.19.2 (2021-09-26)

### i18n

- 新增 ukUA locale

### Fixes

- 修复 `n-global-style` 在首次挂载时应用样式过渡
- 修复 `n-drawer` 边界缺少 transition，关闭 [#1211](https://github.com/TuSimple/naive-ui/issues/1211)
- 修复 `n-input-number` 的 `value` 属性不能为 null 类型
- 修复支持 rtl 的组件 SSR 报错
- 修复有弹出层组件的 SSR 报错
- 修复全局样式覆盖对 select 触发器不生效，关闭 [#1229](https://github.com/TuSimple/naive-ui/issues/1229)

### Feats

- `n-checkbox` 增加 aria 支持
- `n-alert` 增加 aria 支持

## 2.19.1 (2021-09-21)

### Fixes

- 修复 `DialogReactive` 属性不可修改
- 修复 `n-tree-select` 设定 `check-strategy='child'` 在单选时不生效
- 修复 `n-upload` 在 `image-card` 模式下触发区域作为一行唯一元素时被压缩
- 修复 `n-upload-dragger` 边框缺乏过渡
- 修复 `n-upload` 无法上传文件
- 修复 `n-tree` 在 `cascade` 设置为 `false` 时 `checkable` 无法显示勾选框
- 修复 `n-tree-select` 在 `cascade` 或 `multiple` 设置为 `false` 时 `checkable` 无法显示勾选框

## 2.19.0 (2021-09-19)

### Breaking Changes

- `n-layout-sider` 的 `arrow-circle` 类型触发按钮采用了新样式

### Feats

- `n-layout-sider` 新增 `collapsed-trigger-style` 属性
- `n-menu` 添加 `accordion` 属性，关闭 [#917](https://github.com/TuSimple/naive-ui/issues/917)
- `n-input-number` 新增 `readonly` 属性，关闭 [#1198](https://github.com/TuSimple/naive-ui/issues/1198)
- `n-spin` 新增 `description` prop 和 插槽
- `n-anchor` 新增 `type` 属性
- `n-upload` 新增 `abstract` 属性，新增 `n-upload-trigger` 和 `n-upload-file-list` 组件，关闭 [#1102](https://github.com/TuSimple/naive-ui/issues/1102)
- `n-tree` 新增 `indeterminate-keys` 属性
- `n-tree-select` 新增 `indeterminate-keys` 属性
- `n-tree` 新增 `on-update:indeterminate-keys` 属性
- `n-tree-select` 新增 `on-update:indeterminate-keys` 属性
- `n-tabs` 的 `type` 属性新增 `'segment'` 选项，关闭 [#1133](https://github.com/TuSimple/naive-ui/issues/1133)
- `n-popover` 新增 `z-index` 属性，关闭 [#764](https://github.com/TuSimple/naive-ui/issues/764).
- `n-modal` 新增 `on-after-enter` 属性
- `n-modal` 新增 `on-after-leave` 属性

### Fixes

- 修复 `n-select` `filterable` 下关闭标签 input 光标聚焦问题，关闭 [#1170](https://github.com/TuSimple/naive-ui/issues/1170)
- 修复 `n-button` 在 hover 状态下边框与 `n-badge` 冲突，关闭 [#1195](https://github.com/TuSimple/naive-ui/issues/1195)
- 修复 `n-upload` 的 `v-model:file-list` 属性在 `multiple` 属性设为 `true` 的时候没有正确更新，关闭 [#418](https://github.com/TuSimple/naive-ui/issues/418)
- 修复 `useThemeVars` 未应用覆盖的变量值，关闭 [#1194](https://github.com/TuSimple/naive-ui/issues/1194)、[#1176](https://github.com/TuSimple/naive-ui/issues/1176)
- Fix `n-tabs` 在 card 类型时左侧滚动的阴影不显示

## 2.18.2 (2021-09-14)

### Feats

- `n-cascader` 当 `options` 为空时显示 `Empty` 组件，关闭 [#1092](https://github.com/TuSimple/naive-ui/issues/1092)
- `n-cascader` 的 `on-update:value` 属性新增选项参数
- `n-tree` 增加 `check-strategy` 文档属性
- `n-date-picker` 新增 `input-readonly` 属性，关闭 [#1120](https://github.com/TuSimple/naive-ui/issues/1120)
- `n-time-picker` 新增 `input-readonly` 属性，关闭 [#1120](https://github.com/TuSimple/naive-ui/issues/1120)
- `n-config-provider` 新增 `Empty` 组件的全局配置，关闭 [#1092](https://github.com/TuSimple/naive-ui/issues/1092)
- `n-select` 新增 `on-update:show` 属性
- `n-auto-complete` 导出 `AutoCompleteOption` 以及 `AutoCompleteGroupOption` 类型
- `n-page-header` 添加 `RTL` 支持
- `n-select` 支持可变高度选项渲染
- `n-tree-select` 的 `on-update:value` 属性新增选项参数
- `n-select` 的 `on-update:value` 属性新增选项参数
- `n-popselect` 的 `on-update:value` 属性新增选项参数
- `n-card` 新增 `embedded` 属性

### Fixes

- 修复 `n-p` `depth` 传入 number 报错
- 修复 `n-date-picker` 的 `actions` 属性类型
- 修复 `n-select` 无法重写 empty 的主题变量
- 修复 `n-dynamic-tags` 禁用时 add 按钮未被禁用
- 修复 `n-select` 在 filterable 并且菜单无数据是按下 enter 导致菜单关闭
- 修复 `n-auto-complete` 的 `children` 属性不允许使用 `AutoCompleteOption` 类型
- 修复 `n-gi` 的 `collapsed` 在 `n-form-item-gi` 中切换无法生效问题，关闭 [#1160](https://github.com/TuSimple/naive-ui/issues/1160)

## 2.18.1 (2021-09-08)

### Feats

- `useDialog` 选项新增 `style` 属性，关闭 [#1054](https://github.com/TuSimple/naive-ui/issues/1054)
- `n-timeline` 新增 `icon` 插槽，关闭 [#1096](https://github.com/TuSimple/naive-ui/issues/1096)
- `n-timeline` 新增 `icon-size` 属性

### Fixes

- 修复 `n-step` 无法使用 `v-for` 的子元素
- 修复 `n-input-number` 在 `step` 不为小数时不能输入小数

## 2.18.0 (2021-09-07)

### Breaking Changes

- `n-form` & `n-form-item` 拆分 `show-require-mark` 为 `show-require-mark` 和 `require-mark-placement`

### Feats

- `n-drawer` 新增 `on-mask-click` 属性
- `n-form` 新增 `require-mark-placement` 属性，关闭 [#1055](https://github.com/TuSimple/naive-ui/issues/1055)
- `n-form-item` 新增 `require-mark-placement` 属性，关闭 [#1055](https://github.com/TuSimple/naive-ui/issues/1055)

### Fixes

- 修复 `n-step` 必须传 `internal-index`
- 修复 `n-radio-group` 的 `on-update:value` 和 `on-update-value` 类型不能为数组
- 修复 `n-cascader` `check-strategy="child"` 和原有 `leaf-only` 表现不一致

## 2.17.2 (2021-09-06)

### Fixes

- 修复 `n-tree-select` 显示路径是展示 key 而不是 label，关闭 [#1095](https://github.com/TuSimple/naive-ui/issues/1095)

## 2.17.1 (2021-09-06)

### Fixes

- 修复 `n-cascader` 菜单未展示正确的选中 key

## 2.17.0 (2021-09-05)

### Breaking Changes

- `n-tree-select` 的 `leaf-only` 属性被废弃，请使用 `check-strategy="child"`
- `n-cascader` 的 `leaf-only` 属性被废弃，请使用 `check-strategy="child"`
- `n-input` 的 `show-password-toggle` 属性被废弃，请使用 `show-password-on="click"`

### Fixes

- 修复 `n-cascader` 多选模式下点击 tag 删除子选项未更新选中项
- 修复 `n-input` 在 `clearable` 为 `true` 时鼠标离开输入框时中文输入法不正确，关闭 [#905](https://github.com/TuSimple/naive-ui/issues/905)
- 修复 `n-description` 中因 `v-if` 导致的不该出现的警告，关闭 [#1083](https://github.com/TuSimple/naive-ui/issues/1083)
- 修复 `n-layout` 的 `sider-placement` 属性在打包之后不生效，关闭 [#978](https://github.com/TuSimple/naive-ui/issues/978)
- 修复 `n-input-number` 的 `step` 值为小数时计算错误，关闭 [#1007](https://github.com/TuSimple/naive-ui/issues/1007)
- 修复 `n-popselect` 的默认位置和 padding
- 修复 `n-calendar` 禁用日期的字体颜色

### Feats

- `n-cascader` 新增 `onUpdateValue` 方法
- `n-auto-complete` 新增 `onUpdateValue` 方法
- `n-data-table` 的列的 `renderFilterMenu` 新增 hide 参数
- `n-tree` 新增 `key-field` 属性
- `n-tree` 新增 `label-field` 属性
- `n-tree` 新增 `children-field` 属性
- `n-tree-select` 新增 `key-field` 属性
- `n-tree-select` 新增 `label-field` 属性
- `n-tree-select` 新增 `children-field` 属性
- `n-cascader` 新增 `key-field` 属性
- `n-cascader` 新增 `label-field` 属性
- `n-cascader` 新增 `children-field` 属性
- `n-dropdown` 选项新增 `props` 属性，关闭 [#813](https://github.com/TuSimple/naive-ui/issues/813)
- `n-data-table` 支持按住 `shift` 进行多选操作，关闭 [#554](https://github.com/TuSimple/naive-ui/issues/554)
- `n-tree-select` 增加 `check-strategy` 属性，关闭 [#624](https://github.com/TuSimple/naive-ui/issues/624)
- `n-cascader` 增加 `check-strategy` 属性
- `n-message` 选项增加 `keepAliveOnHover` 属性，关闭 [#1036](https://github.com/TuSimple/naive-ui/issues/1036).
- `n-message-provider` 新增 `keep-alive-on-hover` 属性，关闭 [#1036](https://github.com/TuSimple/naive-ui/issues/1036).
- `n-upload` 导出 `UploadFile` 类型
- `n-cascader` 导出 `CascaderOption` 类型
- `n-mention` 导出 `MentionOption` 类型
- `n-transfer` 导出 `TransferOption` 类型
- `n-pagination` 导出 `PaginationInfo` 类型
- `n-data-table` 导出 `DataTableCreateSummary` 类型
- `n-code` 新增 `inline` 属性，关闭 [#834](https://github.com/TuSimple/naive-ui/issues/834)
- `n-collapse` 新增 `header-extra` 插槽，关闭 [#1046](https://github.com/TuSimple/naive-ui/issues/1046)
- `n-input` 新增 `show-password-on` 属性
- `n-upload` 增加 `list-type`、 `show-preview-button`、 `on-preview` 和 `create-thumbnail-url` 属性

## 2.16.7 (2021-08-27)

### Feats

- `n-mention` 新增 `focus`、`blur` 方法

### Fixes

- 修复 `n-mention` 在 input 模式下菜单距离文字太远
- 修复 `n-tree` 节点无法展开的问题

## 2.16.6 (2021-08-26)

### Feats

- `n-timeline` 新增 `horizontal` 属性，关闭 [#887](https://github.com/TuSimple/naive-ui/issues/887)
- `n-image` 新增 `preview-src` 属性，关闭 [#922](https://github.com/TuSimple/naive-ui/issues/922)
- `n-dynamic-tags` 新增 `input` 和 `add` 插槽，关闭 [#499](https://github.com/TuSimple/naive-ui/issues/499)
- `n-timeline-item` 新增 `color` 属性

### Fixes

- 修复 `n-image` 切换图像后没有初始化 `rotate`，关闭 [#921](https://github.com/TuSimple/naive-ui/issues/921)
- 修复 `n-data-table` 的 loading 不在中间，关闭 [#929](https://github.com/TuSimple/naive-ui/issues/929)
- 修复 `n-tree` 当 onLoad 回调没有添加 children 时抛出错误，关闭 [#772](https://github.com/TuSimple/naive-ui/issues/772)
- 修复 `n-input` 当传递 `value=ref(0)` 时，同时显示 0 和占位符问题，关闭 [#914](https://github.com/TuSimple/naive-ui/issues/914)
- 修复 `n-data-table` `flex-height` 在不设定 `scroll-x` 的时候不生效，关闭 [#952](https://github.com/TuSimple/naive-ui/issues/952)

## 2.16.5 (2021-08-20)

### Feats

- `n-input-number` 新增 `clearable` 属性
- `n-form` 新增 `show-label` 属性，关闭 [#858](https://github.com/TuSimple/naive-ui/issues/858)

### Fixes

- 修复 `n-notification` 导出的 `NotificationReactive` 类型不可变，关闭 [#876](https://github.com/TuSimple/naive-ui/issues/876)
- 修复 `n-tabs` 不同类型嵌套样式错乱，关闭 [#850](https://github.com/TuSimple/naive-ui/issues/850)
- 修复 `n-dropdown` 内部的链接点击触发区域不是整个选项，关闭 [#823](https://github.com/TuSimple/naive-ui/issues/823)
- 修复 `n-popover` 嵌套于不同 placement 的 popover 中箭头位置错乱，关闭 [#916](https://github.com/TuSimple/naive-ui/issues/916)
- 修复 `n-ellpisis` 在更新内容后失效，关闭 [#776](https://github.com/TuSimple/naive-ui/issues/776)

## 2.16.4 (2021-08-16)

### Fixes

- 修复 ruRU locale 导出

## 2.16.3 (2021-08-16)

### i18n

- 新增 ruRU locale [#852](https://github.com/TuSimple/naive-ui/pull/852)

### Feats

- `n-message-provider` 新增 `container-style` 属性
- `n-message-provider` 新增 `placement` 属性
- `n-message` 增加类用于区分类型
- `n-date-picker` 新增 `shortcuts` 属性，关闭 [#280](https://github.com/TuSimple/naive-ui/issues/280)

### Fixes

- 修复 `n-rate` 在深色模式下半个星星重叠
- 修复 `n-menu` 使用 `render-icon` 在返回值为 `true` 时渲染有误
- 修复 `n-space` 在使用 `v-if` 时渲染空的占位，关闭 [#824](https://github.com/TuSimple/naive-ui/issues/824)

## 2.16.2 (2021-08-09)

### Feats

- `n-message-provider` 新增 `closable` 属性，关闭 [#795](https://github.com/TuSimple/naive-ui/issues/795)
- `n-tree-select` 新增 `show-path` 属性，关闭[#625](https://github.com/TuSimple/naive-ui/issues/623)
- `n-layout` 增加 `sider-placement` 属性，关闭 [#566](https://github.com/TuSimple/naive-ui/issues/566)

### Fixes

- 修复 `n-avatar` 的缩放在使用 `v-show` 时不正确，关闭 [#779](https://github.com/TuSimple/naive-ui/issues/779)
- 修复 `n-menu` 在手机端点击菜单的时候出现蓝色背景问题，关闭 [#799](https://github.com/TuSimple/naive-ui/issues/799)
- 修复 `n-select` 可过滤的选择器失效，关闭 [#510](https://github.com/TuSimple/naive-ui/issues/510)
- 修复 `n-data-table` 当全选选中时，全选的状态显示不应该包含被禁用的行，关闭 [#778](https://github.com/TuSimple/naive-ui/issues/778)
- 修复 `n-color-picker` 的 `on-complete` 回调参数 `value` 值不正确，关闭 [#748](https://github.com/TuSimple/naive-ui/issues/748)

## 2.16.1 (2021-08-06)

### Feats

- `n-loading-bar-provider` 新增 `loading-bar-style` 属性，关闭 [#457](https://github.com/TuSimple/naive-ui/issues/457)
- `n-button` 新增 `text-color` 属性
- `n-form` 导出 `FormValidationError` 类型
- `n-popconfirm` 支持不显示操作组件，关闭 [#770](https://github.com/TuSimple/naive-ui/issues/770)

### Fixes

- 修复 `n-slider` 丢失浮点数小数精度，关闭 [#751](https://github.com/TuSimple/naive-ui/issues/751)
- 修复 `n-data-table` `onUpdatePage` 和 `onUpdatePageSize` 在使用 jsx 时不触发的问题
- 修复 `n-progress` 的 `percentage` 属性默认值不能适应多种类型
- 修复 `n-select` 当选项禁用时未隐藏关闭图标
- 修复 `n-modal` 使用自定义内容无法正常关闭，关闭 [#788](https://github.com/TuSimple/naive-ui/issues/788)

## 2.16.0 (2021-08-02)

### Breaking Changes

- `useLoadingBar` 中 `finish` 方法只有在调用过 `start` 后才生效
- `n-input` 的 `type='input'` 被重命名为 `type='text'`

### Feats

- `n-scrollbar` 增加 `scrollbarWidth`、`scrollbarHeight` 和　`scrollbarBorderRadius`　公共主题变量，关闭 [#649](https://github.com/TuSimple/naive-ui/issues/649)
- `n-menu` 在 `render-icon` 返回 falsy 值的时候不渲染 icon 的占位符，关闭 [#722](https://github.com/TuSimple/naive-ui/issues/722)
- `n-menu` 新增 `render-extra` 属性
- `n-select` 新增 `on-clear` 属性
- `n-form` 增加 `disabled` 属性，关闭 [#538](https://github.com/TuSimple/naive-ui/issues/538)
- `n-dynamic-tags` 新增 `max` 属性

### Fixes

- 修复 `n-dropdown` 循环渲染时点击异常
- 修复 `n-modal` 使用预设时无法自定义类，关闭 [#744](https://github.com/TuSimple/naive-ui/issues/744)
- 修复 `n-cascader` 的菜单虚拟滚动时宽度展示不一致问题，关闭 [#728](https://github.com/TuSimple/naive-ui/issues/728)

## 2.15.11 (2021-07-29)

### Fixes

- 修复 `n-data-table` pagination 的报错

## 2.15.10 (2021-07-29)

### Feats

- `n-pagination` 新增 `prev`、`next` 插槽，有关 [#648](https://github.com/TuSimple/naive-ui/issues/648)
- `n-tag` 新增 `color`，关闭 [#693](https://github.com/TuSimple/naive-ui/issues/693)
- `n-dynamic-tags` 新增 `color`，关闭 [#693](https://github.com/TuSimple/naive-ui/issues/693)
- `n-time-picker` 优化 now 按钮的逻辑，关闭 [#401](https://github.com/TuSimple/naive-ui/issues/401)
- `n-pagination` `PaginationInfo` 增加 `itemCount` 属性，关闭 [#585](https://github.com/TuSimple/naive-ui/issues/585)

### Fixes

- 修复 `n-message` 的 `destroyAll` 方法不生效
- 修复 `n-timeline` 的 header 插槽 单独使用无效的问题
- 修复 `n-select` 当属性是 `disabled` 和 `filterable` 时样式错误，关闭 [#698](https://github.com/TuSimple/naive-ui/issues/698)
- 修复 `n-upload` 拥有 `file-list` & `disabled` 属性时操作按钮仍然显示，关闭 [#668](https://github.com/TuSimple/naive-ui/issues/668)

## 2.15.9 (2021-07-28)

### Feats

- `n-message` 增加 `destroyAll` 方法
- `n-input-number` 增加 `prefix`、`suffix` 插槽 s，关闭 [#609](https://github.com/TuSimple/naive-ui/issues/609)

### Fixes

- 修复 `n-message` 的 options 中 `duration` 配置无效

## 2.15.8 (2021-07-27)

### Feats

- `n-menu` 新增 `expand-icon` 属性，关闭 [#414](https://github.com/TuSimple/naive-ui/issues/414)
- `n-descriptions`，`n-descriptions-item` 增加 `label-style` 和 `content-style` 属性，关闭 [#536](https://github.com/TuSimple/naive-ui/issues/536)

### Fixes

- 修复 `n-data-table` `n-spin`的样式穿透问题，关闭 [#663](https://github.com/TuSimple/naive-ui/issues/663)

## 2.15.7 (2021-07-25)

### Feats

- `n-dropdown` 选项新增 `show-arrow`属性，关闭 [#647](https://github.com/TuSimple/naive-ui/issues/647)
- `n-time-picker` 增加 `actions` 属性，关闭 [#401](https://github.com/TuSimple/naive-ui/issues/401)
- `n-mention` 新增 `render-label` 属性
- `n-switch` 增加 `checked`、`unchecked` 插槽
- `n-switch` 增加 `loading` 属性，关闭 [#301](https://github.com/TuSimple/naive-ui/issues/301)
- `n-select` 按下箭头会打开菜单，有关 [#300](https://github.com/TuSimple/naive-ui/issues/300)
- `n-tree-select` 按下箭头会打开菜单，有关 [#300](https://github.com/TuSimple/naive-ui/issues/300)
- `n-cascader` 按下箭头会打开菜单，有关 [#300](https://github.com/TuSimple/naive-ui/issues/300)
- `n-popover` 的 `trigger` 属性支持 `'focus'`，关闭 [#477](https://github.com/TuSimple/naive-ui/issues/477)
- `n-message-provider` 新增 `duration` 和 `max` 属性
- `n-data-table` 新增 `flex-height` 属性，关闭 [#596](https://github.com/TuSimple/naive-ui/issues/596)

### Fixes

- 修复 `n-carousel` 中箭头按钮在特定浏览器下无法显示问题，关闭 [#625](https://github.com/TuSimple/naive-ui/issues/625)
- 修复 `n-layout-sider` `width` 不能为字符串，关闭 [#607](https://github.com/TuSimple/naive-ui/issues/607)
- 修复 `n-slider` `disabled` 属性不生效，关闭 [#641](https://github.com/TuSimple/naive-ui/issues/641)
- 修复 `n-input` 在只读时仍展示清除按钮
- 修复 `n-data-table` 在 table-layout 为 auto 时不展示滚动条，关闭 [#518](https://github.com/TuSimple/naive-ui/issues/518)
- 修复 `n-data-table` 无数据时头部 checkbox 显示状态不正确
- 修复 `n-data-table` header 和 body 滚动不同步

## 2.15.6 (2021-07-23)

### Feats

- `n-menu` 新增 `render-icon` 属性
- `n-upload` 新增 `show-file-list` 属性
- `n-dropdown` 新增 `render-icon` 属性
- `n-checkbox-group` 新增 `min` 和 `max` 属性
- `n-mention` 新增 `empty` 插槽
- `useDialog` 选项新增 `on-mask-click`属性，关闭 [#419](https://github.com/TuSimple/naive-ui/issues/419)
- `n-space` `justify` 属性支持 `center`、`space-around` 和 `space-between`
- `n-date-picker` 新增 `close-on-select` 属性，关闭 [#541](https://github.com/TuSimple/naive-ui/issues/541)
- `n-dialog` 新增 `action` 属性，关闭 [#550](https://github.com/TuSimple/naive-ui/issues/550)
- `n-mention` 的 `option.label` 支持使用渲染函数
- `n-color-picker` 新增 `actions` 属性，关闭 [#319](https://github.com/TuSimple/naive-ui/issues/319)

### Fixes

- 修复 `n-space` 中 `display: grid` 的元素显示不正确，关闭 `https://github.com/TuSimple/naive-ui/issues/546`
- 修复 `n-dropdown` 的 `render-label` 属性对 group 类型 option 失效
- 修复 `n-datatable` 的 `scroll-x` 属性设置后 table 内容宽度未占满容器宽度，关闭 [#518](https://github.com/TuSimple/naive-ui/issues/518)
- 修复 `n-descriptions` 无法使用 `v-for` 的子元素
- 修复 `n-dialog` `positive-text` 为空仍然显示按钮，关闭 [#549](https://github.com/TuSimple/naive-ui/issues/549)
- 修复 `n-pagination` `PaginationInfo` 的 `endIndex` 数据错误，关闭 [#584](https://github.com/TuSimple/naive-ui/issues/584)
- 修复 `n-data-table` `rowClassName` 的类型是 string 的时候不生效问题，关闭 [#582](https://github.com/TuSimple/naive-ui/issues/582)

## 2.15.5 (2021-07-16)

### Feats

- `n-tree` 新增 `render-label`、`render-prefix` 和 `render-suffix` 属性
- `n-rate` 新增 `allow-half` 属性
- `n-carousel` 新增 `show-arrow` 属性
- `n-slider` 新增 `format-tooltip` 属性
- `n-upload` 在 `on-finish` 回调参数中新增 `event`
- `n-rate` 新增 `readonly` 属性
- `n-time-picker` 新增 `seconds`、`minutes`、`hours`属性
- `n-notification` 导出 `NotificationApi`、`NotificationOptions` 和 `NotificationReactive` 类型
- `n-avatar` 新增 `on-error` 属性，关闭[#394](https://github.com/TuSimple/naive-ui/issues/394)
- `n-image` 新增 `on-error` 属性，关闭[#394](https://github.com/TuSimple/naive-ui/issues/394)
- `n-image` 新增 `object-fit` 属性，关闭[#394](https://github.com/TuSimple/naive-ui/issues/394)
- `n-avatar` 新增 `object-fit` 属性，关闭[#394](https://github.com/TuSimple/naive-ui/issues/394)
- `n-menu` 默认展开选中项的全部父级，关闭[#481](https://github.com/TuSimple/naive-ui/issues/481)

### Fixes

- 修复 `n-calendar` 的 `default-value` 属性无法使用
- 修复 `n-pagination` `item-count` 为 0 时页数不对
- 修复 `n-scrollbar` `content-style` 无法覆盖默认样式的宽度
- 修复 `n-select` placeholder transition
- 修复 `n-loading-bar` `useLoadingBar` 返回类型可能为 undefined
- 修复 `n-tag` 的 `type` 增加 `primary`　类型
- 修复 `n-dynamic-tags` 的 `type` 增加 `primary`　类型

## 2.15.4 (2021-07-09)

### Feats

- `n-steps` 新增 `'finish'` 和 `'error'` 状态下的图标定制
- `n-tree` 导出 `TreeDragInfo` & `TreeDropInfo` 类型
- `n-empty` 导出 `icon` 插槽
- `useDialog` 选项增加 `maskClosable` 属性，关闭 [#420](https://github.com/TuSimple/naive-ui/issues/420)

### Fixes

- 修复 `n-data-table` 在只有一侧固定列时固定列阴影不更新
- 修复 `n-data-table` 在未设定 `props.scrollX` 但为每个列设定宽度后固定列阴影不更新
- 修复 `n-result` 图片在 Safari 和手机端不显示
- 修复 `n-drawer-content` 的 `header-style` 样式未应用于头部
- 修复 `n-dialog` 实例调用 `destroy` 函数错误
- 修复 `n-select` 自定义 label 的显示问题，关闭 [#352](https://github.com/TuSimple/naive-ui/issues/352)
- 修复 `n-image-group` 当切换图片预览时，初始化缩放比例 [#423](https://github.com/TuSimple/naive-ui/issues/423)
- 修复 `n-carousel` 设定 `autoplay` 点击后 dot active 状态不正常，关闭 [#434](https://github.com/TuSimple/naive-ui/issues/434)
- 修复 `n-input` 清空按钮位置引起的样式问题，关闭 [#428](https://github.com/TuSimple/naive-ui/issues/428)
- 修复 `n-image` 不接受 attributes
- 修复 `n-image` 设定 border-radius 无效，关闭 [#427](https://github.com/TuSimple/naive-ui/issues/427)
- 修复 `n-tab-pane` 再没有子节点时报错
- 修复 `n-select` clear 按钮在 `n-spin` 内过大，关闭 [#454](https://github.com/TuSimple/naive-ui/issues/454)
- 修复 `n-select` 选项没有被正常更新，关闭 [#441](https://github.com/TuSimple/naive-ui/issues/441)

## 2.15.3 (2021-07-05)

### Feats

- `n-loading-bar` 导出 `LoadingBarApi` 类型
- `n-image` 增加 `img-props` 属性
- 在部分组件上添加原生 `title` 属性，以提高用户体验
- `n-tree` 在 TreeOption 中增加 `prefix` 和 `suffix` 属性
- `n-carousel` 增加 `dot-placement` 属性
- `n-auto-complete` 新增 `loading` 属性，关闭 [#241](https://github.com/TuSimple/naive-ui/issues/241)
- `n-slider` 增加 `tooltip` 属性，关闭 [#362](https://github.com/TuSimple/naive-ui/issues/362)
- `n-input` 新增 `loading` 属性

### Fixes

- 修复 `n-upload` `multiple=false` 对于拖拽不生效，关闭 [#363](https://github.com/TuSimple/naive-ui/issues/363)
- 修复 `n-dropdown` 中 `<a />` 的样式
- 修复 `n-menu` tooltip 中 `<a />` 的样式，关闭 [#338](https://github.com/TuSimple/naive-ui/issues/338)
- 修复 `n-carousel` 无法使用 `v-for` 的子元素
- 修复 `n-form` `label-align` 属性失效，关闭 [#213](https://github.com/TuSimple/naive-ui/issues/213)
- 修复 `n-data-table` 在不设定 `max-height` 时固定列阴影失效，关闭 [#376](https://github.com/TuSimple/naive-ui/issues/376)

## 2.15.2 (2021-07-02)

### Feats

- `n-carousel` 增加 `trigger` 属性增加触发切换的方式
- `n-menu` 新增 `dropdown-placement` 属性
- `n-upload` 新增 `before-upload` 属性
- `n-image` 新增 `alt` 属性.
- 支持小键盘的 enter 键
- `n-spin` 支持 `icon` 插槽为了自定义加载图标，closes[#260](https://github.com/TuSimple/naive-ui/issues/260)
- `n-spin` 新增 `rotate` 属性控制自定义加载图标是否有旋转动画
- `n-form` 导出 `FormItemRule` & `FormRules` 类型
- `n-select` 新增 `render-tag` 属性

### Fixes

- 修复 `n-log` 在未设定语言时仍然对缺少 highlight.js 报错，关闭 [#327](https://github.com/TuSimple/naive-ui/issues/327)
- 移除 `n-calendar` 无用的 console.log
- 修复 loading-bar 自动消失，关闭 [#343](https://github.com/TuSimple/naive-ui/issues/343)
- 修复 `n-select` 打开菜单时没有自动滚动到选中项，关闭 [#346](https://github.com/TuSimple/naive-ui/issues/346)
- 修复 `n-tab-pane` 在使用 v-if 时报错
- 修复 `n-modal` `on-negative-click` 返回 false 时 modal 依然关闭
- 修复 `n-collapse` 在 accordion 模式下默认指定展开属性无效，关闭 [#350](https://github.com/TuSimple/naive-ui/issues/350)
- 修复 `n-tag` 缺少 `on-update-checked` 属性
- 修复 `n-menu` 折叠时 `render-label` 对于 dropdown 不生效

## 2.15.1 (2021-06-30)

- 修复缺少 `web-types.json`

## 2.15.0 (2021-06-29)

### Breaking Changes

- `n-select` 的 `SelectOption` `render` 属性不再渲染 label 而是整个选项

### Feats

- `n-carousel` 支持触控操作，关闭 [#271](https://github.com/TuSimple/naive-ui/issues/271)
- `n-input` 新增 `input-props` 属性
- `n-message` 优化 `useMessage` 当没有 `n-message-provider` 时的报错信息，增加关联的文档链接
- 为 webstorm 添加 `web-types.json`，但是我还是推荐使用 VSCode 和 Volar，`web-types.json` 只能为编码提供很有限的信息
- `n-tree-select` 新增 `leaf-only` 属性
- `n-tree` 新增 `leaf-only` 属性
- `n-select` 的 `SelectOption` 的 `label` 属性支持渲染函数
- `n-select` 新增 `render-option` 属性
- `n-select` 导出 `SelectOption` & `SelectGroupOption` 类型
- `n-popover` 支持使用 `header` 插槽
- `n-dropdown` 新增 `render-label` 属性

### Fixes

- 修复 `n-date-picker` `n-provider` 传递 `date-locale` 属性无效，关闭 [#250](https://github.com/TuSimple/naive-ui/issues/250)
- Fix `n-input` clear button placeholder prevent clicking on actual component [#288](https://github.com/TuSimple/naive-ui/issues/288)
- 修复 `n-carousel` 点击当前页对应的控制按钮时，组件显示异常
- 修复 `n-menu` 折叠时 `render-label` 对于 tooltip 不生效
- 修复 `n-dropdown` 不能在选项中渲染 `n-popover`

## 2.14.0 (2021-06-23)

### Breaking Changes

- `n-element` 移除了 `abstract` 属性
- `n-element` 不再在 default 插槽 返回主题变量，请使用 `useThemeVars` 代替

### Feats

- 新增 `n-carousel` 组件
- 新增 `useThemeVars` 函数提供主题变量
- `n-upload` 新增 `on-update:file-list` 属性，关闭 [#135](https://github.com/TuSimple/naive-ui/issues/135)
- `n-date-picker` 新增 `update-value-on-close` 属性

### Fixes

- 修复 `n-select` 在可过滤单选模式下在 iOS Safari 无法输入，关闭 [#230](https://github.com/TuSimple/naive-ui/issues/230)
- 修复 `n-input-number` 缺少 `on-update-value` 属性
- 修复 `n-input-number` 值无法为 `null`
- 修复 `n-input-number` 的按钮在值清空后无法使用，关闭 [#251](https://github.com/TuSimple/naive-ui/issues/251)
- 修复 `n-data-table` 展开图标光标样式不是 pointer，关闭 [#261](https://github.com/TuSimple/naive-ui/issues/261)

## Refactors

- `n-input-number` 会直接聚焦，关闭 [#244](https://github.com/TuSimple/naive-ui/issues/244)

## 2.13.0 (2021-06-21)

### Feats

- `n-dropdown` 新增 `on-clickoutside` 属性，关闭 [#123](https://github.com/TuSimple/naive-ui/issues/123)
- `n-menu` 新增 `render-label` 属性，关闭 [#84](https://github.com/TuSimple/naive-ui/issues/84)
- `n-tree` 支持键盘操作
- 新增 `n-tree-select` 组件

### Fixes

- 修复 `n-tree` 缺少 `on-update-expanded-keys`、`on-update-selected-keys`、`on-update-checked-keys` 属性
- 修复 `n-tree` 拖拽悬浮叶节点报错，关闭 [#200](https://github.com/TuSimple/naive-ui/issues/200)
- 修复 `n-tree` 对 `selected-keys` 属性影响原数组
- 修复 `n-select` 在 multiple filterable 模式下输入框有无用的空行
- 修复 `n-button` 的 loading 图标在 iOS Safari 上不显示，关闭 [#219](https://github.com/TuSimple/naive-ui/issues/219)
- 修复 `n-date-picker` 非 clearable 不显示图标
- 修复 `n-time-picker` clearable 状态下图标位置不正确，关闭 [#222](https://github.com/TuSimple/naive-ui/issues/222)

## 2.12.2 (2021-06-19)

### Fixes

- 修复 `n-form-item` 始终展示必需的星号

## 2.12.1 (2021-06-19)

### Feats

- `n-form`、`n-form-item` 增强 `show-require-mark` 属性，关闭 [#171](https://github.com/TuSimple/naive-ui/issues/171)
- `n-dropdown` 支持 class 属性，关闭 [#180](https://github.com/TuSimple/naive-ui/issues/180)
- `n-input` 新增 `show-password-toggle` 属性
- `n-popselect` 支持 class 属性
- `n-select` 新增 `render-label` 属性
- `n-popselect` 新增 `render-label` 属性

### Fixes

- 修复 `n-input` 中英文字符切换输入时抖动，关闭[#174](https://github.com/TuSimple/naive-ui/issues/174)
- 修复 `n-icon` 在使用 setup script 时，`$parent` 默认是一个空对象，访问 `$parent.$options` 会是 `undefined`
- 修复 `n-notification` 位置不正确
- 修复 `n-message` 的 content & option 类型不正确

## 2.12.0 (2021-06-16)

### Breaking Changes

- 移除了 `n-a` 的 `to` 属性。现在如果你需要把 `n-a` 用作 router-link，你可以参考文档网站

### Feats

- `n-tree` 选项支持 `disabled` & `checkboxDisabled` 属性
- `n-input-number` 支持键盘的上键和下键操作

### Fixes

- 修复 `n-cascader` 在 win10 Chrome 环境下文字模糊的问题
- 修复 `n-tree` 在 block line 模式下点击缩进空白无法触发选择

## 2.11.12 (2021-06-16)

### Feats

- `n-drawer-content` 新增 `closable` 属性，关闭 [#139](https://github.com/TuSimple/naive-ui/issues/139)
- `n-element` 向 default 插槽 传递 `themeVars`
- `n-element` 新增 `abstract` 属性

### Fixes

- 修复 `n-radio-group` 不触发 form-item 验证
- 修复 `n-auto-complete` 无法自定义元素

## 2.11.11 (2021-06-15)

### Feats

- `n-tag` 添加 `RTL` 支持

### Fixes

- 将 `vue` 和 `vue-router` 移至 peer dependencies 避免重复打包

## 2.11.9 (2021-06-15)

### Feats

- `n-space` 支持 wai-aria
- `n-button-group` 支持 wai-aria
- `n-progress` 支持 wai-aria
- `n-menu` 支持使用 `<a />` 和 `<router-link />` 作为 label，关闭 [#84](https://github.com/TuSimple/naive-ui/issues/84)
- `n-input-number` 新增 `show-button` 属性
- `n-rate` 支持使用 default 插槽 自定义图标
- `n-rate` 新增 color 属性
- `n-rate` 新增 size 属性

### Fixes

- 修复 `n-card` 的 `header-style` 没有应用于 header 上 [#103](https://github.com/TuSimple/naive-ui/issues/103)
- 修复 `n-dialog` 的 `destroyAll` 方法缺失
- 修复 `n-data-table` 缺少 `on-update-sorter`、`on-update-filters`、`on-update-page`、`on-update-page-size` 属性

## 2.11.8 (2021-06-13)

### Feats

- `n-data-table` 导出 `DataTableCreateRowClassName`、`DataTableCreateRowKey`、`DataTableCreateRowProps` 类型

### Fixes

- 修复 `n-calendar` 的 `on-update:value` 属性类型
- 修复 `n-form-item` 的 `grid-template-columns` 样式属性对子元素布局的影响 [#93](https://github.com/TuSimple/naive-ui/pull/93)
- 修复 `n-data-table` 的 `rowKey`、`rowClassName`、`rowProps`、`summary` 属性类型和期望值不兼容

## 2.11.7 (2021-06-12)

### Fixes

- 修复 `n-slider` 在 touchstart 发生时没有阻止滚动
- 修复 `n-color-picker` 默认值不跟随模式设定
- 修复缺少 `lodash` & `lodash-es` 类型

## 2.11.6 (2021-06-11)

### Feats

- `n-spin` 的 `size` 属性支持 number 类型
- `n-date-picker` 支持 `footer` 插槽

### Fixes

- 修正 `n-slider` 不支持触摸事件
- 修正 `n-button` 在 head 内部的 script 被引入造成崩溃 [#68](https://github.com/TuSimple/naive-ui/pull/68)
- 修正 `n-spin` 动画闪烁
- 修正 `n-menu` 缺少 `on-update-value` 和 `on-update-expanded-keys` 属性
- 修正 `n-popconfirm` icon 插槽 不生效
- 修正 `n-tabs` 在控制台输出无用信息
- 修正 `n-color-picker` 设定 `modes` 无效 [#77](https://github.com/TuSimple/naive-ui/issues/77)

## 2.11.5 (2021-06-10)

### Feats

- `n-dropdown` 新增 `disabled` 属性
- `n-card` 增加 `:target` 的样式

### Fixes

- 修复 `n-popover` 有时在手动模式不会同步位置
- 修复 `n-transfer` 的无数据 Icon 没有开关动画
- 修复 `n-message` API 的 option 不是可选的
- 修复 `n-calendar` 展示日期计算错误
- 修复 `n-input` 缺失 `password` 的声明
- 修复 `n-menu` 的菜单和子菜单的 `extra` 属性的类型定义
- 修复 `n-dropdown` 选项鼠标形状不是 pointer

## 2.11.4

### Feats

- `n-button` 支持 wai-aria
- `n-card` 支持 wai-aria
- `n-switch` 支持 wai-aria
- `n-menu` 部分支持 wai-aria
- `n-divider` 部分支持 wai-aria
- `n-data-table` 新增 `row-props` 属性
- `n-date-picker` 新增 `ranges` 属性

### Fixes

- 修正 `n-tab-pane` `display-directive` 不生效
- 修正 `n-drawer` 动画
- 修正 `n-scrollbar` 在 windows chrome 有重叠轨道

## 2.11.3

### Fixes

- 修复 `n-collapse` `default-expanded-names` 不生效

## 2.11.2

### Fixes

- 修复 `n-dropdown` 默认位置不是 `bottom`
- 修复 `n-date-picker` 输入组件在 `date` & `datetime` 类型下未设定主题
- 修复 `n-config-provider` 没有合并继承的主题

### Feats

- `n-collapse` 新增 `arrow` 插槽

## 2.11.1

更新 package.json & README.md

## 2.11.0

### Breaking Changes

- `n-affix` 的 `listen-to` 属性默认为 `document` (曾为首个可滚动的父节点)

### Feats

- `n-affix` 的 `listen-to` 属性支持 `Window | Document | HTMLElement`
- `n-anchor` 新增 `offset-target` 属性
- `n-select` 新增 `virtual-scroll` 属性
- `n-select` 新增 `consistent-menu-width` 属性
- `n-date-picker` 在确认后再更新值

### Fixes

- 修正 `n-date-picker` 在没有值的状态下起始日期 disabled 状态不正确
- 修正 `n-input-number` 在 blur 后不会恢复有效的值
- 修正 `n-date-picker` 在值为 null 的时候仍然显示选中日期

### Deprecated

- 废弃了 `n-affix` 的 `offset-top` 属性，请使用 `trigger-top` 代替
- 废弃了 `n-affix` 的 `offset-bottom` 属性，请使用 `trigger-bottom` 代替
- 移除了 `n-anchor` 的 `listen-to` 属性

## 2.10.0

### Breaking Changes

- `n-popover` 的 `placement` 属性默认值设为 `'top'`

### Feats

- `n-tabs` 新增 `on-close` 属性
- `n-tabs` 新增 `on-add` 属性
- `n-tab-pane` 新增 `tab` 插槽
- `n-tab-pane` 的 `tab` 属性支持渲染函数和 VNode
- `n-tabs` 的 `type` 新增 `'line'` 选项
- `n-tabs` 添加阴影来展示滚动状态
- `n-tabs` 新增 `pane-style` 属性

### Fixes

- 修正 `n-layout` `scrollTo` 方法在原生滚动时不生效

### Deprecated

- `n-tab-pane` 的 `label` 属性被废弃，请使用 `tab` 属性代替

## 2.9.0

### Breaking Changes

- `n-layout-sider` 移除了 `show-content`，使用 `show-collapsed-content` 代替

### Feats

- `n-data-table` 支持树形数据
- `n-data-table` 新增 `cascade` 属性
- `n-data-table` 新增 `children-key` 属性
- `n-data-table` 新增 `indent` 属性
- `n-button` 新增 `tag` 属性
- `n-data-table` 新增 `table-layout` 属性
- `n-tree` 新增 `block-line` 属性
- `n-tree` 支持拖放
- `n-menu` 新增 `inverted` 属性
- `n-dropdown` 新增 `inverted` 属性
- `n-tabs` 新增 `addable` 属性
- `n-tabs` 新增 `tab-style` 属性
- `n-tabs` 新增 `tabs-padding` 属性
- `n-tabs` 新增 `default-value` 属性
- `n-layout-sider` & `n-layout-footer` & `n-layout-header` 新增 `inverted` 属性
- `n-data-table` 的 `max-height` & `min-height` 属性接受 CSS 属性
- `n-layout` & `n-layout-content` 新增 `embedded` 属性

### Fixes

- `n-layout` & `n-layout-sider` 的 `scrollTo` 在使用原生滚动条时不生效
- `n-layout-sider` 的 `collapse-mode` 属性不生效
- 内部 selection 组件的主题 peers 中 popover 的 key 不正确

## 2.8.0

### Perf

- 优化 `n-data-table` 初始渲染次数
- 优化 `n-select` 首次打开后打开用时
- 优化 `n-anchor` 滚动性能

### Feats

- `n-tree` 新增 `virtual-scroll` 属性
- `n-data-table` 新增 `virtual-scroll` 属性
- `n-cascader` 新增 `virtual-scroll` 属性
- `n-pagination` 新增 `item-count` 属性
- `n-pagination` 新增 `prefix` 属性
- `n-pagination` 新增 `prefix` 插槽
- `n-pagination` 新增 `suffix` 属性
- `n-pagination` 新增 `suffix` 插槽
- `n-input` 新增 `show-count` 属性

### Fixes

- 修正 `n-layout-sider` 折叠后不显示菜单
- 修正 `n-input-number` 在输入不合法 blur 时没有重设回原始值
- 修正 `n-pagination` 在非受控模式下不更新页数

## 2.7.4

### Feats

- `n-form-item` 可以在 `n-form` 外使用

### Fixes

- 修正 `n-checkbox` 勾选图标不显示
- 修正 `n-date-picker` 触发器的图标 transition 效果
- 修正 `n-p`、`n-ol`、`n-ul` 作为最后一个子元素 margin bottom 不是 0
- 修正 `n-checkbox-group` 在非受控模式不工作
- 修正 `n-data-table` 取消全部选择不工作

## 2.7.3

### Feats

- `n-data-table` 高亮排序列
- `n-data-table` 列增加 `render-filter` 属性
- `n-data-table` 列增加 `render-filter-icon` 属性

### Fixes

- `n-data-table` 固定列 box-shadow 在暗色模式更明显
- 修正 `n-color-picker` 值折行
- 修正 `n-form` FormRuleItem.trigger 类型

## 2.7.2

### Feats

- `n-data-table` 增加 `summary` 属性
- `n-data-table` 在 `'type=selection'` 的列增加 `options` 选项

### Fixes

- Fix `n-layout` 横向溢出的问题

## 2.7.1

### Feats

- `n-checkbox` 增加 `focusable` 属性
- `n-cascader` 增加 `action` 插槽

### Fixes

- 修正 `n-cascader` 点击 checkbox 会触发 loading
- 修正 `n-cascader` 菜单遮罩样式

## 2.7.0

### Breaking Changes

- `n-drawer` 默认不再包含 padding，填充 drawer 的内容可以使用 `n-drawer-content`

### Feats

- `n-drawer` 增加 `content-style` 属性
- `n-layout` 增加 `content-style` 属性
- `n-layout-sider` 增加 `content-style` 属性

## 2.6.0

### Feats

- `n-config-provider` 增加 `cls-prefix` 属性

### Fixes

- 修正 `n-popover` 在静态提升时可能影响别的 popover 的问题

## 2.5.1

### Feats

- `n-color-picker` 增加 `show-alpha` 属性

### Fixes

- 修正 `n-select` 默认 `fallback-option` 属性使组件崩溃

## 2.5.0

### Feats

- 添加 `n-skeleton` 组件
- 添加 `n-calendar` 组件
- 添加 `n-color-picker` 组件
- `n-date-picker` locale 增加 `firstDayOfWeek`
- `n-select` 增加 `showArrow` 属性

### Fixes

- 修正 `n-date-picker` 触发器在焦点在面板内的时候没有 focus 样式
- 修正 `n-button` 加载状态宽度闪烁的问题
- 修正 `n-time-picker` 在 `n-date-picker` 内部关闭动画闪烁的问题
- 修正 popover 内部的卸载组件应卸载于 popover 内部

## 2.4.2

### Feats

- 添加 `n-form-item-gi` 组件

### Fixes

- 修正 `n-ellipsis` & `n-data-table` ellpisis 单元格文本垂直排列错位
- 修正 `n-select` 在输入法输入过程中就进行过滤

## 2.4.1

### Fixes

- 修正 `n-select` 单选过滤模式的光标颜色
- 修正 `n-select` 菜单的 action 部分不能 focus

## 2.4.0

### Feats

- 添加 `n-image` 组件
- 添加 `n-global-style` 组件
- 添加 `n-theme-editor` 组件
- 添加 `n-page-header` 组件
- `n-statistic` 增加 `label` 插槽
- `n-breadcrumb-item` 增加 `separator` 插槽 & prop
- `n-button` 增加 `bordered` prop
- `n-card` 增加 `footer-style` prop

### Refactors

- 重构 `n-statistic` 样式
- `n-menu` 增加 `options` prop 去替代 `items` prop，`items` prop 被废弃

### Fixes

- 修正 `n-anchor` `ignore-gap` 不生效的问题
- 修正 `n-collapse` 内容被 `overflow: hidden` 截断
- 修正 `n-select` tag 文本溢出
- 修正 `n-popover` 在移动端无法正常关闭的问题

## 2.3.1

### Fixes

- 修正 `n-layout-sider` 横向宽度溢出

## 2.3.0

### Breaking Changes

- 折叠对于 `position="absolute"` 的 `n-layout-sider` 不再生效
- 对于包含 `n-layout-sider` 的 `n-layout` 必须设定 `has-sider`

## 2.2.0

### Feats

- 新增 `n-mention` 组件
- `n-data-table` 支持行展开

### Fixes

- 修正 `n-input` 在暗色主题 focus 状态下的背景颜色在 warning 和 error 的状态不正确
- 修正 `n-input` 在 warning 和 error 状态下光标颜色不正确
- 修正 `n-select` 的 namespace 不正确
- 修正 `n-cascader` 的 namespace 不正确
- 修正 `n-input` 在 textarea 模式无法选中
- 修正 `n-input` 在 textarea 模式没有 box-shadow
- 修正 `n-input` 在 textarea 模式 `autosize` 由于字体不一致导致行数有误
- 修正 `n-input` 在 textarea 模式 `autosize` 在外部使 props.value 改变的时候行数不会变化

### Refactors

- 替换了 `n-empty` 的图标 & 增大了它的尺寸

## 2.1.3

### Fixes

- 修正 `n-data-table` 对于不是最后一个的 td 没有右侧边框
- 修正 `n-data-table` 头部在表格宽度大于 `scroll-x` 的时候不够宽

## 2.1.2

### Feats

- `n-data-table` column 新增 `colSpan` 和 `rowSpan` 属性
- `n-data-table` column 新增 `titleColSpan` 属性

### Fixes

- 修正 `n-dropdown` 在设定 `x` 和 `y` 之后鼠标在外面移动会报错

## 2.1.1

### Fixes

- 修正 `n-select` 选择器溢出计数器 popover 触发区域有误

## 2.1.0

### Breaking Changes

- `n-popover` 默认 `duration` 设为 `100`
- `n-popover` 默认 `delay` 设为 `100`
- `n-tooltip` 默认 `showArrow` 设为 `true`

### Feats

- `n-config-provider` 的 `theme-overrides` 支持继承
- `n-card` 新增 `hoverable` 属性
- `n-select` 新增 `max-tag-count` 属性
- `n-cascader` 新增 `max-tag-count` 属性
- `n-popover` 新增 `get-disabled` 属性
- 新增 `n-ellipsis` 文本省略组件
- `n-popover` `width` prop 新增 `'trigger'` 的值
- `n-data-table` 的列的 `ellipsis` 属性可设为 `n-ellipsis` 的 props

### Fixes

- 修正 `n-cascader` 再点击清除按钮后菜单出现
- 修正 `n-card` 设定高度后 action 不在底部的问题
- 修正 `n-popover` 的 `duration` 和 `delay` 属性执行有问题

## 2.0.1

### Feats

- `n-layout-sider` 新增 `default-collapsed` 属性
- `n-modal` 支持自定义位置

### Fixes

- 修正 `n-menu` 垂直折叠时 `n-menu-item` tooltip 不显示的问题
- 修正 `n-menu` `collapsed-icon-size` 不生效的问题
- 修正 `n-menu` 回调类 prop 不接受数组
- 修正 `n-layout-sider` 按钮被遮挡的问题

## 2.0.0

参考 vue3.md

## 1.6.0

### Fixes

- 修正了 `n-auto-complete` 使用 `textarea` 作为输入元素时菜单无法关闭的问题
- 修正了嵌套 `n-icon` 没有被打平的问题
- 修正了 `n-date-picker` 在类型为 `date` 和 `datetime` 时面板不显示年的问题

### Feats

- `n-button` 增加 `dashed` 属性
- 增加 `n-space` 组件
- `n-drawer` 内容可滚动

### i18n

- `n-log` 添加 zhCN 本地化

## 1.5.5 (2020-08-15)

### Breaking Changes

- 修正了所有 `separator` 的拼写（原来错拼为 `seperator`）

### Fixes

- 修正了未设定主题时样式报错的问题
- 修正了 `n-select` `single` `filterable` 时 placeholder 的样式问题

## 1.5.4 (2020-08-08)

### Fixes

- 修正了 Message、Notification、Confirm 不随主题切换的问题

## 1.5.3 (2020-07-23)

### Fixes

- 修正了 `n-select` 在 `placeholder` 为空的时候显示出错的问题

## 1.5.2 (2020-07-22)

### Fixes

- 修正了 `n-radio` 无法聚焦的问题
- 修正了 `n-data-table` 的 `max-height` 样式失效的问题 <https://bugs.chromium.org/p/chromium/issues/detail?id=1107223>

### Refactors

- 重构了 `n-tag` 的样式

## 1.5.1 (2020-07-20)

### Feats

- 为 `n-time-picker` 增加了 `disabled` 属性

### Fixes

- 修正了 `n-radio` 下的子元素无法获取焦点的问题

## 1.5.0 (2020-07-09)

### Breaking Changes

- 重构了试验性的设定主色功能

### Fixes

- 修正了一些零碎的样式错误

## 1.4.1 (2020-06-23)

### Feats

- 为 `n-select` 增加了 `autofocus` 属性

## 1.4.0 (2020-06-19)

### Breaking Changes

- `n-menu` 不再支持 插槽 API

### Feats

- 增加了试验性的设定主色功能

## 1.3.5 (2020-06-06)

### Feats

- 为 `n-button` 增加了 `attr-type` 属性

### Fixes

- 修正了 `n-input` 如果太宽里面的 input 元素宽度不会展开的问题
- 修正了 `n-input-group` 中 `n-input-number` 边框的样式瑕疵

## 1.3.4 (2020-06-05)

### Fixes

- 修正了 `n-a` 的 `to` 属性不能为对象的问题

## 1.3.3 (2020-06-03)

### Feats

- 增加了 `$NOs.theme` 来获取当前操作系统的主题

## 1.3.2 (2020-06-02)

### Fixes

- 修正了 `n-log` 的加载器显示等宽字体的问题
- 修正了 `n-button` icon 有关的类名没有被正确应用的问题

## 1.3.1 (2020-06-01)

### Fixes

- 修正了 `n-data-table` 选框列的选框没有垂直居中的问题
- 修正了 `n-data-table` 表头没 border-color transition 的问题
- 修正了 `$NConfirm` 的 `show-icon` & `closable` & `bordered` 属性设置无效的问题

### Feats

- 增加并调整了一些 `n-config-consumer` 样式方案中的颜色

## 1.3.0 (2020-06-01)

### Breaking Changes

- UI 默认样式不再包含外部字体文件，如果需要使用 UI 提供的字体需要明确引入

### Feats

- 为 `n-layout` 增加了 `themed-style` 属性

### Fixes

- 修正了 `n-layout-sider` 圆形按钮没有随着折叠状态滚动的问题
- 修正了 `n-form-item` feedback 如果在一开始被设定则消失没有动画的问题
- 修正了 `n-data-table` max-height 相关属性在所有情况下都会被应用的问题
- 修正了一些组件的样式瑕疵

### Refactors

- 调整了一些组件亮色主题下的样式

## 1.2.1 (2020-05-29)

### Fixes

- 修正了 `n-slider` 弹框没有 z-index 的问题

## 1.2.0 (2020-05-29)

### Feats

- 为 `n-form-item` 增加了 `feedback` 和 `validation-status` 属性

## 1.1.5 (2020-05-28)

### Feats

- 为 `n-collapse` 和 `n-collapse-item` 增加了 `display-directive` 属性
- 为 `n-select` 的 `option` 增加了 `class` 和 `style` 属性
- 为 `n-select` 增加 `debug` 模式

### Fixes

- 修正了 `n-select` 在 disabled 状态下能被清除的问题

## 1.1.4 (2020-05-28)

### Fixes

- 修正了 `n-select` 在多选情况下传入值被直接修改的问题

### Refactors

- 一个 UI 实例最多在一个 Vue 上安装一次

## 1.1.3 (2020-05-20)

### Chores

- 更新 css-render 的依赖

### Fixes

- 修正了 `n-transfer` 在值改变时动画出错的问题

## 1.1.2 (2020-05-19)

### Feats

- 为 `n-step` 增加内容的 插槽
- 为 `n-checkbox` 增加了 `label` prop

### Performance Improvements

- 所有定位组件按需注册监听器
- 在寻找可滚动节点的过程中使用缓存
- 提升了 `n-button` beforeDestroy 的性能
- 减少了 `n-checkbox` 在值未改变时的重复渲染
- 提升了文字内容的 `n-avatar` 的性能

## 1.1.1 (2020-05-18)

### Fixes

- 更新 css-render 的依赖
- 默认类型的按钮的 icon 的颜色

### Performance Improvements

- 减少了 `n-menu-item` 没用的重复渲染
- 减少了文档页面没用的重复渲染

### Refactors

- 为了性能重构了 `n-nimbus-service-layout` 的部分代码

## 1.1.0 (2020-05-16)

### Feats

- `n-button` 接受自定义颜色

### Refactors

- 将内部所有使用 $插槽 s 的地方换为 $scopedSlots 来获得更好的鲁棒性
- 将部分按钮样式生成转移到组件内动态进行

## 1.0.14 (2020-05-15)

### Fixes

- 修正了 `line` 型 `n-tabs` 线不随 `activeName` 属性改变的问题
- 修正了 `n-tabs` 滚动按钮没有随着宽度改变触发的问题
- 修正了 `n-tabs` 高度变化会导致一些不期望的调用的问题

## 1.0.13 (2020-05-14)

### Fixes

- 修正 `n-form-item-col` & `n-form-item-row` 的 label 插槽 不显示的问题

## 1.0.12 (2020-04-30)

### Fixes

- 修正了一些 CSS 长度属性格式化错误的问题

## 1.0.11 (2020-04-30)

### Feats

- 为 `n-select` 增加了 `fallback-option` 属性用于控制无对应选项时的回退选项

### Fixes

- 解决了 `n-data-table` 在没有数据时 `max-height` 和 `min-height` 错误显示的问题

### Breaking Changes

- `n-data-table` 的 `max-height` 和 `min-height` 会对表格部分的整体生效，不只是表格的内容部分
- `n-select` 在默认情况下会显示选项中不存在的值

## 1.0.10 (2020-04-28)

### Feats

- 为 `n-collapse` 增加了 `arrow-placement` 属性
- 为 `n-collapse-item` 增加了`arrow` 插槽

### Fixes

- 解决了可卸载组件在嵌套成 `modal > drawer > component` 样子的时候会被卸载到错误位置的问题

## 1.0.9 (2020-04-23)

### Feats

- 为 `n-input` 增加了 `autofocus` 选项
- 为 `NMessage` 增加了 `closable` 选项

### Fixes

- 解决了 `n-tag` `closable` 默认值被设为 `true` 的问题
- 解决了 `n-data-table` 不能使用全部 `pagination` prop 的问题
- 解决了 `n-pagination` `on-page-size-change` 不生效的问题

## 1.0.8 (2020-04-22)

### Feats

- 增加 `n-dynamic-tags` 组件
- `styleScheme` 新增暴露颜色 `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor`

## 1.0.7 (2020-04-10)

### Feats

- 为 `n-data-table` 的 `column` 增加了 `filter-option-value` 的属性来应对单选的情况

### Fixes

- 解决了 `n-collpase-item` 不支持 `number` 的问题

## 1.0.6 (2020-04-03)

### Fixes

- 解决了所有的 `console` 语句都在打包中被删除了的问题

## 1.0.5 (2020-03-27)

### Feats

- 改变 `n-data-table` 的 filters 的数据类型从数组改变成对象

### Fixes

- `n-data-table` 在有多列筛选的情况下数据不能被正确筛选

## 1.0.4 (2020-03-26)

### Feats

- 当选项过多时，`n-data-table` 过滤菜单的内容可以滚动

## 1.0.3 (2020-03-25)

### Feats

- `$NMessage`、`$NNotification`、`$NConfirm` 的获取到的主题会应用到他们的内部组件

### Fixes

- 多个 naive-ui 共存时定位元素会产生冲突
- `n-form-item` 的 validate 方法在某些 validator 的返回值下不会 resolve
- `$NConfirm` 主题未随 `n-config-provider` 切换

## 1.0.2 (2020-03-23)

### Fixes

- `n-transfer` 的选项在值变化之后没有重置
- `n-nimbus-service-layout` (deprecated) 没有兼容 Vue Router(3.1 版本以下) `push` 方法的返回值

## 1.0.1 (2020-03-21)

### Feats

- `n-layout-sider` 的 `show-trigger` 增加了 `'bar'` & `'arrow-circle'` 选项

### Fixes

- `n-scrollbar` 的轨道会挡住鼠标事件

### Feats

- `n-data-table` 增加了 empty 插槽 [#86](https://github.com/TuSimple/naive-ui/issues/86)
