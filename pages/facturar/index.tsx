import { useEffect } from 'react'
import { NextPage } from 'next'
import { Box, Text, Spinner } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { BillForm } from 'components/forms'

const BillPage: NextPage = () => {
  const user = useUser()

  useEffect(() => {
    user
  }, [user])
  return (
    <Box
      w='90%'
      mt={{ base: '30px', md: '0' }}
      p={2}
      borderRadius='10px'
    >
      {
        user === USER_STATES.NOT_KNOWN &&
          <Box w='100%' display='flex' justifyContent='center' mt={100} >
            <Spinner color='white' w={100} h={100} thickness='10px'/>
          </Box>
      }
      {
        user &&
          <>
            <Text fontSize='2em' color='white'>Nueva venta</Text>
            <BillForm />
          </>
      }
    </Box>
  )
}

export default BillPage
