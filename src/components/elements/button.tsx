import styles from "./button.module.css";
import { Dispatch, SetStateAction } from "react";

// Buttonコンポーネントの引数のデータ型
type Button = {
  text: string;
  type: "add" | "save" | "comp" | "dispComp";
  setIsBtnDisplayed?: Dispatch<SetStateAction<boolean>>;
  setIsCompDisplayed?: Dispatch<SetStateAction<boolean>>;
};

// ボタンコンポーネント
export default function Button({
  text,
  type,
  setIsBtnDisplayed,
  setIsCompDisplayed,
}: Button) {
  switch (type) {
    //「追加」ボタン
    case "add":
      return (
        <button className={styles.btnAdd} type="button">
          {text}
        </button>
      );
    // 「保存」ボタン
    case "save":
      return (
        <button className={styles.btnSave} type="button">
          {text}
        </button>
      );
    // 「完了」ボタン
    case "comp":
      return (
        <button className={styles.btnComp} type="button">
          {text}
        </button>
      );
    // 「完了タスクを表示」ボタン
    case "dispComp":
      return (
        <button
          className={styles.btnDispComp}
          type="button"
          onClick={() => {
            if (setIsBtnDisplayed) {
              setIsBtnDisplayed(false);
            }
            if (setIsCompDisplayed) {
              setIsCompDisplayed((prev) => !prev);
            }
          }}
        >
          {text}
        </button>
      );
  }
}
