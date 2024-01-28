import styles from "./Note.module.css"
import { notes } from "../../data/notes"
import { useParams } from "react-router-dom"
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs"
export function Note() {
  const { noteId } = useParams()

  return (
    <div className={styles.note}>
      {/* <Breadcrumbs /> */}
      {notes
        .filter(note => note.id === Number(noteId))
        .map(note => {
          return (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </div>
          )
        })}
    </div>
  )
}
