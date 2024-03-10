export type SequenceStep = { note: string; enabled: boolean };

export type SequenceData = {
  playLength: number;
  tempo: number;
  steps: SequenceStep[];
};
