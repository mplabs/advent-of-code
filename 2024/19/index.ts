import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, memoize } from '@utils/utils'

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

    @Cached()
    get towels() {
        return new Set(this.available)
    }

    @Cached()
    get maxLength() {
        return this.available.sort((a, b) => b.length - a.length)[0].length
    }

    public solveFirst(): unknown {
        // const regExp = new RegExp(`^(${this.available.join('|')})+$`)

        // return this.patterns.reduce((result, towel) => (towel.match(regExp) ? 1 : 0) + result, 0)

        const check = memoize((pattern: string): number => {
            if (pattern === '') {
                return 1
            }
            
            let count = 0, sum = 0
    
            for (let i = 1; i <= Math.min(this.maxLength, pattern.length); i++) {
                let rest = pattern.substring(0, i)
                if (this.towels.has(rest)) {
                    count = check(pattern.substring(rest.length))
                    sum += count
                    if (count > 0) {
                        break
                    }
                }
            }
    
            return sum
        })

        return this.patterns.reduce((result, pattern) => result + check(pattern), 0)
    }

    public solveSecond(): unknown {
        const check = memoize((pattern: string): number => {
            if (pattern === '') {
                return 1
            }
            
            let count = 0, sum = 0
    
            for (let i = 1; i <= Math.min(this.maxLength, pattern.length); i++) {
                let rest = pattern.substring(0, i)
                if (this.towels.has(rest)) {
                    count = check(pattern.substring(rest.length))
                    sum += count
                }
            }
    
            return sum
        })

        return this.patterns.reduce((result, pattern) => result + check(pattern), 0)
    }
}
