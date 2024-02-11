import styles from "./Register.module.css"
import ERROR_ICON from "../../assets/error.svg"
import { useState } from "react"
import { correctnessOfEmail } from "../utils/functions"
import { ButtonCircle } from "../ButtonCircle/ButtonCircle"
import PEN_ICON from "../../assets/pen.svg"
import { motion } from "framer-motion"

export function Register() {
  const [setInfo] = useState([])
  const [error, setError] = useState(null)
  const handleSubmit = function (event) {
    event.preventDefault()
    const email = event.target[0].value
    if (email.match(correctnessOfEmail) == null) {
      setError("Adres email nie jest poprawny!")
    } else {
      if (event.target[1].value === event.target[2].value) {
        setInfo(prevInfo => [
          ...prevInfo,
          {
            email: email,
            password: event.target[1].value,
          },
        ])
      } else {
        setError("Hasło nie jest identyczne!")
      }
    }
  }

  function checkPassword(event) {
    const password = event.target.value
    console.log(password)
    if (password.length < 8) {
      setError("Hasło musi mieć przynajmniej 8 znaków!")
    } else {
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        if (password.match(/\d/)) {
          if (password.match(/[^a-zA-Z\d]/)) {
            setError(null)
          } else {
            setError("Hasło musi posiadać znak specjalny!")
          }
        } else {
          setError("Hasło musi posiadać cyfrę!")
        }
      } else {
        setError("Hasło musi posiadać duże i małe litery!")
      }
    }
  }

  return (
    <div className={styles.register}>
      <h1>Zarejestruj się, aby tworzyć własne notatki:</h1>
      <motion.img
        src={PEN_ICON}
        className={styles.pen}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      />

      <form>
        <label htmlFor='text'>Adres email:</label>
        <input type='email' />
        <label htmlFor='password'>Hasło:</label>
        <input
          type='password'
          id='password'
          onChange={checkPassword}
        />
        <label htmlFor='password'>Powtórz hasło:</label>
        <input
          type='password'
          id='password2'
        />
        <ButtonCircle eventOnClick={handleSubmit}>Zarejestruj</ButtonCircle>
        {error && (
          <div className={styles.error}>
            <img src={ERROR_ICON} />
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  )
}
