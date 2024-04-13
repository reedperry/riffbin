import type { Cycle } from './Cycle'

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
