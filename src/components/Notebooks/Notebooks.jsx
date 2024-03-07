import styles from "./Notebooks.module.css"
import { Notebook } from "../Notebook/Notebook"
import ARCHIVE_ICON from "../../assets/archive.svg"
import ARROW_TRIANGLE_ICON from "../../assets/arrow-triangle.svg"
import { NavLink, Link } from "react-router-dom"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
import { useState } from "react"
export function Notebooks({ notebooks }) {
  const [hideBar, setHideBar] = useState(false)

  return (
    <>
      {hideBar ? (
        <div className={styles.hideBar}>
          <button
            className={styles.buttonArray}
            onClick={() => setHideBar(false)}>
            <img src={ARROW_TRIANGLE_ICON} />
          </button>
          <p>Notatniki</p>
        </div>
      ) : (
        <div className={styles.notebooks}>
          <div>
            <div className={styles.arrowIcon}>
              <button
                onClick={() => setHideBar(true)}
                className={styles.buttonArray}>
                <img src={ARROW_TRIANGLE_ICON} />
              </button>
            </div>

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
            <NavLink to={"/archiwum"}>
              <img src={ARCHIVE_ICON} />
              Archiwum
            </NavLink>
          </div>
        </div>
      )}
    </>
  )
}
