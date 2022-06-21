import { mount } from '@vue/test-utils'
import { NRate } from '../index'

describe('n-rate', () => {
  it('should work with import on demand', () => {
    mount(NRate)
  })

  it('should work with `count` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ count: 10 })
    expect(wrapper.findAll('.n-rate__item').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ value: 3, count: 10 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)
    await wrapper.setProps({ value: 10 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `defaultValue` prop', async () => {
    const wrapper = mount(NRate, { props: { defaultValue: 8, count: 10 } })

    expect(wrapper.findAll('.n-rate__item--active').length).toBe(8)

    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ size: 20 })
    expect(wrapper.find('.n-rate').attributes('style')).toContain(
      '--n-item-size: 20px'
    )

    for (const size of ['small', 'medium', 'large'] as const) {
      await wrapper.setProps({ size })
      expect(wrapper.find('.n-rate').attributes('style')).toMatchSnapshot()
    }

    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ color: '#4fb233' })
    expect(wrapper.find('.n-rate').attributes('style')).toContain(
      '--n-item-color-active: #4fb233'
    )

    wrapper.unmount()
  })

  it('should work with `onUpdateValue` prop', async () => {
    const onUpdateValue = vi.fn()
    const onUpdateValue2 = vi.fn()
    const wrapper = mount(NRate)

    const testNumber = 2

    await wrapper.setProps({ onUpdateValue, 'onUpdate:value': onUpdateValue })
    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue).toHaveBeenCalledTimes(2)

    await wrapper.setProps({
      onUpdateValue: [onUpdateValue, onUpdateValue2],
      'onUpdate:value': [onUpdateValue, onUpdateValue2]
    })
    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue2).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue).toHaveBeenCalledTimes(4)

    wrapper.unmount()
  })

  it('should work with `readonly` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ readonly: true })

    expect(wrapper.find('.n-rate').classes()).toContain('n-rate--readonly')

    await wrapper.setProps({ readonly: true, value: 3 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    await wrapper.findAll('.n-rate__item')[3].trigger('click')
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    await wrapper.findAll('.n-rate__item')[3].trigger('mousemove')
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    wrapper.unmount()
  })

  it('should work with `allowHalf` prop', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NRate)
    await wrapper.setProps({ allowHalf: true })

    const testNumber = 2

    await wrapper.setProps({ onUpdateValue })
    await wrapper.findAll('.n-rate__half')[testNumber].trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith(testNumber + 0.5)

    wrapper.unmount()
  })
})
