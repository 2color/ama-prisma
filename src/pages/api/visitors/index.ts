import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await listVisitors(req, res)
  } else {
    return res.status(404).end()
  }
}

// Find visitors that visited the website in the last 5 minutes
async function listVisitors(req: NextApiRequest, res: NextApiResponse) {
  const visitors = await prisma.visitor.findMany({
    where: {
      lastSeen: {
        gt: new Date(new Date().getTime() - 5 * 60000),
      },
    },
  })
  res.json(visitors)
}
