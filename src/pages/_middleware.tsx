import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl

  if (pathname !== '/') {
    return NextResponse.next()
  }

  NextResponse.next()

  const ipHash = await sha256(request.ip)
  event.waitUntil(
    prisma.visitor.upsert({
      where: {
        ipHash: ipHash,
      },
      create: {
        ipHash: ipHash,
        lastSeen: new Date(),
        geo: request.geo,
      },
      update: {
        ipHash: ipHash,
        lastSeen: new Date(),
        geo: request.geo,
      },
    })
  )
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
