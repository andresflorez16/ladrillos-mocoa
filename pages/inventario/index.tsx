import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { 
  Box,
  Text
} from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { listeningInventory } from '../../firebase'
import { Loader, Products } from 'components/ui'
import { Product } from 'interfaces'

const InventoryPage: NextPage = () => {
  const [bricks, setBricks] = useState<Product[] | any>([])
  const [cements, setCements] = useState<Product[] | any>([])
  const [loading, setLoading] = useState(false)
  const user = useUser()

  useEffect(() => {
    let unSubscriber: any
    if (user) {
      setLoading(true)
      unSubscriber = listeningInventory((bricks: Product[]) => {
        setLoading(false)
        setBricks(bricks)
      }, 'ladrillos')
      unSubscriber = listeningInventory((cements: Product[]) => {
        setLoading(false)
        setCements(cements)
      }, 'cementos')
    }
    return () => unSubscriber && unSubscriber()
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
              <Products productData={bricks} productType='Ladrillos' />
              <Products productData={cements} productType='Cementos' />
            </Box>
          </>
      }
    </Box>
  )
}

export default InventoryPage
