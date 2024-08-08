"use client";

import styles from "./todoList.module.css";
import Button from "../elements/button";
import TodoItem from "./todoItem";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

const testTodoList: Todo[] = [
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

// TodoListコンポーネント
export default function todoList() {
  // Todoリストを更新するための変数
  const [todoList, setTodoList] = useState<Todo[]>([]);
  // 現在選択しているTodoのidを変更するための変数
  const [todoId, setTodoId] = useState<number | null>(null);
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
    // DBに保存されたToDoリストを取得
    const getTodoList = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
      const todoList = await response.json();
      setTodoList(todoList);
    };
    getTodoList();
  }, []);

  return (
    <div>
      <div className={styles.containerMain}>
        {/* ボタンやアイコンが表示される領域 */}
        <div className={styles.containerBtns}>
          <div className={isBtnDisplayed ? styles.showBtns : styles.hideBtns}>
            {/* 「保存」ボタン（ToDoタイトルの変更を保存） */}
            <Button
              text="保存"
              type="save"
              todoList={todoList}
              setTodoList={setTodoList}
              todoId={todoId}
              isEditOpen={isEditOpen}
              setIsBtnDisplayed={setIsBtnDisplayed}
            />
            {isCompDisplayed ? (
              // 「戻す」ボタン（ToDoを完了タスクから戻す）
              <Button
                text="戻す"
                type="comp"
                todoList={todoList}
                setTodoList={setTodoList}
                todoId={todoId}
                setIsBtnDisplayed={setIsBtnDisplayed}
                isCompDisplayed={isCompDisplayed}
              />
            ) : (
              // 「完了」ボタン（ToDo完了タスクに移動）
              <Button
                text="完了"
                type="comp"
                todoList={todoList}
                setTodoList={setTodoList}
                todoId={todoId}
                setIsBtnDisplayed={setIsBtnDisplayed}
                isCompDisplayed={isCompDisplayed}
              />
            )}
            {/* 「削除」アイコン（ToDoを削除） */}
            <button
              onClick={async (e) => {
                e.preventDefault();
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/todo/${todoId}`,
                  {
                    method: "DELETE",
                  }
                );
                const deleteTodo = await response.json();
                setTodoList(
                  todoList.filter((todo) => todo.id !== deleteTodo.id)
                );
              }}
            >
              <FontAwesomeIcon icon={faTrash} className={styles.deleteTodo} />
            </button>
          </div>
          <div className={styles.wrapperBtnDispComp}>
            {isCompDisplayed ? (
              // 「ToDoリストを表示」ボタン（完了タスク表示からToDoリスト表示に切り替える）
              <Button
                text="ToDoリストを表示"
                type="dispComp"
                setIsBtnDisplayed={setIsBtnDisplayed}
                setIsCompDisplayed={setIsCompDisplayed}
              />
            ) : (
              // 「完了タスクを表示」ボタン
              <Button
                text="完了タスクを表示"
                type="dispComp"
                setIsBtnDisplayed={setIsBtnDisplayed}
                setIsCompDisplayed={setIsCompDisplayed}
              />
            )}
          </div>
        </div>

        {/* Todoリストが表示される領域 */}
        <div
          className={
            isCompDisplayed ? styles.compTodoList : styles.incompTodoList
          }
        >
          {isCompDisplayed
            ? [...todoList]
                .reverse()
                .filter((todo) => todo.completed === true)
                .map((todo) => (
                  <TodoItem
                    todo={todo}
                    setTodoId={setTodoId}
                    setTodoTitle={setTodoTitle}
                    todoDayLimit={todoDayLimit}
                    setTodoDayLimit={setTodoDayLimit}
                    setTodoMemo={setTodoMemo}
                    setIsBtnDisplayed={setIsBtnDisplayed}
                    toggleEdit={toggleEdit}
                    key={todo.id}
                  />
                ))
            : todoList
                .filter((todo) => todo.completed === false)
                .map((todo) => (
                  <TodoItem
                    todo={todo}
                    setTodoId={setTodoId}
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

        {/* タイトル、日限、メモを編集するモバイル版の画面 */}
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
              placeholder="ToDo"
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
              {/* 「保存」ボタン（タイトル、日限、メモの変更を保存） */}
              <Button text="保存" type="save" />
            </div>
          </div>
        </div>
      </div>

      {/* ToDoを追加するフォームが表示される領域 */}
      <div
        className={isCompDisplayed ? styles.hideAddTodo : styles.showAddTodo}
        id="containerAddTodo"
      >
        <div className={styles.wrapperAddTodo}>
          <textarea
            name="addTodo"
            className={styles.addTodo}
            id="addTodo"
            placeholder="ToDo"
            wrap="soft"
            onInput={() => {
              const element = document.getElementById("containerAddTodo");
              const rect = element?.getBoundingClientRect();
              document.documentElement.style.setProperty(
                "--inputArea-height",
                `${rect?.height}px`
              );
            }}
          />
        </div>
        <div className={styles.wrapperBtnAdd}>
          {/* 「追加」ボタン（ToDoを追加） */}
          <Button
            text="追加"
            type="add"
            todoList={todoList}
            setTodoList={setTodoList}
          />
        </div>
      </div>
    </div>
  );
}
