import Card from "../card"
import style from "./style.module.css"

type Champion = {
  name: string,
  sprite: string
}

type Champions = {
  champions: Array<Champion>
}

export default function({champions}: Champions) {
  return (
    <div className={`${style.grid}`}>{
      champions.map(({name, sprite}) => {
        return (
          <a key={name} href={`/champion/${name}`}>
            <Card name={name} sprite={sprite} />
          </a>
        )
      })
    }</div>
  )
}
