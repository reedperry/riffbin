import { ClientOnly } from "~/components/ClientOnly";
import ToneDebugger from "~/components/ToneDebugger";
import globalStyles from '~/styles/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
];

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
