import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --n-bezier
// --n-color
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-icon-color
// --n-border
// --n-title-text-color
// --n-content-text-color
// --n-line-height
// --n-border-radius
// --n-font-size
// --n-title-font-weight
// --n-icon-size
// --n-icon-margin
// --n-close-size
// --n-close-icon-size
// --n-close-margin
// --n-padding
// --n-icon-margin-left
// --n-icon-margin-right
export default cB('alert', `
  line-height: var(--n-line-height);
  border-radius: var(--n-border-radius);
  position: relative;
  transition: background-color .3s var(--n-bezier);
  background-color: var(--n-color);
  text-align: start;
  word-break: break-word;
  min-height: var(--n-icon-size);
`, [
  cM('closable', [
    cB('alert-body', [
      cE('title', `
        padding-right: 24px;
      `)
    ])
  ]),
  cE('icon', {
    color: 'var(--n-icon-color)'
  }),
  cB('alert-body', {
    border: 'var(--n-border)',
    padding: 'var(--n-padding)'
  }, [
    cE('title', {
      color: 'var(--n-title-text-color)'
    }),
    cE('content', {
      color: 'var(--n-content-text-color)'
    })
  ]
  ),
  fadeInHeightExpandTransition({
    originalTransition: 'transform .3s var(--n-bezier)',
    enterToProps: {
      transform: 'scale(1)'
    },
    leaveToProps: {
      transform: 'scale(0.9)'
    }
  }),
  cE('icon', `
    position: absolute;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    width: var(--n-icon-size);
    height: var(--n-icon-size);
    font-size: var(--n-icon-size);
    margin: var(--n-icon-margin);
  `),
  cE('close', `
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    position: absolute;
    right: 0;
    top: 0;
    margin: var(--n-close-margin);
  `),
  cM('show-icon', [
    cB('alert-body', {
      paddingLeft: 'calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))'
    })
  ]),
  cB('alert-body', `
    border-radius: var(--n-border-radius);
    transition: border-color .3s var(--n-bezier);
  `, [
    cE('title', `
      transition: color .3s var(--n-bezier);
      font-size: 16px;
      line-height: 19px;
      font-weight: var(--n-title-font-weight);
    `, [
      c('& +', [
        cE('content', {
          marginTop: '9px'
        })
      ])
    ]),
    cE('content', {
      transition: 'color .3s var(--n-bezier)',
      fontSize: 'var(--n-font-size)'
    })
  ]),
  cE('icon', {
    transition: 'color .3s var(--n-bezier)'
  })
])
