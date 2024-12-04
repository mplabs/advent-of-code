export const equal = <T>(a: T, b: T): boolean => {
    if (typeof a !== typeof b) {
        return false
    }

    if (typeof a === 'object') {
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) {
                return false
            }

            return a.every((item, idx) => equal(item, b[idx]))
        }

        const aKeys = Object.keys(a)
        const bKeys = Object.keys(b)

        if (aKeys.length !== bKeys.length) {
            return false
        }

        return aKeys.every((key) => equal(a[key], b[key]))
    }

    return a === b
}

export const manhattenDistance = (
    [x1, y1]: [x: number, y: number],
    [x2, y2]: [x: number, y: number],
): number => Math.abs(x1 - x2) + Math.abs(y2 - y2)

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
    const cache = new Map<string, ReturnType<T>>()

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args)

        if (!cache.has(key)) {
            cache.set(key, fn(...args))
        }

        return cache.get(key)!
    }) as T
}

/**
 * A decorator to cache the result of a class getter. The computation is performed only
 * once, and subsequent calls to the getter return the cached value.
 *
 * This is useful for expensive computations that do not change during the lifetime
 * of the instance, ensuring efficiency by avoiding redundant calculations.
 *
 * @example
 * class Example {
 *   private _value: number;
 *
 *   constructor(value: number) {
 *     this._value = value;
 *   }
 *
 *   @Cached()
 *   get computedValue() {
 *     console.log("Calculating...");
 *     return this._value ** 2;
 *   }
 * }
 *
 * const example = new Example(5);
 * console.log(example.computedValue); // Logs: "Calculating..." then 25
 * console.log(example.computedValue); // Logs: 25 (cached, no "Calculating...")
 *
 * @returns {PropertyDecorator} The decorator function to be applied to the getter.
 */
export function Cached() {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalGetter = descriptor.get

        if (!originalGetter) {
            throw new Error(`@Cache can only be applied to getters.`)
        }

        const cacheKey = Symbol(`_${String(propertyKey)}_cache`)

        descriptor.get = function () {
            const instance = this as Record<symbol, any>

            if (!instance.hasOwnProperty(cacheKey)) {
                instance[cacheKey] = originalGetter.call(this)
            }

            return instance[cacheKey]
        }
    }
}

