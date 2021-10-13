import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function (
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  console.log(crypto.subtle)
  // await prisma.visitor.create({ data:{} })
  next()
}
