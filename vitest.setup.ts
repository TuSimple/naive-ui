/* eslint-disable import/first */
// vitest.setup.ts
import { afterAll, vi } from 'vitest'
// @ts-expect-error: type
global.jest = vi
// @ts-expect-error: type
import getCanvasWindow from 'jest-canvas-mock/lib/window'

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap'
] as const

if (typeof window !== 'undefined') {
  const canvasWindow = getCanvasWindow({ document: window.document })
  apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
  })
  HTMLDivElement.prototype.scrollTo = () => {}
  // https://github.com/vitest-dev/vitest/issues/821
  Object.defineProperty(global.window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}

afterAll(() => {
  // @ts-expect-error: type
  delete global.jest
  if (global.window) {
    // @ts-expect-error: type
    delete global.window.jest
  }
})
