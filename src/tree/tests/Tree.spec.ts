import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NTree } from '../index'

describe('n-tree', () => {
  it('should work with import on demand', () => {
    mount(NTree)
  })

  it('should accept proper options', () => {
    mount(NTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })
    mount(NTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            unknown: 'unknown'
          }
        ]
      }
    })
  })

  it('should work with `prefix` and `suffix`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            prefix: () => 'prefix',
            suffix: () => 'suffix',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.n-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.n-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__text').text()).toBe('test')
    expect(wrapper.find('.n-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `render-label`, `render-prefix` and `render-suffix`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ],
        renderPrefix: () => 'prefix',
        renderLabel: () => 'label',
        renderSuffix: () => 'suffix'
      }
    })

    expect(wrapper.find('.n-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.n-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__text').text()).toBe('label')
    expect(wrapper.find('.n-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `expand`', async () => {
    const wrapper = mount(NTree, {
      props: {
        defaultExpandedKeys: ['1'],
        data: [
          {
            label: 'test1',
            key: '1',
            children: [
              {
                label: 'test1-1',
                key: '1-1'
              }
            ]
          },
          {
            label: 'test2',
            key: '2',
            children: [
              {
                label: 'test2-1',
                key: '2-1'
              }
            ]
          }
        ]
      }
    })
    const expandNode = async (nodeText: string): Promise<void> => {
      const node = wrapper
        .findAll('.n-tree-node')
        .find((el) => el.text() === nodeText)
      if (node) {
        const switcher = node.find('.n-base-icon')
        if (switcher) {
          await switcher.trigger('click')
        }
      }
      await nextTick()
    }
    const test1Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test1-1')
    let test2Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test2-1')

    expect(test1Child).toBeDefined()
    expect(test2Child).not.toBeDefined()

    await expandNode('test2')
    test2Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test2-1')
    expect(test2Child).toBeDefined()
  })

  it('should work with `default-expand-all`', async () => {
    const wrapper = mount(NTree, {
      props: {
        defaultExpandAll: true
      }
    })
    await wrapper.setProps({
      data: [
        {
          label: 'test1',
          key: '1',
          children: [
            {
              label: 'test1-1',
              key: '1-1'
            }
          ]
        },
        {
          label: 'test2',
          key: '2',
          children: [
            {
              label: 'test2-1',
              key: '2-1'
            }
          ]
        }
      ]
    })
    const test1Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test1-1')
    const test2Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test2-1')

    expect(test1Child).toBeDefined()
    expect(test2Child).toBeDefined()
  })

  it('should work with `checkable` and `defaultCheckedKeys`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        checkable: true,
        defaultCheckedKeys: ['1231']
      }
    })

    expect(wrapper.html()).toContain('n-tree-node--checkable')
  })

  it('should work with `draggable`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        draggable: true
      }
    })

    expect(wrapper.find('.n-tree-node-content').html()).toContain(
      'draggable="true"'
    )
  })

  it('should work with `blockNode`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockNode: true
      }
    })

    expect(wrapper.find('.n-tree--block-node').exists()).toBe(true)
  })

  it('should work with `blockLine`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockLine: true
      }
    })

    expect(wrapper.find('.n-tree--block-line').exists()).toBe(true)
  })

  it('should work witch `selectable`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })
    expect(wrapper.find('.n-tree-node--selectable').exists()).toBe(true)
    await wrapper.setProps({ selectable: false })
    expect(wrapper.find('.n-tree-node--selectable').exists()).not.toBe(true)
  })

  it('should work witch `cancelable`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    const node = wrapper.findAll('.n-tree-node-content')
    await node[0].trigger('click')
    expect(wrapper.find('.n-tree-node--selected').exists()).toBe(true)
    await node[0].trigger('click')
    expect(wrapper.find('.n-tree-node--selected').exists()).not.toBe(true)

    await wrapper.setProps({ cancelable: false })
    await node[0].trigger('click')
    expect(wrapper.find('.n-tree-node--selected').exists()).toBe(true)
    await node[0].trigger('click')
    expect(wrapper.find('.n-tree-node--selected').exists()).toBe(true)
  })

  it('should work with `disabled`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.n-tree-node--disabled').exists()).toBe(true)
  })

  it('should work with `children-field`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            nodes: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        childrenField: 'nodes',
        defaultExpandAll: true
      }
    })

    expect(wrapper.findAll('.n-tree-node')[1].text()).toBe('1231')
  })

  it('should work with `onLoad`', async () => {
    const onLoad = vi.fn()
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: 1,
            disabled: true,
            children: [
              {
                label: '1231',
                key: 3
              }
            ]
          },
          {
            label: 'test',
            key: 2,
            disabled: true,
            children: [
              {
                label: '1231',
                key: 4
              }
            ]
          }
        ],
        'expanded-keys': [1],
        remote: true,
        onLoad: onLoad
      }
    })
    setTimeout(() => {
      expect(onLoad).toHaveBeenCalled()
      wrapper.setProps({ 'expanded-keys': [1, 2] }).then(() => {
        expect(onLoad).toHaveBeenCalled()
      })
    }, 0)
  })

  it('should work witch `multiple`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    const node = wrapper.findAll('.n-tree-node-content')
    await node[0].trigger('click')
    await node[1].trigger('click')
    expect(wrapper.findAll('.n-tree-node--selected').length).toBe(1)
    await wrapper.setProps({ multiple: true })
    await node[0].trigger('click')
    expect(wrapper.findAll('.n-tree-node--selected').length).toBe(2)
  })

  it('should work with `node-props` prop', async () => {
    const testClass = 'menu-test'
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        nodeProps: () => ({ class: testClass })
      }
    })
    expect(wrapper.find('.n-tree-node').classes()).toContain(testClass)
  })
})
