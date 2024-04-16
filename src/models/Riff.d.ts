import type { Sequence } from './Sequence'

export interface Track {
  id: string
  name: string
  sequence: Sequence
  muted: boolean
}

export interface Riff {
  id: string
  name: string
  tracks: Track[]
  tempo: number
}
