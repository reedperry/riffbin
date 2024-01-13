import { SequenceProps, useSequence } from '~/hooks/use-sequence';

export function Sequence({
  startTime = undefined,
  notes = undefined,
}: SequenceProps): React.ReactNode {
  useSequence({ startTime, notes });
  return null;
}
