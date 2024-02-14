import styles from "./Breadcrumbs.module.css"
import ARROW_ICON from "../../assets/arrow.svg"
import { useParams, NavLink, useLoaderData } from "react-router-dom"
export function Breadcrumbs() {
  const { folderId, noteId } = useParams()
  const breadcrumbs = [
    {
      name: "Notatniki",
      path: "/",
    },
  ]
  if (folderId) {
    const folder = useLoaderData()
    const note = folder.filter(note => note.id === Number(folderId))
    breadcrumbs.push({
      name: note[0].title,
      path: `/notes/${folderId}`,
    })
  }
  if (noteId) {
    const notes = useLoaderData()
    const folder = notes.filter(note => note.id === Number(folderId))

    const listNote = folder[0].notes
    const thisNote = listNote.filter(note => note.id === Number(noteId))
    breadcrumbs.push({
      name: thisNote[0].title,
      path: `/notes/${folderId}/note/${noteId}`,
    })
  }

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map(breadcrumb => {
        return (
          <li key={breadcrumb.path}>
            <NavLink
              end
              to={breadcrumb.path}>
              {breadcrumb.name}
            </NavLink>
            <img src={ARROW_ICON} />
          </li>
        )
      })}
    </div>
  )
}
