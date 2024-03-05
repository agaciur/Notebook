import styles from "./Logo.module.css"
import PEN_ICON from "../../assets/pen.svg"
import ACCOUNT_ICON from "../../assets/account.svg"
import SETTING_ICON from "../../assets/settings.svg"
import LOGOUT_ICON from "../../assets/log-out.svg"
import SEARCH_ICON from "../../assets/search.svg"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useState, useRef, useEffect, useContext } from "react"
import { isCLickAccount } from "../../hooks/IsClickAccountContext"

export function Logo() {
  const { clickAccount, setClickAccount } = useContext(isCLickAccount)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const buttonRef = useRef(null)
  const ulRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    window.location.href = "/zaloguj"
  }

  const handleClick = () => {
    setClickAccount(!clickAccount)
  }

  const handleClickOutside = event => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      ulRef.current &&
      !ulRef.current.contains(event.target)
    ) {
      setClickAccount(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.logo}>
      <div>
        <img src={PEN_ICON} />
        <h1>Notes</h1>
      </div>

      <div className={styles.topIcon}>
        <div className={styles.searchBox}>
          {showSearchInput && (
            <input
              type='text'
              placeholder='Czego szukasz?'
            />
          )}

          <motion.button onClick={() => setShowSearchInput(!showSearchInput)}>
            <img src={SEARCH_ICON} />
          </motion.button>
        </div>

        <div>
          <motion.button
            ref={buttonRef}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}>
            <img
              className={styles.logout}
              src={ACCOUNT_ICON}
            />
          </motion.button>

          {clickAccount && (
            <ul
              className={styles.account}
              ref={ulRef}>
              <li>
                <Link>
                  <img src={SETTING_ICON} />
                  <span>Ustawienia</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <img src={LOGOUT_ICON} />
                  <span>Wyloguj</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
