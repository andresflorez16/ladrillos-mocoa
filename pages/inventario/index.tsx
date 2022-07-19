import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { 
  Box,
  Text
} from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { getInventory } from '../../firebase'
import { Loader } from 'components/ui'

const InventoryPage: NextPage = () => {
  const [inventory, setInventory] = useState({})
  const [loading, setLoading] = useState(false)
  const user = useUser()
  console.log(inventory)

  useEffect(() => {
    if (user) {
      setLoading(true)
      getInventory()
      .then(({ brickData, cementData }) => {
        const bricks = brickData.docs.map(el => ({ ...el.data(), id: el.id }))
        const cements = cementData.docs.map(el => ({ ...el.data(), id: el.id }))
        setInventory({ bricks, cements })
        setLoading(false)
      })
      .catch(err => console.log('Error getting inventory', err))
    }
  }, [user])

  return (
    <Box
      m='0 auto'
      w={{ base: '94%', md: '85%' }}
      h='80vh'
      minH='80vh'
    >
      {
        user === USER_STATES.NOT_KNOWN || loading && <Loader />
      }
      {
        user && !loading &&
          <Text color='#fff' fontWeight='bold' fontSize='lg' borderBottom='1px solid #aaa'>Inventario</Text>
      }
    </Box>
  )
}

export default InventoryPage
