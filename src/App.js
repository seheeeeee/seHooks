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
  const { useInput, useTabs, useTitle, useClick, useHover, useConfirm } = hooks;

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

  //useClick
  const changeButton = useClick(() => {
    changeButton.current.innerText = Math.floor(Math.random() * 100);
  });

  //useHover
  const changeButtonHover = useHover(() => {
    changeButtonHover.current.style.backgroundColor = "red";
  });

  //useConfirm
  const confirm = () => console.log("Hello World");
  const reject = () => console.log("Bye world");
  const confirmAction = useConfirm("Are you sure?", confirm, reject);

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
          <div>
            <input
              placeholder="Title"
              onChange={(e) => setUserTitle(e.target.value)}
            />
          </div>
        </li>
        <li>
          useClick: 클릭 이벤트를 자유롭게!
          <div>
            <button ref={changeButton}>
              click this button to change button name
            </button>
          </div>
        </li>
        <li>
          useHover: mouseover 이벤트를 자유롭게!
          <div>
            <button ref={changeButtonHover}>
              mouseover this button to change button color
            </button>
          </div>
        </li>
        <li>
          useConfirm: 확인팝업 띄우기
          <div>
            <button onClick={confirmAction}>확인팝업 활성화</button>
          </div>
        </li>
      </ol>
    </div>
  );
}
