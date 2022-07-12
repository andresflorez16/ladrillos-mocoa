import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { Box, Spinner, Button } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { api } from 'api-queries'

const Pendientes: NextPage = () => {
  const user = useUser() 

  useEffect(() => {
    api.get('/api/database/pending')
      .then()
  }, [user])

  return (
    <Box w='90%' m='0 auto' h='83vh'>
      {
        user === USER_STATES.NOT_KNOWN &&
          <Box display='flex' w='100%' justifyContent='center' alignItems='center' h='100%'>
            <Spinner color='white' w={100} h={100} thickness='10px'/>
          </Box>
      }
    </Box>
  )
}

export default Pendientes
