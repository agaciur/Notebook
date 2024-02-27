import styles from "./NotesList.module.css"
import { useState, useEffect } from "react"
import ICON_NOTE from "../../assets/note.svg"
import ADD_ICON from "../../assets/add.svg"
import { NavLink, useParams, Outlet, useLoaderData } from "react-router-dom"
import { notes } from "../../data/notes"
import ARROW_TRIANGLE_ICON from "../../assets/arrow-triangle.svg"
import { ShortNote } from "../ShortNote/ShortNote"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
export function NotesList() {
  const { folderId, noteId } = useParams()
  let notes = useLoaderData()
  const [hideBar, setHideBar] = useState(false)

  const [notesList, setNotesList] = useState(() => {
    notes.filter(book => book.id === Number(folderId))
    return notes[0].notes
  }, [folderId])
  useEffect(() => {
    const note = notes.filter(book => book.id === Number(folderId))

    setNotesList(note[0].notes)
  }, [folderId])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {isMobile ? (
        <>
          {noteId ? (
            <Outlet />
          ) : (
            <div className={styles.noteslist}>
              <h3>Dodaj notatkę:</h3>
              <InputWithAddButton placeholder={"Nazwa notatki"} />
              <h3>Notatki:</h3>
              <ul>
                {notesList.map(note => (
                  <NavLink
                    key={note.id}
                    to={`/notes/${folderId}/note/${note.id}`}>
                    {({ isActive }) => (
                      <ShortNote
                        active={isActive}
                        note={note}></ShortNote>
                    )}
                  </NavLink>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          {hideBar ? (
            <>
              <div className={styles.hideBar}>
                <button
                  className={styles.buttonArray}
                  onClick={() => setHideBar(false)}>
                  <img src={ARROW_TRIANGLE_ICON} />
                </button>
                <p>Notatki</p>
              </div>
              <Outlet />
            </>
          ) : (
            <>
              <div className={styles.noteslist}>
                <div className={styles.arrowIcon}>
                  <button
                    onClick={() => setHideBar(true)}
                    className={styles.buttonArray}>
                    <img src={ARROW_TRIANGLE_ICON} />
                  </button>
                </div>
                <h3>Dodaj notatkę:</h3>
                <InputWithAddButton placeholder={"Nazwa notatki"} />
                <h3>Notatki:</h3>
                <ul>
                  {notesList.map(note => (
                    <NavLink
                      key={note.id}
                      to={`/notes/${folderId}/note/${note.id}`}>
                      {({ isActive }) => (
                        <ShortNote
                          active={isActive}
                          note={note}></ShortNote>
                      )}
                    </NavLink>
                  ))}
                </ul>
              </div>
              <Outlet />
            </>
          )}
        </>
      )}
    </>
  )
}
