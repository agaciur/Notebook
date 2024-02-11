import { Logo } from "./components/Logo/Logo"
import { Layout } from "./components/Layout/Layout"
import { Notebooks } from "./components/Notebooks/Notebooks"
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs"
import { useState, useEffect } from "react"
import { FlexContainer } from "./components/FlexConteainer/FlexContainer"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { MobileComponent } from "./components/MobileComponent/MobileComponent"
import { listnotebooks } from "./data/listnotebooks"
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const { folderId } = useParams()
  let navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("jwtToken") === null) {
      navigate("/zaloguj")
    }
  }, [localStorage.getItem("jwtToken")])

  return (
    <>
      {isMobile ? (
        <MobileComponent>
          <Logo />
          <Breadcrumbs />
          {folderId ? <Outlet /> : <Notebooks listNotebooks={listnotebooks} />}
        </MobileComponent>
      ) : (
        <Layout>
          <Logo />
          <FlexContainer>
            <Notebooks listNotebooks={listnotebooks} />
            <Outlet />
          </FlexContainer>
        </Layout>
      )}
    </>
  )
}

export default App
