import { VueWrapper } from '@vue/test-utils/dist/vueWrapper'
import { mount } from '@vue/test-utils'
import { ComponentPublicInstance, h, nextTick } from 'vue'
import { NIcon } from '../../icon'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NDropdown, DropdownProps } from '../index'

const pendingOptionClassName =
  'n-dropdown-option-body n-dropdown-option-body--pending'
const optionBodySelector = '.n-dropdown-option-body'
const options = [
  {
    type: 'group',
    label: '主角和吃的',
    key: 'main',
    children: [
      {
        label: '杰·盖茨比',
        key: 'jay gatsby'
      },
      {
        type: 'divider',
        key: 'd1'
      },
      {
        label: '黛西·布坎南',
        icon () {
          return h(NIcon, null, {
            default: () => h(CashIcon)
          })
        },
        key: 'daisy buchanan',
        disabled: true
      }
    ]
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '其他角色',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker'
      }
    ]
  }
]

const mountDropdown = ({
  onSelect,
  inverted = false,
  onClickoutside = undefined,
  options: data = options,
  show = undefined
}: DropdownProps = {}): VueWrapper<ComponentPublicInstance> => {
  return mount(NDropdown, {
    attachTo: document.body,
    props: {
      options: data,
      trigger: 'click',
      onSelect,
      inverted,
      onClickoutside,
      show
    },
    slots: {
      default: () => 'star kirby'
    }
  })
}

describe('n-dropdown', () => {
  it('should work with import on demand', () => {
    mount(NDropdown, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })

  it('shows menu after click', async () => {
    const wrapper = mountDropdown()

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    expect(document.querySelector('.n-dropdown')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('inverted style', async () => {
    const wrapper = mountDropdown({ inverted: true })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    expect(document.querySelector('.n-dropdown')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('keyboard event', async () => {
    const onSelect = jest.fn()
    let wrapper = mountDropdown({ onSelect })

    let triggerNodeWrapper = wrapper.find('span')
    await triggerNodeWrapper.trigger('click')

    await triggerNodeWrapper.trigger('keydown', {
      key: 'ArrowDown'
    })
    let options = document.querySelectorAll(optionBodySelector)
    expect(options[1].className).toEqual(pendingOptionClassName)

    await triggerNodeWrapper.trigger('keydown', {
      key: 'ArrowDown'
    })
    await triggerNodeWrapper.trigger('keydown', {
      key: 'ArrowRight'
    })
    options = document.querySelectorAll(optionBodySelector)
    expect(options.length).toBe(5)
    expect(options[3].className).toEqual(pendingOptionClassName)
    expect(options[4].className).toEqual(pendingOptionClassName)

    await triggerNodeWrapper.trigger('keydown', {
      key: 'ArrowLeft'
    })
    options = document.querySelectorAll(optionBodySelector)
    expect(options.length).toBe(4)

    await triggerNodeWrapper.trigger('keydown', {
      key: 'ArrowUp'
    })
    expect(options[1].className).toEqual(pendingOptionClassName)
    await triggerNodeWrapper.trigger('keyup', {
      key: 'Enter'
    })
    expect(onSelect).toHaveBeenCalledWith('jay gatsby', {
      key: 'jay gatsby',
      label: '杰·盖茨比'
    })

    wrapper = mountDropdown({ onSelect })

    triggerNodeWrapper = wrapper.find('span')
    await triggerNodeWrapper.trigger('click')
    await triggerNodeWrapper.trigger('keydown', {
      key: 'Escape'
    })
    expect(document.querySelector('.n-dropdown')).toBeNull()

    wrapper.unmount()
  })

  it('option mouse event', async () => {
    const onSelect = jest.fn()
    const wrapper = mountDropdown({ onSelect })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    const options = document.querySelectorAll(optionBodySelector)

    const mouseEnter = new Event('mouseenter')
    options[1].dispatchEvent(mouseEnter)
    await nextTick(() => {
      expect(options[1].className).toEqual(pendingOptionClassName)
    })

    const mouseMove = new Event('mousemove')
    options[3].dispatchEvent(mouseMove)
    await nextTick(() => {
      expect(options[1].className).not.toEqual(pendingOptionClassName)
      expect(options[3].className).toEqual(pendingOptionClassName)
    })
    await (options[3] as HTMLDivElement).click()
    expect(onSelect).not.toHaveBeenCalledWith()

    const mouseLeave = new Event('mouseleave')
    Object.defineProperty(mouseLeave, 'relatedTarget', {
      writable: false,
      value: options[1]
    })
    options[3].dispatchEvent(mouseLeave)
    await nextTick(() => {
      expect(options[3].className).not.toEqual(pendingOptionClassName)
    })
  })

  it('dropdown disabled', async () => {
    const onSelect = jest.fn()
    const wrapper = mountDropdown({ onSelect })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    const disabledMenu = document.querySelector(
      '.n-dropdown-option-body--disabled'
    ) as HTMLDivElement

    expect(disabledMenu).not.toEqual(null)

    await disabledMenu.click()

    expect(onSelect).not.toHaveBeenCalledWith()

    wrapper.unmount()
  })
  it('dropdown clickoutside', async () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true })
    const mouseup = new MouseEvent('mouseup', { bubbles: true })
    const onSelect = jest.fn()

    let show = true
    const onClickoutside = jest.fn((isShow) => {
      show = isShow
    })
    const wrapper = mountDropdown({ onClickoutside, onSelect })
    const div = document.createElement('div')
    div.innerHTML = 'click'
    div.className = 'click'

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')
    const options = document.querySelectorAll(optionBodySelector)
    expect(options.length).not.toBe(0)
    expect(document.querySelector('.n-dropdown')).toMatchSnapshot()
    await document.body.appendChild(div)
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
    expect(
      document.body.children[document.body.children.length - 1].className
    ).toEqual('click')
    await nextTick(() => {
      const nextOptions = document.querySelectorAll(optionBodySelector)
      expect(nextOptions.length).toBe(0)
    })
    expect(show).toBe(false)
  })
})
