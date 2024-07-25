import styles from "./button.module.css";

type Button = {
  text: string;
  type: "add" | "save" | "comp" | "dispComp";
};

// ボタンコンポーネント
export default function Button({ text, type }: Button) {
  //「追加」ボタン
  if (type === "add") {
    return (
      <button
        className={styles.add}
        type="button"
        // onClick={() => {
        //   const root = createRoot(document.getElementById("todos")!);
        //   root.render(<Todo toggleInfo={toggleInfo} />);
        //   const todos = document.getElementById("todos");
        //   createPortal(<Todo />, todos)
        // }}
      >
        {text}
      </button>
    );
    // 「保存」ボタン
  } else if (type === "save") {
    return (
      <button className={styles.save} type="button">
        {text}
      </button>
    );
    // 「完了」ボタン
  } else if (type === "comp") {
    return (
      <button className={styles.comp} type="button">
        {text}
      </button>
    );
    // 「完了タスクを表示」ボタン
  } else if (type === "dispComp") {
    return (
      <button className={styles.dispComp} type="button">
        {text}
      </button>
    );
  }
}
