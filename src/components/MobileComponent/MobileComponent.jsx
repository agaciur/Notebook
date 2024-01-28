import styles from "./MobileComponent.module.css"
export function MobileComponent({ children }) {
  return <div className={styles.mobile}>{children}</div>
}
