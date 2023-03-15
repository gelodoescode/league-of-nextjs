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
          <div key={name} className={`${style.grid__item}`}>
            <img draggable={false} src={sprite} className={`${style.item__image}`} alt={name}/>
          </div>
        )
      })
    }</div>
  )
}
