import { useState, useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { Box, Text, Spinner } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { listeningInventory } from '../../firebase'
import { BillForm } from 'components/forms'
import { Loader } from 'components/ui'
import { Product } from 'interfaces'

const BillPage: NextPage = () => {
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
      w={{ base: 'full', md: '75%' }}
      minH='83vh'
      h='100%'
      m='0 auto'
      borderRadius='10px'
      p={2}
    >
      {
        user === USER_STATES.NOT_KNOWN || loading && 
          <Box w='100%' h='80vh'>
            <Loader />
          </Box>
      }
      {
        user && !loading &&
          <>
            <Text fontSize='1.5em' borderBottom='1px solid #aaa' mb={5} fontWeight='bold' color='white'>Nueva venta</Text>
            <BillForm bricks={bricks} cements={cements} />
          </>
      }
    </Box>
  )
}

export default BillPage
