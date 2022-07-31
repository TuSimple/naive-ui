import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { sleep } from 'seemly'
import { NMessageProvider, useMessage } from '../index'

const Provider = defineComponent({
  render () {
    return <NMessageProvider max={1}>{this.$slots}</NMessageProvider>
  }
})

const NoMaxProvider = defineComponent({
  render () {
    return <NMessageProvider>{this.$slots}</NMessageProvider>
  }
})

describe('n-message', () => {
  it('should work with import on demand', () => {
    mount(NMessageProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        const messageReactive = message.info(() => 'string')
        messageReactive.content = '123'
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    wrapper.unmount()
  })
  it('should work with showIcon', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()

        message.info('string')
        message.info('string', {
          showIcon: false
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <NoMaxProvider>{{ default: () => <Test /> }}</NoMaxProvider>
    ))

    await nextTick()
    expect(document.querySelectorAll('.n-message__icon').length).toBe(1)
    expect(document.querySelectorAll('.n-message').length).toBe(2)

    wrapper.unmount()
  })
})

describe('message-provider', () => {
  it('props.max', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        message.info('string1')
        message.info('string2')
        message.info('string3')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        max: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()

    expect(document.querySelectorAll('.n-message').length).toBe(2)
    wrapper.unmount()
  })
  it('props.duration', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        duration: 1000
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    await sleep(500)
    expect(document.querySelector('.n-message')).not.toEqual(null)
    await sleep(1200)
    expect(document.querySelector('.n-message')).toBe(null)
    wrapper.unmount()
  })
  it('props.closable', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        closable: true
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(document.querySelector('.n-message__close')).not.toBe(null)
    wrapper.unmount()
  })

  it('props.container-style', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        'container-style': 'padding: 24px'
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    const container = document.querySelector('.n-message-container')
    expect(container).not.toBe(null)
    expect((container as HTMLElement).style.cssText).toContain('padding: 24px')
    wrapper.unmount()
  })
})
