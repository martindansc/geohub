/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'
import queryTopScores from '@backend/queries/topScores'
import { COUNTRY_STREAKS_ID, DAILY_CHALLENGE_ID } from '@utils/constants/random'
import queryTopStreaks from '@backend/queries/topStreaks'
import { Game } from '@backend/models'
import { updateScores } from '@backend/queries/updateScores'

export const LEADERBOARD_LENGTH = 5

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const authHeader = req.headers.authorization

    if (!authHeader || authHeader !== process.env.INTERNAL_API_SECRET) {
      return throwError(res, 401, 'Unauthorized')
    }

    await dbConnect()

    const { game } = req.body

    await updateScores(game);

    res.status(200).send('Success')
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

