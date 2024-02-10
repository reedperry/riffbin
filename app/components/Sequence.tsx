import { SequenceProps, useSequence } from "~/hooks/use-sequence";

export function Sequence({
  notes = [],
}: SequenceProps): React.ReactNode {
  useSequence({ notes });
  return null;
}
