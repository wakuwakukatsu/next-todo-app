"use client";

import styles from "./todos.module.css";
import Button from "../elements/button";
import Todo from "./todo";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

// Todoのデータ型
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
    completed: true,
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
    completed: true,
  },
  {
    id: 3,
    title: "todo4",
    dayLimit: "2024-01-04",
    memo: "memo4",
    completed: true,
  },
  {
    id: 4,
    title: "todo5",
    dayLimit: "2024-01-05",
    memo: "memo5",
    completed: true,
  },
  {
    id: 5,
    title: "todo6",
    dayLimit: "2024-01-06",
    memo: "memo6",
    completed: true,
  },
  {
    id: 6,
    title: "todo7",
    dayLimit: "2024-01-07",
    memo: "memo7",
    completed: true,
  },
  {
    id: 7,
    title: "todo8",
    dayLimit: "2024-01-08",
    memo: "memo8",
    completed: true,
  },
  {
    id: 8,
    title: "todo9",
    dayLimit: "2024-01-09",
    memo: "memo9",
    completed: true,
  },
  {
    id: 9,
    title: "todo10",
    dayLimit: "2024-01-10",
    memo: "memo10",
    completed: true,
  },
  {
    id: 10,
    title: "todo11",
    dayLimit: "2024-01-11",
    memo: "memo11",
    completed: true,
  },
  {
    id: 11,
    title: "todo12",
    dayLimit: "2024-01-12",
    memo: "memo12",
    completed: true,
  },
  {
    id: 12,
    title: "todo13",
    dayLimit: "2024-01-13",
    memo: "memo13",
    completed: true,
  },
  {
    id: 13,
    title: "todo14",
    dayLimit: "2024-01-14",
    memo: "memo14",
    completed: true,
  },
  {
    id: 14,
    title: "todo15",
    dayLimit: "2024-01-15",
    memo: "memo11",
    completed: true,
  },
  {
    id: 15,
    title: "todo16",
    dayLimit: "2024-01-16",
    memo: "memo16",
    completed: true,
  },
  {
    id: 16,
    title: "todo17",
    dayLimit: "2024-01-17",
    memo: "memo17",
    completed: true,
  },
  {
    id: 17,
    title: "todo18",
    dayLimit: "2024-01-18",
    memo: "memo18",
    completed: true,
  },
  {
    id: 18,
    title: "todo19",
    dayLimit: "2024-01-19",
    memo: "memo19",
    completed: true,
  },
  {
    id: 19,
    title: "todo20",
    dayLimit: "2024-01-20",
    memo: "memo20",
    completed: true,
  },
];

const newTodo: Todo = {
  id: 50,
  title: "",
  dayLimit: "",
  memo: "",
  completed: false,
};

// Todosコンポーネント
export default function Todos() {
  // Todoリストを更新するための変数
  const [todos, setTodos] = useState<Todo[]>([]);
  // モバイル版の編集画面で「Todoのタイトル」を変更するための変数
  const [todoTitle, setTodoTitle] = useState<string | null>(null);
  // モバイル版の編集画面で「Todoの日限」を変更するための変数
  const [todoDayLimit, setTodoDayLimit] = useState<string | null>(null);
  // モバイル版の編集画面で「Todoのメモ」を変更するための変数
  const [todoMemo, setTodoMemo] = useState<string | null>(null);
  // モバイル版の編集画面を開閉するための変数
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  // ボタンやアイコンを表示・非表示するための変数
  const [isBtnDisplayed, setIsBtnDisplayed] = useState<boolean>(false);
  // 完了タスクを表示・非表示するための変数
  const [isCompDisplayed, setIsCompDisplayed] = useState<boolean>(false);

  // モバイル版の編集画面を開閉するための関数
  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  useEffect(() => {
    const getTodos = () => {
      setTodos(testTodos);
    };
    getTodos();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerMain}>
        <div className={styles.containerBtns}>
          <div className={isBtnDisplayed ? styles.showBtns : styles.hideBtns}>
            <Button text="保存" type="save" />
            {isCompDisplayed ? (
              <Button text="戻す" type="comp" />
            ) : (
              <Button text="完了" type="comp" />
            )}
            <FontAwesomeIcon icon={faTrash} className={styles.deleteTodo} />
          </div>
          <div className={styles.wrapperBtnDispComp}>
            {isCompDisplayed ? (
              <Button
                text="Todoリストを表示"
                type="dispComp"
                setIsBtnDisplayed={setIsBtnDisplayed}
                setIsCompDisplayed={setIsCompDisplayed}
              />
            ) : (
              <Button
                text="完了タスクを表示"
                type="dispComp"
                setIsBtnDisplayed={setIsBtnDisplayed}
                setIsCompDisplayed={setIsCompDisplayed}
              />
            )}
          </div>
        </div>

        {/* Todoリストを表示 */}
        <div
          className={isCompDisplayed ? styles.compTodos : styles.incompTodos}
          id="containerTodos"
        >
          {isCompDisplayed
            ? todos
                .filter((todo) => todo.completed === true)
                .map((todo) => (
                  <Todo
                    todo={todo}
                    setTodoTitle={setTodoTitle}
                    todoDayLimit={todoDayLimit}
                    setTodoDayLimit={setTodoDayLimit}
                    setTodoMemo={setTodoMemo}
                    setIsBtnDisplayed={setIsBtnDisplayed}
                    toggleEdit={toggleEdit}
                    key={todo.id}
                  />
                ))
            : todos
                .filter((todo) => todo.completed === false)
                .map((todo) => (
                  <Todo
                    todo={todo}
                    setTodoTitle={setTodoTitle}
                    todoDayLimit={todoDayLimit}
                    setTodoDayLimit={setTodoDayLimit}
                    setTodoMemo={setTodoMemo}
                    setIsBtnDisplayed={setIsBtnDisplayed}
                    toggleEdit={toggleEdit}
                    key={todo.id}
                  />
                ))}
        </div>

        {/* モバイル版のTodo、日限、メモを編集する画面 */}
        <div className={isEditOpen ? styles.open : undefined}>
          <div className={styles.info}>
            <div className={styles.wrapperBtn}>
              <button className={styles.btnClose} onClick={toggleEdit}>
                <FontAwesomeIcon icon={faXmark} className={styles.close} />
              </button>
            </div>
            <textarea
              name="mobileTodoTitle"
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
              name="todoMemo"
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

      <div
        className={isCompDisplayed ? styles.hideAddTodo : styles.showAddTodo}
        id="containerAddTodo"
      >
        <div className={styles.wrapperAddTodo}>
          <textarea
            name="addTodo"
            className={styles.addTodo}
            placeholder="Todoを入力"
            wrap="soft"
            onInput={() => {
              const element = document.getElementById("containerAddTodo");
              const rect = element?.getBoundingClientRect();
              console.log(`${rect?.height}px)`);
              document.documentElement.style.setProperty(
                "--inputArea-height",
                `${rect?.height}px`
              );
            }}
          />
        </div>
        <div className={styles.wrapperAddBtn}>
          <Button text="追加" type="add" />
        </div>
      </div>
    </div>
  );
}
