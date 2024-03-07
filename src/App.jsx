import { Logo } from "./components/Logo/Logo"
import { Layout } from "./components/Layout/Layout"
import { Notebooks } from "./components/Notebooks/Notebooks"
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs"
import { useState, useEffect, createContext } from "react"
import { FlexContainer } from "./components/FlexConteainer/FlexContainer"
import { Outlet, useParams, useNavigate, useLoaderData } from "react-router-dom"
import { MobileComponent } from "./components/MobileComponent/MobileComponent"
import { isCLickAccount } from "./hooks/IsClickAccountContext"
import { SearchResult } from "./components/SearchResult.jsx/SearchResult"

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [clickAccount, setClickAccount] = useState(false)
  const [term, setTerm] = useState("")
  const [searchNotebooks, setSearchNotebooks] = useState([])
  const [searchNotes, setSearchNotes] = useState([])

  const { folderId, termSearch } = useParams()
  const notebooks = useLoaderData()
  let navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("jwtToken") === null || notebooks.code === 401) {
      navigate("/zaloguj")
    }
  }, [localStorage.getItem("jwtToken"), notebooks.code])

  const searchResult = function () {
    setSearchNotebooks([])
    setSearchNotes([])
    navigate(`/wyszukaj/${term}`)

    notebooks.forEach(object => {
      if (object.title.toLowerCase().includes(term.toLowerCase())) {
        setSearchNotebooks(prevSearchNotebooks => [...prevSearchNotebooks, object])
      }
      object.notes.forEach(note => {
        if (note.title.toLowerCase().includes(term.toLowerCase())) {
          setSearchNotes(prevSearchNotes => [
            ...prevSearchNotes,
            { note: note.title, folderId: object.id, noteId: note.id },
          ])
        }
      })
    })
  }

  return (
    <>
      <isCLickAccount.Provider value={{ clickAccount, setClickAccount }}>
        {isMobile ? (
          <MobileComponent>
            <Logo
              term={term}
              setTerm={setTerm}
              searchResult={searchResult}
            />
            {termSearch ? (
              <SearchResult
                searchNotebooks={searchNotebooks}
                searchNotes={searchNotes}
                term={term}
              />
            ) : (
              <>
                <Breadcrumbs />
                {folderId ? <Outlet /> : <Notebooks notebooks={notebooks} />}
              </>
            )}
          </MobileComponent>
        ) : (
          <Layout>
            <Logo
              term={term}
              setTerm={setTerm}
              searchResult={searchResult}
            />
            {termSearch ? (
              <SearchResult
                searchNotebooks={searchNotebooks}
                term={term}
                searchNotes={searchNotes}
              />
            ) : (
              <FlexContainer>
                <Notebooks notebooks={notebooks} />
                <Outlet />
              </FlexContainer>
            )}
          </Layout>
        )}
      </isCLickAccount.Provider>
    </>
  )
}

export default App
