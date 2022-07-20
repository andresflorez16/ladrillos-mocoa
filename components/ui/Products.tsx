import React from 'react'
import { 
  Box,
  Text
} from '@chakra-ui/react'
import { Product } from 'interfaces'
import { ProductInfo } from './ProductInfo'

type Props = {
  productData: Product[],
  productType: string
}

export const Products: React.FC<Props> = ({ productData, productType }) => {

  return (
    <Box 
      mt={5}
      borderRadius='lg'
    >
      <Text
        color='#fff'
        fontSize='1.4em'
      >{productType}</Text>
      {
        productData &&
          <Box 
            w={{ base: 'full', md: '90%' }}
            bg='#aaa3'
            m='0 auto'
            borderRadius='lg'
            p={2}
          >
          {
            productData.map(({ name, id }) => <ProductInfo key={id} name={name} id={id} />)
          }
          </Box>
      }
      {
        !productData &&
          <Text color='#fff'>No hay productos para mostrar</Text>
      }
    </Box>
  )
}
