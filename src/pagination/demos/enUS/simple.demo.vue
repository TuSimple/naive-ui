<markdown>
# Simple mode
</markdown>

<template>
  <n-pagination v-model:page="page" :page-count="100" simple />
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
