import { deflate } from "zlib";
import styles from "./button.module.css";
import { Component, ReactElement } from "react";

interface Button {
  text: string;
  type: "default" | "comp" | "add" | "save";
}

// ボタンコンポーネント
export default function Button(button: Button, inputValue = "") {
  // 「完了」ボタンと「削除」ボタンのスタイル
  if (button.type === "default") {
    return (
      <button className={styles.default} type="button">
        {button.text}
      </button>
    );
  } else if (button.type === "comp") {
    return (
      <button className={styles.comp} type="button">
        {button.text}
      </button>
    );
  } else if (button.type === "add") {
    return (
      <button
        className={styles.add}
        type="button"
        // onClick={(e) => {
        //   e.preventDefault();
        //   if (inputValue !== "") {
        //     alert("Todoを入力してください");
        //   }
        // }}
      >
        {button.text}
      </button>
    );
  } else if (button.type === "save") {
    return (
      <button className={styles.save} type="button">
        {button.text}
      </button>
    );
  }
}
