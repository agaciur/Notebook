import styles from "./Todolist.module.css"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
import { Reorder } from "framer-motion"
import { useState } from "react"
import { TodoItem } from "../TodoItem/TodoItem"

export function Todolist({ todoList }) {
  const [items, setItems] = useState(todoList)
  return (
    <div className={styles.todolist}>
      <InputWithAddButton placeholder={"Dodaj zadanie"} />
      <Reorder.Group
        axis='y'
        onReorder={setItems}
        values={items}>
        {items.map(item => (
          <TodoItem
            key={item}
            item={item}
          />
        ))}
      </Reorder.Group>
    </div>
  )
}
