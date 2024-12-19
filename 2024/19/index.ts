import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day19 extends AbstractPuzzle {
    @Cached()
    get input() {
        const [availableBlock, patternsBlock] = this.rawInput.split('\n\n')

        return {
            available: availableBlock.split(', '),
            patterns: patternsBlock.split('\n'),
        }
    }

    get available() {
        return this.input.available
    }

    get patterns() {
        return this.input.patterns
    }

    public solveFirst(): unknown {
        const regExp = new RegExp(`^(${this.available.join('|')})+$`)

        return this.patterns.reduce((result, towel) => (towel.match(regExp) ? 1 : 0) + result, 0)
    }

    public solveSecond(): unknown {
        return null
    }
}
