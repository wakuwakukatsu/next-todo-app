"use client";

import styles from "./todoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "@prisma/client";

// TodoItemコンポーネントの引数のデータ型
type TodoItem = {
  todo: Todo;
  setTodoId: Dispatch<SetStateAction<number | null>>;
  setTodoTitle: Dispatch<SetStateAction<string | null>>;
  todoDayLimit: string | null;
  setTodoDayLimit: Dispatch<SetStateAction<string | null>>;
  setTodoMemo: Dispatch<SetStateAction<string | null>>;
  setIsBtnDisplayed: Dispatch<SetStateAction<boolean>>;
  toggleEdit: () => void;
};

// TodoItemコンポーネント
export default function TodoItem({
  todo,
  setTodoId,
  setTodoTitle,
  todoDayLimit,
  setTodoDayLimit,
  setTodoMemo,
  setIsBtnDisplayed,
  toggleEdit,
}: TodoItem) {
  return (
    <div className={styles.containerTodo} id={`todoId${todo.id}`}>
      <div className={styles.wrapperTodo}>
        <input
          type="checkbox"
          name="checkTodo"
          className={styles.checkTodo}
          id={`checkTodo${todo.id}`}
          onClick={() => {
            const currentCheckTodo = document.getElementById(
              `checkTodo${todo.id}`
            ) as HTMLInputElement;
            const checkTodo = document.getElementsByClassName(
              `${styles.checkTodo}`
            ) as HTMLCollectionOf<HTMLInputElement>;
            if (currentCheckTodo.checked) {
              for (let i = 0; i < checkTodo.length; i++) {
                checkTodo[i].checked = false;
              }
              currentCheckTodo.checked = true;
              setTodoId(todo.id);
              setIsBtnDisplayed(true);
            } else {
              setTodoId(null);
              setIsBtnDisplayed(false);
            }
          }}
        />
        <textarea
          name="todoTitle"
          className={styles.todoTitle}
          placeholder="ToDo"
          defaultValue={todo.title}
          rows={2}
          wrap="soft"
          id={`todoTitleId${todo.id}`}
          onInput={() => {
            const containerTodo = document.getElementById(`todoId${todo.id}`);
            const todoTitle = document.getElementById(`todoTitleId${todo.id}`);
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
          <FontAwesomeIcon icon={faPenToSquare} className={styles.menu} />
        </button>
      </div>
    </div>
  );
}
