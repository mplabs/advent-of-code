import { Computer } from '2019/shared/computer'
import AbstractPuzzle from '@utils/AbstractPuzzle'

type State = {
    dir: number
    pos: [x: number, y: number]
}

export default class Day11 extends AbstractPuzzle {
    get input() {
        return this.rawInput.trim().split(',').map(Number)
    }

    public solveFirst(): unknown {
        return this.solve([0]).size
    }

    public solveSecond(): unknown {
        const hull = this.solve([1])
        const result = Array.from({ length: 6 }, () => Array.from({ length: 41 }, () => ' '))

        for (const [pos, value] of hull.entries()) {
            const [x, y] = pos.split(',').map(Number)
            result[y][x] = value ? '█' : ' '
        }

        return '\n' + result.map((line) => line.join('')).join('\n')
    }

    private solve(initialInputs: number[]): Map<string, number> {
        const hull = new Map<string, number>()
        let state: State = { dir: 0, pos: [0, 0] }
        const robot = new Computer(this.input, initialInputs)

        while (!robot.halted) {
            while (!robot.halted && robot.getOutput().length < 2) {
                robot.run()
            }

            if (robot.halted) {
                break
            }

            const out = robot.getOutput()
            const paint = out[0]
            const turn = out[1]

            state = next(state, [paint, turn])

            robot.clearOutput()
        }

        return hull

        function next(state: State, command: number[]): State {
            const [paint, turn] = command
            let [x, y] = state.pos

            hull.set(`${x},${y}`, paint)

            let dir = turn ? state.dir + 1 : state.dir + 3
            dir %= 4

            switch (dir) {
                case 0:
                    y -= 1
                    break // up
                case 1:
                    x += 1
                    break // right
                case 2:
                    y += 1
                    break // down
                case 3:
                    x -= 1
                    break // left

                default:
                    throw new Error(`Invalid direction ${state.dir}`)
            }

            robot.appendInput(hull.get(`${x},${y}`) ?? 0)

            return {
                dir,
                pos: [x, y],
            }
        }
    }
}
