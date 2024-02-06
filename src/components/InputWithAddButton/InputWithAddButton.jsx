import ADD_ICON from "../../assets/add.svg"
import styles from "./InputWithAddButton.module.css"
import { motion } from "framer-motion"
export function InputWithAddButton({ placeholder }) {
  return (
    <div className={styles.addInput}>
      <input
        type='text'
        placeholder={placeholder}
      />
      <motion.button whileTap={{ scale: 0.9 }}>
        <img src={ADD_ICON} />
      </motion.button>
    </div>
  )
}
