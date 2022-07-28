<markdown>
# 会消失的菜单

在某种情况下，不同的角色会看到不同的菜单。你可以使用 `hidden` 的属性来隐藏菜单。
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="accordion">
      <template #checked>
        老板
      </template>
      <template #unchecked>
        打工人
      </template>
    </n-switch>
    <n-menu :options="options" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, Component, h, computed } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const accordionRef = ref(false)
    function renderIcon (icon: Component) {
      return () => h(NIcon, null, { default: () => h(icon) })
    }
    const MenuOptions = computed(() => [
      {
        label: '提升效率的法宝',
        icon: renderIcon(PersonIcon),
        key: '1',
        children: [
          {
            label: '如何提高产出',
            key: '2'
          }
        ]
      },
      {
        label: '摸鱼宝典',
        key: '3',
        icon: renderIcon(BookIcon),
        hidden: accordionRef.value,
        children: [
          {
            label: '你摸鱼',
            key: '4'
          },
          {
            label: '我摸鱼',
            key: '5'
          },
          {
            label: '老板宝马变青桔',
            key: '6'
          }
        ]
      }
    ])
    return {
      accordion: accordionRef,
      options: MenuOptions
    }
  }
})
</script>
