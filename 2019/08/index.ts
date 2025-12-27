import AbstractPuzzle from '@utils/AbstractPuzzle'
import { chunk } from '@utils/array'

export default class Day8 extends AbstractPuzzle {
    static WIDTH = 25
    static HEIGHT = 6

    get input() {
        const rawInput = this.rawInput.trim()
        const chunkSize = Day8.WIDTH * Day8.HEIGHT
        const result = []

        for (let i = 0; i < rawInput.length; i += chunkSize) {
            result.push(rawInput.slice(i, i + chunkSize))
        }

        return result
    }

    public solveFirst(): unknown {
        const sorted = this.input.sort(
            (a, b) => (a.match(/[0]/g)?.length ?? 0) - (b.match(/[0]/g)?.length ?? 0),
        )

        return sorted[0].match(/[1]/g)!.length * sorted[0].match(/[2]/g)!.length
    }

    public solveSecond(): unknown {
        const result = Array.from({ length: Day8.WIDTH * Day8.HEIGHT }, () => '2')

        this.input
            .reverse()
            .map((layer) => Array.from(layer))
            .forEach((layer, i) => {
                for (let pos = 0; pos < layer.length; pos++) {
                    if (layer[pos] !== '2') {
                        result[pos] = layer[pos]
                    }
                }
            })

        return '\n' + render(result.join(''))
    }
}

function drawPixel(pixel: string) {
    switch (pixel) {
        case '2':
            return '░'

        case '1':
            return ' '

        case '0':
            return '█'

        default:
            throw new Error(`Unknown pixel value "${pixel}`)
    }
}

function render(imgData: string): string {
    return chunk(Array.from(imgData), Day8.WIDTH)
        .map((row) => row.map(drawPixel).join(''))
        .join('\n')
}
