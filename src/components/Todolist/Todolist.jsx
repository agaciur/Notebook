import styles from "./Todolist.module.css"
import { InputWithAddButton } from "../InputWithAddButton/InputWithAddButton"
import { Reorder } from "framer-motion"
import { useState } from "react"
import { TodoItem } from "../TodoItem/TodoItem"

// const todoList = [
//   "zrobić zakupy",
//   "zjeść śniadanie",
//   "wyrzucić śmieci",
//   "zapłacić rachunki",
//   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem non ad rerum nihil. Voluptatem perspiciatis consequatur quos facere esse minima.",
// ]

export function Todolist({ todoList }) {
  const [items, setItems] = useState(todoList)
  console.log(items)
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
