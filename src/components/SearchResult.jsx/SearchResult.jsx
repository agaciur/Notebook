import styles from "./SearchResult.module.css"
import ICON_NOTE from "../../assets/note.svg"
import NOTEBOOK from "../../assets/notebook.svg"
import { Link } from "react-router-dom"

export function SearchResult({ searchNotebooks, searchNotes, term }) {
  return (
    <div className={styles.resultInfo}>
      <h4>Wyszukane notesy:</h4>
      {searchNotebooks && searchNotebooks.length > 0 ? (
        searchNotebooks.map(notebook => (
          <Link
            key={notebook.id}
            to={`/notes/${notebook.id}`}>
            <img src={NOTEBOOK} />
            {notebook.title}
          </Link>
        ))
      ) : (
        <p>Brak notesów: "{term}" </p>
      )}
      <h4>Wyszukane notatki:</h4>

      {searchNotes && searchNotes.length > 0 ? (
        searchNotes.map(note => (
          <Link
            key={`${note.folderId}-${note.noteId}`}
            to={`/notes/${note.folderId}/note/${note.noteId}`}>
            <img src={ICON_NOTE} />
            {note.note}
          </Link>
        ))
      ) : (
        <p>Brak notatek: "{term}"</p>
      )}
    </div>
  )
}
