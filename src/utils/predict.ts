import type { Ratings } from '../data/teams'

export interface PredictionInput {
  nameA: string
  nameB: string
  ratingsA: Ratings
  ratingsB: Ratings
}

export interface PredictionResult {
  winA: number // % chance Team A wins
  draw: number // % chance of a draw
  winB: number // % chance Team B wins
  scoreA: number // recommended scoreline for A
  scoreB: number // recommended scoreline for B
  explanation: string
}

/**
 * Combine the four sub-ratings into a single "strength" number.
 * Weights: overall and form matter a bit more than raw attack/defense.
 */
function strength(r: Ratings): number {
  return r.overall * 0.4 + r.attack * 0.2 + r.defense * 0.2 + r.form * 0.2
}

/** Logistic function — maps a rating difference to a 0..1 probability. */
function logistic(x: number, scale: number): number {
  return 1 / (1 + Math.exp(-x / scale))
}

function clampRound(n: number): number {
  return Math.max(0, Math.round(n))
}

export function predict(input: PredictionInput): PredictionResult {
  const { nameA, nameB, ratingsA, ratingsB } = input

  const sA = strength(ratingsA)
  const sB = strength(ratingsB)
  const diff = sA - sB // positive => A stronger

  // Probability that A beats B (ignoring draws), via logistic curve.
  const pAwin = logistic(diff, 6)

  // Draw probability: highest when the two sides are evenly matched,
  // and shrinks as the gap widens.
  const drawBase = 0.27
  const draw = drawBase * Math.exp(-Math.abs(diff) / 14)

  // Split the remaining probability between A and B in proportion to pAwin.
  const remaining = 1 - draw
  const winA = remaining * pAwin

  // Convert to rounded percentages that always sum to 100.
  let pctA = Math.round(winA * 100)
  let pctDraw = Math.round(draw * 100)
  let pctB = 100 - pctA - pctDraw

  // Guard against rounding pushing a value negative.
  if (pctB < 0) {
    pctDraw += pctB
    pctB = 0
  }

  // Recommended scoreline — driven by attacking strength vs opposing defense.
  const expectedGoalsA = 1.1 + (ratingsA.attack - ratingsB.defense) / 28 + diff / 40
  const expectedGoalsB = 1.1 + (ratingsB.attack - ratingsA.defense) / 28 - diff / 40
  let scoreA = clampRound(expectedGoalsA)
  let scoreB = clampRound(expectedGoalsB)

  // Make the recommended score agree with the most likely outcome.
  const favored = pctA > pctB ? 'A' : pctB > pctA ? 'B' : 'draw'
  if (favored === 'A' && scoreA <= scoreB) scoreA = scoreB + 1
  if (favored === 'B' && scoreB <= scoreA) scoreB = scoreA + 1
  if (favored === 'draw' && scoreA !== scoreB) {
    const avg = Math.round((scoreA + scoreB) / 2)
    scoreA = avg
    scoreB = avg
  }

  const explanation = buildExplanation({
    nameA,
    nameB,
    pctA,
    pctB,
    pctDraw,
    diff,
    ratingsA,
    ratingsB,
  })

  return {
    winA: pctA,
    draw: pctDraw,
    winB: pctB,
    scoreA,
    scoreB,
    explanation,
  }
}

function buildExplanation(args: {
  nameA: string
  nameB: string
  pctA: number
  pctB: number
  pctDraw: number
  diff: number
  ratingsA: Ratings
  ratingsB: Ratings
}): string {
  const { nameA, nameB, pctA, pctB, pctDraw, diff, ratingsA, ratingsB } = args

  const favorite = pctA > pctB ? nameA : pctB > pctA ? nameB : null
  const gap = Math.abs(diff)

  let strengthPhrase: string
  if (gap < 2) strengthPhrase = 'an extremely tight, hard-to-call contest'
  else if (gap < 5) strengthPhrase = 'a closely matched encounter with a slight edge'
  else if (gap < 10) strengthPhrase = 'a clear favourite but room for a surprise'
  else strengthPhrase = 'a strong mismatch on paper'

  // Highlight a notable individual strength.
  const edges: string[] = []
  if (ratingsA.attack - ratingsB.defense >= 6)
    edges.push(`${nameA}'s attack should test ${nameB}'s back line`)
  if (ratingsB.attack - ratingsA.defense >= 6)
    edges.push(`${nameB}'s forwards look dangerous against ${nameA}`)
  if (Math.abs(ratingsA.form - ratingsB.form) >= 6)
    edges.push(
      ratingsA.form > ratingsB.form
        ? `${nameA} carries the better recent form`
        : `${nameB} carries the better recent form`,
    )

  const edgeSentence = edges.length ? ` ${edges[0]}.` : ''

  if (!favorite) {
    return `This looks like ${strengthPhrase}. With win chances almost level (${pctA}% vs ${pctB}%, draw ${pctDraw}%), a single moment of quality could decide it.${edgeSentence}`
  }

  return `${favorite} are favoured in what shapes up as ${strengthPhrase}. The model gives ${nameA} ${pctA}%, a draw ${pctDraw}%, and ${nameB} ${pctB}%.${edgeSentence}`
}
