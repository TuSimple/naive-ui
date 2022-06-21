import { mount } from '@vue/test-utils'
import { NCascader } from '../index'
import { CascaderOption } from '../src/interface'

function getOptions (depth = 3, iterator = 1, prefix = ''): CascaderOption[] {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

describe('n-cascader', () => {
  it('should work with import on demand', () => {
    mount(NCascader)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NCascader)
    expect(wrapper.find('.n-base-selection').classes()).not.toContain(
      'n-base-selection--disabled'
    )

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-base-selection').classes()).toContain(
      'n-base-selection--disabled'
    )
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NCascader, { props: { size: i } })
      expect(
        wrapper.find('.n-base-selection').attributes('style')
      ).toMatchSnapshot()
    })
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(NCascader, { props: { status: status } })
      expect(wrapper.find('.n-base-selection').classes()).toContain(
        `n-base-selection--${status}-status`
      )
      wrapper.unmount()
    })
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { placeholder: 'test-placeholder' }
    })
    expect(wrapper.find('.n-base-selection-placeholder').text()).toBe(
      'test-placeholder'
    )
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
      const wrapper = mount(NCascader, { props: { placement: placement } })
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

  it('should work with `filterable` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { filterable: false }
    })
    expect(wrapper.find('input').exists()).not.toBe(true)

    await wrapper.setProps({ filterable: true })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should work with `default-value` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { options: getOptions(), defaultValue: 'l-1-1-2' }
    })
    expect(wrapper.find('.n-base-selection-input').text()).toBe('l-1-1-2')
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { options: getOptions() }
    })
    expect(wrapper.find('.n-base-selection-label').exists()).toBe(true)
    expect(wrapper.find('.n-base-selection-tags').exists()).not.toBe(true)

    await wrapper.setProps({ multiple: true })

    expect(wrapper.find('.n-base-selection-tags').exists()).toBe(true)
    expect(wrapper.find('.n-base-selection-label').exists()).not.toBe(true)
  })

  it('should work with `label-field` `value-field` `children-field` props', async () => {
    const wrapper = mount(NCascader, {
      props: {
        options: [
          {
            whateverLabel: 'Rubber Soul',
            whateverValue: 'Rubber Soul',
            whateverChildren: [
              {
                whateverLabel:
                  "Everybody's Got Something to Hide Except Me and My Monkey",
                whateverValue:
                  "Everybody's Got Something to Hide Except Me and My Monkey"
              }
            ]
          }
        ],
        'label-field': 'whateverLabel',
        'value-field': 'whateverValue',
        'children-field': 'whateverChildren',
        'default-value':
          "Everybody's Got Something to Hide Except Me and My Monkey"
      }
    })
    expect(wrapper.find('.n-base-selection-label').text()).toBe(
      "Rubber Soul / Everybody's Got Something to Hide Except Me and My Monkey"
    )
  })

  it('should work with `check-strategy=child`', async () => {
    const wrapper = mount(NCascader, {
      attachTo: document.body,
      props: { options: getOptions(), virtualScroll: false }
    })
    await wrapper.setProps({ show: true })

    expect(document.querySelector('.n-checkbox')).not.toEqual(null)

    await wrapper.setProps({ checkStrategy: 'child' })

    expect(document.querySelector('.n-checkbox')).toEqual(null)
    wrapper.unmount()
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = vi.fn()
    const wrapper = mount(NCascader, {
      props: { options: getOptions(), onBlur: onBlur }
    })
    await wrapper.find('.n-base-selection').trigger('focusout')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = vi.fn()
    const wrapper = mount(NCascader, {
      props: { options: getOptions(), onFocus: onFocus }
    })
    await wrapper.find('.n-base-selection').trigger('focusin')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should be active after clicked', async () => {
    const wrapper = mount(NCascader, {
      attachTo: document.body,
      props: {
        options: getOptions()
      }
    })

    await wrapper.find('.n-base-selection').trigger('click')
    expect(wrapper.find('.n-base-selection--active').exists()).toBe(true)
    expect(document.querySelector('.n-cascader-menu')).not.toEqual(null)

    await wrapper.find('.n-base-selection').trigger('click')
    expect(wrapper.find('.n-base-selection--active').exists()).toBe(false)
    expect(document.querySelector('.n-cascader-menu')).toEqual(null)
    wrapper.unmount()
  })

  it('should be active after click outside', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const wrapper = mount(NCascader, {
      attachTo: document.body,
      props: {
        options: getOptions()
      }
    })

    await wrapper.find('.n-base-selection').trigger('click')
    expect(document.querySelector('.n-cascader-menu')).not.toEqual(null)
    await document.body.click()
    await document.body.dispatchEvent(mousedownEvent)
    await document.body.dispatchEvent(mouseupEvent)
    expect(document.querySelector('.n-cascader-menu')).toEqual(null)

    wrapper.unmount()
  })
})
