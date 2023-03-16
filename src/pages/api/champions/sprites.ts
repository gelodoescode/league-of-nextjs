import type { NextApiRequest, NextApiResponse } from "next";

type Champion = {
  name: string
  sprite: string
}

type Champions = Array<Champion>

async function getSprites() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/champions`)
  const champions = await response.json()
  return champions.map((champion: string) => {
    const data: Champion = {
      name: champion,
      sprite: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`
    }
    return data
  })
}

export default async function(_: NextApiRequest, res: NextApiResponse<Champions>) {
  const champions = await getSprites();
  res.status(200).json(champions)
}
