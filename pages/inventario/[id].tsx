import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { 
  Box,
  Text,
} from '@chakra-ui/react'
import { Loader } from 'components/ui'
import { getProductData } from '../../firebase'
import { useUser, USER_STATES } from 'hooks'

const Product: NextPage = () => {
  const { query } = useRouter()
  const user = useUser()

  useEffect(() => {
    user
  }, [user])
  return (
    <Box
      m='0 auto'
      w='90%'
      h='83vh'
    >
      {
        user === USER_STATES.NOT_KNOWN &&
          <Box w='100%' h='100%'>
            <Loader />
          </Box>
      }
    </Box>
  )
}

export default Product
