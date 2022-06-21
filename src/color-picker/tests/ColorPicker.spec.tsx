import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NColorPicker } from '../index'
import { ColorPickerMode } from '../src/utils'
import { NButton } from '../../button'

describe('n-color-picker', () => {
  it('should work with import on demand', () => {
    mount(NColorPicker)
  })
  describe('props.modes', () => {
    it('multiple modes', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          modes: ['hex', 'hsl']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HEXA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HSLA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HEXA')
      wrapper.unmount()
    })
    it('single mode', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          modes: ['hsl']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HSLA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HSLA')
      wrapper.unmount()
    })
    it('single mode with empty string', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          value: '',
          modes: ['hsl']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HSLA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HSLA')
      wrapper.unmount()
    })
    it('has correct default value', () => {
      const input: Array<{ modes: ColorPickerMode[], value: string }> = [
        {
          modes: ['hsl'],
          value: 'hsla(0, 0%, 0%, 1)'
        },
        {
          modes: ['rgb'],
          value: 'rgb(0, 00, 0, 1)'
        },
        {
          modes: ['hex'],
          value: '#00000000'
        },
        {
          modes: ['hsv', 'hsl'],
          value: 'hsv(0, 0%, 0%, 1)'
        }
      ]
      input.forEach(({ modes, value }) => {
        const wrapper = mount(NColorPicker, {
          props: {
            modes
          }
        })
        expect(wrapper.text().includes(value))
      })
    })
  })
  describe('props.control', () => {
    it('confirm and cancel button', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          actions: ['confirm']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      expect(document.querySelector('.n-color-picker-pallete')).not.toEqual(
        null
      )
      expect(document.querySelector('.n-button')).not.toEqual(null)
      await wrapper.findComponent(NButton).trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).toEqual(null)
      expect(document.querySelector('.n-color-picker-pallete')).toEqual(null)
      wrapper.unmount()
    })
  })
  describe('props.swatches', () => {
    it('make the colors legal', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          swatches: ['hsva(0, 0%, 0%, 1)']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(
        document
          .querySelector('.n-color-picker-swatch__fill')
          ?.getAttribute('style')
      ).toContain('background: rgb(0, 0, 0);')
      wrapper.unmount()
    })
    it('output according to mode', async () => {
      const onUpdateValue = vi.fn()
      const output = {
        RGBA: {
          mode: 'rgb',
          value: 'rgba(0, 0, 0, 1)'
        },
        HSLA: {
          mode: 'hsl',
          value: 'hsla(0, 0%, 0%, 1)'
        },
        HSVA: {
          mode: 'hsv',
          value: 'hsva(0, 0%, 0%, 1)'
        },
        HEXA: {
          mode: 'hex',
          value: '#000000'
        }
      }
      const modes = Object.values(output).map(
        (v) => v.mode
      ) as ColorPickerMode[]
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          swatches: ['black'],
          modes,
          onUpdateValue: onUpdateValue
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      const swatch = document.querySelector('.n-color-picker-swatch')
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      let length = modes.length
      let currentMode: string | null | undefined = null
      while (length && (currentMode = modeDom?.textContent)) {
        ;(swatch as HTMLElement).click()
        await nextTick()
        const actualOutput = output[currentMode as keyof typeof output]
        if (actualOutput) {
          expect(onUpdateValue).toHaveBeenCalledWith(actualOutput.value)
        }
        ;(modeDom as HTMLElement).click()
        await nextTick()
        length--
      }
      wrapper.unmount()
    })
  })
})
describe('props.label', () => {
  it('render custom label', async () => {
    const wrapper = mount(NColorPicker, {
      attachTo: document.body,
      props: {
        value: '#FF0000',
        renderLabel: () => h('span', 'custom')
      }
    })
    await nextTick()
    expect(
      document.querySelector('.n-color-picker-trigger__value')?.textContent
    ).toEqual('custom')
    wrapper.unmount()
  })
})

describe('n-color-picker', () => {
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
      const wrapper = mount(NColorPicker, { props: { placement: placement } })
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

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NColorPicker)
    expect(wrapper.find('.n-color-picker-trigger').classes()).not.toContain(
      'n-color-picker-trigger--disabled'
    )

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-color-picker-trigger').classes()).toContain(
      'n-color-picker-trigger--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `render-label` prop', async () => {
    const wrapper = mount(NColorPicker)
    expect(wrapper.find('.n-color-picker-trigger__value').text()).not.toBe(
      'test-label'
    )

    await wrapper.setProps({ renderLabel: () => 'test-label' })
    expect(wrapper.find('.n-color-picker-trigger__value').text()).toBe(
      'test-label'
    )
    wrapper.unmount()
  })
})
