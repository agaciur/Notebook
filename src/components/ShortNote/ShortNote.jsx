import NOTE_ICON from "../../assets/note.svg"
import styles from "./ShortNote.module.css"

export function ShortNote({ note, active }) {
  return (
    <div className={[styles["noteslist"], active ? styles.active : ""].join(" ")}>
      <img src={NOTE_ICON} />
      <p className={styles.title}>{note.title}</p>
    </div>
  )
}
