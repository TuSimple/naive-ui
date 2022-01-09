import type { InjectionKey } from 'vue'

export const tuple = <T extends string[]>(...args: T): T => args

export type ElementOf<T> = T extends Array<infer E>
  ? E
  : T extends ReadonlyArray<infer F>
    ? F
    : never

export interface CarouselMethodsInjection {
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
  isVertical: () => boolean
  isHorizontal: () => boolean
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getSlideIndex: (slide: number | HTMLElement) => number
  getSlideStyle: (slide: HTMLElement) => any
  addSlide: (slide?: HTMLElement) => void
  removeSlide: (slide?: HTMLElement) => void
  onCarouselItemClick: (index: number) => void
}
export const carouselMethodsInjectionKey: InjectionKey<CarouselMethodsInjection> = Symbol(
  'carouselMethods'
)

export interface CarouselInst {
  getCurrentIndex: () => number
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
}
