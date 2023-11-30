
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { join } from 'node:path'


interface Directory {
  name: string
  size?: number
  parent?: string
}

export default class Day7 extends AbstractPuzzle {
  private _entries?: Directory[]

  get input(): string {
    return this.rawInput
  }

  get entries(): Directory[] {
    // Only do this once
    if (this._entries) {
      return this._entries
    }

    let cwd = '/',
      entries: Directory[] = [{ name: '/' }]

    // Parse Instructions
    for (const instruction of this.input.split('\n')) {
      // Ignore `ls`
      if (instruction.match(/^(\$ ls)/)) {
        continue
      }

      // Change directory
      if (instruction.match(/^\$ cd/)) {
        cwd = join(cwd, instruction.match(/^\$ cd (.*)$/)?.[1] || '.')
        continue
      }

      // Directory
      if (instruction.match(/^dir/)) {
        const path = instruction.match(/^dir (.*)$/)?.[1]
        entries.push({ name: join(cwd, path || ''), parent: cwd })
      }

      // File
      if (instruction.match(/^\d+/)) {
        const [_, size, name] = instruction.match(/^(\d+) (.+)$/) || []
        entries.push({
          name: join(cwd, name),
          size: parseInt(size),
          parent: cwd,
        })
      }
    }

    this._entries = entries

    return entries
  }

  private directorySize(entries: Directory[], name: string): number {
    return entries
      .filter((entry) => entry.parent === name)
      .reduce(
        (acc, { size, name }) =>
          acc + (size ? size : this.directorySize(entries, name)),
        0
      )
  }

  private getDirectorySizes(entries: Directory[]): number[] {
    return entries
      .filter((entry) => typeof entry.size === 'undefined') // Only directories
      .map((entry) => this.directorySize(entries, entry.name)) // Get directory sizes
  }

  public solveFirst(): unknown {
    return this.getDirectorySizes(this.entries)
      .filter((size) => size <= 100000) // Filter < 1000000
      .reduce((acc, size) => acc + size, 0) // Sum
  }

  public solveSecond(): unknown {
    const unusedSpace = 70000000 - this.directorySize(this.entries, '/') // Filesystem size - size of root directory

    return this.getDirectorySizes(this.entries)
      .filter((size) => size > 30000000 - unusedSpace) // Fits system update
      .sort((a, b) => a - b)[0] // Sort ascending, return smallest size
  }
}
  