export function NotesListLoader() {
  return fetch(`https://notes-api.ittools.pl/api/notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  })
}
