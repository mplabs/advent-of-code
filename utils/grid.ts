export type Grid = Map<string, boolean>

/**
 * Return all adjacend coordinates for coord in a grid
 * @param coord {string} - e.g. x: 2, y: 4 => `2,4`
 * @param width {number} - the width of the grid
 * @param height {number} - the height of the grid
 * @returns {string[]} - array of adjacent coordinates
 */
export function adjacent(coords: string, width: number, height: number): string[] {
    const [x, y] = coords.split(',').map(Number)

    const deltas = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
    ]

    const neighbors: string[] = []

    for (const [dx, dy] of deltas) {
        const nx = x + dx
        const ny = y + dy

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            neighbors.push(`${nx},${ny}`)
        }
    }

    return neighbors
}

/**
 * How many neightbors around ccord are true
 * @param coord {string} - e.g. x: 2, y: 4 => `2,4`
 * @param width {number} - the width of the grid
 * @param height {number} - the height of the grid
 * @returns {number} - number of neighboring cells that are true
 */
export function countNeighbors(coord: string, grid: Grid, width: number, height: number): number {
    return adjacent(coord, width, height).reduce((sum, c) => sum + (grid.get(c) ? 1 : 0), 0)
}

/**
 * Call a export function for every position in a grid
 * 
 * @param grid {Map}
 * @param width {number} - the width of the grid
 * @param height {number} - the height of the grid
 * @param fn {function}
 */
export function forEachCell(
    grid: Grid,
    width: number,
    height: number,
    fn: (coord: string, value: boolean, neighbors: number) => void,
): void {
    for (const [coord, value] of grid.entries()) {
        const neighbors = countNeighbors(coord, grid, width, height)
        fn(coord, value, neighbors)
    }
}
