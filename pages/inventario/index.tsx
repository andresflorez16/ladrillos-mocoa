import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { 
  Box,
  Text
} from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { getInventory } from '../../firebase'
import { Loader, Products } from 'components/ui'
import { Inventory } from 'interfaces'

const InventoryPage: NextPage = () => {
  const [inventory, setInventory] = useState<Inventory | any>({})
  const [loading, setLoading] = useState(false)
  const user = useUser()

  useEffect(() => {
    let isSubscriber = true
    if (user) {
      setLoading(true)
      getInventory()
      .then(({ brickData, cementData }) => {
        if (isSubscriber) {
          const bricks = brickData.docs.map(el => ({ ...el.data(), id: el.id }))
          const cements = cementData.docs.map(el => ({ ...el.data(), id: el.id }))
          setInventory({ bricks, cements })
          setLoading(false)
       } 
      })
      .catch(err => console.log('Error getting inventory', err))
    }
    return () => { isSubscriber = false }
  }, [user])

  return (
    <Box
      m='0 auto'
      w={{ base: '94%', md: '85%' }}
    >
      {
        user === USER_STATES.NOT_KNOWN || loading && 
          <Box w='100%' h='81vh'>
            <Loader />
          </Box>
      }
      {
        user && !loading &&
          <>
            <Text color='#fff' fontWeight='bold' fontSize='2em' borderBottom='1px solid #aaa'>Inventario</Text>
            <Text color='#fff'>{new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            <Box w={{ base: 'full', md: '50%' }} m='0 auto'>
              <Products productData={inventory.bricks} productType='Ladrillos' />
              <Products productData={inventory.cements} productType='Cementos' />
            </Box>
          </>
      }
    </Box>
  )
}

export default InventoryPage
