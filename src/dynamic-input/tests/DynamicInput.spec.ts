import { mount } from '@vue/test-utils'
import { NDynamicInput } from '../index'

describe('n-dynamic-input', () => {
  it('should work with import on demand', () => {
    mount(NDynamicInput)
  })

  it('should work with `value`', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa']
      }
    })

    const inputEl = await wrapper.find('input')
    expect(inputEl.element.value).toEqual('aaa')
    expect(wrapper.html()).toContain('data-key="0"')
    wrapper.unmount()
  })

  it('should work with `create-button-props` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [],
        createButtonProps: {
          dashed: true
        }
      }
    })

    expect(wrapper.find('.n-button').classes()).toContain('n-button--dashed')
    wrapper.unmount()
  })

  it('should work with `preset` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa']
      }
    })
    expect(wrapper.find('.n-dynamic-input-preset-input').exists()).toBe(true)
    expect(wrapper.find('.n-dynamic-input-preset-pair').exists()).toBe(false)

    await wrapper.setProps({
      preset: 'pair',
      value: [
        {
          key: 'key',
          value: 'value'
        }
      ]
    })
    expect(wrapper.find('.n-dynamic-input-preset-input').exists()).toBe(false)
    expect(wrapper.find('.n-dynamic-input-preset-pair').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show-sort-button` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa'],
        showSortButton: true
      }
    })

    expect(wrapper.findAll('button').length).toBe(4)
    wrapper.unmount()
  })

  it('should work with `item-style` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa'],
        itemStyle: { color: 'green' }
      }
    })

    expect(
      wrapper.findAll('.n-dynamic-input-item')[0].attributes('style')
    ).toBe('color: green;')
    wrapper.unmount()
  })

  it('should work with `min` `max` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['', '', ''],
        min: 2,
        max: 4
      }
    })
    expect(wrapper.find('.n-button--disabled').exists()).toBe(false)

    await wrapper.setProps({ value: ['', ''] })
    expect(wrapper.findAll('button')[0].classes()).toContain(
      'n-button--disabled'
    )

    await wrapper.setProps({ value: ['', '', '', ''] })
    expect(wrapper.findAll('button')[1].classes()).toContain(
      'n-button--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [''],
        placeholder: 'test'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('test')
    wrapper.unmount()
  })

  it('should work with `key-placeholder` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        preset: 'pair',
        value: [
          {
            key: '',
            value: ''
          }
        ],
        keyPlaceholder: 'test-key-placeholder'
      }
    })

    expect(wrapper.findAll('input')[0].attributes('placeholder')).toBe(
      'test-key-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `on-create` prop', async () => {
    const onCreate = vi.fn()
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [''],
        onCreate
      }
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(onCreate).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-remove` prop', async () => {
    const onRemove = vi.fn()
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [''],
        onRemove
      }
    })

    await wrapper.findAll('button')[0].trigger('click')
    expect(onRemove).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `create-button-default` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: []
      },
      slots: {
        'create-button-default': () => 'test-content'
      }
    })

    expect(wrapper.find('.n-button__content').text()).toBe('test-content')
    wrapper.unmount()
  })

  it('should work with `create-button-icon` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: []
      },
      slots: {
        'create-button-icon': () => 'test-icon'
      }
    })

    expect(wrapper.find('.n-icon-slot').text()).toBe('test-icon')
    wrapper.unmount()
  })
})
