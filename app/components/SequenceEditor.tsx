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
  const gridTemplateColumnsValue = new Array(length).fill(null).reduce((acc, _, i) => `${acc}75px `, '');
  return (
    <div className="sequencer-container" style={{'grid-template-columns': gridTemplateColumnsValue}}>
      {eventList.map((_, i) => (
        <SequencerStep notes={events[i] || ''} key={i}></SequencerStep>
      ))}
    </div>
  );
}

type SequencerStepProps = {
   notes: SequenceEvent;
};

function SequencerStep(props: SequencerStepProps): React.ReactNode {
    return <div className="sequencer-step">{props.notes}</div>
}
