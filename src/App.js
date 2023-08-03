import React, { useState, useEffect } from "react";
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
  const { useInput, useTabs, useTitle } = hooks;

  // useInput
  const maxLen = (value) => value.length <= 10;
  const name = useInput("", maxLen);

  // useTabs
  const { currentItem, changeItem } = useTabs(0, content);

  //useTitle
  const [userTitle, setUserTitle] = useState("");
  const titleUpdater = useTitle(userTitle);
  useEffect(() => {
    setTimeout(() => titleUpdater(userTitle), 500);
  }, [userTitle]);

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
        <li>
          useTitle: 원하는 텍스트로 탭 타이틀을 변경하세요.
          <input
            placeholder="Title"
            onChange={(e) => setUserTitle(e.target.value)}
          />
        </li>
      </ol>
    </div>
  );
}
