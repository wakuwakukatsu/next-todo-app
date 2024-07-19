import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFile } from "@fortawesome/free-regular-svg-icons";

export default function Todo() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTodo}>
        <input type="checkbox" className={styles.checkbox} />
        <input type="text" className={styles.textTodo} placeholder="Todo" />
      </div>
      <div className={styles.containerIcons}>
        <input type="text" className={styles.deadLine} placeholder="期限" />
        <FontAwesomeIcon icon={faCalendar} className={styles.calendar} />
        <FontAwesomeIcon icon={faFile} className={styles.memo} />
      </div>
    </div>
  );
}
