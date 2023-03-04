import styles from "@/styles/Sprite.module.css"
export default function() {
  return (
    <div className={styles.sprite}>
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="aatrox"/>
      <p className={styles.sprite__name}>Aatrox</p>
    </div>
  )
}
