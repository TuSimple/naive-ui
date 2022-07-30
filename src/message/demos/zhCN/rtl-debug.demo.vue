<markdown>
# Rtl Debug

</markdown>

<template>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-message-provider>
        <message-button />
      </n-message-provider>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useMessage, NButton, unstableMessageRtl } from 'naive-ui'

const MessageButton = defineComponent({
  setup () {
    const message = useMessage()
    return {
      message
    }
  },
  render () {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info(
            "I don't know why nobody told you how to unfold your love",
            {
              closable: true,
              duration: 5000
            }
          )
        }
      },
      { default: () => 'Show some message' }
    )
  }
})

export default defineComponent({
  components: {
    MessageButton
  },
  setup () {
    return {
      rtlEnabled: ref(true),
      rtlStyles: [unstableMessageRtl]
    }
  }
})
</script>
