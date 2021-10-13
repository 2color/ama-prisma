import { responsePathAsArray } from 'graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'src/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    deleteQuestion(req, res)
  } else if (req.method === 'PUT') {
    updateQuestion(req, res)
  } else {
    res.status(404).end()
  }
}

async function deleteQuestion(req: NextApiRequest, res: NextApiResponse) {
  const amaId = req.query.id as string
  try {
    const session = await getSession({ req })
    if (!session) {
      return res.status(401).end()
    }
    const ama = await prisma.ama.delete({
      where: {
        id: amaId,
      },
    })
    res.statusCode = 204
    return res.end()
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function updateQuestion(req: NextApiRequest, res: NextApiResponse) {
  const amaId = req.query.id as string
  const { question } = JSON.parse(req.body)
  try {
    const session = await getSession({ req })
    if (!session) {
      return res.status(401).end()
    }
    const ama = await prisma.ama.update({
      where: {
        id: amaId,
      },
      data: {
        question: question.question,
        answer: question.answer,
        status: question.status,
        audioUrl: question.audioUrl ?? undefined,
        audioWaveform: Array.isArray(question.audioWaveform)
          ? question.audioWaveform
          : undefined,
      },
    })

    return res.status(200).json(ama)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
