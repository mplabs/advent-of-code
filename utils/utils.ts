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

/**
 * Memoizes the result of a method based on its arguments.
 *
 * Each instance of the class gets its own cache.
 * The cache key is derived from the method's argument list using `JSON.stringify`,
 * so only JSON-serializable argument types are supported.
 *
 * @example
 * class Example {
 *   @Memoized()
 *   compute(x, y) {
 *     console.log("Computing…");
 *     return x + y;
 *   }
 * }
 *
 * const ex = new Example();
 * ex.compute(1, 2); // logs "Computing…", returns 3
 * ex.compute(1, 2); // returns cached result (3), no log
 *
 * @throws {Error} If applied to something other than a method.
 * @returns {MethodDecorator}
 */
export function Memoized() {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        if (typeof originalMethod !== 'function') {
            throw new Error(`@Memoized can only be applied to methods.`)
        }

        const cacheKey = Symbol(`_${String(propertyKey)}_cache`)

        descriptor.value = function (...args: any[]) {
            const instance = this as Record<PropertyKey, any>

            // one Map per instance
            let cache: Map<string, any> = instance[cacheKey]
            if (!cache) {
                cache = new Map()
                instance[cacheKey] = cache
            }

            const key = args.length === 0 ? '__no_args__' : JSON.stringify(args) // works for simple arg types

            if (cache.has(key)) {
                return cache.get(key)
            }

            const result = originalMethod.apply(this, args)
            cache.set(key, result)
            return result
        }
    }
}
