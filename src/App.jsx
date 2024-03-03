import { Logo } from "./components/Logo/Logo"
import { Layout } from "./components/Layout/Layout"
import { Notebooks } from "./components/Notebooks/Notebooks"
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs"
import { useState, useEffect, createContext } from "react"
import { FlexContainer } from "./components/FlexConteainer/FlexContainer"
import { Outlet, useParams, useNavigate, useLoaderData } from "react-router-dom"
import { MobileComponent } from "./components/MobileComponent/MobileComponent"
import { isCLickAccount } from "./hooks/IsClickAccountContext"

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [clickAccount, setClickAccount] = useState(false)

  const { folderId } = useParams()
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

  return (
    <>
      <isCLickAccount.Provider value={{ clickAccount, setClickAccount }}>
        {isMobile ? (
          <MobileComponent>
            <Logo />
            <Breadcrumbs />
            {folderId ? <Outlet /> : <Notebooks notebooks={notebooks} />}
          </MobileComponent>
        ) : (
          <Layout>
            <Logo />
            <FlexContainer>
              <Notebooks notebooks={notebooks} />
              <Outlet />
            </FlexContainer>
          </Layout>
        )}
      </isCLickAccount.Provider>
    </>
  )
}

export default App
