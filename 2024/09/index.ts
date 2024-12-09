import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day9 extends AbstractPuzzle {
    @Cached()
    get input() {
        const digits = this.rawInput.split('')
        const fs = []
        let fsPointer = 0,
            fileIndex = 0
        for (let i = 0; i < digits.length; i++) {
            const digit = parseInt(digits[i])
            const isFile = i % 2 === 0
            if (isFile) {
                fs.push(...new Array(digit).fill(fileIndex++))
            } else {
                fs.push(...new Array(digit).fill('.'))
            }
        }

        return fs
    }

    public solveFirst(): unknown {
        // Defrag input
        const defraged = this.defrag(this.input)

        return this.checksum(defraged)
    }

    public solveSecond(): unknown {
        // Defrag input
        const defraged = this.defrag2(this.input)

        console.log(this.input, defraged)

        return this.checksum(defraged)
    }

    private checksum(fs: (string | number)[]) {
        if (fs.includes('.')) {
            throw new Error(`Cannot checksum fragmented filesystem`)
        }

        return (fs as number[]).reduce((acc, value, index) => acc + index * value, 0)
    }

    private defrag(fs: (string | number)[]) {
        while (fs.includes('.')) {
            const firstFree = fs.indexOf('.')

            if (fs[fs.length - 1] === '') {
                fs.pop()
            } else {
                fs[firstFree] = fs[fs.length - 1] as number
                fs.pop()
            }
        }

        return fs as number[]
    }

    private defrag2(fs: (string | number)[]) {
        return fs
    }
}
