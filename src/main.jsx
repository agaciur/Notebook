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
import { NoteLoader } from "./api/NoteLoader.js"
import { SearchResult } from "./components/SearchResult.jsx/SearchResult.jsx"
import { Archive } from "./components/Archive/Archive.jsx"
import { Settings } from "./components/Settings/Settings.jsx"
import { createNotebook } from "./components/InputWithAddButton/InputWithAddButton.jsx"

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    action: createNotebook,
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
      {
        element: <SearchResult />,
        path: "/wyszukaj/:termSearch?",
      },
      {
        element: <Archive />,
        path: "/archiwum",
      },
      {
        element: <Settings />,
        path: "/ustawienia",
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

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
