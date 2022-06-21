import { mount } from '@vue/test-utils'
import { NCode } from '../index'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

describe('n-code', () => {
  it('should warn when no hljs is set', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation()
    mount(NCode)
    expect(spy).toHaveBeenCalled()
  })
  it('should work with `code` prop', () => {
    const wrapper = mount(NCode, {
      props: {
        code: 'console.log(a)'
      }
    })
    expect(wrapper.text()).toEqual('console.log(a)')
    wrapper.unmount()
  })
  it('should work with `language` prop', () => {
    const wrapper = mount(NCode, {
      props: {
        code: 'console.log(a)',
        language: 'javascript',
        hljs
      }
    })
    expect(wrapper.find('.hljs-variable').text()).toBe('console')
  })
  it('should work with `hljs` prop', () => {
    const wrapper = mount(NCode, {
      props: {
        code: 'console.log(a)',
        language: 'javascript',
        hljs
      }
    })
    expect(wrapper.find('.function_').text()).toBe('log')
  })
  it('should work with `trim` prop', () => {
    const wrapper = mount(NCode, {
      props: {
        code: '    console.log( a )  ',
        trim: false
      }
    })
    expect(wrapper.find('pre').element.textContent).toContain(
      '    console.log( a )  '
    )
  })
  it('should work with `default` slot', () => {
    const wrapper = mount(NCode, {
      slots: {
        default: () => 'console.log(a)'
      }
    })
    expect(wrapper.text()).toBe('console.log(a)')
  })
})
