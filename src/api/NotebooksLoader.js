export function NotebooksLoader() {
  return fetch(`https://notes-api.ittools.pl/api/notebooks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  })
}
