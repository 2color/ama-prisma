import * as React from 'react'
import Page, { PageHeader } from '~/components/Page'
import AMAQuestions from '~/components/AMAQuestions'
import { CenteredColumn } from '~/components/Layouts'
import { NextSeo } from 'next-seo'
import routes from '~/config/routes'
import Link from 'next/link'
import { prisma } from '~/lib/prisma'
import { format } from 'timeago.js'
import { AmaQuestion } from '~/types/Ama'
import { useSession, signIn, signOut } from 'next-auth/react'

interface AMAProps {
  questions: AmaQuestion[]
}

const AMA: React.FC<AMAProps> = ({ questions }) => {
  const { data: session } = useSession({ required: false })
  console.log('session', session)
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
            <>
              `Welcome ${session?.user?.name}`
              <Link href="/api/auth/signout" passHref>
                <a className="leading-snug text-tertiary hover:text-gray-1000 dark:hover:text-gray-100">
                  Logout
                </a>
              </Link>
            </>
          )}
          {!session && (
            <Link href="/api/auth/signin" passHref>
              <a className="leading-snug text-tertiary hover:text-gray-1000 dark:hover:text-gray-100">
                Login
              </a>
            </Link>
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

export async function getServerSideProps() {
  const questions = await prisma.ama.findMany({
    where: {
      status: 'ANSWERED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      // Map to make updatedAt relative
      questions: questions.map((q) => ({
        ...q,
        updatedAt: format(q.updatedAt),
      })),
    },
  }
}

export default AMA
