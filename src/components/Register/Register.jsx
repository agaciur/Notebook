import styles from "./Register.module.css"
import ERROR_ICON from "../../assets/error.svg"
import { useState } from "react"
import { correctnessOfEmail } from "../utils/functions"
export function Register() {
  const [setInfo] = useState([])
  const [error, setError] = useState(null)

  function handleSubmit(event) {
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

      <form onSubmit={handleSubmit}>
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
        {error && (
          <div className={styles.error}>
            <img src={ERROR_ICON} />
            <p>{error}</p>
          </div>
        )}
        <button>Zarejestruj</button>
      </form>
    </div>
  )
}
