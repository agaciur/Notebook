import styles from "./Register.module.css"
import ERROR_ICON from "../../assets/error.svg"
import { useState } from "react"
import { correctnessOfEmail } from "../utils/functions"
import { ButtonCircle } from "../ButtonCircle/ButtonCircle"
import PEN_ICON from "../../assets/pen.svg"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export function Register() {
  const [emailRegister, setEmailRegister] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const [error, setError] = useState(null)
  let navigate = useNavigate()

  const handleSubmit = function (event) {
    event.preventDefault()

    if (emailRegister.match(correctnessOfEmail) == null) {
      setError("Adres email nie jest poprawny!")
    } else {
      if (password1 === password2) {
        handleSubmitRegistration(event)
      } else {
        setError("Hasło nie jest identyczne!")
      }
    }
  }

  function checkPassword(event) {
    const password = event.target.value

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
    setPassword1(password)
  }

  const handleSubmitRegistration = async function (event) {
    await fetch("https://notes-api.ittools.pl/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailRegister,
        password: password1,
      }),
    })
      .then(response => response.json())
      .then(data => postRegisterProcess(data))
      .catch(error => setError(error.message))
  }

  function postRegisterProcess(data) {
    if (data.token) {
      localStorage.setItem("jwtToken", data.token)
      navigate("/")
    } else {
      setError("Nieprawidłowe dane rejestracji")
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
        <input
          type='email'
          value={emailRegister}
          onChange={e => setEmailRegister(e.target.value)}
        />
        <label htmlFor='password'>Hasło:</label>
        <input
          type='password'
          id='password'
          value={password1}
          onChange={checkPassword}
        />
        <label htmlFor='password'>Powtórz hasło:</label>
        <input
          type='password'
          value={password2}
          id='password2'
          onChange={e => setPassword2(e.target.value)}
        />
        <ButtonCircle eventOnClick={handleSubmit}>Zarejestruj</ButtonCircle>
        <Link to={"/zaloguj"}>Powrót do logowania</Link>
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
