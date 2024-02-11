import { useState } from "react"
import styles from "./ButtonCircle.module.css"
export function ButtonCircle({ children, eventOnClick }) {
  const [showSpan, setShowSpan] = useState(false)
  const [spanStyle, setSpanStyle] = useState()
  function onClick(e) {
    e.preventDefault()

    const top = e.clientY
    const left = e.clientX

    const btnTopPosition = e.target.offsetTop
    const btnLeftPosition = e.target.offsetLeft

    const insideBtnTop = top - btnTopPosition
    const insideBtnLeft = left - btnLeftPosition
    setSpanStyle({ top: insideBtnTop + "px", left: insideBtnLeft + "px" })
    setShowSpan(true)
    setTimeout(() => {
      setShowSpan(false)
    }, 300)

    if (eventOnClick) {
      eventOnClick(e)
    }
  }
  return (
    <button
      type='submit'
      className={styles.btn}
      onClick={onClick}>
      {children}
      {showSpan && (
        <span
          style={spanStyle}
          className={styles.circle}></span>
      )}
    </button>
  )
}
