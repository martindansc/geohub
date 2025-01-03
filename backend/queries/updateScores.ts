import { Game, TopScore } from '@backend/models'
import queryTopScores from '@backend/queries/topScores'
import queryTopStreaks from '@backend/queries/topStreaks'
import { collections } from '@backend/utils'
import { LEADERBOARD_LENGTH } from '@pages/api/scores/update'
import { COUNTRY_STREAKS_ID, DAILY_CHALLENGE_ID } from '@utils/constants/random'
import { ObjectId } from 'mongodb'

export const updateScores = async (game: Game) => {
  console.log("Updating scores of:", game);

  if (game.mode === 'standard' && !game.isDailyChallenge) {
    await updateMapLeaderboard(game)
    await updateMapStats(game)
  }

  if (game.mode === 'standard' && game.isDailyChallenge) {
    await updateDailyChallenge(game)
  }

  if (game.mode === 'streak') {
    await updateStreakLeaderboard(game)
    await updateStreakStats()
  }
}

// DAILY CHALLENGE
export const updateDailyChallenge = async (game: Game) => {
  const dailyChallengeQuery = await collections.challenges
    ?.find({ isDailyChallenge: true })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray()

  if (!dailyChallengeQuery?.length) {
    return null
  }

  const dailyChallenge = dailyChallengeQuery[0]
  const dailyChallengeId = new ObjectId(dailyChallenge._id)

  const stats = await getDailyChallengeStats(dailyChallengeId)
  const scores = await getDailyChallengeScores(dailyChallengeId, game)

  let updateFields = {}

  if (stats) {
    updateFields = { ...updateFields, ...stats }
  }

  if (scores) {
    updateFields = { ...updateFields, scores }
  }

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: DAILY_CHALLENGE_ID, dailyChallengeId },
    { $set: updateFields },
    { upsert: true }
  )
}

export const getDailyChallengeStats = async (dailyChallengeId: ObjectId) => {
  const gameStats = await collections.games
    ?.aggregate([
      { $match: { challengeId: dailyChallengeId, state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }

  return {
    usersPlayed: explorers,
    avgScore: Math.ceil(avgScore),
  }
}

export const getDailyChallengeScores = async (dailyChallengeId: ObjectId, game: Game) => {
  const mapId = DAILY_CHALLENGE_ID
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId, dailyChallengeId })

  const topScores = mapLeaderboard?.scores
  const leaderboardNeedsMoreScores = topScores?.length && topScores.length < LEADERBOARD_LENGTH
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.totalPoints < lowestTopScore && !leaderboardNeedsMoreScores) {
    return
  }

  const query = { challengeId: dailyChallengeId, state: 'finished' }
  const newTopScores = await queryTopScores(query, LEADERBOARD_LENGTH)

  return newTopScores
}

// REGULAR MAPS
export const updateMapStats = async (game: Game) => {
  const mapId = new ObjectId(game.mapId)

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mapId, state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  await collections.maps?.updateOne({ _id: mapId }, { $set: { avgScore: roundedAvgScore, usersPlayed: explorers } })
}

export const updateMapLeaderboard = async (game: Game) => {
  const mapId = new ObjectId(game.mapId)
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId })

  const topScores = mapLeaderboard?.scores
  const leaderboardNeedsMoreScores = topScores?.length && topScores.length < LEADERBOARD_LENGTH
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.totalPoints >= lowestTopScore || leaderboardNeedsMoreScores) {
    const query = { mapId, round: 6 }
    const newTopScores = await queryTopScores(query, LEADERBOARD_LENGTH)

    await collections.mapLeaderboard?.findOneAndUpdate({ mapId }, { $set: { scores: newTopScores } }, { upsert: true })
  }
}

// COUNTRY STREAKS
export const updateStreakStats = async () => {
  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mode: 'streak', state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$streak' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: COUNTRY_STREAKS_ID },
    { $set: { avgScore: roundedAvgScore, usersPlayed: explorers } },
    { upsert: true }
  )
}

const updateStreakLeaderboard = async (game: Game) => {
  const mapId = COUNTRY_STREAKS_ID
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId })

  const topScores = mapLeaderboard?.scores
  const leaderboardNeedsMoreScores = topScores?.length && topScores.length < LEADERBOARD_LENGTH
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.streak >= lowestTopScore || leaderboardNeedsMoreScores) {
    const query = { mode: 'streak', state: 'finished' }
    const newTopScores = await queryTopStreaks(query, LEADERBOARD_LENGTH)

    await collections.mapLeaderboard?.findOneAndUpdate({ mapId }, { $set: { scores: newTopScores } }, { upsert: true })
  }
}
