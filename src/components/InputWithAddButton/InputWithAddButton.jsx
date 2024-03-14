import ADD_ICON from "../../assets/add.svg"
import styles from "./InputWithAddButton.module.css"
import { motion } from "framer-motion"
import { Form, redirect } from "react-router-dom"

export async function createNotebook(args) {
  const data = await args.request.formData()
  const notebookName = data.get("notebook-name")
  return fetch("https://notes-api.ittools.pl/api/notebooks", {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
    method: "POST",
    body: JSON.stringify({
      title: notebookName,
    }),
  })
    .then(res => res.json())
    .then(newFolder => {
      return redirect(`/notes/${newFolder.id}`)
    })
}

export function InputWithAddButton({ placeholder }) {
  return (
    <Form
      className={styles.addInput}
      method='POST'
      action='/'>
      <input
        type='text'
        placeholder={placeholder}
        name='notebook-name'
      />
      <motion.button
        type='submit'
        whileTap={{ scale: 0.9 }}>
        <img src={ADD_ICON} />
      </motion.button>
    </Form>
  )
}
