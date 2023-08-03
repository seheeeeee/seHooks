import React from "react";
import hooks from "./hooks";
import "./styles.css";

const content = [
  {
    tab: "section1",
    content: "I'm content of section1",
  },
  {
    tab: "section2",
    content: "I'm content of section2",
  },
];

export default function App() {
  const { useInput, useTabs } = hooks;

  const maxLen = (value) => value.length <= 10;
  const name = useInput("Ms.sehee", maxLen);

  const { currentItem, changeItem } = useTabs(0, content);

  return (
    <div className="App">
      <h1>Welcome, Try seHooks.</h1>
      <ol>
        <li>
          useInput: <input placeholder="Name" {...name} />
        </li>
        <li>
          useTabs:
          <div>
            {content.map((content, index) => (
              <button key={content.tab} onClick={() => changeItem(index)}>
                {content.tab}
              </button>
            ))}
            <div>{currentItem.content}</div>
          </div>
        </li>
      </ol>
    </div>
  );
}
