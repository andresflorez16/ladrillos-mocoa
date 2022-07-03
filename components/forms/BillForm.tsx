import React, { useState } from 'react'
import { 
  Box,
  FormControl,
  Button,
  IconButton
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { InputBill } from './InputBill'

export const BillForm: React.FC = () => {
  const [brick, setBrick] = useState([])


  return (
    <Box w='100%'>
      <Button rightIcon={<AddIcon />} mr={5}>Ladrillo</Button>
      <Button rightIcon={<AddIcon />}>Cemento</Button>
      <Box w={{ base: '100%', xl: '60%' }} m='0 auto' display='flex' mt={5} justifyContent='center' alignItems='center'>
        <FormControl as='form' >
          <InputBill />
        </FormControl>
        <IconButton icon={<DeleteIcon />} aria-label='Delete product' color='red'/>
      </Box>
    </Box>
  )
}
