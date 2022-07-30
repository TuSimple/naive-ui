# 信息 Message

（一般是）从浏览器顶部降下来的神谕。

<n-space vertical size="large">
<n-alert title="使用前提" type="warning">
  如果你想使用信息，你需要把调用其方法的组件放在 <n-text code>n-message-provider</n-text> 内部并且使用 <n-text code>useMessage</n-text> 去获取 API。
  <br/>
  如果你想知道如何在 setup 外使用，请参考页面最下方的 Q & A。
</n-alert>
例如：

```html
<!-- App.vue -->
<n-message-provider>
  <content />
</n-message-provider>
```

```js
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      warning () {
        message.warning('...')
      }
    }
  }
})
```

</n-space>

## 演示

```demo
basic.vue
icon.vue
timing.vue
closable.vue
modify-content.vue
manually-close.vue
about-theme.vue
multiple-line.vue
placement.vue
customize-message.vue
no-icon.vue
rtl-debug.vue
```

## API

### MessageProvider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `false` | 所有 Message 是否显示 close 图标 |  |
| container-style | `string \| CSSProperties` | `undefined` | Message 容器的样式 |  |
| duration | `number` | `3000` | 所有 Message 默认的持续时长 |  |
| keep-alive-on-hover | `boolean` | `false` | 所有 Message 在悬浮信息上时是否不销毁 |  |
| max | `number` | `undefined` | 限制提示信息显示的个数 |  |
| placement | `top \| top-left \| top-right \| bottom \| bottom-left \| bottom-right ` | `top` | 所有 Message 显示的位置 |  |
| to | `string \| HTMLElement` | `'body'` | Message 容器节点的位置 |  |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| destroyAll | `() => void` | 销毁所有弹出的信息 |  |
| create | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 create 类型的信息 | 2.25.7 |
| error | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 error 类型的信息 |  |
| info | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 info 类型的信息 |  |
| loading | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 loading 类型的信息 |  |
| success | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 success 类型的信息 |  |
| warning | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 warning 类型的信息 |  |

#### MessageOption Properties

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| closable | `boolean` | 是否显示 close 图标 |  |
| duration | `number` | 信息展示的时长 |  |
| icon | `() => VNodeChild` | 信息图标 |  |
| keepAliveOnHover | `boolean` | Hover 到信息上是否不销毁 |  |
| render | `MessageRenderMessage` | 消息的渲染函数 | 2.24.0 |
| showIcon | `boolean` | 是否展示图标 | 2.25.7 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | 信息类型 | `'default'` 2.25.7 |
| onAfterLeave | `() => void` | 信息消失动画结束的回调 |  |
| onClose | `() => void` | 点击关闭图标的回调 |  |
| onLeave | `() => void` | 信息开始消失的回调 |  |

#### MessageRenderMessage Type

```ts
type MessageRenderMessage = (props: {
  content?: string | number | (() => VNodeChild)
  icon?: () => VNodeChild
  closable: boolean
  type: 'info' | 'success' | 'warning' | 'error' | 'loading'
  onClose?: () => void
}) => VNodeChild
```

#### MessageReactive Properties

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| closable | `boolean` | 是否显示 close 图标 |  |
| content | `string \| (() => VNodeChild)` | 信息内容 |  |
| destroy | `() => void` | 销毁信息的方法 |  |
| icon | `() => VNodeChild` | 信息图标 |  |
| keepAliveOnHover | `boolean` | Hover 到信息上是否不销毁 |  |
| showIcon | `boolean` | 是否展示图标 | 2.25.7 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | 信息类型 | `'default'` 2.25.7 |
| onAfterLeave | `() => void` | 信息消失动画结束的回调 |  |
| onLeave | `() => void` | 信息开始消失的回调 |  |

#### MessageReactive Methods

| 名称    | 类型 | 说明           |
| ------- | ---- | -------------- |
| destroy | `()` | 销毁信息的方法 |

## Q & A

### 在 setup 外使用

#### 选择 1

使用 [createDiscreteApi](discrete)。如果你想使用它，请认真阅读它的注意事项。你最好不要把它和 `useMessage` 在同一 App 中混用。

#### 选择 2

<n-space vertical size="large">
<n-alert type="warning">
  如果你想在 setup 外使用信息，你需要在顶层 setup 中把 <n-text code>useMessage</n-text> 返回的 message 值挂载到 window 下然后再调用，调用前需要确保 message 已经挂载成功。
</n-alert>

```html
<!-- App.vue -->
<n-message-provider>
  <content />
</n-message-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useMessage } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$message = useMessage()
    }
  })
</script>
```

```js
// xxx.js
export const handler = () => {
  // 需要确保已经在 setup 中执行了 window.$message = message
  window.$message.success(
    'Cause you walked hand in hand With another man in my place'
  )
}
```

</n-space>
