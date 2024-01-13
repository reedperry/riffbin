import { ClientOnly } from './ClientOnly';
import { Sequence } from './Sequence';

type SequenceEvent = string[] | string;

export type SequenceEditorProps = {
  length?: number;
  events?: SequenceEvent[];
};

export function SequenceEditor({
  length = 8,
  events = ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']],
}: SequenceEditorProps): React.ReactNode {
  const eventList = new Array(length).fill(null);
  const gridColumnsStyle = `repeat(${length}, 75px)`;
  return (
    <div
      className="sequencer-container"
      style={{ gridTemplateColumns: gridColumnsStyle }}
    >
      {eventList.map((_, i) => (
        <SequencerStep notes={events[i] || ''} key={i}></SequencerStep>
      ))}
      <ClientOnly>
        <Sequence notes={events} division={'8n'} />
      </ClientOnly>
    </div>
  );
}

type SequencerStepProps = {
  notes: SequenceEvent;
};

function SequencerStep(props: SequencerStepProps): React.ReactNode {
  let className = 'sequencer-step';
  if (props.notes) {
    className += ' active';
  }
  return <div className={className}>{props.notes}</div>;
}
