import { useEffect, useRef, useState } from 'react';
import { ClientOnly } from './ClientOnly';
import { Sequence } from './Sequence';
import { allNotes } from '~/data/notes';
import { SequenceData, SequenceStep } from '~/models/sequence.models';

export type SequenceEditorProps = {
  sequence: SequenceData;
  onStepsChanged: (steps: SequenceStep[]) => void;
};

const defaultSequenceNote = 'C3';
const defaultSequenceStep: SequenceStep = {
  note: defaultSequenceNote,
  enabled: true,
};

export function SequenceEditor({
  sequence,
  onStepsChanged,
}: SequenceEditorProps): React.ReactNode {
  const [loopStart, setLoopStart] = useState<number>(0);
  const [loopEnd, setLoopEnd] = useState<number>(sequence.steps.length);
  const gridColumnsStyle = `repeat(${sequence.playLength}, 75px)`;

  function handleStepChanged(stepIndex: number, newNote: string) {
    const currentSteps = sequence.steps;
    const updatedSteps = [
      ...currentSteps.slice(0, stepIndex),
      { ...currentSteps[stepIndex], note: newNote },
      ...currentSteps.splice(stepIndex + 1),
    ];
    onStepsChanged(updatedSteps);
  }

  function handleStepToggled(stepIndex: number) {
    if (sequence.steps[stepIndex].enabled) {
      disableStep(stepIndex);
    } else {
      enableStep(stepIndex);
    }
  }

  function disableStep(stepIndex: number): void {
    const currentSteps = sequence.steps;
    const updatedSteps = [
      ...currentSteps.slice(0, stepIndex),
      { ...currentSteps[stepIndex], enabled: false },
      ...currentSteps.splice(stepIndex + 1),
    ];
    onStepsChanged(updatedSteps);
  }

  function enableStep(stepIndex: number): void {
    const currentSteps = sequence.steps;
    const currentNote = sequence.steps[stepIndex].note;
    const previousStepNote =
      stepIndex > 0 ? sequence.steps[stepIndex - 1].note : null;
    const newNote = currentNote || previousStepNote || defaultSequenceNote;
    const updatedSteps = [
      ...currentSteps.slice(0, stepIndex),
      { note: newNote, enabled: true },
      ...currentSteps.splice(stepIndex + 1),
    ];
    onStepsChanged(updatedSteps);
  }

  function handleLoopStartChange(loopStart: number): void {
    setLoopStart(loopStart);
  }

  function handleLoopEndChange(loopEnd: number): void {
    setLoopEnd(loopEnd);
  }

  function loopStartDragStart(): void {
    console.log('drag started');
  }

  if (sequence.steps.length === 0 || sequence.playLength === 0) {
    return <h2>Empty Sequence!</h2>;
  }

  // TODO Adjust naming to fit well with loopStart/loopEnd length
  const fullSequenceSteps = Array(sequence.playLength)
    .fill(0)
    .map((_, i) => sequence.steps[i] || defaultSequenceStep);

  return (
    <div
      className="sequencer-container"
      style={{ gridTemplateColumns: gridColumnsStyle }}
    >
      {fullSequenceSteps.map((step, i) => (
        <>
          <LoopBoundaryControl dragStarted={loopStartDragStart} dragEnded={handleLoopEndChange} />
          <SequencerStep
            key={i}
            step={step}
            onStepChanged={(newNote) => handleStepChanged(i, newNote)}
            onStepToggled={() => handleStepToggled(i)}
          ></SequencerStep>
        </>
      ))}
      <ClientOnly>
        <Sequence
          notes={fullSequenceSteps.map((step) => (step.enabled ? step.note : ''))}
          loopStart={loopStart}
          loopEnd={loopEnd}
          division={'8n'}
        />
      </ClientOnly>
    </div>
  );
}

function LoopBoundaryControl(props: any): React.ReactNode {
  return <div className="loop-boundary" draggable onDragEnd={props.dragEnded}>LOOP</div>;
}

type SequencerStepProps = {
  step: SequenceStep;
  onStepChanged: (newNote: string) => void;
  onStepToggled: () => void;
};

function SequencerStep(props: SequencerStepProps): React.ReactNode {
  function handleNoteChanged(newNote: string) {
    props.onStepChanged(newNote);
  }

  function handleDragEnter(): void {
    console.log('drag enter');
  }

  function handleDragLeave(): void {
    console.log('drag leave');
  }

  let className = 'sequencer-step';
  if (!props.step.enabled) {
    className += ' disabled';
  }
  return (
    <div className={className} onClick={props.onStepToggled} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
      <NoteStrip
        selectedNote={props.step.note}
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
  }, [selectedNote]);

  return (
    <div
      onScroll={(e) =>
        initComplete ? handleNoteScroll(e, onNoteChanged) : null
      }
      className="note-strip"
      ref={noteStripRef}
    >
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
    const noteIndex = scrollTop / 75;
    onNoteChanged(allNotes[noteIndex] || '');
  }
}
