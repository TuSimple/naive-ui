import { mount } from '@vue/test-utils'
import { NPageHeader } from '../index'

describe('n-page-header', () => {
  it('should work with page header', () => {
    mount(NPageHeader)
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(NPageHeader, { props: { title: 'test-title' } })

    expect(wrapper.find('.n-page-header__title').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__title').html()).toContain('test-title')
  })

  it('should work with `extra` prop', async () => {
    const wrapper = mount(NPageHeader, { props: { extra: 'test-extra' } })

    expect(wrapper.find('.n-page-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__extra').html()).toContain('test-extra')
  })

  it('should work with `subtitle` prop', async () => {
    const wrapper = mount(NPageHeader, { props: { subtitle: 'test-subtitle' } })

    expect(wrapper.find('.n-page-header__subtitle').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__subtitle').html()).toContain(
      'test-subtitle'
    )
  })

  it('should work with `on-back` prop', async () => {
    const handleOnBack = vi.fn()
    const wrapper = mount(NPageHeader, { props: { onBack: handleOnBack } })

    expect(wrapper.find('.n-page-header__back').exists()).toBe(true)
    await wrapper.find('.n-page-header__back').trigger('click')
    expect(handleOnBack).toHaveBeenCalled()
  })

  it('should work with slots', async () => {
    const wrapper = mount(NPageHeader, {
      props: { onBack: () => {} },
      slots: {
        avatar: () => 'avatar-slot',
        header: () => 'header-slot',
        default: () => 'default-slot',
        extra: () => 'extra-slot',
        footer: () => 'footer-slot',
        subtitle: () => 'subtitle-slot',
        title: () => 'title-slot',
        back: () => 'back-slot'
      }
    })

    expect(wrapper.find('.n-page-header__avatar').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__avatar').html()).toContain(
      'avatar-slot'
    )
    expect(wrapper.find('.n-page-header-header').exists()).toBe(true)
    expect(wrapper.find('.n-page-header-header').html()).toContain(
      'header-slot'
    )
    expect(wrapper.find('.n-page-header-content').exists()).toBe(true)
    expect(wrapper.find('.n-page-header-content').html()).toContain(
      'default-slot'
    )
    expect(wrapper.find('.n-page-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__extra').html()).toContain('extra-slot')
    expect(wrapper.find('.n-page-header-footer').exists()).toBe(true)
    expect(wrapper.find('.n-page-header-footer').html()).toContain(
      'footer-slot'
    )
    expect(wrapper.find('.n-page-header__subtitle').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__subtitle').html()).toContain(
      'subtitle-slot'
    )
    expect(wrapper.find('.n-page-header__title').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__title').html()).toContain('title-slot')
    expect(wrapper.find('.n-page-header__back').exists()).toBe(true)
    expect(wrapper.find('.n-page-header__back').html()).toContain('back-slot')
  })
})
