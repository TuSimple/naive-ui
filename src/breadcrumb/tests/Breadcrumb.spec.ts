import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NBreadcrumb, NBreadcrumbItem } from '../index'

describe('n-breadcrumb', () => {
  it('should work with import on demand', () => {
    mount(NBreadcrumb)
  })

  it('should raise an error if breadcrumbItem is not inside a BreadCrumb', () => {
    const mockErrorLogger = vi.spyOn(console, 'error').mockImplementation()
    const wrapper = mount(NBreadcrumbItem)

    expect(wrapper.isVisible()).toBe(false)
    expect(mockErrorLogger).toBeCalledWith(
      '[naive/breadcrumb]: `n-breadcrumb-item` must be placed inside `n-breadcrumb`.'
    )
  })

  it('should work with Breadcrumb, BreadcrumbItem slots', async () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.find('ul').element.children.length).toBe(2)
    expect(
      wrapper.find('ul').element.children[0].getAttribute('class')
    ).toContain('n-breadcrumb-item')
    const itemList = wrapper.findAll('.n-breadcrumb-item__link')
    expect(itemList[0].text()).toBe('test-item1')
    expect(itemList[1].text()).toBe('test-item2')
  })

  it("should work with Breadcrumb's `separator` prop", async () => {
    const wrapper = mount(NBreadcrumb, {
      props: { separator: '@' },
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(
      wrapper
        .findAll('.n-breadcrumb-item__separator')
        .every((i) => i.text() === '@')
    ).toBe(true)
  })

  it("should work with BreadcrumbItem's `separator` prop", async () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(
            NBreadcrumbItem,
            { separator: '@' },
            { default: () => 'test-item1' }
          ),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.findAll('.n-breadcrumb-item__separator')[0].text()).toBe('@')
    expect(wrapper.findAll('.n-breadcrumb-item__separator')[1].text()).toBe('/')
  })

  it('should be possible to pass `href` props to NBreadcrumbItem', () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'Home' }),
          h(NBreadcrumbItem, { href: '/path1' }, { default: () => 'Path1' })
        ]
      }
    })

    const firstBreadcrumbItem = wrapper.find('span.n-breadcrumb-item__link')
    const secondBreadcrumbItem = wrapper.find('a.n-breadcrumb-item__link')

    expect(firstBreadcrumbItem.exists()).toBe(true)
    expect(firstBreadcrumbItem.text()).toMatch('Home')
    expect(secondBreadcrumbItem.exists()).toBe(true)
    expect(secondBreadcrumbItem.attributes('href')).toMatch('/path1')
  })

  describe('accessibility', () => {
    it('should labelled the landmark region', () => {
      const wrapper = mount(NBreadcrumb)
      expect(wrapper.find('.n-breadcrumb').attributes('aria-label')).toBe(
        'Breadcrumb'
      )
    })

    it('should add `aria-current` if the item is the current location', () => {
      const originalWindow = window
      globalThis.window = Object.create(window)
      const currentUrl = 'http://some-domaine/path2'
      const url = 'http://some-domaine/path1'
      Object.defineProperty(window, 'location', {
        value: {
          href: currentUrl
        }
      })

      const wrapper = mount(NBreadcrumb, {
        slots: {
          default: () => [
            h(NBreadcrumbItem, { default: () => 'Home' }),
            h(
              NBreadcrumbItem,
              {
                href: url
              },
              { default: () => 'Path1' }
            ),
            h(
              NBreadcrumbItem,
              {
                href: currentUrl
              },
              { default: () => 'Path2' }
            )
          ]
        }
      })

      expect(
        wrapper.find('span.n-breadcrumb-item__link').attributes('aria-current')
      ).toBe(undefined)
      expect(
        wrapper
          .find(`a.n-breadcrumb-item__link[href="${url}"]`)
          .attributes('aria-current')
      ).toBe(undefined)
      expect(
        wrapper
          .find(`a.n-breadcrumb-item__link[href="${currentUrl}"]`)
          .attributes('aria-current')
      ).toBe('location')
      globalThis.window = originalWindow
    })

    it('should add `aria-hidden` to the separator', () => {
      const wrapper = mount(NBreadcrumb, {
        slots: {
          default: () => [
            h(NBreadcrumbItem, { default: () => 'Home' }),
            h(
              NBreadcrumbItem,
              { href: '/path1', isCurrent: true },
              { default: () => 'Path1' }
            )
          ]
        }
      })

      expect(
        wrapper.find('.n-breadcrumb-item__separator').attributes('aria-hidden')
      ).toBe('true')
    })
  })
})
