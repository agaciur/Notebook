import styles from "./Note.module.css"
import { notes } from "../../data/notes"
import { useParams } from "react-router-dom"
import { Todolist } from "../Todolist/Todolist"
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs"
export function Note() {
  const { noteId } = useParams()

  return (
    <div className={styles.note}>
      {/* <Breadcrumbs /> */}
      {notes
        .filter(note => note.id === Number(noteId))
        .map(note => {
          if (Array.isArray(note.body)) {
            return (
              <div key={note.id}>
                <h3>{note.title}</h3>
                <Todolist todoList={note.body} />
              </div>
            )
          } else {
            return (
              <div key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            )
          }

          // return (
          //   <div key={note.id}>
          //     <h3>{note.title}</h3>
          //     <p>{note.body}</p>
          //   </div>
          // )
        })}
    </div>
  )
}

// if (Array.isArray(arr)) {
//   return <Todolist />
// } else {
//   return (
//     <div key={note.id}>
//       <h3>{note.title}</h3>
//       <p>{note.body}</p>
//     </div>
//   )
// }
