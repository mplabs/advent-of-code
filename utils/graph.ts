export class Graph {
    neighbors: { [key: string]: string[] } = {}

    addEdge(u: string, ...values: string[]) {
        this.neighbors[u] = [...(this.neighbors[u] || []), ...values]
    }

    addUndirectedEdge(a: string, b: string) {
        this.addEdge(a, b)
        this.addEdge(b, a)
    }

    /**
     * maximum shortest-path distance from source to any reachable node
     */
    maxDistanceFrom(source: string): number {
        const queue = [source]
        const dist = { [source]: 0 }
        let head = 0
        let max = 0

        while (head < queue.length) {
            const u = queue[head++]
            const d = dist[u]
            if (d > max) {
                max = d
            }

            const nbrs = this.neighbors[u] || []
            for (const v of nbrs) {
                if (dist[v] !== undefined) {
                    continue
                }
                dist[v] = d + 1
                queue.push(v)
            }
        }

        return max
    }

    shortestPath(source: string, target: string): string[] | null {
        if (source === target) {
            return [source]
        }

        const queue = [source]
        const visited = { [source]: true }
        const predecessor: { [k: string]: string } = {}
        let tail = 0

        while (tail < queue.length) {
            let u = queue[tail++]
            const neighbors = this.neighbors[u]
            for (const v of neighbors) {
                if (visited[v]) {
                    continue
                }
                visited[v] = true
                if (v === target) {
                    const path = [v]
                    while (u !== source) {
                        path.push(u)
                        u = predecessor[u]
                    }
                    path.push(u)
                    path.reverse()
                    return path
                }
                predecessor[v] = u
                queue.push(v)
            }
        }
        return null
    }

    removeNode(u: string): void {
        // Remove all references to this node in neighbors
        for (const key in this.neighbors) {
            this.neighbors[key] = this.neighbors[key].filter((neighbor) => neighbor !== u)
        }

        // Delete the node itself
        delete this.neighbors[u]
    }
}
