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
      w='80%'
      h='85vh'
      m='0 auto'
      mt={{ base: '30px', md: '0' }}
      p={2}
      borderRadius='10px'
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
            <Text fontSize='2em' color='white'>Nueva venta</Text>
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
