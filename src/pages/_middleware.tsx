import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function (
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  if (req.url.pathname !== '/') {
    return next()
  }
  const ipHash = await sha256(req.ip)
  await prisma.visitor.upsert({
    where: {
      ipHash: ipHash,
    },
    create: {
      ipHash: ipHash,
      lastSeen: new Date(),
    },
    update: {
      ipHash: ipHash,
      lastSeen: new Date(),
    },
  })
  next()
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  )
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('')
}
