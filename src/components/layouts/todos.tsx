"use client";

import styles from "./todos.module.css";
import Button from "../elements/button";
import Todo from "./todo";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Todos() {
  const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false);

  const toggleInfo = () => {
    setInfoIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerMain}>
        <div className={styles.containerButton}>
          <div className={styles.buttons}>
            <Button text="保存" type="default" />
            <Button text="完了" type="default" />
            <FontAwesomeIcon icon={faTrash} className={styles.delete} />
          </div>
          <div className={styles.compButton}>
            <Button text="完了タスクを表示" type="comp" />
          </div>
        </div>

        <div className={styles.todos} id="todos">
          <Todo toggleInfo={toggleInfo} />
        </div>
        <div className={infoIsOpen ? styles.open : undefined}>
          <div className={styles.info}>
            <div className={styles.wrapperBtn}>
              <button className={styles.btnClose} onClick={toggleInfo}>
                <FontAwesomeIcon icon={faXmark} className={styles.close} />
              </button>
            </div>
            <textarea
              className={styles.todoTitle}
              placeholder="Todo"
              rows={2}
              wrap="soft"
            ></textarea>
            <div className={styles.wrapperDeadLine}>
              <input type="date" className={styles.deadLine} />
            </div>
            <textarea
              className={styles.todoMemo}
              placeholder="Memo"
              rows={2}
              wrap="soft"
            ></textarea>
            <div className={styles.wrapperSaveBtn}>
              <Button text="保存" type="save" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.containerInput} id="containerInput">
        <div className={styles.wrapperTextarea}>
          <textarea
            className={styles.inputTodo}
            placeholder="Todoを入力"
            wrap="soft"
            id="textarea"
            onInput={() => {
              const element = document.getElementById("containerInput");
              const rect = element?.getBoundingClientRect();
              console.log(`${rect?.height}px)`);
              document.documentElement.style.setProperty(
                "--inputArea-height",
                `${rect?.height}px`
              );
            }}
          />
        </div>
        <div className={styles.wrapperButton}>
          <Button text="追加" type="add" />
        </div>
      </div>
    </div>
  );
}
