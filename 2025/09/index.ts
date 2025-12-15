import AbstractPuzzle from '@utils/AbstractPuzzle'
import { minMax } from '@utils/array'
import { Cached, manhattenDistance } from '@utils/utils'

type Edge = [number, number, number, number]
type Point = [number, number]

export default class Day9 extends AbstractPuzzle {
    @Cached()
    get input(): Point[] {
        return this.rawInput.split('\n').map((line) => line.split(',').map(Number) as Point)
    }

    @Cached()
    get edges(): Edge[] {
        const edges: Edge[] = []
        for (let i = 0; i < this.input.length; i++) {
            const [x1, y1] = this.input[i]
            const [x2, y2] = this.input[(i + 1) % this.input.length] // Wrap points
            edges.push([x1, y1, x2, y2])
        }

        return edges
    }

    public solveFirst(): unknown {
        let maxArea = 0

        for (let i = 0; i < this.input.length; i++) {
            const [x1, y1] = this.input[i]
            for (let j = i + 1; j < this.input.length; j++) {
                const [x2, y2] = this.input[j]

                const width = Math.abs(x1 - x2) + 1
                const height = Math.abs(y1 - y2) + 1
                const area = width * height

                if (area > maxArea) {
                    maxArea = area
                }
            }
        }

        return maxArea
    }

    public solveSecond(): unknown {
        let result = 0

        const area = ([x1, y1]: Point, [x2, y2]: Point): number =>
            (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)

        const intersects = ([minX, minY]: Point, [maxX, maxY]: Point): boolean => {
            for (const edge of this.edges) {
                const [iMinX, iMaxX] = minMax(edge[0], edge[2])
                const [iMinY, iMaxY] = minMax(edge[1], edge[3])
                if (minX < iMaxX && maxX > iMinX && minY < iMaxY && maxY > iMinY ) {
                    return true
                }
            }

            return false
        }
        
        for (let i = 0; i < this.input.length; i++) {
            for (let j = i; j < this.input.length; j++) {
                const fromTile = this.input[i]
                const toTile = this.input[j]
                const [minX, maxX] = minMax(fromTile[0], toTile[0])
                const [minY, maxY] = minMax(fromTile[1], toTile[1])
                const distance = manhattenDistance(fromTile, toTile)
                if (distance * distance > result) {
                    if (!intersects([minX, minY], [maxX, maxY])) {
                        const rectArea = area(fromTile, toTile)
                        if (rectArea > result) {
                            result = rectArea
                        }
                    }
                }
            }
        }

        return result
    }

}
