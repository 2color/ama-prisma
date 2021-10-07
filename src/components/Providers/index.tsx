import * as React from 'react'
import Fathom from './Fathom'
import SEO from './SEO'
import Toast from './Toaster'

interface Props {
  children?: any
}


export default function Providers({ children }: Props) {
  return (
    <>
      <SEO />
      <Fathom />
      <Toast />
      {children}
    </>
  )
}
