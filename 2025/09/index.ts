import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day9 extends AbstractPuzzle {
    @Cached()
    get input() {
        return this.rawInput.split('\n').map((line) => line.split(',').map(Number))
    }

    @Cached()
    get edges() {
        const edges = []
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
        return null

    //     let maxArea = 0

    //     for (let i = 0; i < this.input.length; i++) {
    //         const [x1, y1] = this.input[i]
    //         for (let j = i + 1; j < this.input.length; j++) {
    //             const [x2, y2] = this.input[j]

    //             const minX = Math.min(x1, x2)
    //             const maxX = Math.max(x1, x2)
    //             const minY = Math.min(y1, y2)
    //             const maxY = Math.max(y1, y2)

    //             const width = maxX - minX + 1
    //             const height = maxY - minY + 1
    //             const area = width * height

    //             if (area <= maxArea) {
    //                 // Don't bother
    //                 continue
    //             }

    //             // Test point just inside the rectangle
    //             const px = (minX + maxX) / 2 + 0.01
    //             const py = (minY + maxY) / 2 + 0.01

    //             if (!this.pointInPolygon([px, py])) {
    //                 continue
    //             }

    //             let intersects = false
    //             for (const edge of this.edges) {
    //                 if (this.segmentIntersectsRectBoundary(edge, minX, maxX, minY, maxY)) {
    //                     intersects = true
    //                     break
    //                 }
    //             }

    //             if (intersects) {
    //                 continue
    //             }

    //             maxArea = area
    //         }
    //     }

    //     return maxArea
    // }

    // private pointInPolygon([x, y]: [number, number]) {
    //     // 1. If the point lies exactly on any edge, treat as inside
    //     for (const [x1, y1, x2, y2] of this.edges) {
    //         if (x1 === x2) {
    //             // vertical segment
    //             const minY = Math.min(y1, y2)
    //             const maxY = Math.max(y1, y2)
    //             if (x === x1 && y >= minY && y <= maxY) {
    //                 return true
    //             }
    //         } else if (y1 === y2) {
    //             // horizontal segment
    //             const minX = Math.min(x1, x2)
    //             const maxX = Math.max(x1, x2)
    //             if (y === y1 && x >= minX && x <= maxX) {
    //                 return true
    //             }
    //         }
    //     }

    //     // 2. Ray-casting to +∞ in x
    //     let inside = false

    //     for (let [x1, y1, x2, y2] of this.edges) {
    //         // Only non-horizontal edges
    //         if (y1 === y2) continue

    //         // Ensure y1 <= y2
    //         if (y1 > y2) {
    //             ;[x1, x2] = [x2, x1]
    //             ;[y1, y2] = [y2, y1]
    //         }

    //         // Check if our horizontal ray at py crosses this vertical edge
    //         if (y >= y1 && y < y2) {
    //             const xCross = x1 // vertical edge
    //             if (x < xCross) {
    //                 inside = !inside
    //             }
    //         }
    //     }

    //     return inside
    // }

    // private segmentIntersectsRectBoundary(
    //     edge: number[],
    //     minX: number,
    //     maxX: number,
    //     minY: number,
    //     maxY: number,
    // ): boolean {
    //     const [x1, y1, x2, y2] = edge

    //     const corners = [
    //         [minX, minY],
    //         [minX, maxY],
    //         [maxX, minY],
    //         [maxX, maxY],
    //     ]

    //     const isCorner = ([x, y]: [number, number]) =>
    //         corners.some(([cx, cy]) => cx === x && cy === y)

    //     const intersectingSegment = (
    //         [ax, ay]: [number, number],
    //         [bx, by]: [number, number],
    //         [cx, cy]: [number, number],
    //         [dx, dy]: [number, number],
    //     ): boolean => {
    //         // Rect or polygon vertical?
    //         const aVert = ax === bx
    //         const cVert = cx === dx

    //         if (aVert && cVert) {
    //             // both vertical, they intersect if same x and y-ranges overlap
    //             if (ax !== cx) {
    //                 return false
    //             }

    //             const minA = Math.min(ay, by)
    //             const maxA = Math.max(ay, by)
    //             const minC = Math.min(cy, dy)
    //             const maxC = Math.max(cy, dy)
    //             const yOverlapMin = Math.max(minA, minC)
    //             const yOverlapMax = Math.min(maxA, maxC)

    //             if (yOverlapMin > yOverlapMax) {
    //                 return false
    //             }

    //             // We care only if there is overlap not just at a corner
    //             // If overlap is just a single point that is a corner, ignore it.
    //             if (yOverlapMin === yOverlapMax && isCorner([ax, yOverlapMin])) {
    //                 return false
    //             }

    //             return true
    //         }

    //         if (!aVert && !cVert) {
    //             // both horizontal
    //             if (ay !== cy) {
    //                 return false
    //             }
    //             const minA = Math.min(ax, bx)
    //             const maxA = Math.max(ax, bx)
    //             const minC = Math.min(cx, dx)
    //             const maxC = Math.max(cx, dx)
    //             const xOverlapMin = Math.max(minA, minC)
    //             const xOverlapMax = Math.min(maxA, maxC)

    //             if (xOverlapMin > xOverlapMax) {
    //                 return false
    //             }

    //             if (xOverlapMin === xOverlapMax && isCorner([xOverlapMin, ay])) {
    //                 return false
    //             }

    //             return true
    //         }

    //         // One vertical, one horizontal
    //         let vx: number, vy1: number, vy2: number
    //         let hx1: number, hx2: number, hy: number

    //         if (aVert) {
    //             vx = ax
    //             vy1 = ay
    //             vy2 = by
    //             hx1 = cx
    //             hx2 = dx
    //             hy = cy
    //         } else if (cVert) {
    //             vx = cx
    //             vy1 = cy
    //             vy2 = dy
    //             hx1 = ax
    //             hx2 = bx
    //             hy = ay
    //         } else {
    //             // unreachable
    //             return false
    //         }

    //         const ymin = Math.min(vy1, vy2)
    //         const ymax = Math.max(vy1, vy2)
    //         const xmin = Math.min(hx1, hx2)
    //         const xmax = Math.max(hx1, hx2)

    //         if (vx < xmin || vx > xmax) {
    //             return false
    //         }
    //         if (hy < ymin || hy > ymax) {
    //             return false
    //         }

    //         // Intersection point:
    //         const ix = vx
    //         const iy = hy

    //         if (isCorner([ix, iy])) {
    //             return false // only at corner, ignore
    //         }

    //         return true
    //     }

    //     // Rectangle boundary segments:
    //     // bottom: (minX,minY)-(maxX,minY)
    //     // top:    (minX,maxY)-(maxX,maxY)
    //     // left:   (minX,minY)-(minX,maxY)
    //     // right:  (maxX,minY)-(maxX,maxY)

    //     // Early reject if segment is completely outside rect bbox:
    //     const segMinX = Math.min(x1, x2)
    //     const segMaxX = Math.max(x1, x2)
    //     const segMinY = Math.min(y1, y2)
    //     const segMaxY = Math.max(y1, y2)

    //     if (segMaxX < minX || segMinX > maxX || segMaxY < minY || segMinY > maxY) {
    //         return false
    //     }

    //     // Test against all 4 edges
    //     if (intersectingSegment([x1, y1], [x2, y2], [minX, minY], [maxX, minY])) {
    //         return true // bottom
    //     }
    //     if (intersectingSegment([x1, y1], [x2, y2], [minX, maxY], [maxX, maxY])) {
    //         return true // top
    //     }
    //     if (intersectingSegment([x1, y1], [x2, y2], [minX, minY], [minX, maxY])) {
    //         return true // left
    //     }
    //     if (intersectingSegment([x1, y1], [x2, y2], [maxX, minY], [maxX, maxY])) {
    //         return true // right
    //     }

    //     return false
    }
}
