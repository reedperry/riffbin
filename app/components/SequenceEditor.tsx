import { useState } from 'react';
import { ClientOnly } from './ClientOnly';
import { Sequence } from './Sequence';
import { allNotes } from '~/data/notes';

export type SequenceEvent = string[] | string;

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

  function handleStepChanged(
    stepIndex: number,
    note: string,
    divisionIndex?: number
  ) {
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
          notes={steps[i] || ''}
          onStepChanged={(newNote, divisionIndex) =>
            handleStepChanged(i, newNote, divisionIndex)
          }
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
  notes: SequenceEvent;
  // TODO Need type for values in `allNotes`
  onStepChanged: (newNote: string, divisionIndex?: number) => void;
};

function SequencerStep(props: SequencerStepProps): React.ReactNode {
  function handleNoteChanged(newNote: string) {
    props.onStepChanged(newNote);
  }

  let className = 'sequencer-step';
  if (props.notes) {
    className += ' active';
  }
  return (
    <div className={className}>
      <NoteStrip onNoteChanged={handleNoteChanged}></NoteStrip>
    </div>
  );
}

type NoteStripProps = {
  onNoteChanged: (newNote: string) => void;
}

function NoteStrip({onNoteChanged}: NoteStripProps): React.ReactNode {
  return <div onScroll={e => handleNoteScroll(e, onNoteChanged)} className="note-strip">{allNotes.map(note =>
    <p key={note} className="note">{note}</p>
  )}</div>
}

function handleNoteScroll(evt: React.UIEvent<HTMLDivElement>, onNoteChanged: (newNote: string) => void): void {
  const scrollTop = evt.currentTarget.scrollTop;
  if (scrollTop % 75 === 0) {
    onNoteChanged(allNotes[scrollTop / 75]);
  }
}
