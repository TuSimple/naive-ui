/**
 * @vitest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NGrid, NGridItem } from '../..'

describe('SSR', () => {
  it('works 1', async () => {
    const app = createSSRApp(() => <NGrid />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      console.log(e)
      expect(e).not.toBeTruthy()
    }
  })
  it('works 2', async () => {
    const app = createSSRApp(() => (
      <NGrid>{{ default: () => <NGridItem /> }}</NGrid>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      console.log(e)
      expect(e).not.toBeTruthy()
    }
  })
})
