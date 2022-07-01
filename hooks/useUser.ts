import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { UserInfo } from 'interfaces'
import { onAuthUser } from '../firebase'

export const USER_STATES = {
  'NOT_LOGGED': null,
  'NOT_KNOWN': undefined
}

export const useUser = (): UserInfo | null | undefined => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  const router = useRouter()

  useEffect(() => {
    onAuthUser(setUser)
  }, [])

  /*useEffect(() => {*/
    /*if (router.asPath === '/') {*/
      /*user === USER_STATES.NOT_LOGGED && router.push('/')*/
    /*}*/
  /*}, [user])*/

  return user
}
