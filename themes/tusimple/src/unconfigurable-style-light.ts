import { changeColor } from 'seemly'
import { c, cB, cE, cM, cNotM } from 'naive-ui'

export function mountSvgDefs (): void {
  if (document.getElementById('naive-ui/tusimple/svg-defs')) return
  const svgDefs = `<defs>
    <linearGradient id="progress-info">
      <stop offset="0%" stop-color="#335fff" />
      <stop offset="100%" stop-color="#80c6ff" />
    </linearGradient>
    <linearGradient id="progress-success">
      <stop offset="0%" stop-color="#4FB233" />
      <stop offset="100%" stop-color="#AFF25E" />
    </linearGradient>
    <linearGradient id="progress-warning">
      <stop offset="0%" stop-color="#FFAC26" />
      <stop offset="100%" stop-color="#F2E93D" />
    </linearGradient>
    <linearGradient id="progress-error">
      <stop offset="0%" stop-color="#D92149" />
      <stop offset="100%" stop-color="#FF66BA" />
    </linearGradient>
  </defs>`
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgEl.innerHTML = svgDefs
  svgEl.id = 'naive-ui/tusimple/svg-defs'
  document.body.appendChild(svgEl)
}

export const unconfigurableStyle = c([
  cB('base-select-menu', [
    cB('base-select-option', [
      c('&:first-child', [
        cM('pending', {
          borderRadius: '16px 16px 0 0'
        })
      ]),
      c('&:last-child', [
        cM('pending', {
          borderRadius: '0 0 16px 16px'
        })
      ])
    ])
  ]),
  cB('base-selection', [
    cB('base-suffix', {
      transition: 'all .3s'
    }),
    cM('active', [
      cB(
        'base-suffix',
        {
          transform: 'translateY(-50%) rotate(180deg)'
        },
        [
          cB('base-suffix__arrow', {
            color: '#4FB233'
          })
        ]
      )
    ])
  ]),
  cB('dropdown-menu', [
    cB('dropdown-option', [
      c('&:first-child', [
        cB('dropdown-option-body', [
          cM('pending', {
            borderRadius: '16px 16px 0 0'
          })
        ])
      ]),
      c('&:last-child', [
        cB('dropdown-option-body', [
          cM('pending', {
            borderRadius: '0 0 16px 16px'
          })
        ])
      ])
    ])
  ]),
  cB('date-panel', [
    cB('date-panel-dates', [
      cB('date-panel-date', [
        cM('current', [
          cB('date-panel-date__sup', {
            display: 'none'
          })
        ]),
        cM('start, end', [
          c('&:nth-child(7n + 1)::before', {
            left: '0'
          }),
          c('&:nth-child(7n + 7)::before', {
            right: '0'
          })
        ])
      ])
    ])
  ]),
  cB('data-table', [
    cB('data-table-td', [
      c('&.n-data-table-td--hover', {
        backgroundColor: 'transparent'
      })
    ])
  ]),
  cB('dialog', [
    cB('dialog__title', {
      marginTop: '20px'
    })
  ]),
  cB('input', [
    cM('textarea', [
      cM('resizable', [
        cB('input-wrapper', {
          margin: '0 5px 5px 0',
          paddingRight: '7px'
        })
      ])
    ])
  ]),
  cB('tabs', [
    cB('tabs-bar', {
      height: '4px !important',
      borderRadius: '100px !important',
      transform: 'scaleX(0.395)'
    })
  ]),
  cB('tag', [
    cE(
      'close',
      {
        borderRadius: '50%'
      },
      [
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
        }),
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
        })
      ]
    )
  ]),
  cB('time-picker-panel', [
    cB('time-picker-col', [
      cE('item', [
        cM('active', [
          c('&::before', {
            backgroundColor: 'transparent'
          })
        ])
      ])
    ])
  ]),
  cB('transfer', [
    cB(
      'transfer-gap',
      {
        width: '56px'
      },
      [
        cB('button', {
          width: '32px',
          height: '32px',
          padding: '0'
        })
      ]
    )
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:active', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('progress', [
    cB('progress-graph', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%)'
          })
        ])
      ]),
      cB('progress-graph-circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning)'
        })
      ])
    ]),
    cM('info', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning)'
        })
      ])
    ]),
    cM('success', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #4FB233 0%, #AFF25E 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-success)'
        })
      ])
    ]),
    cM('warning', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #D92149 0%, #FF66BA 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error)'
        })
      ])
    ]),
    cM('error', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #D92149 0%, #FF66BA 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error)'
        })
      ])
    ])
  ]),
  cB('switch', [
    cM('active', [
      cE('rail', [
        cE('button', {
          backgroundImage: 'linear-gradient(8deg, #4EB233 0%, #AFF25E 100%)'
        })
      ])
    ]),
    cM('disabled', [
      cE(
        'rail',
        {
          backgroundColor: '#D7DAE0'
        },
        [
          c('&::before', {
            backgroundColor: '#EBEDF0',
            backgroundImage: 'unset'
          }),
          cE('button', {
            backgroundImage: 'linear-gradient(#E2E5E9 0%, #999999 100%)'
          })
        ]
      ),
      cM('active', [
        cE('rail', [
          c('&::before', {
            backgroundImage: 'linear-gradient(8deg, #AFE6A1 0%, #C4E6A1 100%)'
          })
        ])
      ])
    ]),
    cE('rail', [
      cE('button', {
        backgroundImage: 'linear-gradient(133deg, #E2E5E9 0%, #999999 100%)'
      })
    ])
  ])
])
