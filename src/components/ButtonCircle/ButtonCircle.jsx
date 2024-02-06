import { useState } from "react"
import styles from "./ButtonCircle.module.css"
export function ButtonCircle({ children, onClick }) {
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
  }
  return (
    <button
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
/*
const btn = document.querySelector('.btn')

const btnAnimation = e => {
    const top = e.clientY
    const left = e.clientX
    // pozycja, w którą klikamy

    const btnTopPosition = e.target.offsetTop
    const btnLeftPosition = e.target.offsetLeft
    // pozycja przycisku

    const insideBtnTop = top - btnTopPosition
    const insideBtnLeft = left - btnLeftPosition

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = insideBtnTop + 'px'
    circle.style.left = insideBtnLeft + 'px'

    e.target.appendChild(circle)

    setTimeout(() => {
        circle.remove()
    }, 300);
}

btn.addEventListener('click', btnAnimation)
*/
