import styles from "./Breadcrumbs.module.css"
import ARROW_ICON from "../../assets/arrow.svg"
import { useParams, NavLink } from "react-router-dom"
import { notes } from "../../data/notes"
import { listnotebooks } from "../../data/listnotebooks"
export function Breadcrumbs() {
  const { folderId, noteId } = useParams()
  const breadcrumbs = [
    {
      name: "Notatniki",
      path: "/",
    },
  ]
  if (folderId) {
    const note = listnotebooks.filter(note => note.id === Number(folderId))
    breadcrumbs.push({
      name: note[0].title,
      path: `/notes/${folderId}`,
    })
  }
  if (noteId) {
    const note = notes.filter(note => note.folderId === Number(folderId) || note.id === Number(noteId))
    breadcrumbs.push({
      name: note[0].title,
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
