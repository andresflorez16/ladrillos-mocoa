import React, { useState } from 'react'
import { 
  Box,
  FormControl,
  Button,
  IconButton
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { generate } from 'shortid'
import { InputBill } from './InputBill'

export const BillForm: React.FC = () => {
  const [brick, setBrick] = useState([{ id: generate(), cantity: 1, price: 1000 }])
  const [cement, setCement] = useState([{ id: generate(), cantity: 1, price: 1000 }])

  const handleAddBrick = () => {
    return setBrick(currentBrick => [ ...currentBrick, { id: generate(), cantity: 1, price: 1000 } ])
  }

  const handleRemoveBrick = (id: string) => {
    setBrick((currentBrick) => currentBrick.filter(el => el.id !== id))
  }

  const handleAddCement = () => {
    return setCement(currentCement => [ ...currentCement, { id: generate(), cantity: 1, price: 1000 } ])
  }

  const handleRemoveCement = (id: string) => {
    setCement((currentCement) => currentCement.filter(el => el.id !== id))
  }

  return (
    <Box w='100%'>
      <Button rightIcon={<AddIcon />} mr={5} onClick={handleAddBrick}>Ladrillo</Button>
      <Button rightIcon={<AddIcon />} onClick={handleAddCement}>Cemento</Button>
      {
        brick.map((el) => (
          <Box key={el.id} w={{ base: '100%', xl: '60%' }} m='0 auto' pb={3} borderBottom='1px solid white' display='flex' mt={5} justifyContent='center' alignItems='center'>
          <FormControl as='form' >
            <InputBill product="Ladrillo" />
          </FormControl>
            <IconButton icon={<DeleteIcon />} aria-label='Delete product' onClick={e => handleRemoveBrick(el.id)} color='red'/>
          </Box>
        ))
      }
      {
        cement.map((el) => (
          <Box key={el.id} w={{ base: '100%', xl: '60%' }} m='0 auto' pb={3} borderBottom='1px solid white' display='flex' mt={5} justifyContent='center' alignItems='center'>
          <FormControl as='form' >
            <InputBill product='Cemento' />
          </FormControl>
            <IconButton icon={<DeleteIcon />} aria-label='Delete product' onClick={e => handleRemoveCement(el.id)} color='red'/>
          </Box>
        ))
      }
      
    </Box>
  )
}
