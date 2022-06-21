import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopconfirm } from '../index'
import { NButton } from '../../button'

describe('n-popconfirm', () => {
  it('should work with import on demand', () => {
    mount(NPopconfirm, {
      slots: {
        trigger: () => 'star kirby'
      }
    })
  })

  it('should work with `negative-text` `positive-text`', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        'negative-text': 'negative',
        'positive-text': 'positive'
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelectorAll('.n-button__content')[1].textContent).toBe(
      'negative'
    )
    expect(document.querySelectorAll('.n-button__content')[2].textContent).toBe(
      'positive'
    )
    wrapper.unmount()
  })

  it('should work with `show-icon` prop', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        showIcon: false
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-popconfirm__icon')).toBe(null)
    wrapper.unmount()
  })

  it('should work with `on-positive-click` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        onPositiveClick: onClick
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    document
      .querySelectorAll('.n-button')[2]
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-negative-click` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        onNegativeClick: onClick
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    document
      .querySelectorAll('.n-button')[1]
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with slot', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' }),
        action: () => 'test-action',
        icon: () => 'test-icon'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-popconfirm__icon')?.textContent).toBe(
      'test-icon'
    )
    expect(
      document.querySelector('.n-popconfirm__body')?.textContent
    ).toContain('test-text')
    expect(document.querySelector('.n-popconfirm__action')?.textContent).toBe(
      'test-action'
    )
  })
})
