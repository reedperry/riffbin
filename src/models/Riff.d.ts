import type { Cycle } from './Sequence'

export interface Track {
  id: string
  name: string
  cycle: Cycle
  muted: boolean
}

export interface Riff {
  id: string
  name: string
  tracks: Track[]
  tempo: number
}
