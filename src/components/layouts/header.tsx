import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.containerHeader}>
        <h1>ToDoアプリ</h1>
      </div>
    </header>
  );
}
