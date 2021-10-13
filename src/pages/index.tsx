import * as React from 'react'
import Page, { PageHeader } from '~/components/Page'
import AMAQuestions from '~/components/AMAQuestions'
import { CenteredColumn } from '~/components/Layouts'
import { NextSeo } from 'next-seo'
import routes from '~/config/routes'
import { prisma } from '~/lib/prisma'
import { AmaQuestion } from '~/types/Ama'
import { signIn, signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'

interface AMAProps {
  questions: AmaQuestion[]
  session: Session
}

const AMA: React.FC<AMAProps> = ({ questions, session }) => {
  return (
    <Page>
      <NextSeo
        title={routes.ama.seo.title}
        description={routes.ama.seo.description}
        openGraph={routes.ama.seo.openGraph}
      />

      <CenteredColumn>
        <div className="space-y-8">
          {session && (
            <div className="flex flex-row items-center gap-2 content-center">
              <img
                className="w-8 h-8 rounded-full"
                src={session.user.image}
                alt=""
                width="200"
                height="200"
              />
              <button
                onClick={() => signOut()}
                className="leading-snug text-tertiary hover:text-gray-1000 dark:hover:text-gray-100 "
              >
                Logout
              </button>
            </div>
          )}
          {!session && (
            <button
              onClick={signIn.bind(signIn, 'github')}
              className="leading-snug text-tertiary hover:text-gray-1000 dark:hover:text-gray-100"
            >
              Login
            </button>
          )}
          <PageHeader
            title="Ask Me Anything"
            subtitle="Just for fun! Questions will be visible after I’ve answered."
          />
          <AMAQuestions questions={questions} />
        </div>
      </CenteredColumn>
    </Page>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  console.log('find many!')
  await prisma.ama.findMany({
    where: {
      status: 'ANSWERED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // const [session, questions] = await Promise.all([
  //   await getSession(context),
  //   await prisma.ama.findMany({
  //     where: {
  //       status: 'ANSWERED',
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   }),
  // ])

  return {
    props: {
      // session,
      // questions,
    },
  }
}

export default AMA
