import { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { Box, Text, Spinner } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { getInventory } from '../../firebase'
import { BillForm } from 'components/forms'
import { Inventory } from 'interfaces'

const BillPage: NextPage<Inventory> = ({ bricks, cements }) => {
  const user = useUser()

  useEffect(() => {
    user
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
        user === USER_STATES.NOT_KNOWN &&
          <Box w='100%' h='65vh' display='flex' justifyContent='center' mt={100} >
            <Spinner color='white' w={100} h={100} thickness='10px'/>
          </Box>
      }
      {
        user &&
          <>
            <Text fontSize='1.5em' borderBottom='1px solid #aaa' mb={5} fontWeight='bold' color='white'>Nueva venta</Text>
            <BillForm bricks={bricks} cements={cements} />
          </>
      }
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { brickData, cementData } = await getInventory()
  const bricks = brickData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  const cements = cementData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  return { props: { bricks, cements } }
}

export default BillPage
