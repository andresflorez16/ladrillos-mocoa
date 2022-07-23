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
import { Product } from 'interfaces'

const Product: NextPage = () => {
  const [product, setProduct] = useState<Product | any>({})
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()
  const user = useUser()

  useEffect(() => {
    let unSubscriber: any
    if (user) {
      setLoading(true)
      unSubscriber = getProductData((data: Product) => {
        setLoading(false)
        setProduct(data)
      }, query.id as string, query.type as string)
    }
    return () => unSubscriber && unSubscriber()
  }, [user])
  return (
    <Box
      m='0 auto'
      w='90%'
      h='83vh'
    >
      {
        user === USER_STATES.NOT_KNOWN || loading &&
          <Box w='100%' h='100%'>
            <Loader />
          </Box>
      }
      {
        user &&
          product.name
      }
    </Box>
  )
}

export default Product
