import React, { useState, useEffect } from 'react'
import { 
  Box,
  FormControl,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { generate } from 'shortid'
import { InputBill } from './InputBill'
import { BillData } from './BillData'
import { Product, ProductData } from 'interfaces'

interface Props {
  bricks: Product[],
  cements: Product[]
}

export const BillForm: React.FC<Props> = ({ bricks, cements }) => {
  const [brick, setBrick] = useState<ProductData[]>([{ id: generate(), cantity: 1, price: 1000, subtotal: 1000, name: '' }])
  const [cement, setCement] = useState<ProductData[]>([{ id: generate(), cantity: 1, price: 1000, subtotal: 1000, name: '' }])
  const [dataProduct, setDataProduct] = useState({})

  console.log(brick)
  const updateBrick = (data: ProductData) => {
    const { id, cantity, price, subtotal, name } = data
    if (brick.find(el => el.id === id)) {
      const updatedBrick = brick.map(el => (
        el.id === id
          ? { ...el, cantity, price, subtotal, name }
          : el
      ))
      const oldBricks = brick.filter(el => el.id !== data.id)
      return setBrick([ ...oldBricks, ...updatedBrick ])
    }
  }

  const updateCement = (data: ProductData) => {
    const { id, cantity, price, subtotal, name } = data
    if (cement.find(el => el.id === id)) {
      const updatedCement = cement.map(el => (
        el.id === id
          ? { ...el, cantity, price, subtotal, name }
          : el
      ))
      const oldCement = cement.filter(el => el.id !== data.id)
      return setCement([ ...oldCement, ...updatedCement ])
    }
  }

  const handleAddBrick = () => {
    return setBrick(currentBrick => [ ...currentBrick, { id: generate(), cantity: 1, price: 1000, subtotal: 1000, name: '' } ])
  }

  const handleRemoveBrick = (id: string) => {
    setBrick((currentBrick) => currentBrick.filter(el => el.id !== id))
  }

  const handleAddCement = () => {
    return setCement(currentCement => [ ...currentCement, { id: generate(), cantity: 1, price: 1000, subtotal: 1000, name: '' } ])
  }

  const handleRemoveCement = (id: string) => {
    setCement((currentCement) => currentCement.filter(el => el.id !== id))
  }

  return (
    <Box w='100%'>
      <Button rightIcon={<AddIcon />} mr={5} onClick={handleAddBrick}>Ladrillo</Button>
      <Button rightIcon={<AddIcon />} onClick={handleAddCement}>Cemento</Button>
      {
        brick.length === 0 && cement.length === 0 &&
          <Text color='white' textAlign='center' mt={10}>No se ha seleccionado ningún producto</Text>
      }
      {
        brick.map((el) => (
          <Box 
            key={el.id} 
            w={{ base: '100%', xl: '60%' }} 
            m='0 auto' 
            pb={3}
            borderBottom='1px solid white' 
            display='flex' 
            mt={5} 
            justifyContent='center'
            alignItems='center'
          >
          <FormControl as='form' >
            <InputBill 
              setData={updateBrick}
              id={el.id}
              product={bricks} 
            />
          </FormControl>
            <IconButton icon={<DeleteIcon />} aria-label='Delete product' onClick={e => handleRemoveBrick(el.id)} color='red'/>
          </Box>
        ))
      }
      {
        cement.map((el) => (
          <Box 
            key={el.id} 
            w={{ base: '100%', xl: '60%' }} 
            m='0 auto'
            pb={3}
            borderBottom='1px solid white'
            display='flex'
            mt={5} 
            justifyContent='center'
            alignItems='center'
          >
          <FormControl as='form' >
            <InputBill 
              setData={updateCement}
              id={el.id}
              product={cements} 
            />
          </FormControl>
            <IconButton icon={<DeleteIcon />} aria-label='Delete product' onClick={e => handleRemoveCement(el.id)} color='red'/>
          </Box>
        ))
      }
      <Text float='right' fontSize={25} color='white'>Total: $1000</Text>
      <BillData />
    </Box>
  )
}
