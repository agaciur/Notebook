import styles from "./Logo.module.css"
import PEN_ICON from "../../assets/pen.svg"
export function Logo() {
  return (
    <div className={styles.logo}>
      <img src={PEN_ICON} />
      <h1>Notes</h1>
    </div>
  )
}
