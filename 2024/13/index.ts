import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

type Point = { x: number; y: number }

type ClawMachine = {
    A: Point
    B: Point
    prize: Point
}

export default class Day13 extends AbstractPuzzle {
    @Cached()
    get input() {
        return this.rawInput.split('\n\n').map((machine) => {
            const [a, b, p] = machine.split('\n')
            const buttonA = a.match(/Button A: X\+(?<x>\d+), Y\+(?<y>\d+)/)
            const buttonB = b.match(/Button B: X\+(?<x>\d+), Y\+(?<y>\d+)/)
            const prize = p.match(/Prize: X=(?<x>\d+), Y=(?<y>\d+)/)

            return {
                A: { x: parseInt(buttonA!.groups!.x), y: parseInt(buttonA!.groups!.y) },
                B: { x: parseInt(buttonB!.groups!.x), y: parseInt(buttonB!.groups!.y) },
                prize: { x: parseInt(prize!.groups!.x), y: parseInt(prize!.groups!.y) },
            }
        }) as ClawMachine[]
    }

    public solveFirst(): unknown {
        let result = 0
        for (const { A, B, prize } of this.input) {
            // Line from prize with the slope of Button B
            const PB = { x: prize.x - B.x, y: prize.y - B.y }

            // Intersection of a line from starting point with slope A and PB
            const I = this.intersection({ x: 0, y: 0 }, A, prize, PB)

            // How many times does it take to reach the intersecion
            const A2I = I.x / A.x

            // How many times does it take B to reach the intersection (from prize)
            const B2I = (prize.x - I.x) / B.x

            // If both number of steps are whole numbers, add them up
            if (Number.isInteger(A2I) && Number.isInteger(B2I)) {
                result += A2I * 3 + B2I
            }
        }

        return result
    }

    public solveSecond(): unknown {
        let result = 0
        for (let { A, B, prize } of this.input) {
            prize.x += 10000000000000
            prize.y += 10000000000000

            // Line from prize with the slope of Button B
            const PB = { x: prize.x - B.x, y: prize.y - B.y }

            // Intersection of a line from starting point with slope A and PB
            const I = this.intersection({ x: 0, y: 0 }, A, prize, PB)

            // How many times does it take to reach the intersecion
            const A2I = I.x / A.x

            // How many times does it take B to reach the intersection (from prize)
            const B2I = (prize.x - I.x) / B.x

            // If both number of steps are whole numbers, add them up
            if (Number.isInteger(A2I) && Number.isInteger(B2I)) {
                result += A2I * 3 + B2I
            }
        }

        return result
    }

    private intersection(A: Point, B: Point, C: Point, D: Point): Point {
        const a = (D.x - C.x) * (C.y - A.y) - (D.y - C.y) * (C.x - A.x)
        const b = (D.x - C.x) * (B.y - A.y) - (D.y - C.y) * (B.x - A.x)
        const alpha = a / b

        return {
            x: A.x + alpha * (B.x - A.x),
            y: A.y + alpha * (B.y - A.y),
        }
    }
}
