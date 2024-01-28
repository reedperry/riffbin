import { SequenceProps, useSequence } from '~/hooks/use-sequence';

export function Sequence({
  startTime = undefined,
  notes = [],
}: SequenceProps): React.ReactNode {
  useSequence({ startTime, notes });
  return null;
}
