import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { NDialogProvider, useDialog, NDialog, DialogProps } from '../index'

const Provider = defineComponent({
  render () {
    return <NDialogProvider>{this.$slots}</NDialogProvider>
  }
})

const createTestComponent = (
  type: 'create' | 'error' | 'info' | 'success' | 'warning',
  dialogProps?: DialogProps
): any => {
  return defineComponent({
    setup () {
      const dialog = useDialog()
      dialog[type]({
        title: 'test dialog type',
        ...dialogProps
      })
    },
    render () {
      return null
    }
  })
}

describe('n-dialog', () => {
  it('should work with import on demand', () => {
    mount(NDialogProvider)
  })

  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        const dialogReactive = dialog.success({
          title: 'Test success',
          content: 'Content'
        })
        dialogReactive.style = 'color: red;'
      },
      render () {
        return null
      }
    })
    const dialogProvider = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    dialogProvider.unmount()
  })

  it('can be a component', () => {
    const dialog = mount(NDialog, {
      attachTo: document.body,
      props: {
        title: 'Test success',
        content: 'success'
      }
    })
    expect(document.querySelector('.n-dialog__content')?.textContent).toEqual(
      'success'
    )
    dialog.unmount()
  })

  it("shouldn't useDialog display button if no text is set", () => {
    const wrapper = mount(NDialog)
    expect(wrapper.find('.n-button').exists()).toEqual(false)
  })

  it('loading', async () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Loading',
          content: 'Content',
          positiveText: '确认',
          loading: true
        })
      },
      render () {
        return null
      }
    })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(document.querySelector('.n-button__icon')).not.toEqual(null)
    wrapper.unmount()
  })

  it('maskClosable', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Close by mask',
          content: 'Content',
          maskClosable: false
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    document.body.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mouseupEvent)
    await nextTick(() => {
      expect(document.querySelector('.n-dialog')).not.toBeNull()
    })
    wrapper.unmount()
  })

  it('onMaskClick', async () => {
    const onMaskClick = vi.fn()
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Close by mask',
          content: 'Content',
          onMaskClick
        })
      },
      render () {
        return null
      }
    })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    document.body.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mouseupEvent)
    expect(onMaskClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `style` option', async () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.warning({
          title: 'Custom style',
          content: 'Content',
          style: {
            color: 'rgb(79, 178, 51)'
          }
        })
      },
      render () {
        return null
      }
    })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('color: rgb(79, 178, 51);')
    wrapper.unmount()
  })

  it('dialog type', async () => {
    const TestCreate = createTestComponent('create')
    const TestError = createTestComponent('error')
    const TestInfo = createTestComponent('info')
    const TestSuccess = createTestComponent('success')
    const TestWarning = createTestComponent('warning')

    const wrapperCreate = await mount(() => (
      <Provider>{{ default: () => <TestCreate /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #18a058;')
    wrapperCreate.unmount()

    const wrapperError = await mount(() => (
      <Provider>{{ default: () => <TestError /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #d03050;')
    wrapperError.unmount()

    const wrapperInfo = await mount(() => (
      <Provider>{{ default: () => <TestInfo /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #2080f0;')
    wrapperInfo.unmount()

    const wrapperSuccess = await mount(() => (
      <Provider>{{ default: () => <TestSuccess /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #18a058;')
    wrapperSuccess.unmount()

    const wrapperWarning = await mount(() => (
      <Provider>{{ default: () => <TestWarning /> }}</Provider>
    ))
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #f0a020;')
    wrapperWarning.unmount()
  })

  it('should work with `bordered` option', async () => {
    const Test = createTestComponent('info', { bordered: true })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(document.querySelector('.n-dialog--bordered')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `closable` option', async () => {
    const Test = createTestComponent('info', { closable: false })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(document.querySelector('.n-base-icon')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `icon-placement` option', async () => {
    const TestLeft = createTestComponent('info', { iconPlacement: 'left' })
    const TestTop = createTestComponent('info', { iconPlacement: 'top' })

    const wrapperLeft = await mount(() => (
      <Provider>{{ default: () => <TestLeft /> }}</Provider>
    ))
    const wrapperTop = await mount(() => (
      <Provider>{{ default: () => <TestTop /> }}</Provider>
    ))

    expect(document.querySelector('.n-dialog--icon-left')).not.toEqual(null)
    wrapperLeft.unmount()
    expect(document.querySelector('.n-dialog--icon-top')).not.toEqual(null)
    wrapperTop.unmount()
  })

  it('should work with `negative-text` option', async () => {
    const Test = createTestComponent('info', { negativeText: 'test' })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(document.querySelector('.n-button__content')?.textContent).toBe(
      'test'
    )
    wrapper.unmount()
  })

  it('should work with `positive-text` option', async () => {
    const Test = createTestComponent('info', { positiveText: 'test' })
    const wrapper = await mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    expect(document.querySelector('.n-button__content')?.textContent).toBe(
      'test'
    )
    wrapper.unmount()
  })
})
