import { NextFetchEvent, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export async function middleware(evt: NextFetchEvent) {
  const { pathname } = evt.request.nextUrl

  if (pathname !== '/') {
    return NextResponse.next()
  }

  // const ipHash = await sha256(evt.request.ip)

  // await prisma.visitor.upsert({
  //   where: {
  //     ipHash: evt.request.ip,
  //   },
  //   create: {
  //     ipHash: evt.request.ip,
  //     lastSeen: new Date(),
  //   },
  //   update: {
  //     ipHash: evt.request.ip,
  //     lastSeen: new Date(),
  //   },
  // })
  return NextResponse.next()
}

// async function sha256(str: string): Promise<string> {
//   const buf = await crypto.subtle.digest(
//     'SHA-256',
//     new TextEncoder().encode(str)
//   )
//   return Array.prototype.map
//     .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
//     .join('')
// }
