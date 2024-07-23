"use client";

import styles from "./todos.module.css";
import Button from "../elements/button";
import Todo from "./todo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Todos() {
  const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false);

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
          <Todo setInfoIsOpen={setInfoIsOpen} />
        </div>
        <div className={infoIsOpen ? styles.open : styles.close}>
          <div className={styles.info}></div>
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
