import styles from "./page.module.css";
import Header from "../../components/layouts/header";
import Todos from "../../components/layouts/todos";

// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function Home() {
  return (
    <>
      <Header />
      <Todos />
    </>
  );
}
