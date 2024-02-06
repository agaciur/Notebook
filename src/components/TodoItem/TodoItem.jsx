import styles from "./TodoItem.module.css"
import { useMotionValue, Reorder, motion } from "framer-motion"

import EDIT_ICON from "../../assets/edit.svg"
import { useRaisedShadow } from "../useRaisedShadow/useRaisedShadow"
import REMOVE_ICON from "../../assets/remove.svg"
import DONE_ICON from "../../assets/done.svg"
export function TodoItem({ item }) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)

  return (
    <Reorder.Item
      className={styles.todoIcon}
      value={item}
      id={item}
      style={{ boxShadow, y }}>
      <span>{item}</span>
      <div>
        <motion.button whileTap={{ scale: 1.2 }}>
          <img src={EDIT_ICON} />
        </motion.button>
        <motion.button whileTap={{ scale: 1.2 }}>
          <img src={DONE_ICON} />
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }}>
          <img src={REMOVE_ICON} />
        </motion.button>
      </div>
    </Reorder.Item>
  )
}
