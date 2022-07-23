import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Spinner } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { LoginPage } from 'components/ui'

const Home: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  return (
    <Box 
      w='80%' 
      h='83vh'
      display='flex' 
      flexDir='row' 
      justifyContent='center' 
      alignItems='center' 
      m='0 auto'
    >
      {
        user === USER_STATES.NOT_KNOWN &&
          <Spinner color='white' w={100} h={100} thickness='10px'/>
      }
      {
        user === USER_STATES.NOT_LOGGED &&
          <LoginPage />
      }
    </Box>
  )
}

export default Home
