import styles from "./Notebooks.module.css"
import { Notebook } from "../Notebook/Notebook"
import ARCHIVE_ICON from "../../assets/archive.svg"
import { NavLink } from "react-router-dom"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
export function Notebooks({ notebooks }) {
  return (
    <>
      <div className={styles.notebooks}>
        <div>
          <h3>Dodaj notatnik:</h3>
          <InputWithAddButton placeholder={"nazwa natatnika"} />
          <h3>Notatniki:</h3>
          {notebooks.map(notebook => (
            <NavLink
              key={notebook.id}
              to={`/notes/${notebook.id}`}>
              {({ isActive }) => {
                return <Notebook active={isActive}>{notebook.title}</Notebook>
              }}
            </NavLink>
          ))}
        </div>
        <div className={styles.archive}>
          <button>
            <img src={ARCHIVE_ICON} />
            <p>Archiwum</p>
          </button>
        </div>
      </div>
    </>
  )
}
