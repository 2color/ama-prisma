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
  visitors: number
}

const AMA: React.FC<AMAProps> = ({ questions, session, visitors }) => {
  return (
    <Page>
      <NextSeo
        title={routes.ama.seo.title}
        description={routes.ama.seo.description}
        openGraph={routes.ama.seo.openGraph}
      />

      <CenteredColumn>
        <div className="space-y-8">
          <div className="flex">
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
            <div className="ml-auto flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <div className="ml-2">
                {visitors} {people(visitors)} online
              </div>
            </div>
          </div>
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

function people(visitors: number): string {
  return visitors === 1 ? 'person' : 'people'
}

export async function getServerSideProps(context: NextPageContext) {
  const [session, questions, visitors] = await Promise.all([
    getSession(context),
    prisma.ama.findMany({
      where: {
        status: 'ANSWERED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.visitor.count({
      where: {
        // Track people that visited the website in the last 5 minutes
        lastSeen: {
          gt: new Date(new Date().getTime() - 5 * 60000),
        },
      },
    }),
  ])

  return {
    props: {
      session,
      questions,
      visitors,
    },
  }
}

export default AMA
