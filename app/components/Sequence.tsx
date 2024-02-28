import { SequenceProps, useSequence } from '~/hooks/use-sequence';

export function Sequence({ notes = [] }: SequenceProps): React.ReactNode {
  useSequence({ notes });
  return (
    <div style={{ marginLeft: '100px' }}>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
  // return null;
}
