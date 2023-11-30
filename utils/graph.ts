export class Graph {
  neighbors: { [key: string]: string[] } = {}

  addEdge(u: string, ...values: string[]) {
    this.neighbors[u] = [...(this.neighbors[u] || []), ...values]
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
}
