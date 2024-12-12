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
