import { mount } from '@vue/test-utils'
import { h, defineComponent, ref, watch } from 'vue'
import { NLog } from '../index'

describe('n-log', () => {
  it('should warn with language setted & no hljs is set', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation()
    mount(NLog)
    expect(spy).not.toHaveBeenCalled()
    mount(NLog, {
      props: {
        language: 'kirby'
      }
    })
    expect(spy).toHaveBeenCalled()
  })

  it('should work with `font-size` prop', async () => {
    const fontSize = 20
    const wrapper = mount(NLog, { props: { fontSize } })

    expect(wrapper.find('.n-code').attributes('style')).toContain(
      `--n-font-size: ${fontSize}px`
    )
  })

  it('should work with `line-height` prop', async () => {
    const lineHeight = 20
    const wrapper = mount(NLog, { props: { lineHeight } })

    expect(wrapper.find('.n-log').attributes('style')).toContain(
      `line-height: ${lineHeight}`
    )
  })

  it('should work with `lines` `log` prop', async () => {
    const wrapper = mount(NLog, { props: { lines: ['test1', 'test2'] } })
    expect(wrapper.find('.n-code').element.children.length).toBe(2)
    expect(wrapper.find('.n-code').element.children[0].textContent).toBe(
      'test1'
    )
    expect(wrapper.find('.n-code').element.children[1].textContent).toBe(
      'test2'
    )

    await wrapper.setProps({ log: 'test3' })
    expect(wrapper.find('.n-code').element.children.length).toBe(1)
    expect(wrapper.find('.n-code').element.children[0].textContent).toBe(
      'test3'
    )
  })

  it('should work with `loading` prop', async () => {
    const wrapper = mount(NLog)
    expect(wrapper.find('.n-log-loader').exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.n-log-loader').exists()).toBe(true)
  })

  it('should work with `rows` prop', async () => {
    const lineHeight = 20
    const fontSize = 10
    ;([5, 6, 7, 8] as const).forEach((rows) => {
      const wrapper = mount(NLog, { props: { lineHeight, fontSize, rows } })
      expect(wrapper.find('.n-log').attributes('style')).toContain(
        `height: calc(${Math.floor(fontSize * lineHeight) * rows}px)`
      )
    })
  })

  it('should work with `trim` prop', async () => {
    const wrapper = mount(NLog, {
      props: { log: ' test1     ' }
    })
    expect(wrapper.find('pre').element.innerHTML).toBe(' test1     ')

    await wrapper.setProps({ trim: true, log: ' test2     ' })
    expect(wrapper.find('pre').element.innerHTML).toBe('test2')
  })

  it('should work with `scrollTo` `on-require-more` `on-reach-top` `on-reach-bottom` prop', async () => {
    const lines = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']
    const onRequireMore = vi.fn()
    const onReachTop = vi.fn()
    const onReachBottom = vi.fn()
    const wrapper = mount(
      defineComponent({
        setup () {
          const logInstRef = ref<any>(null)
          watch(logInstRef, (value) => {
            if (value) {
              value.scrollTo(0)
              value.scrollTo(1)
              value.scrollTo(999)
            }
          })

          return () =>
            h(NLog, {
              ref: logInstRef,
              lines,
              rows: 4,
              onRequireMore,
              onReachTop,
              onReachBottom
            })
        }
      }),
      {
        attachTo: document.body
      }
    )
    setTimeout(() => {
      expect(onRequireMore).toHaveBeenCalled()
      expect(onReachTop).toHaveBeenCalled()
      expect(onReachBottom).toHaveBeenCalled()
      wrapper.unmount()
    }, 0)
  })
})
