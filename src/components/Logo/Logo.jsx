import styles from "./Logo.module.css"
import PEN_ICON from "../../assets/pen.svg"
import LOGOUT_ICON from "../../assets/log-out.svg"
import ACCOUNT_ICON from "../../assets/account.svg"
export function Logo() {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
  }

  return (
    <div className={styles.logo}>
      <div>
        <img src={PEN_ICON} />
        <h1>Notes</h1>
      </div>
      <div>
        <div>
          <img
            className={styles.logout}
            src={ACCOUNT_ICON}
          />
        </div>
      </div>
    </div>
  )
}
