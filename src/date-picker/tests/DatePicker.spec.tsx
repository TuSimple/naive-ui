import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { format } from 'date-fns/esm'
import { NDatePicker } from '../index'
import { Value } from '../src/interface'
import { dateEnUS } from '../../locales'

describe('n-date-picker', () => {
  it('should work with import on demand', () => {
    mount(NDatePicker).unmount()
  })

  it('date type should work with shortcuts prop', async () => {
    const test = ref<[number, number]>([0, 0])
    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        type: 'date',
        onUpdateValue: (value: [number, number]) => {
          test.value = value
        },
        shortcuts: {
          'Honey birthday': 1631203200000
        }
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual(1631203200000)
    test.value = [0, 0]
    await wrapper.setProps({
      type: 'datetime'
    })
    await wrapper.find('.n-input').trigger('click')
    const timeButton: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    timeButton.click()
    expect(test.value).toEqual(1631203200000)
    wrapper.unmount()
  })

  it('range type should work with shortcuts prop', async () => {
    const test = ref<Value>(0)
    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        type: 'daterange',
        onUpdateValue: (value: Value) => {
          test.value = value
        },
        shortcuts: {
          'Honey birthday': [1629216000000, 1631203200000]
        }
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    test.value = 0
    await wrapper.setProps({
      type: 'datetimerange'
    })
    await wrapper.find('.n-input').trigger('click')
    const rangeButton: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    rangeButton.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    wrapper.unmount()
  })

  it('date type should work with shortcuts prop with function value', async () => {
    const test = ref<Value>(0)
    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        type: 'date',
        onUpdateValue: (value: Value) => {
          test.value = value
        },
        shortcuts: {
          'Honey birthday': () => 1631203200000
        }
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual(1631203200000)
    test.value = 0
    await wrapper.setProps({
      type: 'datetime'
    })
    await wrapper.find('.n-input').trigger('click')
    const timeButton: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    timeButton.click()
    expect(test.value).toEqual(1631203200000)
    wrapper.unmount()
  })

  it('range type should work with shortcuts prop with function value', async () => {
    const test = ref<[number, number]>([0, 0])

    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        type: 'daterange',
        onUpdateValue: (value: [number, number]) => {
          test.value = value
        },
        shortcuts: {
          'Honey birthday': () =>
            [1629216000000, 1631203200000] as [number, number]
        }
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    test.value = [0, 0]
    await wrapper.setProps({
      type: 'datetimerange'
    })
    await wrapper.find('.n-input').trigger('click')
    const rangeButton: HTMLElement = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    rangeButton.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    wrapper.unmount()
  })

  it('should work with `inputReadonly` prop', async () => {
    const wrapper = mount(NDatePicker)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')
    await wrapper.setProps({
      inputReadonly: true
    })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(NDatePicker)
    expect(wrapper.find('.n-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.n-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NDatePicker)
    expect(wrapper.find('.n-input').attributes('class')).not.toContain(
      'n-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.n-input').attributes('class')).toContain(
      'n-input--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((item) => {
      const wrapper = mount(NDatePicker, { props: { size: item } })
      expect(wrapper.find('.n-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NDatePicker)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select Date')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `defaultValue` prop', async () => {
    const wrapper = mount(NDatePicker, {
      props: {
        defaultValue: 1183135260000
      }
    })

    const inputEl = await wrapper.find('.n-input__input').find('input')
    expect(inputEl.element.value).toEqual(
      format(1183135260000, 'yyyy-MM-dd', {
        locale: dateEnUS.locale
      })
    )
  })

  it('should work with `firstDayOfWeek` prop', async () => {
    const wrapper = mount(NDatePicker, {
      attachTo: document.body,
      props: {
        firstDayOfWeek: 1
      }
    })

    await wrapper.find('.n-input__input').trigger('click')
    expect(
      document.querySelectorAll('.n-date-panel-weekdays__day')[0].textContent
    ).toBe('Tu')

    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NDatePicker, {
      attachTo: document.body,
      props: { type: 'date' }
    })

    await wrapper.find('.n-input__input').trigger('click')
    expect(document.querySelector('.n-date-panel--date')).not.toEqual(null)

    await wrapper.setProps({ type: 'datetime' })
    await wrapper.find('.n-input__input').trigger('click')
    expect(document.querySelector('.n-date-panel--datetime')).not.toEqual(null)

    await wrapper.setProps({ type: 'daterange' })
    await wrapper.find('.n-input__input').trigger('click')
    expect(document.querySelector('.n-date-panel--daterange')).not.toEqual(null)

    await wrapper.setProps({ type: 'datetimerange' })
    await wrapper.find('.n-input__input').trigger('click')
    expect(document.querySelector('.n-date-panel--datetimerange')).not.toEqual(
      null
    )

    await wrapper.setProps({ type: 'month' })
    await wrapper.find('.n-input__input').trigger('click')
    expect(document.querySelector('.n-date-panel--month')).not.toEqual(null)

    wrapper.unmount()
  })

  it('should work with `onBlur` prop', async () => {
    const onBlur = vi.fn()
    const wrapper = mount(NDatePicker, {
      props: { onBlur }
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should work with `onFocus` prop', async () => {
    const onFocus = vi.fn()
    const wrapper = mount(NDatePicker, {
      props: { onFocus }
    })

    await wrapper.find('input').trigger('focus')
    expect(onFocus).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should work with `separator` prop', async () => {
    const wrapper = mount(NDatePicker, {
      props: { separator: '07akioni', type: 'daterange' }
    })
    expect(wrapper.text().includes('07akioni')).toBe(true)
    await wrapper.setProps({ separator: '08akioni', type: 'datetimerange' })
    expect(wrapper.text().includes('08akioni')).toBe(true)
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(NDatePicker, {
        props: { status: status }
      })
      expect(wrapper.find('.n-input').classes()).toContain(
        `n-input--${status}-status`
      )
      wrapper.unmount()
    })
  })
})
