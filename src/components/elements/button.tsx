import styles from "./button.module.css";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "@prisma/client";

// Buttonコンポーネントの引数のデータ型
type Button = {
  text: string;
  type: "add" | "save" | "comp" | "dispComp";
  todoList?: Todo[];
  setTodoList?: Dispatch<SetStateAction<Todo[]>>;
  todoId?: number | null;
  isEditOpen?: boolean;
  setIsEditOpen?: Dispatch<SetStateAction<boolean>>;
  setIsBtnDisplayed?: Dispatch<SetStateAction<boolean>>;
  isCompDisplayed?: boolean;
  setIsCompDisplayed?: Dispatch<SetStateAction<boolean>>;
};

// Buttonコンポーネント
export default function Button({
  text,
  type,
  todoList,
  setTodoList,
  todoId,
  isEditOpen,
  setIsEditOpen,
  setIsBtnDisplayed,
  isCompDisplayed,
  setIsCompDisplayed,
}: Button) {
  // ToDoの変更を保存する関数
  async function update(updateType: string, updateTodo: Todo): Promise<Todo> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todo/${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateType: updateType,
          updateTodo: updateTodo,
        }),
      }
    );
    updateTodo = await response.json();
    if (setTodoList !== undefined && todoList !== undefined) {
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === updateTodo.id) {
            return updateTodo;
          } else {
            return todo;
          }
        })
      );
    }
    return updateTodo;
  }

  switch (type) {
    //「追加」ボタン
    case "add":
      return (
        <button
          className={styles.btnAdd}
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            const addTodo = document.getElementById(
              "addTodo"
            ) as HTMLTextAreaElement;
            if (!addTodo.value) {
              alert("ToDoを入力してください！");
              return;
            }
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/todo`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: addTodo.value }),
              }
            );
            const newTodo: Todo = await response.json();
            if (setTodoList !== undefined && todoList !== undefined) {
              setTodoList([...todoList, newTodo]);
            }
            addTodo.value = "";
          }}
        >
          {text}
        </button>
      );

    // 「保存」ボタン
    case "save":
      return (
        <button
          className={styles.btnSave}
          type="button"
          onClick={async () => {
            // 編集画面が表示されている時の処理（ToDoを更新）
            if (isEditOpen) {
              const editTitle = document.getElementById(
                "editTitle"
              ) as HTMLTextAreaElement;
              const editTitleString: string = editTitle.value;
              const editDayLimit = document.getElementById(
                "editDayLimit"
              ) as HTMLInputElement;
              const editDayLimitString: string = editDayLimit.value;
              const editMemo = document.getElementById(
                "editMemo"
              ) as HTMLTextAreaElement;
              const editMemoString: string = editMemo.value;
              let updateTodo: Todo = {
                id: 0,
                title: editTitleString,
                dayLimit: editDayLimitString,
                memo: editMemoString,
                completed: false,
                completedAt: null,
              };
              updateTodo = await update("saveTodo", updateTodo);
              const todoTitle = document.getElementById(
                `todoTitleId${todoId}`
              ) as HTMLTextAreaElement;
              todoTitle.value = updateTodo.title;
              if (setIsEditOpen !== undefined) {
                setIsEditOpen(false);
              }
              // 編集画面が表示されていない時の処理（タイトルのみ更新）
            } else {
              const todoTitle = document.getElementById(
                `todoTitleId${todoId}`
              ) as HTMLTextAreaElement;
              const titleString: string = todoTitle.value;
              const updateTodo: Todo = {
                id: 0,
                title: titleString,
                dayLimit: "",
                memo: "",
                completed: false,
                completedAt: null,
              };
              await update("saveTitle", updateTodo);
              const checkTodo = document.getElementById(
                `checkTodo${todoId}`
              ) as HTMLInputElement;
              checkTodo.checked = false;
              if (setIsBtnDisplayed) {
                setIsBtnDisplayed(false);
              }
            }
          }}
        >
          {text}
        </button>
      );

    // 「完了」・「戻す」ボタン
    case "comp":
      return (
        <button
          className={styles.btnComp}
          type="button"
          onClick={async () => {
            const updateTodo: Todo = {
              id: 0,
              title: "",
              dayLimit: "",
              memo: "",
              completed: false,
              completedAt: null,
            };
            // 「戻す」ボタンを押した時の処理
            if (isCompDisplayed) {
              await update("incomplete", updateTodo);
              // 「完了」ボタンを押した時の処理
            } else {
              await update("complete", updateTodo);
            }
            if (setIsBtnDisplayed) {
              setIsBtnDisplayed(false);
            }
          }}
        >
          {text}
        </button>
      );

    // 「完了タスクを表示」ボタン・「ToDoリストを表示」ボタン
    case "dispComp":
      return (
        <button
          className={styles.btnDispComp}
          type="button"
          onClick={() => {
            if (setIsBtnDisplayed) {
              setIsBtnDisplayed(false);
            }
            if (setIsCompDisplayed) {
              setIsCompDisplayed((prev) => !prev);
            }
          }}
        >
          {text}
        </button>
      );
  }
}
