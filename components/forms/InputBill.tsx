import React, { useState } from 'react'
import { 
  Box,
  FormLabel, 
  Select,
  Input, 
  Text
} from '@chakra-ui/react'
import { NumberInputBill } from './NumberInputBill'


export const InputBill: React.FC = () => {
  
  return (
    <Box 
      w='100%' 
      h='100%' 
      display='flex'
      alignItems='center'
      flexWrap='wrap'
    >
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Clase Producto:</FormLabel>
        <Select _focus={{ background: 'white' }} color='black' variant='filled' size='sm'>
          <option>Ladrillo</option>
          <option>Ladrillo</option>
          <option>Ladrillo</option>
        </Select>
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Cantidad:</FormLabel>
        <NumberInputBill />
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Precio x unidad:</FormLabel>
        <NumberInputBill />
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Subtotal:</FormLabel>
        <Text fontSize='xl'>$23.000</Text>
      </Box>
    </Box>
  )
}
