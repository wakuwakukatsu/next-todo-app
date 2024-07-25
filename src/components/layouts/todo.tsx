"use client";

import styles from "./todo.module.css";
import { getUniqueStr } from "@/utility/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFile } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

type Todo = {
  id: number;
  title: string;
  dayLimit: string;
  memo: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
  setTodoTitle: Dispatch<SetStateAction<string | null>>;
  setTodoDayLimit: Dispatch<SetStateAction<string | null>>;
  setTodoMemo: Dispatch<SetStateAction<string | null>>;
  toggleInfo: () => void;
};

export default function Todo({
  todos,
  setTodoTitle,
  setTodoDayLimit,
  setTodoMemo,
  toggleInfo,
}: Props) {
  const [uniqueStr1, setUniqueStr1] = useState("1");
  const [uniqueStr2, setUniqueStr2] = useState("2");

  useEffect(() => {
    setUniqueStr1(getUniqueStr());
    setUniqueStr2(getUniqueStr());
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.container} id={`${uniqueStr1}`}>
          <div className={styles.containerTodo}>
            <input type="checkbox" className={styles.checkbox} />
            <textarea
              className={styles.textTodo}
              placeholder="Todo"
              defaultValue={todo.title}
              rows={2}
              wrap="soft"
              id={uniqueStr2}
              onInput={() => {
                const container = document.getElementById(`${uniqueStr1}`);
                const ta = document.getElementById(`${uniqueStr2}`);
                const sh = ta?.scrollHeight;
                if (container !== null) {
                  container.style.height = sh + "px";
                }
              }}
            />
          </div>
          <div className={styles.containerIcons}>
            <input type="text" className={styles.deadLine} placeholder="期限" />
            <FontAwesomeIcon icon={faCalendar} className={styles.calendar} />
            <FontAwesomeIcon icon={faFile} className={styles.memo} />
            <button
              className={styles.btnInfo}
              onClick={() => {
                setTodoTitle(todo.title);
                setTodoDayLimit(todo.dayLimit);
                setTodoMemo(todo.memo);
                toggleInfo();
              }}
            >
              <FontAwesomeIcon icon={faBars} className={styles.menu} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
