import { h, defineComponent, PropType } from 'vue'
import { SwitcherIcon } from '../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_internal'
import { TmNode } from './interface'

export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    hide: Boolean,
    loading: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  render () {
    const {
      clsPrefix, tmNode: {
        rawNode: { switchIcon },
        rawNode
      }
    } = this
    return (
      <span
        data-switcher
        class={[
          `${clsPrefix}-tree-node-switcher`,
          {
            [`${clsPrefix}-tree-node-switcher--expanded`]: this.expanded,
            [`${clsPrefix}-tree-node-switcher--hide`]: this.hide
          }
        ]}
        onClick={this.onClick}
      >
        <div class={`${clsPrefix}-tree-node-switcher__icon`}>
          <NIconSwitchTransition>
            {{
              default: () =>
                !this.loading ? (
                  <NBaseIcon clsPrefix={clsPrefix} key="switcher">
                    {{ default: () => switchIcon ? switchIcon(rawNode) : <SwitcherIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseLoading
                    clsPrefix={clsPrefix}
                    key="loading"
                    radius={85}
                    strokeWidth={20}
                  />
                )
            }}
          </NIconSwitchTransition>
        </div>
      </span>
    )
  }
})
