/**
 * @vitest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NPopover } from '../..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NPopover>
        {{
          trigger: () => 'kirby'
        }}
      </NPopover>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      console.error(e)
      expect(e).not.toBeTruthy()
    }
  })
})
