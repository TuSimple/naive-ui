import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NAvatar } from '../../avatar'
import { NTag } from '../index'

describe('n-tag', () => {
  it('should work with import on demand', () => {
    mount(NTag)
  })

  it('should work with `bordered` prop', () => {
    const wrapper = mount(NTag, {
      props: {
        bordered: true
      }
    })

    expect(wrapper.find('.n-tag__border').exists()).toBe(true)
  })

  it('should be clickable', () => {
    const onClick = vi.fn()
    const wrapper = mount(NTag, {
      props: {
        onClick
      }
    })

    wrapper.trigger('click')
    expect(onClick).toBeCalled()
  })

  it('should be `checkable` prop', async () => {
    const wrapper = mount(NTag, {
      props: {
        checkable: true
      }
    })

    await wrapper.setProps({ checked: true })
    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--checkable')

    await wrapper.setProps({ checked: false })
    expect(wrapper.find('.n-tag').classes()).not.toContain('n-tag--checked')
  })

  it('should work with `on-update:checked` prop', () => {
    const onChecked = vi.fn()
    const wrapper = mount(NTag, {
      props: {
        checkable: true,
        'onUpdate:checked': onChecked,
        onUpdateChecked: onChecked
      }
    })

    wrapper.trigger('click')
    expect(onChecked).toBeCalled()
    expect(onChecked).toBeCalledTimes(2)
  })

  it('should work with `closable` `on-close` prop', () => {
    const onClose = vi.fn()
    const wrapper = mount(NTag, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-tag__close').exists()).toBe(true)
    wrapper.find('.n-tag__close').trigger('click')
    expect(onClose).toBeCalled()
  })

  it('should work with `disabled` prop', async () => {
    const onClose = vi.fn()
    const wrapper = mount(NTag, {
      props: {
        disabled: true,
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--disabled')
    wrapper.find('.n-tag__close').trigger('click')
    expect(onClose).not.toBeCalled()
  })

  it('should work with `round` prop', () => {
    const wrapper = mount(NTag, {
      props: {
        round: true
      }
    })

    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--round')
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NTag)
      wrapper.setProps({ size })
      expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `type` prop', () => {
    ;(['default', 'info', 'success', 'warning', 'error'] as const).forEach(
      (type) => {
        const wrapper = mount(NTag)
        wrapper.setProps({ type })
        expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
        wrapper.unmount()
      }
    )
  })

  it('should work with default slot', () => {
    const wrapper = mount(NTag, {
      slots: {
        default: () => 'default'
      }
    })

    expect(wrapper.find('.n-tag__content').exists()).toBe(true)
    expect(wrapper.find('.n-tag__content').element.textContent).toBe('default')
    expect(wrapper.find('.n-tag__content').html()).toMatchSnapshot()
  })

  it('should work with `color` prop', () => {
    const wrapper = mount(NTag, {
      props: {
        color: {
          color: '#ccc',
          textColor: '#555',
          borderColor: 'rgb(85, 85, 85)'
        }
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
  })

  it('should work with `avatar` slot', () => {
    const wrapper = mount(NTag, {
      slots: {
        avatar: () =>
          h(NAvatar, {
            src: 'https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg'
          })
      }
    })

    expect(wrapper.find('.n-tag__avatar').exists()).toBe(true)
    expect(wrapper.find('.n-avatar').attributes('style')).toContain(
      '--n-merged-size: var(--n-avatar-size-override, 34px);'
    )
  })
})
