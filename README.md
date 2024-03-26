# Riffbin

The goal is to make Riffbin into a place to easily create or jot down melody/riff ideas with a simple sequencer view, and allow some extra controls over the synth sound parameters. Beyond that, I'd like to allow public/private storage, and live multiplayer for collaboration. Multiplayer may be more useful if the application allows playing and editing multiple sequences at once, but I also want to stay far away from building a DAW. Riffbin should be easy to open up on a mobile device and get an idea out of your head, or listen to/play with your friend's riff.

Using Tone.js for sound generation and playback.

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
