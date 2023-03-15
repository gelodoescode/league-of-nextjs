import { NextApiRequest, NextApiResponse } from "next";

type Champion = {
  name: string
  lore: string
  title: string
  sprite: string
  role: Array<string>
  skins: {
    name: string
    sprite: string
  }[]
  difficulty: number
  skills: {
    key: "Q" | "W" | "E" | "R"
    name: string
    description: string
    cooldown: Array<number>
    sprite: string
    video: {
      poster: string
      source: {
        mp4: string
        webm: string
      }
    }
  }[]
}

function getVideoKey(key: number) {
  if (key >= 100) {
    return `0${key}`
  }

  else if (key >= 10) {
    return `00${key}`
  }

  else if (key >= 0) {
    return `000${key}`
  }
}

function getSkillKey(index: number) {
  switch (index) {
    case 0:
      return "Q"
    case 1:
    return "W"
    case 2:
    return "E"
    case 3:
    return "R"
  }
}

//const poster = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0111/ability_0111_Q1.jpg`
//const video = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0001/ability_0001_W1.webm`

async function getChampion(name: string) {
  const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion/${name}.json`)
  const { data } = await response.json()
  const [champ] = Object.keys(data);
  const champion: Champion = {
    name: champ,
    lore: data[champ].lore,
    title: data[champ].title,
    role: data[champ].tags,
    sprite:`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`,
    skins: data[champ].skins.map(({ name }: any, index: number) => {
      return {
        name,
        sprite: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_${index}.jpg`
      }
    }),
    difficulty: data[champ].difficulty,
    skills: data[champ].spells.map(({id, name, cooldown, description}: any, index: number) => {
      let skillID = getVideoKey(Number(data[champ].key));
      let skillKey = getSkillKey(index)
      return {
        key: skillKey,
        name,
        description,
        cooldown,
        sprite: `https://ddragon.leagueoflegends.com/cdn/13.5.1/img/spell/${id}.png`,
        video: {
          poster: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${skillID}/ability_${skillID}_${skillKey}1.jpg`,
          source : {
            webm: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${skillID}/ability_${skillID}_${skillKey}1.webm`,
            mp4: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${skillID}/ability_${skillID}_${skillKey}1.mp4`
          }
        }
      }
    }),
  }
  return champion
}

export default async function(req: NextApiRequest, res: NextApiResponse<Champion>) {
  const { id } = req.query
  const champion = await getChampion(`${id}`) 
  res.status(200).json(champion)
}
