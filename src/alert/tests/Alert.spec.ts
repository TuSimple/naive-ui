import { h } from 'vue'
import { NAlert } from '../index'
import { mount } from '@vue/test-utils'
import { NIcon } from '../../icon'
import { IosAirplane } from '@vicons/ionicons4'

describe('n-alert', () => {
  it('should work with import on demand', () => {
    mount(NAlert)
  })

  it('should have a role of "alert"', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert').attributes('role')).toBe('alert')
  })

  it('should add the right aria', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert__icon').attributes('aria-hidden')).toBe(
      'true'
    )
  })

  it('shouldnt have default title', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert-body__title').exists()).toBe(false)
  })

  it('should have designated title', () => {
    const title = 'sometimes naïve'
    const wrapper = mount(NAlert, {
      props: { title }
    })
    expect(wrapper.find('.n-alert-body__title').text()).toBe(title)
  })

  it('should work with type prop', async () => {
    ;(['info', 'success', 'warning', 'error'] as const).forEach((type) => {
      const wrapper = mount(NAlert, { props: { type } })
      expect(wrapper.find('.n-alert').attributes('style')).toMatchSnapshot()
    })
  })

  it('should work with `default` slot', () => {
    const wrapper = mount(NAlert, {
      slots: {
        default: () => 'default'
      }
    })

    expect(wrapper.find('.n-alert-body__content').exists()).toBe(true)
    expect(wrapper.find('.n-alert-body__content').text()).toBe('default')
  })

  it('should work with `icon` slot', async () => {
    const wrapper = mount(NAlert, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(IosAirplane)
          })
      }
    })

    expect(wrapper.findComponent(NIcon).exists()).toBe(true)
  })

  it('should work with `header` slot', async () => {
    const wrapper = mount(NAlert, {
      slots: {
        header: () => 'test-header'
      }
    })

    expect(wrapper.find('.n-alert-body__title').text()).toBe('test-header')
  })

  it('shouldnt be closable by default', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-base-close.n-alert__close').exists()).toBe(false)
  })

  it('should be closable when designated', () => {
    const wrapper = mount(NAlert, { props: { closable: true } })
    expect(wrapper.find('.n-base-close.n-alert__close').exists()).toBe(true)
  })

  it('should show icon by default', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert__icon').exists()).toBe(true)
  })

  it('should hide icon when designated', () => {
    const wrapper = mount(NAlert, { props: { showIcon: false } })
    expect(wrapper.find('.n-alert__icon').exists()).toBe(false)
  })

  it("shouldn't closed when on-close prop returns false", async () => {
    const wrapper = mount(NAlert, {
      props: { closable: true, onClose: () => false }
    })
    const closeBtn = wrapper.find('.n-base-close.n-alert__close')
    await closeBtn.trigger('click')

    expect(wrapper.find('.n-base-close.n-alert__close').exists()).toBe(true)
  })

  it('should trigger callback when closed', async () => {
    const handleCloseClick = vi.fn()
    const handleOnAfterLeave = vi.fn()
    const wrapper = mount(NAlert, {
      props: {
        closable: true,
        onClose: handleCloseClick,
        onAfterLeave: handleOnAfterLeave
      }
    })
    const closeBtn = wrapper.find('.n-base-close.n-alert__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')

    expect(handleCloseClick).toHaveBeenCalled()

    setTimeout(() => {
      expect(handleOnAfterLeave).toHaveBeenCalled()
    }, 0)
  })
})
