"use client";

import styles from "./todoList.module.css";
import Button from "../elements/button";
import TodoItem from "./todoItem";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

// TodoListコンポーネント
export default function TodoList() {
  // ToDoリストを更新するための変数
  const [todoList, setTodoList] = useState<Todo[]>([]);
  // 現在選択しているToDoのidを変更するための変数
  const [todoId, setTodoId] = useState<number | null>(null);
  // モバイル版の編集画面で「ToDoのタイトル」を変更するための変数
  const [todoTitle, setTodoTitle] = useState<string | null>(null);
  // モバイル版の編集画面で「ToDoの日限」を変更するための変数
  const [todoDayLimit, setTodoDayLimit] = useState<string | null>(null);
  // モバイル版の編集画面で「ToDoのメモ」を変更するための変数
  const [todoMemo, setTodoMemo] = useState<string | null>(null);
  // モバイル版の編集画面を開閉するための変数
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  // ボタンやアイコンを表示・非表示するための変数
  const [isBtnDisplayed, setIsBtnDisplayed] = useState<boolean>(false);
  // 完了タスクを表示・非表示するための変数
  const [isCompDisplayed, setIsCompDisplayed] = useState<boolean>(false);

  useEffect(() => {
    // DBに保存されたToDoリストを取得
    const getTodoList = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
      const todoList = await response.json();
      setTodoList(todoList);
    };
    getTodoList();
  }, []);

  // ToDoを完了日時の降順でソートする関数
  function descTimeSort(a: Date | null, b: Date | null): number {
    if (a !== null && b !== null) {
      return a < b ? 1 : -1;
    } else {
      alert("ToDoの完了日時の値に問題があります。");
      return 0;
    }
  }

  // 改行コードを<br />タグに変換する関数
  function lineBreak(
    todoTitleString: string,
    todoTitleId: number
  ): React.JSX.Element[] {
    const lines: string[] = todoTitleString.split(/\r?\n/);
    let counter: number = 0;
    const element = lines.map((item) => {
      counter += 1;
      if (counter === lines.length) {
        return (
          <React.Fragment key={`listFragment${todoTitleId}-${counter}`}>
            {item}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={`listFragment${todoTitleId}-${counter}`}>
            {item}
            <br />
          </React.Fragment>
        );
      }
    });
    return element;
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.containerTodoList}>
        {/* ボタンやアイコンが表示される領域 */}
        <div className={styles.containerBtns}>
          <div className={isBtnDisplayed ? styles.showBtns : styles.hideBtns}>
            {/* 「保存」ボタン（タイトルの変更を保存） */}
            <Button
              text="保存"
              type="save"
              todoList={todoList}
              setTodoList={setTodoList}
              todoId={todoId}
              isEditOpen={isEditOpen}
              setIsEditOpen={setIsEditOpen}
              setIsBtnDisplayed={setIsBtnDisplayed}
            />
            {isCompDisplayed ? (
              // 「戻す」ボタン（ToDoを完了タスクからToDoリストに戻す）
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
              // 「完了」ボタン（ToDoを完了タスクに移動）
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

        {/* ToDoリストが表示される領域 */}
        <div
          className={
            isCompDisplayed ? styles.compTodoList : styles.incompTodoList
          }
        >
          {isCompDisplayed
            ? todoList
                .filter((todo) => todo.completed === true)
                .sort((a: Todo, b: Todo) =>
                  descTimeSort(a.completedAt, b.completedAt)
                )
                .map((todo) => (
                  <TodoItem
                    todo={todo}
                    todoList={todoList}
                    setTodoId={setTodoId}
                    setTodoTitle={setTodoTitle}
                    setTodoDayLimit={setTodoDayLimit}
                    setTodoMemo={setTodoMemo}
                    setIsEditOpen={setIsEditOpen}
                    setIsBtnDisplayed={setIsBtnDisplayed}
                    key={todo.id}
                  />
                ))
            : todoList
                .filter((todo) => todo.completed === false)
                .map((todo) => (
                  <TodoItem
                    todo={todo}
                    todoList={todoList}
                    setTodoId={setTodoId}
                    setTodoTitle={setTodoTitle}
                    setTodoDayLimit={setTodoDayLimit}
                    setTodoMemo={setTodoMemo}
                    setIsEditOpen={setIsEditOpen}
                    setIsBtnDisplayed={setIsBtnDisplayed}
                    key={todo.id}
                  />
                ))}
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

        {/* タイトル、日限、メモを編集する画面 */}
        <div className={isEditOpen ? styles.open : undefined}>
          <div className={styles.editScreen}>
            <div className={styles.wrapperBtn}>
              <button
                className={styles.btnClose}
                onClick={() => {
                  setIsEditOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} className={styles.close} />
              </button>
            </div>
            <textarea
              name="editTitle"
              className={styles.editTitle}
              id="editTitle"
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
                className={styles.editDayLimit}
                id="editDayLimit"
                value={todoDayLimit || ""}
                onChange={(e) => {
                  setTodoDayLimit(e.target.value);
                }}
              />
            </div>
            <textarea
              name="editMemo"
              className={styles.editMemo}
              id="editMemo"
              value={todoMemo || ""}
              onChange={(e) => {
                setTodoMemo(e.target.value);
              }}
              placeholder="Memo"
              rows={2}
              wrap="soft"
            ></textarea>
            <div className={styles.wrapperBtnSave}>
              {/* 「保存」ボタン（タイトル、日限、メモの変更を保存） */}
              <Button
                text="保存"
                type="save"
                todoList={todoList}
                setTodoList={setTodoList}
                todoId={todoId}
                isEditOpen={isEditOpen}
                setIsEditOpen={setIsEditOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 今日やるタスクを表示する領域 */}
      <div className={styles.todaysDeadline}>
        <h2 className={styles.todaysDeadlineHeader}>今日やること</h2>
        <ul className={styles.todaysDeadlineList}>
          {todoList
            .filter((todo) => {
              const today: Date = new Date();
              const year: number = today.getFullYear();
              const month: number = today.getMonth() + 1;
              const day: number = today.getDate();
              const todayString: string = `${year
                .toString()
                .padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`;
              if (todo.completed === false && todo.dayLimit === todayString) {
                return true;
              } else {
                return false;
              }
            })
            .map((todo) => (
              <li key={todo.id}>{lineBreak(todo.title, todo.id)}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
