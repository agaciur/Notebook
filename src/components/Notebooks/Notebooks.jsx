import styles from "./Notebooks.module.css"
import { Notebook } from "../Notebook/Notebook"
import ADD_ICON from "../../assets/add.svg"
import { NavLink, Outlet } from "react-router-dom"
export function Notebooks({ listNotebooks }) {
  return (
    <>
      <div className={styles.notebooks}>
        <h3>Dodaj notatnik:</h3>
        <div>
          <input type='text' />
          <button>
            <img src={ADD_ICON} />
          </button>
        </div>
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
