import { mount } from '@vue/test-utils'
import { NAutoComplete, AutoCompleteProps } from '../index'

describe('n-auto-complete', () => {
  it('should work with import on demand', () => {
    mount(NAutoComplete)
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(NAutoComplete)
    expect(wrapper.find('.n-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.n-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NAutoComplete)
    expect(wrapper.find('.n-input').classes()).not.toContain(
      'n-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--disabled')
    wrapper.unmount()
  })

  it('should work with `loading` prop', async () => {
    const options: AutoCompleteProps['options'] = [
      '@gmail.com',
      '@163.com',
      '@qq.com'
    ].map((suffix) => {
      const prefix = 'test'
      return {
        label: prefix + suffix,
        value: prefix + suffix
      }
    })
    const wrapper = mount(NAutoComplete, {
      props: {
        options: options
      }
    })
    expect(wrapper.find('.n-base-loading__container').exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.n-base-loading__container').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NAutoComplete)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Please Input')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NAutoComplete, { props: { size: size } })
      expect(wrapper.find('.n-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `getShow` prop', async () => {
    const options: AutoCompleteProps['options'] = [
      '@gmail.com',
      '@163.com',
      '@qq.com'
    ].map((suffix) => {
      const prefix = 'test'
      return {
        label: prefix + suffix,
        value: prefix + suffix
      }
    })
    const wrapper = mount(NAutoComplete)
    await wrapper.setProps({
      getShow: (value: string | null) => {
        if (value === 'a') {
          return true
        }
        return false
      },
      options: options
    })
    expect(document.querySelector('.n-auto-complete-menu')).toEqual(null)
    wrapper.find('input').setValue('a')
    await wrapper.find('input').trigger('focus')
    expect(document.querySelector('.n-auto-complete-menu')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `input-props` prop', async () => {
    const wrapper = mount(NAutoComplete, {
      props: {
        inputProps: {
          id: 'input',
          max: '10'
        }
      }
    })
    expect(wrapper.find('input').attributes('max')).toEqual('10')
    wrapper.unmount()
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = vi.fn()
    const wrapper = mount(NAutoComplete, {
      props: { onBlur: onBlur }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = vi.fn()
    const wrapper = mount(NAutoComplete, {
      props: { onFocus: onFocus }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(NAutoComplete, { props: { status: status } })
      expect(wrapper.find('.n-input').classes()).toContain(
        `n-input--${status}-status`
      )
      wrapper.unmount()
    })
  })

  it('should work with `placement` prop', async () => {
    ;(
      [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end'
      ] as const
    ).forEach((placement) => {
      const wrapper = mount(NAutoComplete, { props: { placement: placement } })
      setTimeout(() => {
        expect(
          document
            .querySelector('.v-binder-follower-content')
            ?.getAttribute('v-placement')
        ).toBe(placement)
        wrapper.unmount()
      })
    })
  })
})
