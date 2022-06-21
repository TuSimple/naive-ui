import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { NTransfer } from '../index'

describe('n-transfer', () => {
  it('should work with import on demand', () => {
    mount(NTransfer)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NTransfer, { props: { disabled: true } })
    expect(wrapper.find('.n-transfer').attributes('class')).toContain(
      'n-transfer--disabled'
    )
  })

  it('should work with `filterable` prop', () => {
    const wrapper = mount(NTransfer, { props: { filterable: true } })
    expect(wrapper.find('.n-transfer').attributes('class')).toContain(
      'n-transfer--filterable'
    )
  })

  it('should work with `filter` prop', async () => {
    const options = [
      {
        label: 'test1',
        value: 'test1'
      }
    ]
    const onFilter = vi.fn()
    const wrapper = mount(NTransfer, {
      props: { filterable: true, filter: onFilter, options: options }
    })
    await wrapper.find('input').setValue('1')
    await sleep(300)
    expect(onFilter).toHaveBeenCalled()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NTransfer, {
        props: { size: i }
      })
      expect(wrapper.find('.n-transfer').attributes('style')).toMatchSnapshot()
    })
  })

  it('should work with `source-filter-placeholder`、`target-filter-placeholder` props', async () => {
    const wrapper = mount(NTransfer, {
      props: {
        filterable: true,
        'source-filter-placeholder': 'test-source',
        'target-filter-placeholder': 'test-target'
      }
    })
    expect(wrapper.findAll('input')[0].attributes('placeholder')).toBe(
      'test-source'
    )
    expect(wrapper.findAll('input')[1].attributes('placeholder')).toBe(
      'test-target'
    )
  })

  it('should work with `source-title`、`target-title` props', async () => {
    const wrapper = mount(NTransfer, {
      props: {
        'source-title': 'test-source',
        'target-title': 'test-target'
      }
    })
    expect(wrapper.findAll('.n-transfer-list-header__header')[0].text()).toBe(
      'test-source'
    )
    expect(wrapper.findAll('.n-transfer-list-header__header')[1].text()).toBe(
      'test-target'
    )
  })
})
