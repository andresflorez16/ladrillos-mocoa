import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Text,
  Link
} from '@chakra-ui/react'
import { Product } from 'interfaces'

export const ProductInfo: React.FC<{ product: Product, type: string }> = ({ product, type }) => {
  return (
    <Box
      borderBottom='1px solid #aaa7'
      p={2}
      _hover={{ background: '#aaa5' }}
      transition='background .3s ease'
      borderRadius='lg'
    >
      <NextLink href={`/inventario/${product.id}?type=${type.toLowerCase()}`}>
        <Link
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          color='#fff'
        >
          <Text 
            color='#fff'
            display='inline-block'
          >{product.name}</Text>
          <Text
            color='#fff'
            display='inline-block'
          >Cantidad: {product.cantity}</Text>
        </Link>
      </NextLink>
    </Box>
  )
}
