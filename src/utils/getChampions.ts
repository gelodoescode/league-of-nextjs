type Champion = {
  name: string
  sprite: string
}

type Champions = Array<Champion>

export default async function(): Promise<Champions> {
  const response = await fetch("http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion.json")
  const { data } = await response.json()
  const champions: Array<string> = Object.keys(data)
  return champions.map((champion: string) => {
    return {
      name: champion,
      sprite: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`
    }
  })
}
