import React, { useState, useEffect } from "react";
import hooks from "./hooks";
import "./styles.css";
import usePreventLeave from "./hooks/usePreventLeave";
import useFadeIn from "./hooks/useFadeIn";
import useAxios from "./hooks/useAxios";

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
  const {
    useInput,
    useTabs,
    useTitle,
    useClick,
    useHover,
    useConfirm,
    usePreventLeave,
    useBeforeLeave,
    useFadeIn,
    useNetwork,
    useScroll,
    useNotification,
    useAxios,
  } = hooks;

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

  //usePreventLeave
  const { enablePrevent, disablePrevent } = usePreventLeave();

  //useBeforeLeave
  const onBefore = () => {
    alert("화면을 이탈했습니다.");
  };
  useBeforeLeave(onBefore);

  //useFadeIn
  const fadeDiv = useFadeIn(1, 3);
  const fadeP = useFadeIn(4, 2);

  //useNetwork
  const handleChangeNetwork = (online) => {
    console.log(online ? "online" : "offline");
  };
  const isOnline = useNetwork(handleChangeNetwork);

  //useScroll
  const { x: scrollX, y: scrollY } = useScroll();

  //useNotification
  const triggerNotif = useNotification("seHooks", { body: "안녕하세요." });

  //useAxios
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json",
  });

  return (
    <div className="App" style={{ height: "1000vh" }}>
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
        <li>
          usePreventLeave: 브라우저 창 이탈 막기 (새로고침, 뒤로 가기, 브라우저
          닫기, form submit 등)
          <div>
            <button onClick={enablePrevent}>이탈 막기 활성화</button>
            <button onClick={disablePrevent}>이탈 막기 비활성화</button>
          </div>
        </li>
        <li>useBeforeLeave: 마우스가 브라우저 영역 이탈시 특정 이벤트 발생</li>
        <li>
          useFadeIn: FadeIn 커스텀 애니메이션 설정
          <div {...fadeDiv}>duration: 1, delay: 3</div>
          <p {...fadeP}>duration: 4, delay: 2</p>
        </li>
        <li>
          useNetwork: 네트워크 연결 상태에 따른 이벤트 실행
          <div>현재 네트워크 연결 상태: {isOnline ? "Online" : "Offline"}</div>
        </li>
        <li>
          useScroll: 스크롤 값에 따른 이벤트 실행
          <div>현재 스크롤값: {`x: ${scrollX}, y: ${scrollY}`}</div>
        </li>
        <li>
          useNotification: 브라우저 푸시 알람 실행
          <div>
            <button onClick={triggerNotif}>알람보내기</button>
          </div>
        </li>
        <li>
          useAxios
          <div>
            {loading ? "loading" : "loaded"}
            <button onClick={refetch}>refetch</button>
          </div>
        </li>
      </ol>
    </div>
  );
}
