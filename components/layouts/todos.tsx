import styles from "./todos.module.css";
import Button from "../elements/button";
import Todo from "./todo";

export default function Todos() {
  return (
    <div className={styles.container}>
      <div className={styles.containerMain}>
        <div className={styles.containerButton}>
          <div className={styles.buttons}>
            <Button text="編集" type="default" />
            <Button text="削除" type="default" />
            <Button text="完了" type="default" />
          </div>
          <div className={styles.compButton}>
            <Button text="完了タスクを表示" type="comp" />
          </div>
        </div>

        <div className={styles.todos}>
          <Todo />
        </div>
      </div>

      <div className={styles.containerInput}>
        <input
          type="text"
          className={styles.inputTodo}
          placeholder="Todoを入力"
        />
        <Button text="追加" type="add" />
      </div>
    </div>
  );
}
