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
  setIsBtnDisplayed?: Dispatch<SetStateAction<boolean>>;
  isCompDisplayed?: boolean;
  setIsCompDisplayed?: Dispatch<SetStateAction<boolean>>;
};

// ボタンコンポーネント
export default function Button({
  text,
  type,
  todoList,
  setTodoList,
  todoId,
  isEditOpen,
  setIsBtnDisplayed,
  isCompDisplayed,
  setIsCompDisplayed,
}: Button) {
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
            function update() {
              console.log("");
            }
            if (isEditOpen) {
              console.log("isEditOpenがtrueの時の処理");
            } else {
              const todoTitle = document.getElementById(
                `todoTitleId${todoId}`
              ) as HTMLTextAreaElement;
              const todoTitleString: string = todoTitle.value;
              let updateTodo: Todo = {
                id: 0,
                title: todoTitleString,
                dayLimit: "",
                memo: "",
                completed: false,
              };
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${todoId}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    updateType: "saveTitle",
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
              // チェックマークを外す処理をここに書く！
              if (setIsBtnDisplayed) {
                setIsBtnDisplayed(false);
              }
            }
          }}
        >
          {text}
        </button>
      );
    // 「完了」ボタン
    case "comp":
      return (
        <button
          className={styles.btnComp}
          type="button"
          onClick={async () => {
            if (isCompDisplayed !== undefined) {
              let updateTodo: Todo = {
                id: 0,
                title: "",
                dayLimit: "",
                memo: "",
                completed: isCompDisplayed,
              };
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${todoId}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    updateType: "changeComp",
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
              if (setIsBtnDisplayed) {
                setIsBtnDisplayed(false);
              }
            }
          }}
        >
          {text}
        </button>
      );
    // 「完了タスクを表示」ボタン
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
