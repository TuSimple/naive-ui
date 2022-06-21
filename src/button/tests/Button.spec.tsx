import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NButton, NxButton } from '../index'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from '../../icon'

describe('n-button', () => {
  it('should work with import on demand', () => {
    mount(NButton)
  })
  it('clickable', async () => {
    const onClick = vi.fn()
    const inst = mount(NButton, {
      props: {
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).toHaveBeenCalled()
    inst.unmount()
  })
  it('keyboard', async () => {
    const onClick = vi.fn()
    const inst = mount(NButton, {
      props: {
        keyboard: false,
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).toBeCalledTimes(1)
    await inst.trigger('keydown.space')
    expect(onClick).toBeCalledTimes(1)
    await inst.trigger('keydown.enter')
    expect(onClick).toBeCalledTimes(1)
    inst.unmount()
  })
  it('disabled', async () => {
    const onClick = vi.fn()
    const inst = mount(NButton, {
      props: {
        disabled: true,
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    inst.unmount()
  })
  it('passed native event & attr tsx type checking', () => {
    ;<div>
      <NxButton onMousedown={() => {}} />
      <NxButton formaction="" />
    </div>
  })

  it('should work with `attr-type` prop', () => {
    ;(['button', 'submit', 'reset'] as const).forEach((type) => {
      const wrapper = mount(NButton, { props: { attrType: type } })
      expect(wrapper.find('button').attributes('type')).toContain(type)
      wrapper.unmount()
    })
  })

  it('should work with `block` prop', async () => {
    const wrapper = mount(NButton)
    expect(wrapper.find('.n-button').classes()).not.toContain('n-button--block')

    await wrapper.setProps({ block: true })
    expect(wrapper.find('.n-button').classes()).toContain('n-button--block')
    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    ;(['primary', 'info', 'success', 'warning', 'error'] as const).forEach(
      (type) => {
        const wrapper = mount(NButton, { props: { type: type } })
        expect(wrapper.find('button').classes()).toContain(
          `n-button--${type}-type`
        )
        wrapper.unmount()
      }
    )
  })

  it('should work with `dashed` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ dashed: true })
    expect(wrapper.find('button').classes()).toContain('n-button--dashed')
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.n-button__border').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['tiny', 'small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NButton, { props: { size: size } })
      expect(wrapper.find('button').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `text` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
    wrapper.unmount()
  })

  it('should work with `tag` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true,
        tag: 'a',
        href: 'https://www.naiveui.com',
        target: '_blank',
        type: 'primary'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('a').attributes('style')).toMatchSnapshot()
    expect(wrapper.find('a').classes()).toContain('n-button--primary-type')
    expect(wrapper.find('a').attributes('type')).toContain('button')
    expect(wrapper.find('a').attributes('disabled')).toContain('false')
    expect(wrapper.find('a').attributes('href')).toContain(
      'https://www.naiveui.com'
    )
    expect(wrapper.find('a').attributes('target')).toContain('_blank')
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
    wrapper.unmount()
  })

  it('should work with `icon` slot', async () => {
    const wrapper = mount(NButton, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          }),
        default: () => 'test'
      }
    })

    expect(wrapper.find('span').classes('n-button__icon')).toBe(true)
    expect(wrapper.find('div').classes('n-icon-slot')).toBe(true)
    expect(wrapper.find('i').classes('n-icon')).toBe(true)
    expect(wrapper.find('i').classes('n-icon')).toBe(true)
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
    expect(wrapper.find('button').element.children[1].textContent).toBe('test')

    await wrapper.setProps({ iconPlacement: 'right' })
    expect(wrapper.find('button').element.children[0].textContent).toBe('test')
    wrapper.unmount()
  })

  it('should work with `shape` ', async () => {
    const wrapper = mount(NButton, {
      props: {
        circle: true
      },
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          })
      }
    })
    const circleStyle: string[] = [
      '--n-width: 34px;',
      '--n-padding: initial;',
      '--n-border-radius: 34px;'
    ]
    let buttonStyle = wrapper.find('button').attributes('style')
    expect(circleStyle.every((i) => buttonStyle?.includes(i))).toBe(true)

    await wrapper.setProps({ circle: false, round: true })
    const roundStyle: string[] = [
      '--n-width: initial;',
      '--n-padding: 0 18px;',
      '--n-border-radius: 34px;'
    ]
    buttonStyle = wrapper.find('button').attributes('style')
    expect(roundStyle.every((i) => buttonStyle?.includes(i))).toBe(true)

    await wrapper.setProps({ circle: false, round: false })
    const defaultStyle: string[] = [
      '--n-width: initial;',
      '--n-padding: 0 14px;',
      '--n-border-radius: 3px;'
    ]
    buttonStyle = wrapper.find('button').attributes('style')
    expect(defaultStyle.every((i) => buttonStyle?.includes(i))).toBe(true)
    wrapper.unmount()
  })

  it('should work with `ghost` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        ghost: true
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('button').classes()).toContain('n-button--ghost')
    wrapper.unmount()
  })

  it('should work with `icon-placement` prop', async () => {
    const wrapper = mount(NButton, {
      slots: {
        default: () => 'test',
        icon: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          })
      }
    })
    expect(wrapper.findAll('span')[0].attributes('class')).toContain(
      'n-button__icon'
    )
    expect(wrapper.findAll('span')[1].attributes('class')).toContain(
      'n-button__content'
    )

    await wrapper.setProps({ iconPlacement: 'right' })
    expect(wrapper.findAll('span')[0].attributes('class')).toContain(
      'n-button__content'
    )
    expect(wrapper.findAll('span')[1].attributes('class')).toContain(
      'n-button__icon'
    )
    wrapper.unmount()
  })

  it('should work with `loading` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        loading: true
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-icon-slot').classes()).toContain('n-base-loading')
    expect(wrapper.find('.n-icon-slot').attributes('aria-label')).toContain(
      'loading'
    )
    wrapper.unmount()
  })

  it('should work with `color` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        color: '#8a2be2'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('button').classes()).toContain('n-button--color')
    const colorStyle: string[] = [
      '--n-color: #8a2be2;',
      '--n-color-disabled: #8a2be2;',
      '--n-ripple-color: #8a2be2;'
    ]
    const buttonStyle = wrapper.find('button').attributes('style')
    expect(colorStyle.every((i) => buttonStyle?.includes(i))).toBe(true)
    wrapper.unmount()
  })

  it('should work with `text-color` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        'text-color': '#8a2be2'
      },
      slots: {
        default: () => 'test'
      }
    })

    const buttonStyle = wrapper.find('button').attributes('style')
    expect(
      (
        [
          '--n-text-color: #8a2be2;',
          '--n-text-color-disabled: #8a2be2;'
        ] as string[]
      ).every((i) => buttonStyle?.includes(i))
    ).toBe(true)
    wrapper.unmount()
  })
})
