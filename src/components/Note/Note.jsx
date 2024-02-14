import styles from "./Note.module.css"
import { useParams, useLoaderData } from "react-router-dom"
import { Todolist } from "../Todolist/Todolist"
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs"
export function Note() {
  const { noteId } = useParams()
  const note = useLoaderData()

  return (
    <div className={styles.note}>
      {/* <Breadcrumbs /> */}
      {Array.isArray(note.content) ? (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <Todolist todoList={note.content} />
        </div>
      ) : (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      )}

      {/* // return (
          //   <div key={note.id}>
          //     <h3>{note.title}</h3>
          //     <p>{note.body}</p>
          //   </div>
          // ) */}
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
