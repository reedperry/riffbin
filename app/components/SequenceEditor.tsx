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
          note={steps[i] || ''}
          onStepChanged={(newNote) => handleStepChanged(i, newNote)}
          key={i}
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
};

function SequencerStep(props: SequencerStepProps): React.ReactNode {
  function handleNoteChanged(newNote: string) {
    props.onStepChanged(newNote);
  }

  let className = 'sequencer-step';
  if (props.note) {
    className += ' active';
  }
  return (
    <div className={className}>
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
  }, []);

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
