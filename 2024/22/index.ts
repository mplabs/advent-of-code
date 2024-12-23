
import AbstractPuzzle from '@utils/AbstractPuzzle'

const next = (secret: number): number => {
    secret ^= secret << 6
    secret &= 0xFFFFFF
    secret ^= secret >> 5
    secret &= 0xFFFFFF
    secret ^= secret << 11
    return secret & 0xFFFFFF
}

export default class Day22 extends AbstractPuzzle {
    get input() {
        return this.rawInput.split('\n').map(Number)
    }

    public solveFirst(): unknown {
        let result = 0
        for (let secret of this.input) {
            for (let i = 0; i < 2000; i++) {
                secret = next(secret)
            }
            result += secret
        }

        return result
    }

    public solveSecond(): unknown {
        return null
    }
}
