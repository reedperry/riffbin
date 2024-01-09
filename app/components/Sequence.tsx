import { SequenceProps, useSequence } from '~/hooks/use-sequence';

export function Sequence({
  startTime,
  notes = undefined,
}: SequenceProps): React.ReactNode {
  useSequence({ startTime });
  return null;
}
