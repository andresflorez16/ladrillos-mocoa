import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Spinner, Button } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'

const Pendientes: NextPage = () => {
  const user = useUser() 
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(`/pendientes/${'holi'}`)
  }

  return (
    <Box w='90%' m='0 auto' h='83vh'>
      {
        user === USER_STATES.NOT_KNOWN &&
          <Box display='flex' w='100%' justifyContent='center' alignItems='center' h='100%'>
            <Spinner color='white' w={100} h={100} thickness='10px'/>
          </Box>
      }
      {
        user &&
          <Button onClick={handleClick}>Pending</Button>
      }
    </Box>
  )
}

export default Pendientes
