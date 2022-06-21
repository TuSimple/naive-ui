import { mount } from '@vue/test-utils'
import { NCard } from '../index'

describe('n-card', () => {
  it('should work with import on demand', () => {
    mount(NCard)
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(NCard)

    expect(wrapper.find('.n-card-header').exists()).toBe(false)

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.n-card-header').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__main').text()).toBe('test')
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NCard)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-card').attributes('style')).toMatchSnapshot()
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        hoverable: true
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain('n-card--hoverable')
  })

  it('should work with `embedded` prop', async () => {
    const wrapper = mount(NCard)

    expect(wrapper.find('.n-card').attributes('style')).toContain(
      '--n-color: #fff'
    )
    await wrapper.setProps({ embedded: true })
    expect(wrapper.find('.n-card').attributes('style')).toContain(
      '--n-color: rgb(250, 250, 252)'
    )
  })

  it('should work with `segmented` prop', async () => {
    const wrapper = mount(NCard)
    expect(wrapper.find('.n-card').classes()).not.toContain(
      'n-card--content-segmented'
    )

    await wrapper.setProps({
      segmented: {
        content: true,
        footer: 'soft'
      }
    })
    expect(wrapper.find('.n-card').classes()).toContain(
      'n-card--content-segmented'
    )
  })

  it('should work with `slots` ', async () => {
    const wrapper = mount(NCard, {
      slots: {
        cover: () => 'cover',
        header: () => 'header',
        'header-extra': () => 'header-extra',
        default: () => 'content',
        footer: () => 'footer',
        action: () => 'action'
      }
    })

    expect(wrapper.find('.n-card-cover').exists()).toBe(true)
    expect(wrapper.find('.n-card-cover').text()).toBe('cover')

    expect(wrapper.find('.n-card-header').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__main').text()).toBe('header')

    expect(wrapper.find('.n-card-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__extra').text()).toBe('header-extra')

    expect(wrapper.find('.n-card__content').exists()).toBe(true)
    expect(wrapper.find('.n-card__content').text()).toBe('content')

    expect(wrapper.find('.n-card__footer').exists()).toBe(true)
    expect(wrapper.find('.n-card__footer').text()).toBe('footer')

    expect(wrapper.find('.n-card__action').exists()).toBe(true)
    expect(wrapper.find('.n-card__action').text()).toBe('action')
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.find('.n-card--bordered').exists()).toBe(false)
  })

  it('should work with `closable` and `on-close` prop', async () => {
    const onClose = vi.fn()
    const wrapper = mount(NCard, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-card-header__close').exists()).toBe(true)
    await wrapper.find('.n-card-header__close').trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should work with `header-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        title: 'test',
        headerStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-card-header').attributes('style')).toContain(
      testStyle
    )
  })

  it('should work with `content-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        contentStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-card__content').attributes('style')).toContain(
      testStyle
    )
  })

  it('should work with `footer-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        footerStyle: testStyle
      },
      slots: {
        footer: () => 'test'
      }
    })

    expect(wrapper.find('.n-card__footer').attributes('style')).toContain(
      testStyle
    )
  })

  it('should work with `header-extra-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        headerExtraStyle: testStyle
      },
      slots: {
        header: () => 'test-header',
        'header-extra': () => 'test-header-extra'
      }
    })

    expect(wrapper.find('.n-card-header__extra').attributes('style')).toContain(
      testStyle
    )
  })
})
