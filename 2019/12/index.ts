import AbstractPuzzle from '@utils/AbstractPuzzle'
import { pairs } from '@utils/array'
import { lcm } from '@utils/numbers'

type vec3D = [x: number, y: number, y: number]

class Object {
    p: vec3D
    v: vec3D = [0, 0, 0]

    get kin() {
        return Math.abs(this.v[0]) + Math.abs(this.v[1]) + Math.abs(this.v[2])
    }

    get pot() {
        return Math.abs(this.p[0]) + Math.abs(this.p[1]) + Math.abs(this.p[2])
    }

    get total() {
        return this.pot * this.kin
    }

    constructor(p: vec3D) {
        this.p = p
    }

    toString() {
        return JSON.stringify(this)
    }

    serializeX() {
        return JSON.stringify([this.p[0], this.v[0]])
    }

    serializeY() {
        return JSON.stringify([this.p[1], this.v[1]])
    }

    serializeZ() {
        return JSON.stringify([this.p[2], this.v[2]])
    }
}

export default class Day12 extends AbstractPuzzle {
    get input() {
        return this.rawInput
            .trim()
            .split('\n')
            .map((line) => {
                const [x, y, z] = Array.from(line.match(/(-?\d+)/g)!).map(Number)
                return new Object([x, y, z])
            })
    }

    public solveFirst(): unknown {
        const objects = [...this.input]

        for (let time = 0; time < 1000; time++) {
            for (const [a, b] of pairs(objects)) {
                // Gravity
                if (a.p[0] < b.p[0]) {
                    a.v[0]++
                    b.v[0]--
                }
                if (a.p[0] > b.p[0]) {
                    a.v[0]--
                    b.v[0]++
                }
                if (a.p[1] < b.p[1]) {
                    a.v[1]++
                    b.v[1]--
                }
                if (a.p[1] > b.p[1]) {
                    a.v[1]--
                    b.v[1]++
                }
                if (a.p[2] < b.p[2]) {
                    a.v[2]++
                    b.v[2]--
                }
                if (a.p[2] > b.p[2]) {
                    a.v[2]--
                    b.v[2]++
                }
            }

            // Velocity
            for (const object of objects) {
                object.p[0] += object.v[0]
                object.p[1] += object.v[1]
                object.p[2] += object.v[2]
            }

            // Debug
            // console.log(`After ${time} steps:`)
            // console.log(
            //     objects
            //         .map(
            //             (object) =>
            //                 `pos=<x=${object.p[0]}, y=${object.p[1]}, z=${object.p[2]}>, vel=<x=${object.v[0]}, y=${object.v[1]}, z=${object.v[2]}>`,
            //         )
            //         .join('\n') + '\n',
            // )
        }

        return objects.reduce((acc, object) => acc + object.total, 0)
    }

    public solveSecond(): unknown {
        let objects = [...this.input]
        const initialX = JSON.stringify(objects.map(o => [o.p[0], o.v[0]]))
        const initialY = JSON.stringify(objects.map(o => [o.p[1], o.v[1]]))
        const initialZ = JSON.stringify(objects.map(o => [o.p[2], o.v[2]]))

        let stepsX = 0
        while(true) {
            objects = this.simulate(objects, 0)
            stepsX++
            if (JSON.stringify(objects.map(o => [o.p[0], o.v[0]])) === initialX) {
                break
            }
        }

        objects = [...this.input]
        let stepsY = 0
        while(true) {
            objects = this.simulate(objects, 1)
            stepsY++
            if (JSON.stringify(objects.map(o => [o.p[1], o.v[1]])) === initialY) {
                break
            }
        }

        objects = [...this.input]
        let stepsZ = 0
        while(true) {
            objects = this.simulate(objects, 2)
            stepsZ++
            if (JSON.stringify(objects.map(o => [o.p[2], o.v[2]])) === initialZ) {
                break
            }
        }

        return lcm(stepsX, stepsY, stepsZ)
    }

    private simulate(objects: Object[], axis: number): Object[] {
        for (const [a, b] of pairs(objects)) {
            // Gravity
            if (a.p[axis] < b.p[axis]) {
                a.v[axis]++
                b.v[axis]--
            }
            if (a.p[axis] > b.p[axis]) {
                a.v[axis]--
                b.v[axis]++
            }
        }

        // Velocity
        for (const object of objects) {
            object.p[axis] += object.v[axis]
        }

        return objects
    }
}
