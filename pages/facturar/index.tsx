import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import { BillForm } from 'components/forms'

const BillPage: NextPage = () => {
  return (
    <Box
      w='90%'
      mt={{ base: '30px', md: '0' }}
      p={2}
      borderRadius='10px'
    >
      <Text
        fontSize='2em'
        color='white'
      >
      Nueva venta
      </Text>
      <BillForm />
    </Box>
  )
}

export default BillPage
