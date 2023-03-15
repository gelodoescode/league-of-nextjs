import type { NextApiRequest, NextApiResponse } from 'next'

type Champions = Array<string>

async function getChampions() {
  const response = await fetch("http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion.json")
  const { data } = await response.json()
  const champions: Champions = Object.keys(data)
  return champions
}

export default async function(
  _: NextApiRequest,
  res: NextApiResponse<Champions>
) {
  const champions = await getChampions();
  res.status(200).json(champions)
}
