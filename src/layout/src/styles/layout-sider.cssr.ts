import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --color
// --text-color
// --border-color
// --toggle-button-color
// --toggle-bar-color
// --toggle-bar-color-hover
export default cB('layout-sider', `
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: var(--text-color);
  transition:
    color .3s var(--bezier),
    border-color .3s var(--bezier),
    min-width .3s var(--bezier),
    max-width .3s var(--bezier),
    transform .3s var(--bezier),
    background-color .3s var(--bezier);
  background-color: var(--color);
  display: flex;
  justify-content: flex-end;
`, [
  c('>', [
    cB('scrollbar', `
      transition: transform .3s var(--bezier);
    `)
  ]),
  cM('right', '', [
    cM('bordered', `
      border-left: 1px solid var(--border-color);
    `),
    cB('layout-toggle-button', `
      transform: translateX(-50%) translateY(-50%) rotate(180deg);
      left: 0;
    `, [
      cM('collapsed', `
        transform: translateX(-50%) translateY(-50%) rotate(0);
      `)
    ]),
    cB('layout-toggle-bar', `
      left: -28px;
      transform: rotate(180deg);
    `)
  ]),
  cB('layout-toggle-button', `
    transition:
      transform .3s var(--bezier),
      fill .3s var(--bezier);
    cursor: pointer;
    width: 36px;
    height: 36px;
    position: absolute;
    top: 50%;
    right: 0;
    fill: var(--toggle-button-color);
    transform: translateX(50%) translateY(-50%) rotate(0);
  `, [
    cM('collapsed', `
      transform: translateX(50%) translateY(-50%) rotate(180deg);
    `)
  ]),
  cB('layout-toggle-bar', `
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;
  `, [
    cE('top, bottom', `
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      transition: 
        background-color .3s var(--bezier),
        transform .3s var(--bezier);
    `),
    cE('bottom', `
      position: absolute;
      top: 34px;
    `),
    c('&:hover', [
      cE('top', {
        transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
      }),
      cE('bottom', {
        transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
      })
    ]),
    cM('collapsed', [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(12deg) scale(1.15) translateY(2px)'
        })
      ])
    ]),
    cE('top, bottom', {
      backgroundColor: 'var(--toggle-bar-color)'
    }),
    c('&:hover', [
      cE('top, bottom', {
        backgroundColor: 'var(--toggle-bar-color-hover)'
      })
    ])
  ]),
  cE('border', `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    transition: background-color .3s var(--bezier);
  `),
  cB('layout-sider-scroll-container', `
    flex-grow: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 100%;
    opacity: 0;
    transition: transform .3s var(--bezier), opacity .3s var(--bezier);
    max-width: 100%;
  `),
  cM('show-content', [
    cB('layout-sider-scroll-container', {
      opacity: 1
    })
  ]),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  `),
  cM('bordered', `
    border-right: 1px solid var(--border-color);
  `)
])
