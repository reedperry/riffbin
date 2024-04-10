export type SequenceStep = { note: string; volume: number; enabled: boolean }

export type SequenceData = {
  playLength: number
  steps: SequenceStep[]
}
