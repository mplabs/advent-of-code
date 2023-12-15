import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

const inputParserRegex = /(?<label>\w+)(?<operation>[=-])(?<focalLength>\d?)/

export default class Day15 extends AbstractPuzzle {
  get input(): string[] {
    return this.rawInput.split(',')
  }

  public holidayStringConverter(input: string): number {
    let result = 0
    for (const char of input) {
      result += char.charCodeAt(0)
      result *= 17
      result %= 256
    }
    return result
  }

  public calculateBox([_, focalLength]: [string, number], index: number): number {
    return (index + 1) * focalLength
  }

  public solveFirst(): unknown {
    return this.input.map(this.holidayStringConverter).reduce((a, b) => a + b, 0)
  }

  public solveSecond(): unknown {
    const boxes: Record<string, [label: string, focalLength: number][]> = {}

    this.input
      .map((input) => input.match(inputParserRegex)?.groups as { label: string; operation: string; focalLength?: string })
      .forEach(({ label, operation, focalLength }) => {
        const focalLengthNumber = parseInt(focalLength || '0', 10)
        let box = boxes[this.holidayStringConverter(label)] || []
        const index = box.findIndex(([l]) => l === label)
        if (operation === '=') {
          if (index !== -1) {
            box[index] = [label, focalLengthNumber]
          } else {
            box.push([label, focalLengthNumber])
          }
        } else if (operation === '-' && index !== -1) {
          box = box.filter(([l]) => l !== label)
        }

        boxes[this.holidayStringConverter(label)] = box
      })

      let result = 0
    for (const boxIndex of range(0, 256)) {
      const box = boxes[boxIndex] || []
      result += (boxIndex + 1) * box.reduce((a, lens, lensIndex) => this.calculateBox(lens, lensIndex) + a, 0)
    }

    return result
  }
}
