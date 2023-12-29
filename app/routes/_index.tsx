import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Music Mingle" },
    { name: "description", content: "Music with friends" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Music Mingle</h1>
      <ul>
        <li>
          <a
            href="#"
            rel="noreferrer">
            Create Project
          </a>
        </li>
        <li>
          <a
            href="#"
            rel="noreferrer">
            Browse Projects
          </a>
        </li>
      </ul>
    </div>
  );
}
