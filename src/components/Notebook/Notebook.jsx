import styles from "./Notebook.module.css"
import NOTEBOOK from "../../assets/notebook.svg"
export function Notebook({ children, active }) {
  return (
    <div
      className={`${styles.folder} ${active ? styles.active : ""}`}
      role='listitem'>
      <img src={NOTEBOOK} />
      {children}
    </div>
  )
}
