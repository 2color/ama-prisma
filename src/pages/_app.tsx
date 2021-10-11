import * as React from 'react'
import Providers from '~/components/Providers'
import '~/styles/tailwind.css'
import 'tailwindcss/utilities.css'
import '~/styles/custom-styles.css'
import '~/styles/syntax-highlighting.css'
import '~/styles/prose-styles.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Providers session={session}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
