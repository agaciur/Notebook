import styles from "./Button.module.css"
import { motion } from "framer-motion"

export function Button({ children, onClick }) {
  return (
    <div className={styles.button}>
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}>
        {children}
      </motion.button>
    </div>
  )
}
