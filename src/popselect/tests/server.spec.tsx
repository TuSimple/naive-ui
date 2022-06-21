/**
 * @vitest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NPopselect } from '../..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NPopselect>
        {{
          default: () => 'kirby'
        }}
      </NPopselect>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
