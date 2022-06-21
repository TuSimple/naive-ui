import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NTabPane, NTabs } from '../index'
import { AddIcon } from '../../_internal/icons'
import { sleep } from 'seemly'

describe('n-tabs', () => {
  it('should work with import on demand', () => {
    mount(NTabs)
  })

  it('should work with callback types', () => {
    function onUpdateValue1 (name: number): void {}
    function onUpdateValue2 (name: string): void {}
    function onUpdateValue3 (name: number | string): void {}
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue1
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue2
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue3
      }
    })
  })

  it('should work with empty tab-pane', () => {
    mount(NTabs, {
      props: {
        defaultValue: 'a'
      },
      slots: {
        default: () =>
          h(NTabPane, {
            tab: 'a',
            name: 'a'
          })
      }
    })
  })

  it('should show AddIcon with `addable` `on-add` prop', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        addable: true,
        onAdd
      }
    })

    expect(wrapper.findComponent(AddIcon).exists()).toBe(true)
    const addIcon = wrapper.find('.n-tabs-tab--addable')
    await addIcon.trigger('click')
    expect(onAdd).toHaveBeenCalled()
  })

  it('should work with `justify-content` prop', async () => {
    const wrapper = mount(NTabs)

    await wrapper.setProps({ justifyContent: 'space-between' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-between;'
    )

    await wrapper.setProps({ justifyContent: 'space-around' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-around;'
    )

    await wrapper.setProps({ justifyContent: 'space-evenly' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-evenly;'
    )
  })

  it('should work with `closable` prop', async () => {
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        defaultValue: '1'
      },
      slots: {
        default: () => [
          h(NTabPane, {
            tab: '1',
            name: '1'
          })
        ]
      }
    })
    expect(wrapper.find('.n-base-close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.n-base-close').exists()).toBe(true)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NTabs)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()
  })

  it('should work with `tabs-padding` prop', async () => {
    const wrapper = mount(NTabs)

    expect(
      wrapper.find('.n-tabs-scroll-padding').attributes('style')
    ).toContain('width: 0px;')

    await wrapper.setProps({ tabsPadding: 100 })
    expect(
      wrapper.find('.n-tabs-scroll-padding').attributes('style')
    ).toContain('width: 100px;')
  })

  it('should work with `display-directive` prop', async () => {
    const displayDirectives: Array<'show' | 'if' | 'show:lazy'> = [
      'show',
      'if',
      'show:lazy'
    ]
    const wrapper = mount(NTabs, {
      props: { value: 'show' },
      slots: {
        default: () =>
          displayDirectives.map((directive) => (
            <NTabPane
              displayDirective={directive}
              tab={directive}
              name={directive}
            >
              {{
                default: () => (
                  <span class={`test-${directive.replace(':', '-')}`} />
                )
              }}
            </NTabPane>
          ))
      }
    })
    await wrapper.setProps({ value: 'if' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(true)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(false)
    await wrapper.setProps({ value: 'show:lazy' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(true)
    await wrapper.setProps({ value: 'show' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(true)
  })

  it('should work with `on-before-leave` prop', async () => {
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        defaultValue: '3',
        onBeforeLeave: (name: string) => {
          switch (name) {
            case '1':
              return false
            case '2':
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 1000)
              }) as Promise<boolean>
            default:
              return true
          }
        }
      },
      slots: {
        default: () => [
          h(NTabPane, {
            tab: '1',
            name: '1'
          }),
          h(NTabPane, {
            tab: '2',
            name: '2'
          }),
          h(NTabPane, {
            tab: '3',
            name: '3'
          })
        ]
      }
    })
    const tabs = wrapper.findAll('.n-tabs-tab')
    expect(tabs[2].classes()).toContain('n-tabs-tab--active')
    await tabs[0].trigger('click')
    expect(tabs[2].classes()).toContain('n-tabs-tab--active')
    await tabs[1].trigger('click')
    expect(tabs[2].classes()).toContain('n-tabs-tab--active')
    await sleep(1000)
    expect(tabs[1].classes()).toContain('n-tabs-tab--active')
  })

  it('should work with `pane-class` prop', () => {
    const wrapper = mount(NTabs, {
      props: {
        paneClass: 'test'
      },
      slots: {
        default: () =>
          h(
            NTabPane,
            {
              tab: 'Oasis',
              name: 'oasis'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.n-tab-pane').classes('test')).toBe(true)
  })

  it('should work with `pane-style` prop', () => {
    const wrapper = mount(NTabs, {
      props: {
        paneStyle: {
          color: 'red'
        }
      },
      slots: {
        default: () =>
          h(
            NTabPane,
            {
              tab: 'Oasis',
              name: 'oasis'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.n-tab-pane').attributes('style')).toBe('color: red;')
  })

  it('should work with `tab-style` prop', () => {
    const wrapper = mount(NTabs, {
      props: {
        tabStyle: {
          color: 'red'
        }
      },
      slots: {
        default: () =>
          h(
            NTabPane,
            {
              tab: 'Oasis',
              name: 'oasis'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.n-tabs-tab').attributes('style')).toBe('color: red;')
  })

  it('should work with `type` prop', () => {
    ;(['bar', 'line', 'card', 'segment'] as const).forEach((type) => {
      const wrapper = mount(NTabs, {
        props: {
          type
        },
        slots: {
          default: () =>
            h(
              NTabPane,
              {
                tab: 'Oasis',
                name: 'oasis'
              },
              'Wonderwall'
            )
        }
      })

      expect(wrapper.find('.n-tabs').classes()).toContain(
        `n-tabs--${type}-type`
      )
      wrapper.unmount()
    })
  })

  it('should work with `on-close` prop', async () => {
    const onClose = vi.fn()
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        defaultValue: '1',
        closable: true,
        onClose
      },
      slots: {
        default: () => [
          h(NTabPane, {
            tab: '1',
            name: '1'
          })
        ]
      }
    })

    const addIcon = wrapper.find('.n-base-close')
    await addIcon.trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should work with `prefix` `suffix` slots', async () => {
    const wrapper = mount(NTabs, {
      props: {
        defaultValue: '1'
      },
      slots: {
        default: () => [
          h(NTabPane, {
            tab: '1',
            name: '1'
          })
        ],
        prefix: () => 'test-prefix',
        suffix: () => 'test-suffix'
      }
    })

    expect(wrapper.find('.n-tabs-nav__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-tabs-nav__prefix').text()).toBe('test-prefix')
    expect(wrapper.find('.n-tabs-nav__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-tabs-nav__suffix').text()).toBe('test-suffix')
  })
})
