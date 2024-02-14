export function NoteLoader({ params }) {
  return fetch(`https://notes-api.ittools.pl/api/notes/${params.noteId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  })
}
