import { mount } from '@vue/test-utils'
import { HappyOutline } from '@vicons/ionicons5'
import { h, Comment } from 'vue'
import { sleep } from 'seemly'
import { NMenu, MenuOption, MenuGroupOption, MenuDividerOption } from '../index'
import { NIcon } from '../../icon'

describe('n-menu', () => {
  it('should work with import on demand', () => {
    mount(NMenu)
  })

  it('props.options type', () => {
    const options: Array<MenuOption | MenuGroupOption | MenuDividerOption> = [
      {
        label: 'l',
        key: 'key'
      },
      {
        type: 'group',
        children: [
          {
            label: 'l',
            key: 'key2'
          },
          {
            type: 'divider',
            key: 'key3'
          }
        ]
      }
    ]
    mount(NMenu, { props: { options } })
  })

  it('props.onUpdateValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(NMenu, {
      props: {
        onUpdateValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })

  it('should work with `render-icon` props', async () => {
    const options = [
      {
        label: 'fantasy',
        key: 'fantasy'
      },
      {
        label: 'mojito',
        key: 'mojito'
      },
      {
        label: 'initialj',
        key: 'initialj'
      }
    ]
    function renderMenuIcon (option: any): any {
      // return comment vnode, render placeholder for indent
      if (option.key === 'mojito') return h(Comment)
      // return falsy, don't render icon placeholder
      if (option.key === 'initialj') return null
      // otherwise, render returns vnode
      return h(NIcon, null, { default: () => h(HappyOutline) })
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        renderIcon: renderMenuIcon
      }
    })
    expect(wrapper.findAll('.n-menu-item-content__icon').length).toBe(2)
    expect(wrapper.findAll('.n-icon').length).toBe(1)
  })

  it('should tooltip work with `render-label` props', async () => {
    const options = [
      {
        label: () =>
          h(
            'a',
            {
              href: 'test1',
              target: '_blank',
              rel: 'test1'
            },
            'test1'
          ),
        key: 'test1'
      },
      {
        label: 'test2',
        key: 'test2'
      }
    ]
    const renderLabel = (option: any): any => {
      if (typeof option.label === 'function') {
        return option.label()
      }
      return h(
        'a',
        {
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options
      }
    })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(false)

    await wrapper.setProps({ renderLabel: renderLabel })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[target="_blank"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(true)
  })

  it('should dropdown work with `render-label` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    const renderLabel = (option: any): any => {
      return h(
        'a',
        {
          class: option.key,
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        collapsed: true,
        renderLabel: renderLabel
      }
    })
    expect(wrapper.find('.n-submenu').exists()).toBe(true)
    await wrapper.find('.n-submenu').trigger('mouseenter')
    // Popover has delay, so we need to wait
    await sleep(150)
    expect(document.body.querySelector('.n-dropdown')).not.toEqual(null)
    expect(document.querySelectorAll('a').length).toEqual(3)
    expect(document.querySelectorAll('a.fantasy').length).toEqual(1)
  })

  it('should dropdown work with `render-icon` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderMenuIcon (): any {
      return h(NIcon, null, { default: () => h(HappyOutline) })
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        collapsed: true,
        renderIcon: renderMenuIcon
      }
    })
    expect(wrapper.find('.n-submenu').exists()).toBe(true)
    await wrapper.find('.n-submenu').trigger('mouseenter')
    // Popover has delay, so we need to wait
    await sleep(150)
    expect(document.body.querySelector('.n-dropdown')).not.toEqual(null)
    expect(document.querySelectorAll('.n-icon').length).toEqual(2)
  })

  it('should dropdown work with `expand-icon` props', () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderExpandIcon (): any {
      return h('span', { class: 'expand-icon' }, '1')
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        expandIcon: renderExpandIcon
      }
    })
    expect(wrapper.find('.expand-icon').text()).toEqual('1')
  })

  it('should dropdown work with `render-extra` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderMenuExtra (): any {
      return 'test'
    }
    const wrapper = mount(NMenu, {
      props: {
        defaultExpandAll: true,
        options: options,
        renderExtra: renderMenuExtra
      }
    })
    expect(
      wrapper.findAll('.n-menu-item-content-header__extra').length
    ).toEqual(4)
  })

  it('should accept empty object in type-checking phase', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const menu = <NMenu options={[{}]} />
  })

  it('should work with `defaultExpandedKeys` props', async () => {
    const menuOptions = [
      {
        label: '且听风吟',
        key: 'hear-the-wind-sing'
      },
      {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
          {
            label: '叙事者',
            key: 'narrator'
          },
          {
            label: '食物',
            key: 'food',
            children: [
              {
                label: '三明治',
                key: 'sandwich'
              }
            ]
          },
          {
            label: '过去增多，未来减少',
            key: 'the-past-increases-the-future-recedes'
          }
        ]
      }
    ]
    const defaultExpandedKeys = ['dance-dance-dance']
    const wrapper = mount(NMenu, {
      props: {
        defaultExpandedKeys,
        options: menuOptions
      }
    })
    expect(wrapper.find('.n-submenu-children').element.children.length).toBe(3)
  })

  it('accepts proper options', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const menu = (
      <NMenu
        options={[
          {
            type: 'divider'
          },
          {
            type: 'group',
            key: 'foo'
          },
          {
            key: 'blabla',
            label: 'kirby'
          },
          {
            key: 'xxxx',
            children: [
              {
                type: 'divider'
              },
              {
                type: 'group',
                key: 'foo1'
              },
              {
                key: 'blabla1',
                label: 'kirby'
              }
            ]
          }
        ]}
      />
    )
  })

  it('should work with `hidden` prop', async () => {
    const options = [
      {
        label: 'fantasy',
        key: 'fantasy',
        hidden: true
      },
      {
        label: 'mojito',
        key: 'mojito'
      },
      {
        label: 'initialj',
        key: 'initialj'
      }
    ]
    const wrapper = mount(NMenu, {
      props: {
        options: options
      }
    })
    expect(wrapper.findAll('.n-menu-item-content').length).toBe(2)
  })
})
