/**
 * @vitest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NRow, NCol } from '../..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NRow>
        {{
          default: () => <NCol />
        }}
      </NRow>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
