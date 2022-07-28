<markdown>
# hidden prop

In some cases, different characters will see different menus. You can use the 'hidden' prop to hide the menu.
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="accordion">
      <template #checked>
        hidden menu
      </template>
      <template #unchecked>
        show menu
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
        label: 'parent 1',
        icon: renderIcon(PersonIcon),
        key: '1',
        children: [
          {
            label: '1.1',
            key: '2'
          }
        ]
      },
      {
        label: 'parent 2',
        key: '3',
        icon: renderIcon(BookIcon),
        hidden: accordionRef.value,
        children: [
          {
            label: '2.1',
            key: '4'
          },
          {
            label: '2.2',
            key: '5'
          },
          {
            label: '2.3',
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
