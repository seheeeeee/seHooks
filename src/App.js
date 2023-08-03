import React from "react";
import "./styles.css";
import { useInput } from "./hooks";

export default function App() {
  const maxLen = (value) => value.length <= 10;
  const name = useInput("Ms.sehee", maxLen);
  return (
    <div className="App">
      <h1>Welcome, Try seHooks.</h1>
      <ol>
        <li>
          useInput: <input placeholder="Name" {...name} />
        </li>
      </ol>
    </div>
  );
}
