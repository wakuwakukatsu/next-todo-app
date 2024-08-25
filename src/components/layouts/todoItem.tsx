"use client";

import styles from "./todoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Todo } from "@prisma/client";

// TodoItemコンポーネントの引数のデータ型
type TodoItem = {
  todo: Todo;
  todoList: Todo[];
  setTodoId: Dispatch<SetStateAction<number | null>>;
  setTodoTitle: Dispatch<SetStateAction<string | null>>;
  setTodoDayLimit: Dispatch<SetStateAction<string | null>>;
  setTodoMemo: Dispatch<SetStateAction<string | null>>;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setIsBtnDisplayed: Dispatch<SetStateAction<boolean>>;
};

// TodoItemコンポーネント
export default function TodoItem({
  todo,
  todoList,
  setTodoId,
  setTodoTitle,
  setTodoDayLimit,
  setTodoMemo,
  setIsEditOpen,
  setIsBtnDisplayed,
}: TodoItem) {
  useEffect(() => {
    changeContainerHeight(todo.id);
  }, [todo.title]);

  // ToDoタイトルの行数に応じてコンテナ要素の高さを変更する関数
  function changeContainerHeight(todoIdNum: number) {
    const containerTodoElement = document.getElementById(
      `todoId${todoIdNum}`
    ) as HTMLDivElement;
    const todoTitleElement = document.getElementById(
      `todoTitleId${todoIdNum}`
    ) as HTMLTextAreaElement;

    const textHeight: number = todoTitleElement.clientHeight;
    const lineHeightStr: string =
      getComputedStyle(todoTitleElement).getPropertyValue("line-height");
    const lineHeight: number = Number(lineHeightStr.replace(/[^-\d\.]/g, ""));

    if (textHeight > lineHeight * 2) {
      containerTodoElement.style.height = "2.8125rem";
    } else {
      containerTodoElement.style.height = "1.5rem";
    }
  }

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
            const containerTodo = document.getElementById(
              `todoId${todo.id}`
            ) as HTMLDivElement;
            const todoTitleElement = document.getElementById(
              `todoTitleId${todo.id}`
            ) as HTMLTextAreaElement;
            const sh: number = todoTitleElement?.scrollHeight;
            if (containerTodo !== null) {
              containerTodo.style.height = sh + "px";
            }
          }}
        />
      </div>
      <div className={styles.containerBtnEdit}>
        <button
          className={styles.btnEditTodo}
          onClick={() => {
            setTodoId(todo.id);
            setTodoTitle(todo.title);
            setTodoDayLimit(todo.dayLimit);
            setTodoMemo(todo.memo);
            setIsEditOpen(true);
            const checkTodo = document.getElementsByClassName(
              `${styles.checkTodo}`
            ) as HTMLCollectionOf<HTMLInputElement>;
            for (let i = 0; i < checkTodo.length; i++) {
              checkTodo[i].checked = false;
            }
            setIsBtnDisplayed(false);
            const todoTitleElements = document.getElementsByClassName(
              `${styles.todoTitle}`
            ) as HTMLCollectionOf<HTMLTextAreaElement>;
            for (let i = 0; i < todoTitleElements.length; i++) {
              const todoTitleId: string = todoTitleElements[i].id;
              const todoIdNum: number = Number(todoTitleId.substring(11));
              const targetTodo: Todo | undefined = todoList.find(
                (todo) => todo.id === todoIdNum
              );
              todoTitleElements[i].value = targetTodo?.title || "";
              changeContainerHeight(todoIdNum);
            }
          }}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={styles.iconEditTodo}
          />
        </button>
      </div>
    </div>
  );
}
