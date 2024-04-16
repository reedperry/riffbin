export type Step = {
  note: string
  volume: number
  enabled: boolean
}

export type Sequence = {
  playLength: number
  steps: Step[]
}
