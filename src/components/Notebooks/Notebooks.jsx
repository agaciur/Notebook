import styles from "./Notebooks.module.css"
import { Notebook } from "../Notebook/Notebook"
import { NavLink } from "react-router-dom"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
export function Notebooks({ listNotebooks }) {
  return (
    <>
      <div className={styles.notebooks}>
        <h3>Dodaj notatnik:</h3>
        <InputWithAddButton />
        <h3>Notatniki:</h3>
        {listNotebooks.map(notebook => (
          <NavLink
            key={notebook.id}
            to={`/notes/${notebook.id}`}>
            {({ isActive }) => {
              return <Notebook active={isActive}>{notebook.title}</Notebook>
            }}
          </NavLink>
        ))}
      </div>
    </>
  )
}
