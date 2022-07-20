import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Text,
  Link
} from '@chakra-ui/react'

type Props = {
  name: string,
  id: string
}

export const ProductInfo: React.FC<Props> = ({ name, id }) => {
  return (
    <Box
      borderBottom='1px solid #aaa7'
      p={2}
      _hover={{ background: '#aaa5' }}
      transition='background .3s ease'
      borderRadius='lg'
    >
      <NextLink href={`/inventario/${id}`}>
        <Link
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          color='#fff'
        >
          <Text 
            color='#fff'
            display='inline-block'
          >{name}</Text>
          <Text
            color='#fff'
            display='inline-block'
          >Cantidad: 100</Text>
        </Link>
      </NextLink>
    </Box>
  )
}
