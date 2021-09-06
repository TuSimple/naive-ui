import { mount } from '@vue/test-utils'
import { NCascader } from '../index'
import { BaseOption } from '../src/interface'

function getOptions (depth = 3, iterator = 1, prefix = ''): BaseOption[] {
  const length = 12
  const options = []
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

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { placeholder: 'test-placeholder' }
    })
    expect(wrapper.find('.n-base-selection-placeholder').text()).toBe(
      'test-placeholder'
    )
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
    expect(wrapper.find('.n-base-selection-label__input').text()).toBe(
      'l-1-1-2'
    )
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
        ] as any,
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

  // it('should work with `leaf-only` prop', async () => {
  //   const wrapper = mount(NCascader, {
  //     attachTo: document.body,
  //     props: { options: getOptions(), virtualScroll: false }
  //   })
  //   await wrapper.setProps({ show: true })
  //   await nextTick()
  //   console.log(
  //     document.querySelector('.n-cascader-submenu-wrapper')?.innerHTML
  //   )

  //   expect(document.querySelector('.n-checkbox')).not.toEqual(null)

  //   await wrapper.setProps({ leafOnly: true })

  //   expect(document.querySelector('.n-checkbox')).toEqual(null)
  // })
})
