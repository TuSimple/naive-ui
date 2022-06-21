/**
 * @vitest-environment node
 */
import { h, createSSRApp, defineComponent } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NMessageProvider, useMessage } from '../..'

describe('SSR', () => {
  it('works', async () => {
    const Component = defineComponent({
      setup () {
        const message = useMessage()
        expect(message).toBeTruthy()
      },
      render () {
        return '07akioni'
      }
    })
    const app = createSSRApp(() => (
      <NMessageProvider>
        {{
          default: () => <Component />
        }}
      </NMessageProvider>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
