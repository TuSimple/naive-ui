import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NDynamicTags } from '../index'
import { NAutoComplete } from '../../auto-complete/index'
import { NButton } from '../../button/index'
import { NTag } from '../../tag'

describe('n-dynamic-tags', () => {
  it('should work with import on demand', () => {
    mount(NDynamicTags)
  })

  it('should work with `closable` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        defaultValue: ['教师', '程序员']
      }
    })
    expect(wrapper.find('.n-tag__close').exists()).toBe(true)
    await wrapper.setProps({ closable: false })
    expect(wrapper.find('.n-tag__close').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        color: {
          color: '#ccc',
          textColor: '#555',
          borderColor: 'rgb(85, 85, 85)'
        },
        defaultValue: ['教师', '程序员']
      }
    })
    expect(wrapper.find('.n-tag').attributes('style')).toContain(
      '--n-color: #ccc;'
    )
    expect(wrapper.find('.n-tag').attributes('style')).toContain(
      '--n-text-color: #555;'
    )
    expect(wrapper.find('.n-tag__border').attributes('style')).toContain(
      'border-color: rgb(85, 85, 85);'
    )
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const onClose = vi.fn()
    const wrapper = mount(NDynamicTags, {
      props: {
        disabled: true,
        closable: true,
        defaultValue: ['教师', '程序员'],
        onClose
      }
    })

    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--disabled')
    wrapper.find('.n-tag__close').trigger('click')
    expect(onClose).not.toBeCalled()
    expect(wrapper.find('.n-button').classes()).toContain('n-button--disabled')
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        max: 2,
        value: ['教师']
      }
    })

    expect(wrapper.find('.n-button').classes()).not.toContain(
      'n-button--disabled'
    )
    await wrapper.setProps({ value: ['教师', '程序员'] })
    expect(wrapper.find('.n-button').classes()).toContain('n-button--disabled')
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        round: true,
        defaultValue: ['教师']
      }
    })
    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--round')
    await wrapper.setProps({ round: false })
    expect(wrapper.find('.n-tag').classes()).not.toContain('n-tag--round')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        size: 'small',
        defaultValue: ['教师']
      }
    })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        size: 'small',
        defaultValue: ['教师']
      }
    })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'info' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `tag-style` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        tagStyle: {
          color: 'rgb(79, 178, 51)'
        },
        defaultValue: ['教师']
      }
    })
    expect(wrapper.find('.n-tag').attributes('style')).toContain(
      'color: rgb(79, 178, 51);'
    )
    await wrapper.setProps({ tagStyle: { width: '100px' } })
    expect(wrapper.find('.n-tag').attributes('style')).toContain(
      'width: 100px;'
    )
    wrapper.unmount()
  })

  it('should work with `on-update:value` prop', () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NDynamicTags, {
      props: {
        value: ['教师', '程序员'],
        onUpdateValue
      }
    })
    wrapper.find('.n-tag__close').trigger('click')
    expect(onUpdateValue).toBeCalled()
    wrapper.unmount()
  })

  it('should work with `input-props` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        defaultValue: ['教师']
      }
    })
    await wrapper.find('.n-button').trigger('click')
    expect(wrapper.find('.n-input').classes()).not.toContain(
      'n-input--disabled'
    )

    await wrapper.setProps({ inputProps: { disabled: true } })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--disabled')
    wrapper.unmount()
  })

  it('should work with `input-style` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        defaultValue: ['教师']
      }
    })
    await wrapper.find('.n-button').trigger('click')
    expect(wrapper.find('.n-input').attributes('style')).not.toContain(
      'color: red'
    )

    await wrapper.setProps({ inputStyle: { color: 'red' } })
    expect(wrapper.find('.n-input').attributes('style')).toContain('color: red')
    wrapper.unmount()
  })

  it('should work with `render-tag` prop', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        value: ['教师'],
        renderTag: (tag: string) =>
          h(NTag, null, {
            default: () => `test-${tag}`
          })
      }
    })

    expect(wrapper.find('.n-tag__content').text()).toContain('test-教师')
    wrapper.unmount()
  })

  it('should work with `input` slot', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        value: ['教师', '程序员']
      },
      slots: {
        input: () => h(NAutoComplete)
      }
    })
    await wrapper.find('.n-button').trigger('click')
    expect(wrapper.find('.n-auto-complete').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `trigger` slot', async () => {
    const wrapper = mount(NDynamicTags, {
      props: {
        value: ['教师', '程序员']
      },
      slots: {
        trigger: () =>
          h(NButton, null, {
            default: () => '添加'
          })
      }
    })
    expect(wrapper.find('.n-button__content').text()).toEqual('添加')
    wrapper.unmount()
  })
})
