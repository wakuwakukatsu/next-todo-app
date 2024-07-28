"use client";

import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

// Todoのデータ型
type Todo = {
  id: number;
  title: string;
  dayLimit: string;
  memo: string;
  completed: boolean;
};

// Todoコンポーネントの引数のデータ型
type Props = {
  todo: Todo;
  setTodoTitle: Dispatch<SetStateAction<string | null>>;
  todoDayLimit: string | null;
  setTodoDayLimit: Dispatch<SetStateAction<string | null>>;
  setTodoMemo: Dispatch<SetStateAction<string | null>>;
  setIsBtnDisplayed: Dispatch<SetStateAction<boolean>>;
  toggleEdit: () => void;
};

// Todoコンポーネント
export default function Todo({
  todo,
  setTodoTitle,
  todoDayLimit,
  setTodoDayLimit,
  setTodoMemo,
  setIsBtnDisplayed,
  toggleEdit,
}: Props) {
  useEffect(() => {
    // 一つのチェックボックスにのみチェックが入るようにする。
    (() => {
      const inputs = document.getElementsByClassName(
        `${styles.checkTodo}`
      ) as HTMLCollectionOf<HTMLInputElement>;
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function () {
          if (this.checked) {
            for (let j = 0; j < inputs.length; j++) {
              inputs[j].checked = false;
            }
            this.checked = true;
            setIsBtnDisplayed(true);
          } else {
            setIsBtnDisplayed(false);
          }
        });
      }
    })();
  }, []);

  return (
    <div className={styles.containerTodo} id={`todoID${todo.id}`}>
      <div className={styles.wrapperTodo}>
        <input type="checkbox" name="checkTodo" className={styles.checkTodo} />
        <textarea
          name="todoTitle"
          className={styles.todoTitle}
          placeholder="Todo"
          defaultValue={todo.title}
          rows={2}
          wrap="soft"
          id={`todoTitleID${todo.id}`}
          onInput={() => {
            const containerTodo = document.getElementById(`todoID${todo.id}`);
            const todoTitle = document.getElementById(`todoTitleID${todo.id}`);
            const sh = todoTitle?.scrollHeight;
            if (containerTodo !== null) {
              containerTodo.style.height = sh + "px";
            }
          }}
        />
      </div>
      <div className={styles.containerIcons}>
        <div className={styles.wrapperIcons}>
          <input
            type="date"
            className={styles.dayLimit}
            value={todoDayLimit || ""}
            onChange={(e) => {
              setTodoDayLimit(e.target.value);
            }}
          />
          <button>
            <FontAwesomeIcon icon={faFile} className={styles.memo} />
          </button>
        </div>
        <button
          className={styles.btnInfo}
          onClick={() => {
            setTodoTitle(todo.title);
            setTodoDayLimit(todo.dayLimit);
            setTodoMemo(todo.memo);
            toggleEdit();
          }}
        >
          <FontAwesomeIcon icon={faBars} className={styles.menu} />
        </button>
      </div>
    </div>
  );
}
