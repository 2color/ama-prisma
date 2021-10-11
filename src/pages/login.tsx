import * as React from 'react'
import { useRouter } from 'next/router'
import { Input } from '~/components/Input'
import Page from '~/components/Page'
import { NextSeo } from 'next-seo'
import routes from '~/config/routes'

function Login() {
  const router = useRouter()

  // const [handleLogin] = useLoginMutation({
  //   variables: { password },
  //   onCompleted: (data) => data.login && router.push('/bookmarks'),
  // })

  // function onSubmit(e) {
  //   e.preventDefault()
  //   handleLogin()
  // }

  return (
    <Page>
      <NextSeo
        title={routes.login.seo.title}
        description={routes.login.seo.description}
        openGraph={routes.login.seo.openGraph}
      />

      <div className="flex items-center justify-center w-screen h-screen">
        <form className="p-8 bg-gray-100 rounded-lg">
          <Input
            type="password"
            placeholder="password"
            autoComplete="current-password"
          />
        </form>
      </div>
    </Page>
  )
}

export default Login
