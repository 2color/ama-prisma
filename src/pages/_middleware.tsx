import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function (
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  await prisma.visitor.upsert({
    where: {
      id: req.ip,
    },
    create: {
      id: req.ip,
      createdAt: new Date(),
    },
    update: {
      id: req.ip,
      createdAt: new Date(),
    },
  })
  next()
}
