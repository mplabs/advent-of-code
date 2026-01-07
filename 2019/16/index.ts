import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day16 extends AbstractPuzzle {
    static PATTERN = [0,1,0,-1]

    @Cached()
    get input() {
        return this.rawInput.trim().split('').map(Number)
    }

    public solveFirst(): unknown {
        let signal = [...this.input]

        for (let phase = 0; phase < 100; phase++) {
            signal = this.fft(signal)
        }

        return signal.slice(0, 8).join('')
    }

    public solveSecond(): unknown {
        const offset = Number(this.input.slice(0, 7).join(''))
        const totalLen = this.input.length * 10_000

        const len = totalLen - offset
        const result: number[] = Array.from({ length: len })
        
        for (let k = 0; k < len; k++) {
            result[k] = this.input[(offset + k) % this.input.length]
        }

        for (let phase = 0; phase < 100; phase++) {
            for (let i = len - 2; i >= 0; i--) {
                result[i] = (result[i] + result[i + 1]) % 10
            }
        }

        return result.slice(0, 8).join('')
    }

    private fft(input: number[]): number[] {
        const out: number[] = Array.from({ length: input.length })

        for (let i = 0; i < input.length; i++) {
            const repeat = i + 1
            let sum = 0

            for (let j = 0; j < input.length; j++) {
                const idx = Math.floor((j + 1) / repeat) % Day16.PATTERN.length
                const mult = Day16.PATTERN[idx]
                sum += input[j] * mult
            }

            out[i] = Math.abs(sum) % 10
        }

        return out
    }
}
