export function merges<T extends object>(target: T, ...args: T[]): T {
  for (const source of args) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        target[key] = merges(target[key] || {}, source[key])
      }
      else {
        target[key] = source[key]
      }
    }
  }
  return target
}
