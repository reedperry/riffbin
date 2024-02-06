import { ClientOnly } from "~/components/ClientOnly";
import ToneDebugger from "~/components/ToneDebugger";

export default function TonePlaygroundPage() {
  return (
    <>
    <h1>ToneJS Debugger</h1>
    <p>Click start to allow Tone.js to play audio and assign it to window as <code>Tone</code>.</p>
    <ClientOnly>
      <ToneDebugger></ToneDebugger>
    </ClientOnly>
    </>
  );
}
