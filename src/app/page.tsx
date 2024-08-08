import Header from "@/components/layouts/header";
import TodoList from "@/components/layouts/todoList";

// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function Home() {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
}
