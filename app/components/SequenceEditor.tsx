import { useEffect, useRef, useState } from 'react';
import { ClientOnly } from './ClientOnly';
import { Sequence } from './Sequence';
import { allNotes } from '~/data/notes';

export type SequenceEvent = string;

export type SequenceEditorProps = {
  length?: number;
  steps: SequenceEvent[];
  onSequenceChanged: (seqeunce: SequenceEvent[]) => void;
};

const defaultSequenceNote = 'C3';

export function SequenceEditor({
  length = 8,
  steps = [],
  onSequenceChanged,
}: SequenceEditorProps): React.ReactNode {
  const eventList = new Array(length).fill(null);
  const gridColumnsStyle = `repeat(${length}, 75px)`;

  function handleStepChanged(stepIndex: number, note: string) {
    const updatedSteps = [
      ...steps.slice(0, stepIndex),
      note,
      ...steps.splice(stepIndex + 1),
    ];
    onSequenceChanged(updatedSteps);
  }

  function handleStepToggled(stepIndex: number) {
    if (steps[stepIndex]) {
      disableStep(stepIndex);
    } else {
      enableStep(stepIndex);
    }
  }

  function disableStep(stepIndex: number): void {
    const updatedSteps = [
      ...steps.slice(0, stepIndex),
      '',
      ...steps.splice(stepIndex + 1),
    ];
    onSequenceChanged(updatedSteps);
  }

  function enableStep(stepIndex: number): void {
    const previousNote = stepIndex > 0 ? steps[stepIndex - 1] : null;
    const newNote = previousNote || defaultSequenceNote;
    const updatedSteps = [
      ...steps.slice(0, stepIndex),
      newNote,
      ...steps.splice(stepIndex + 1),
    ];
    onSequenceChanged(updatedSteps);
  }

  if (!steps.length) {
    return <div>Empty Sequence!</div>;
  }
  return (
    <div
      className="sequencer-container"
      style={{ gridTemplateColumns: gridColumnsStyle }}
    >
      {eventList.map((_, i) => (
        <SequencerStep
          key={i}
          note={steps[i] || ''}
          onStepChanged={(newNote) => handleStepChanged(i, newNote)}
          onStepToggled={() => handleStepToggled(i)}
        ></SequencerStep>
      ))}
      <ClientOnly>
        <Sequence notes={steps} division={'8n'} />
      </ClientOnly>
    </div>
  );
}

type SequencerStepProps = {
  note: SequenceEvent;
  // TODO Need type for values in `allNotes`
  onStepChanged: (newNote: string) => void;
  onStepToggled: () => void;
};

// TODO Should probably separate `note` from `active`
function SequencerStep(props: SequencerStepProps): React.ReactNode {
  function handleNoteChanged(newNote: string) {
    props.onStepChanged(newNote);
  }

  let className = 'sequencer-step';
  if (props.note) {
    className += ' active';
  }
  return (
    <div className={className} onClick={props.onStepToggled}>
      <NoteStrip
        selectedNote={props.note}
        onNoteChanged={handleNoteChanged}
      ></NoteStrip>
    </div>
  );
}

type NoteStripProps = {
  selectedNote: string;
  onNoteChanged: (newNote: string) => void;
};

// TODO: Scroll to top on disable? Or leave not selected??
function NoteStrip({
  onNoteChanged,
  selectedNote,
}: NoteStripProps): React.ReactNode {
  const noteStripRef = useRef<HTMLDivElement>(null);
  const selectedNoteRef = useRef<HTMLParagraphElement>(null);
  const [initComplete, setInitComplete] = useState(false);

  useEffect(() => {
    if (!noteStripRef.current || !selectedNoteRef.current) {
      return;
    }
    const stripOffset = noteStripRef.current.offsetTop;
    noteStripRef.current.scrollTo({
      top: selectedNoteRef.current.offsetTop - stripOffset || 0,
      behavior: 'instant',
    });
    setInitComplete(true);
  }, [selectedNote]);

  return (
    <div
      onScroll={(e) =>
        initComplete ? handleNoteScroll(e, onNoteChanged) : null
      }
      className="note-strip"
      ref={noteStripRef}
    >
      <p className="note">{'[rest]'}</p>
      {allNotes.map((note) => (
        <p
          key={note}
          className="note"
          ref={note === selectedNote ? selectedNoteRef : null}
        >
          {note}
        </p>
      ))}
    </div>
  );
}

function handleNoteScroll(
  evt: React.UIEvent<HTMLDivElement>,
  onNoteChanged: (newNote: string) => void
): void {
  const scrollTop = evt.currentTarget.scrollTop;
  if (scrollTop % 75 === 0) {
    const noteIndex = scrollTop / 75 - 1;
    onNoteChanged(allNotes[noteIndex] || '');
  }
}
