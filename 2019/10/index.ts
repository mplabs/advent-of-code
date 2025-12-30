
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { gcd } from '@utils/numbers'
import { Cached } from '@utils/utils'

type Coord = [x: number, y: number]

// Angle from vector in the range 0..2pi
function angleFromUp(o: Coord, p: Coord): number {
    const dx = p[0] - o[0]
    const dy = o[1] - p[1] // invert y-axis, because maths

    const angle = Math.atan2(dx, dy)
    return (angle + 2 * Math.PI) % (2 * Math.PI)
}

function dist2(a: Coord): number {
    return a[0] * a[0] + a[1] * a[1]
}
export default class Day10 extends AbstractPuzzle {
    bestStation?: Coord

    @Cached()
    get input() {
        const result = new Set<string>()
        this.rawInput
            .trim()
            .split('\n')
            .forEach((line, y) => {
                line.split('').forEach((item, x) => {
                    if (item === '#') {
                        result.add(`${x},${y}`)
                    }
                })
            })

        return result
    }

    public solveFirst(): unknown {
        let result = 0

        this.input.forEach((o: string) => {
            const count = this.visibleFrom(o)
            if (count > result) {
                result = count
                this.bestStation = o.split(',').map(Number) as Coord
            }
        })

        return result
    }

    public solveSecond(): unknown {
        if (!this.bestStation) {
            throw new Error(`How would this even happen?`)
        }

        const [sx, sy] = this.bestStation

        // direction -> asteroids
        const groups = new Map<string, { p: Coord, dist: number, angle: number}[]>()

        this.input.forEach(p => {
            if (p === `${sx},${sy}`) {
                return
            }

            const [px, py] = p.split(',').map(Number)
            const dx0 = px - sx
            const dy0 = py - sy

            // Normalize direction
            const g = gcd(dx0, dy0)
            const dx = dx0 / g
            const dy = dy0 / g
            const key = `${dx},${dy}`

            const dist = dist2([dx0, dy0])
            const angle = angleFromUp([sx, sy], [px, py])

            const arr = groups.get(key)
            if (arr) {
                arr.push({ p: [px, py], dist, angle })
            } else {
                groups.set(key, [{ p: [px, py], dist, angle }])
            }
        })

        // Sort each direction group by distance (nearest first)
        for (const arr of groups.values()) {
            arr.sort((a, b) => a.dist - b.dist)
        }

        // Create the ordered list of directions by clockwise angle
        const directions = Array.from(groups.entries())
            .map(([key, arr]) => ({ key, angle: arr[0].angle }))
            .sort((a, b) => a.angle - b.angle)

        // Vaporize in rounds: one per direction per sweep
        let count = 0
        while (true) {
            for (const d of directions) {
                const arr = groups.get(d.key)!
                
                if (arr.length === 0) {
                    continue
                }

                const vaporized = arr.shift()!
                count++

                if (count === 200) {
                    return vaporized.p[0] * 100 + vaporized.p[1]
                }
            }
        }
    }

    private visibleFrom(o: string): number {
        const [ox, oy] = o.split(',').map(Number)

        // Smallest distance seen per direction
        const bestByDir = new Map<string, number>()
        
        this.input.forEach((p: string) => {
            if (p === o) {
                return
            }

            const [px, py] = p.split(',').map(Number)

            // observer -> point
            let dx = px - ox
            let dy = py - oy

            // normalize direction vector
            const g = gcd(dx, dy)
            dx /= g
            dy /= g

            // distance observer -> point
            const d2 = dist2([px - ox, py - oy])
            
            const prev = bestByDir.get(`${dx},${dy}`)
            if (prev === undefined || d2 < prev) {
                bestByDir.set(`${dx},${dy}`, d2)
            }
        })

        return bestByDir.size
    }
}
