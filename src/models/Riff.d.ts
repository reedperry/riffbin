import type { Sequence } from 'tone'

export interface Track {
  sequence: Sequence
  muted: boolean
}

export interface Riff {
  tracks: Track
  tempo: number
}
