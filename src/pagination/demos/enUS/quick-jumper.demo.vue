<markdown>
# Quick jumper

You can customize the content to jump to (press `Enter` to jump quickly),

and also can customize whether to trigger the quick jump on blur through `trigger-quick-jump-on`.
</markdown>

<template>
  <n-space>
    <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
      <template #goto>
        Go!
      </template>
    </n-pagination>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      show-quick-jumper
      :trigger-quick-jump-on="['change', 'blur']"
    >
      <template #goto>
        Go!
      </template>
    </n-pagination>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2)
    }
  }
})
</script>
