import * as React from 'react'
import SEO from './SEO'
import Toast from './Toaster'
import ReactQuery from './ReactQuery'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface Props {
  children?: any
  session: Session
}

export default function Providers({ session, children }: Props) {
  return (
    <>
      <SEO />
      <Toast />
      <SessionProvider session={session}>
        <ReactQuery>{children}</ReactQuery>
      </SessionProvider>
    </>
  )
}
