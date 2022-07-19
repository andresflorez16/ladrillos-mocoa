import { useEffect } from 'react'
import { NextPage } from 'next'
import { 
  Box,
  Text
} from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { Loader } from 'components/ui'

const InventoryPage: NextPage = () => {

  const user = useUser()

  useEffect(() => {
    user
  }, [user])

  return (
    <Box
      m='0 auto'
      w={{ base: '94%', md: '85%' }}
      h='80vh'
      minH='80vh'
    >
      {
        user === USER_STATES.NOT_KNOWN && <Loader />
      }
      {
        user &&
          <Text color='#fff' fontWeight='bold' fontSize='lg' borderBottom='1px solid #aaa'>Inventario</Text>
      }
    </Box>
  )
}

export default InventoryPage
