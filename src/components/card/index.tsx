import { useRef } from "react"
import style from "./style.module.css"

type Champion = {
  name: string
  sprite: string
}
export default function({name, sprite}: Champion) {
  const cardRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={cardRef} id="card" className={`${style.card}`}>
      <img onLoad={() => {
        cardRef.current?.classList.add(`${style.loaded}`)
        console.log(cardRef.current?.classList)
      }} className={`${style.card__image}`} src={sprite} alt={name}/>
      <div className={`${style.card__name}`}>{name}</div>
    </div>
  )
}
