"use client";

import styles from "./todos.module.css";
import Button from "../elements/button";
import Todo from "./todo";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  dayLimit: string;
  memo: string;
  completed: boolean;
};

const testTodos: Todo[] = [
  {
    id: 0,
    title: "todo1",
    dayLimit: "2024-01-01",
    memo: "memo1",
    completed: false,
  },
  {
    id: 1,
    title: "todo2",
    dayLimit: "2024-01-02",
    memo: "memo2",
    completed: false,
  },
  {
    id: 2,
    title: "todo3",
    dayLimit: "2024-01-03",
    memo: "memo3",
    completed: false,
  },
];

const newTodo: Todo = {
  id: 50,
  title: "",
  dayLimit: "",
  memo: "",
  completed: false,
};

export default function Todos() {
  // Todoリストを管理
  const [todos, setTodos] = useState<Todo[]>([]);
  // タイトルを変更できるようにする
  const [todoTitle, setTodoTitle] = useState<string | null>(null);
  // 日限を変更できるようにする
  const [todoDayLimit, setTodoDayLimit] = useState<string | null>(null);
  // メモを変更できるようにする
  const [todoMemo, setTodoMemo] = useState<string | null>(null);
  // モバイル版のTodo、日限、メモを編集するページを開く（閉じる）
  const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false);

  const toggleInfo = () => {
    setInfoIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const getTodo = () => {
      setTodos(testTodos);
    };
    getTodo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerMain}>
        <div className={styles.containerButton}>
          <div className={styles.buttons}>
            <Button text="保存" type="save" />
            <Button text="完了" type="comp" />
            <FontAwesomeIcon icon={faTrash} className={styles.delete} />
          </div>
          <div className={styles.compButton}>
            <Button text="完了タスクを表示" type="dispComp" />
          </div>
        </div>

        <div className={styles.todos} id="todos">
          <Todo
            todos={todos}
            setTodoTitle={setTodoTitle}
            setTodoDayLimit={setTodoDayLimit}
            setTodoMemo={setTodoMemo}
            toggleInfo={toggleInfo}
          />
        </div>

        {/* モバイル版のTodo、日限、メモを編集するページ */}
        <div className={infoIsOpen ? styles.open : undefined}>
          <div className={styles.info}>
            <div className={styles.wrapperBtn}>
              <button className={styles.btnClose} onClick={toggleInfo}>
                <FontAwesomeIcon icon={faXmark} className={styles.close} />
              </button>
            </div>
            <textarea
              className={styles.todoTitle}
              value={todoTitle || ""}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
              placeholder="Todo"
              rows={2}
              wrap="soft"
            ></textarea>
            <div className={styles.wrapperDayLimit}>
              <input
                type="date"
                className={styles.dayLimit}
                value={todoDayLimit || ""}
                onChange={(e) => {
                  setTodoDayLimit(e.target.value);
                }}
              />
            </div>
            <textarea
              className={styles.todoMemo}
              value={todoMemo || ""}
              onChange={(e) => {
                setTodoMemo(e.target.value);
              }}
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
