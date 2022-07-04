import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Flex, Spinner } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { LoginPage } from 'components/ui'

const Home: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/facturar')
  }, [user])

  return (
    <Flex w='90%' flexDir='row' justifyContent='center' alignItems='center' >
      {
        user === USER_STATES.NOT_KNOWN &&
          <Spinner color='white' w={100} h={100} thickness='10px'/>
      }
      {
        user === USER_STATES.NOT_LOGGED &&
          <LoginPage />
      }
    </Flex>
  )
}

export default Home
