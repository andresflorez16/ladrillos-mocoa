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
  const [brick, setBrick] = useState([{ id: generate(), cantity: 1, price: 1000 }])
  const [cement, setCement] = useState([{ id: generate(), cantity: 1, price: 1000 }])
  const [dataProduct, setDataProduct] = useState({})

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
              setDataProduct={setDataProduct}
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
              setDataProduct={setDataProduct}
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
