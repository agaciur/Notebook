import styles from "./NotesList.module.css"
import { useState, useEffect } from "react"
import ICON_NOTE from "../../assets/note.svg"
import ADD_ICON from "../../assets/add.svg"
import { NavLink, useParams, Outlet } from "react-router-dom"
import { notes } from "../../data/notes"
import { ShortNote } from "../ShortNote/ShortNote"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
export function NotesList() {
  const [notesList, setNotesList] = useState(notes)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { folderId, noteId } = useParams()

  return (
    <>
      {isMobile ? (
        <>
          {noteId ? (
            <Outlet notes={notes} />
          ) : (
            <div className={styles.noteslist}>
              <h3>Dodaj notatkę:</h3>
              <InputWithAddButton placeholder={"Nazwa notatki"} />
              <h3>Notatki:</h3>
              <ul>
                {notesList
                  .filter(note => note.notebookId === Number(folderId))
                  .map(note => (
                    <NavLink
                      key={note.id}
                      to={`/notes/${note.notebookId}/note/${note.id}`}>
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
          <div className={styles.noteslist}>
            <h3>Dodaj notatkę:</h3>
            <InputWithAddButton placeholder={"Nazwa notatnika"} />
            <h3>Notatki:</h3>
            <ul>
              {notesList
                .filter(note => note.notebookId === Number(folderId))
                .map(note => (
                  <NavLink
                    key={note.id}
                    to={`/notes/${note.notebookId}/note/${note.id}`}>
                    {({ isActive }) => (
                      <ShortNote
                        active={isActive}
                        note={note}></ShortNote>
                    )}
                  </NavLink>
                ))}
            </ul>
          </div>
          <Outlet notes={notes} />
        </>
      )}
    </>
  )
}
