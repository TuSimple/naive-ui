import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NCarousel, NCarouselItem } from '../index'
import { sleep } from 'seemly'

describe('n-carousel', () => {
  it('should work with import on demand', () => {
    const wrapper = mount(NCarousel)
    wrapper.unmount()
  })

  it('should work with `autoplay` and `interval` prop', async () => {
    const wrapper = mount(NCarousel, {
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await wrapper.setProps({ autoplay: true, interval: 50 })

    await sleep(25)
    ;([0, 1, 2, 3, 4] as const).forEach((i) => {
      if (i === 1) {
        // todo: There will be problems in different environments here, https://github.com/TuSimple/naive-ui/runs/5484107206?check_suite_focus=true
        // expect(
        //   wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        // ).toBe('false')
      } else {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('true')
      }
    })

    await sleep(25)
    ;([0, 1, 2, 3, 4] as const).forEach((i) => {
      if (i === 2) {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('false')
      } else {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('true')
      }
    })
    wrapper.unmount()
  })

  it('should work with `dot-placement` prop', async () => {
    const wrapper = mount(NCarousel)

    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      await wrapper.setProps({ dotPlacement: placement })
      expect(wrapper.find('.n-carousel').classes()).toContain(
        `n-carousel--${placement}`
      )
    }
    wrapper.unmount()
  })

  it('should work with `interval` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        interval: 100,
        autoplay: true
      },
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await sleep(100)
    expect(
      wrapper
        .find('.n-carousel__slides')
        .find('[data-index="2"]')
        .attributes('aria-hidden')
    ).toBe('false')
    expect(
      wrapper
        .find('.n-carousel__dots')
        .findAll('.n-carousel__dot')[1]
        .attributes('aria-selected')
    ).toBe('true')
    wrapper.unmount()
  })

  it('should work with `show-arrow` prop', async () => {
    const wrapper = mount(NCarousel)

    await wrapper.setProps({
      showArrow: true
    })

    expect(wrapper.find('.n-carousel__arrow-group').exists()).toBe(true)
    expect(wrapper.find('.n-carousel__arrow').exists()).toBe(true)
    wrapper.unmount()
  })

  it('arrow button should work', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        loop: false
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await wrapper.setProps({
      showArrow: true
    })

    const slidesDOMArray = wrapper.findAll('.n-carousel__slide')

    expect(slidesDOMArray[0].attributes('aria-hidden')).toBe('false')

    await wrapper.findAll('.n-carousel__arrow')[1].trigger('click')
    expect(slidesDOMArray[1].attributes('aria-hidden')).toBe('false')

    await wrapper.findAll('.n-carousel__arrow')[0].trigger('click')
    expect(slidesDOMArray[0].attributes('aria-hidden')).toBe('false')
    wrapper.unmount()
  })

  it('should work with `centered-slides` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        slidesPerView: 'auto',
        loop: false
      },
      attrs: {
        style: 'width: 240px;height: 300px;'
      },
      slots: {
        default: () => {
          return [...Array(5).keys()].map((i) => {
            return h(NCarouselItem, {
              style: `width: ${(i + 1) * 10}%;`,
              slots: {
                default: () => h('div', {}, i.toString())
              }
            })
          })
        }
      }
    })

    const wrapperRect = wrapper.element.getBoundingClientRect()

    const slidesDOMArray = wrapper.findAll('.n-carousel__slide')
    for (let i = 0; i < slidesDOMArray.length; i++) {
      const slideDOM = slidesDOMArray[i]
      const rect = slideDOM.element.getBoundingClientRect()
      expect(rect.left - wrapperRect.left).toBe(
        (wrapperRect.width - rect.width) / 2
      )

      wrapper.vm.next()
      await nextTick()
    }
    wrapper.unmount()
  })

  it('should work with `trigger` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        loop: false
      },
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    const dotsDOMArray = wrapper.findAll('.n-carousel__dot')
    const slidesDOMArray = wrapper.findAll('.n-carousel__slide')

    const triggerEvent = {
      click: 'click',
      hover: 'mouseenter'
    }
    const triggers = Object.keys(triggerEvent) as Array<
    keyof typeof triggerEvent
    >
    for (let i = 0; i < triggers.length; i++) {
      const trigger = triggers[i]
      const event = triggerEvent[triggers[i]]
      await wrapper.setProps({
        trigger
      })

      for (let j = 0; j < dotsDOMArray.length; j++) {
        const dotsDOM = dotsDOMArray[j]
        await dotsDOM.trigger(event)
        expect(slidesDOMArray[j].attributes('aria-hidden')).toBe('false')
      }
    }
    wrapper.unmount()
  })

  it('should work with `current-index` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        currentIndex: 0
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(
      wrapper
        .find('.n-carousel__slide--current')
        .element.children[0].getAttribute('src')
    ).toBe(
      'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
    )
    await wrapper.setProps({ currentIndex: 1 })
    await sleep(100)
    expect(
      wrapper
        .find('.n-carousel__slide--current')
        .element.children[0].getAttribute('src')
    ).toBe(
      'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
    )
    wrapper.unmount()
  })

  it('should work with `dot-type` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        currentIndex: 0
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(wrapper.find('.n-carousel__dots').classes()).toContain(
      'n-carousel__dots--dot'
    )
    await wrapper.setProps({ dotType: 'line' })
    await sleep(100)
    expect(wrapper.find('.n-carousel__dots').classes()).toContain(
      'n-carousel__dots--line'
    )
    wrapper.unmount()
  })

  it('should work with `effect` prop', async () => {
    const wrapper = mount(NCarousel)

    for (const effect of ['slide', 'fade', 'card', 'custom'] as const) {
      await wrapper.setProps({ effect })
      await sleep(100)
      expect(wrapper.find('.n-carousel').classes()).toContain(
        `n-carousel--${effect}`
      )
    }

    wrapper.unmount()
  })

  it('should work with `keyboard` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        keyboard: true
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await sleep(100)
    await wrapper.find('.n-carousel__dot').trigger('click')
    await wrapper.find('.n-carousel__dot').trigger('keydown', {
      code: 'ArrowRight'
    })
    await sleep(100)
    expect(
      wrapper.findAll('.n-carousel__dot')[1].attributes('aria-selected')
    ).toBe('true')
    await wrapper.find('.n-carousel__dot').trigger('keydown', {
      code: 'ArrowLeft'
    })
    await sleep(100)
    expect(
      wrapper.findAll('.n-carousel__dot')[0].attributes('aria-selected')
    ).toBe('true')
    wrapper.unmount()
  })

  it('should work with `space-between` prop', async () => {
    const wrapper = mount(NCarousel, {
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(
      wrapper.find('.n-carousel__slide').attributes('style')
    ).not.toContain('margin-right: 25px;')

    await wrapper.setProps({ spaceBetween: 25 })
    expect(wrapper.find('.n-carousel__slide').attributes('style')).toContain(
      'margin-right: 25px;'
    )
    wrapper.unmount()
  })

  it('should work with `show-dots` prop', async () => {
    const wrapper = mount(NCarousel, {
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })
    await sleep(100)
    expect(wrapper.find('.n-carousel__dots').exists()).toBe(true)

    await wrapper.setProps({
      showDots: false
    })
    await sleep(100)
    expect(wrapper.find('.n-carousel__dots').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `on-update:current-index` prop', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(NCarousel, {
      props: {
        onUpdateCurrentIndex: onUpdate
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await sleep(100)
    await wrapper.findAll('.n-carousel__dot')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalled()
    wrapper.unmount()
  })
})
