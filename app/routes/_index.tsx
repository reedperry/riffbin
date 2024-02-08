import type { LinksFunction, MetaFunction } from '@remix-run/node';
import styles from '~/styles/global.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Music Mingle' },
    { name: 'description', content: 'Music with friends' },
  ];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Music Mingle</h1>
      <ul>
        <li>
          <a href="/synth"><strong>Quick Play 🎹</strong></a>
        </li>
        <li>
          <a href="/sequence"><strong>Sequencer 🎼</strong></a>
        </li>
        <li>
          <a href="/playground"><strong>Debugger/ToneJS Playground ⌨</strong>️</a>
        </li>
        <li>
          <a href="#" rel="noreferrer">
            Create Project
          </a>
        </li>
        <li>
          <a href="#" rel="noreferrer">
            Browse Projects
          </a>
        </li>
      </ul>
    </div>
  );
}
