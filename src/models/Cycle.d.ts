export type Step = {
  note: string
  volume: number
  enabled: boolean
}

export type Cycle = {
  playLength: number
  steps: Step[]
}
