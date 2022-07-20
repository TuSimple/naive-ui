<markdown>
# 自定义图标
</markdown>

<template>
  <n-transfer ref="transfer" v-model:value="value" :options="options">
    <template #forward-icon>
      <n-icon :size="16" :component="ArrowForward" />
    </template>
    <template #back-icon>
      <n-icon :size="16" :component="ArrowBack" />
    </template>
  </n-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.from({ length: 50 }).map((v, i) => i)
}

export default defineComponent({
  setup () {
    return {
      options: createOptions(),
      value: ref(createValues()),
      ArrowForward,
      ArrowBack
    }
  }
})
</script>
