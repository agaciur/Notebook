import "./styles/theme.css"
import "./styles/globals.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import { NotesList } from "./components/NotesList/NotesList.jsx"
import { Note } from "./components/Note/Note.jsx"
import { Register } from "./components/Register/Register.jsx"
import { Login } from "./views/Login.jsx"
import { NotebooksLoader } from "./api/NotebooksLoader.js"
import { NotesListLoader } from "./api/NotesListLoader.js"
import { NoteLoader } from "./api/NoteLoader.js"

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    loader: NotebooksLoader,
    children: [
      {
        element: <NotesList />,
        path: "/notes/:folderId",
        loader: NotebooksLoader,
        children: [
          {
            path: "note/:noteId",
            element: <Note />,
            loader: NoteLoader,
          },
        ],
      },
    ],
  },
  {
    element: <Register />,
    path: "/rejestracja",
  },
  {
    element: <Login />,
    path: "/zaloguj",
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
