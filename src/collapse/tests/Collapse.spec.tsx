import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCollapse, NCollapseItem } from '../index'

describe('n-collapse', () => {
  it('should work with import on demand', () => {
    mount(NCollapse)
  })

  it('can customize icon', () => {
    const wrapper = mount(() => {
      return (
        <NCollapse>
          {{
            arrow: () => <div class="my-icon"></div>,
            default: () => <NCollapseItem name="1"></NCollapseItem>
          }}
        </NCollapse>
      )
    })
    expect(wrapper.find('.my-icon').exists()).toEqual(true)
  })

  it('should work with `accordion` prop', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        default: () => [
          <NCollapseItem name="1">
            {{ default: () => <div class="ci1">ci1</div> }}
          </NCollapseItem>,
          <NCollapseItem name="2">
            {{ default: () => <div class="ci2">ci2</div> }}
          </NCollapseItem>,
          <NCollapseItem name="3">
            {{ default: () => <div class="ci3">ci3</div> }}
          </NCollapseItem>
        ]
      }
    })

    const headerMains = wrapper.findAll('.n-collapse-item__header-main')
    await headerMains[0].trigger('click')
    await headerMains[1].trigger('click')

    expect(wrapper.findAll('.n-collapse-item__header')[0].classes()).toContain(
      'n-collapse-item__header--active'
    )
    expect(wrapper.findAll('.n-collapse-item__header')[1].classes()).toContain(
      'n-collapse-item__header--active'
    )

    await wrapper.setProps({
      accordion: true
    })

    await headerMains[2].trigger('click')
    expect(
      wrapper.findAll('.n-collapse-item__header')[0].classes()
    ).not.toContain('n-collapse-item__header--active')
    expect(
      wrapper.findAll('.n-collapse-item__header')[1].classes()
    ).not.toContain('n-collapse-item__header--active')
    expect(wrapper.findAll('.n-collapse-item__header')[2].classes()).toContain(
      'n-collapse-item__header--active'
    )
  })

  it('should work with `arrow-placement` prop', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        default: () => <NCollapseItem name="1"></NCollapseItem>
      }
    })
    expect(wrapper.find('.n-collapse-item').classes()).toContain(
      'n-collapse-item--left-arrow-placement'
    )

    await wrapper.setProps({ arrowPlacement: 'right' })
    expect(wrapper.find('.n-collapse-item').classes()).toContain(
      'n-collapse-item--right-arrow-placement'
    )
  })

  it('should work with nested structure', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        default: () =>
          h(
            NCollapseItem,
            { name: '1' },
            {
              default: () =>
                h(NCollapse, null, {
                  default: () => h(NCollapseItem, { name: '2' })
                })
            }
          )
      }
    })

    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    expect(wrapper.find('.n-collapse-item__header').classes()).toContain(
      'n-collapse-item__header--active'
    )
    await wrapper
      .find('.n-collapse-item__content-wrapper')
      .find('.n-collapse-item__header-main')
      .trigger('click')
    expect(
      wrapper
        .find('.n-collapse-item__content-wrapper')
        .find('.n-collapse-item__header')
        .classes()
    ).toContain('n-collapse-item__header--active')
  })

  it('should work with `display-directive` prop', async () => {
    const wrapper = mount(NCollapse, {
      props: {
        displayDirective: 'show'
      },
      slots: {
        default: () =>
          h(
            NCollapseItem,
            { name: '1' },
            { default: () => h('div', null, { default: () => 'test' }) }
          )
      }
    })

    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    expect(
      wrapper.find('.n-collapse-item__content-wrapper').attributes('style')
    ).toBe('display: none;')

    await wrapper.setProps({
      displayDirective: 'if'
    })

    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    expect(wrapper.find('.n-collapse-item__content-wrapper').exists()).toBe(
      false
    )
  })

  it('should work with `on-item-header-click` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NCollapse, {
      props: {
        onItemHeaderClick: onClick
      },
      slots: {
        default: () => <NCollapseItem name="1"></NCollapseItem>
      }
    })
    const triggerNodeWrapper = wrapper.find('.n-collapse-item__header-main')
    await triggerNodeWrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should work with `slots` ', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        header: () => 'header',
        'header-extra': () => 'header-extra',
        default: () => <NCollapseItem name="1"></NCollapseItem>,
        arrow: () => 'arrow'
      }
    })
    expect(wrapper.find('.n-collapse-item__header-main').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item__header-main').text()).toBe('arrow')

    expect(wrapper.find('.n-collapse-item__header-extra').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item__header-extra').text()).toBe(
      'header-extra'
    )

    expect(wrapper.find('.n-collapse-item-arrow').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item-arrow').text()).toBe('arrow')
  })

  it('props.defaultExpandedNames', async () => {
    let wrapper = mount(NCollapse, {
      props: {
        defaultExpandedNames: ['1']
      },
      slots: {
        default: () => [
          <NCollapseItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </NCollapseItem>,
          <NCollapseItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </NCollapseItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
    wrapper = mount(NCollapse, {
      props: {
        accordion: true,
        defaultExpandedNames: '1'
      },
      slots: {
        default: () => [
          <NCollapseItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </NCollapseItem>,
          <NCollapseItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </NCollapseItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
  })

  it('should work with collapseItem component `title` prop', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        default: () => <NCollapseItem title="test"></NCollapseItem>
      }
    })

    await wrapper.find('.n-collapse-item__header-main').trigger('click')
    expect(wrapper.find('.n-collapse-item__header-main').text()).toBe('test')
  })
})
