export function chunk<T>(input: T[], chunkSize = 1): T[][] {
    const arr = [...input]
    const chunkedArray: T[][] = []

    while (arr.length > 0) {
        chunkedArray.push(arr.splice(0, chunkSize))
    }

    return chunkedArray
}

/**
 * Array filter to get all distinct values
 */
export const distinct = <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index

export function intersection<T>(arr: T[], ...args: T[][]): T[] {
    return arr.filter((item) => args.every((arr) => arr && arr.includes(item)))
}

export function invertMatrix<T>(matrix: any[][]): T[][] {
    return matrix.reduce((acc, cv) => {
        cv.reduce((_, cv2, idx2) => {
            if (acc[idx2] == undefined) {
                acc[idx2] = []
            }
            acc[idx2].push(cv2)
        }, [])
        return acc
    }, [])
}

export function* range(start?: number, end?: number, step?: number): Generator<number> {
    start = Number(start)
    if (end === undefined) {
        end = start
        start = 0
    } else {
        end = Number(end)
    }

    step = step === undefined ? (start < end ? 1 : -1) : Number(step)

    let x = start - step
    while (x < end - step) {
        yield (x += step)
    }
}

/**
 * Count the occurences of 'value' in 'array'.
 */
export const countValueInArray = <T>(arr: T[], value: T): number =>
    arr.filter((item) => item === value).length

/**
 * Generate all permutations of an array.
 * @param {T[]} arr - The array to permute.
 * @returns {T[][]} - An array of all permutations.
 */
export function getPermutations<T>(arr: T[]): T[][] {
    if (arr.length <= 1) {
        return [arr]
    }

    const permutations: T[][] = []
    for (let i = 0; i < arr.length; i++) {
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1))
        const subPermutations = getPermutations(remaining)
        for (const sub of subPermutations) {
            permutations.push([arr[i], ...sub])
        }
    }

    return permutations
}

/**
 * Returns the two given numbers in ascending order.
 *
 * @param a - First numeric value.
 * @param b - Second numeric value.
 * @returns A tuple where the first element is the smaller value
 *          and the second element is the larger value.
 *
 * @example
 * ```ts
 * const [min, max] = minMax(10, 3)
 * // min === 3, max === 10
 * ```
 */
export function minMax(a: number, b: number): [number, number] {
    return a < b ? [a, b] : [b, a]
}

/**
 * Generates all unique unordered pairs from an array.
 *
 * Each pair consists of two distinct elements where the second element
 * appears later in the array than the first. Self-pairs and duplicate
 * reverse pairs are not produced.
 *
 * @template T
 * @param {T[]} arr
 *   The source array from which to generate pairs.
 * @returns {Generator<[T, T]>}
 *   A generator that yields each unique pair as a tuple.
 *
 * @example
 * ```ts
 * [...pairs([1, 2, 3])]
 * // → [[1, 2], [1, 3], [2, 3]]
 * ```
 *
 * @complexity
 * Time: O(n²)
 * Space: O(1) excluding consumer storage
 */
export function* pairs<T>(arr: T[]): Generator<[T, T]> {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            yield [arr[i], arr[j]]
        }
    }
}
