import colors from './colors'

export function resolveColor (path: string): string | undefined {
  if (path.includes('-')) {
    const segments = path.split('-')
    let color: any = colors
    for (let i = 0; i < segments.length; i++) {
      color = color[segments[i]]
      if (!color) return
    }
    return color
  }
  return path in colors ? colors[path] : path
}
