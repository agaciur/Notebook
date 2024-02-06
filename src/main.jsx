import "./styles/theme.css"
import "./styles/globals.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import { NotesList } from "./components/NotesList/NotesList.jsx"
import { Note } from "./components/Note/Note.jsx"
import { Register } from "./components/Register/Register.jsx"
import { Todolist } from "./components/Todolist/Todolist.jsx"

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <NotesList />,
        path: "/notes/:folderId",
        children: [
          {
            path: "note/:noteId",
            element: <Note />,
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
    element: <Todolist />,
    path: "/todolist",
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
