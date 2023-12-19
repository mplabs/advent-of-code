export function eq(a: unknown, b: unknown): boolean {
  if (typeof a !== typeof b) {
    return false
  }

  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false
    }

    for (let i = 0; i < a.length; i++) {
      if (!eq(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  if (a instanceof Object && b instanceof Object) {
    const aKeys = Object.keys(a) as (keyof typeof a)[]
    const bKeys = Object.keys(b) as (keyof typeof b)[]

    if (aKeys.length !== bKeys.length) {
      return false
    }

    for (const key of aKeys) {
      if (!eq(a[key], b[key])) {
        return false
      }
    }

    return true
  }

  return a === b
}