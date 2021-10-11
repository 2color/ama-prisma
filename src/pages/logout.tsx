import { useRouter } from 'next/router'
import { useEffect } from 'react'
import FullscreenLoading from '~/components/FullscreenLoading'

export default function Logout() {
  const router = useRouter()

  // const [handleLogout] = useLogoutMutation({
  //   onCompleted: () => router.push('/'),
  // })

  // useEffect(() => {
  //   handleLogout()
  // }, [])

  return <FullscreenLoading />
}
