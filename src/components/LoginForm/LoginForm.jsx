import styles from "./LoginForm.module.css"
import { ButtonCircle } from "../ButtonCircle/ButtonCircle"
import PEN_ICON from "../../assets/pen.svg"
import ERROR_ICON from "../../assets/error.svg"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export function LoginForm() {
  const [email, setEmail] = useState(process.env.NODE_ENV === "development" ? "root@root.pl" : "")

  const [password, setPassword] = useState(process.env.NODE_ENV === "development" ? "root" : "")

  const [error, setError] = useState(null)

  let navigate = useNavigate()

  const handleSubmit = async function (event) {
    event.preventDefault()
    await fetch("https://notes-api.ittools.pl/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => postLoginProcess(data))
      .catch(error => setError(error.message))
  }

  function postLoginProcess(data) {
    if (data.token) {
      localStorage.setItem("jwtToken", data.token)
      navigate("/")
    } else {
      throw new Error("Nieprawidłowe dane logowania.")
    }
  }

  return (
    <div className={styles.login}>
      <h1>Zaloguj się, aby tworzyć własne notatki:</h1>
      <motion.img
        className={styles.pen}
        src={PEN_ICON}
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
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Hasło:</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <ButtonCircle eventOnClick={handleSubmit}>Zaloguj się</ButtonCircle>

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
