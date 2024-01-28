export const noteNames = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];

const octaves = [-2, -1, 0, 1, 2, 3, 4];

let availableNotes: string[] = [];
for (const octave of octaves) {
  availableNotes = availableNotes.concat(
    noteNames.map((note) => `${note}${octave ? octave.toString() : ''}`)
  );
}

export const allNotes = availableNotes;
