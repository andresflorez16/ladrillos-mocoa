import React, { useState, useEffect } from 'react'
import { 
  Box,
  FormControl,
  Button,
  IconButton,
  Text,
  Alert
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, WarningIcon } from '@chakra-ui/icons'
import { generate } from 'shortid'
import { InputBill } from './InputBill'
import { BillData } from './BillData'
import { ProductData, DataForm, Inventory } from 'interfaces'
import { otherData } from 'utils'

export const BillForm: React.FC<Inventory> = ({ bricks, cements }) => {
  const [brick, setBrick] = useState<ProductData[]>([{ id: generate(), cantity: 1, price: 0, subtotal: 0, name: '' }])
  const [cement, setCement] = useState<ProductData[]>([{ id: generate(), cantity: 1, price: 0, subtotal: 0, name: '' }])
  const [otherInput, setOtherInput] = useState<ProductData[]>([{ id: generate(), cantity: 1, price: 0, subtotal: 0, name: 'other' }])

  const getTotal = (): any => {
    let subtotalBrick: number = 0
    let subtotalCement: number = 0
    let subtotalOther: number = 0

    if(brick.length > 0) {
      if (brick[0].subtotal > 0 && brick.length > 1) {
        subtotalBrick = brick.reduce((acc, el): any => acc + el.subtotal, 0) as unknown as number
      } else subtotalBrick = brick[0].subtotal
    }

    if(otherInput.length > 0) {
      if (otherInput[0].subtotal > 0 && otherInput.length > 1) {
        subtotalOther = otherInput.reduce((acc, el): any => acc + el.subtotal, 0) as unknown as number
      } else subtotalOther = otherInput[0].subtotal
    }

    if (cement.length > 0) {
      if (cement[0].subtotal > 0 && cement.length > 1) {
        subtotalCement = cement.reduce((acc, el): any => acc + el.subtotal, 0) as unknown as number
      } else subtotalCement = cement[0].subtotal
    }

    if (!brick.find(el => el.subtotal < 0) || !cement.find(el => el.subtotal < 0) || !otherInput.find(el => el.subtotal < 0)) return subtotalBrick + subtotalCement + subtotalOther
    else return -1
  }

  const totalFormat = () => total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  const [total, setTotal] = useState(getTotal())

  const isValid = parseFloat(total) <= 0 

  const updateBrick = (data: ProductData) => {
    if (brick.find(el => el.id === data.id)) {
      let indexBrick = 0
      brick.find((el, index) => el.id === data.id ? indexBrick = index : null)
      const arrTemp = brick
      arrTemp[indexBrick] = data
      return setBrick([ ...arrTemp ])
    }
  }

  const updateOther = (data: ProductData) => {
    if (otherInput.find(el => el.id === data.id)) {
      let indexOther = 0
      otherInput.find((el, index) => el.id === data.id ? indexOther = index : null)
      const arrTemp = otherInput
      arrTemp[indexOther] = data
      return setOtherInput([ ...arrTemp ])
    }
  }

  const updateCement = (data: ProductData) => {
    if (cement.find(el => el.id === data.id)) {
      let indexCement = 0
      cement.find((el, index) => el.id === data.id ? indexCement = index : null)
      const arrTemp = cement
      arrTemp[indexCement] = data
      return setCement([ ...arrTemp ])
    }
  }
  
  useEffect(() => {
    setTotal(getTotal())
  }, [brick, cement, otherInput])

  const handleAddBrick = () => {
    return setBrick(currentBrick => [ ...currentBrick, { id: generate(), cantity: 1, price: 0, subtotal: 0, name: '' } ])
  }

  const handleRemoveBrick = (id: string) => {
    setBrick((currentBrick) => currentBrick.filter(el => el.id !== id))
  }

  const handleRemoveOther = (id: string) => {
    setOtherInput((currentOther) => currentOther.filter(el => el.id !== id))
  }

  const handleAddCement = () => {
    return setCement(currentCement => [ ...currentCement, { id: generate(), cantity: 1, price: 0, subtotal: 0, name: '' } ])
  }

  const handleAddOther = () => {
    return setOtherInput(currentOther => [ ...currentOther, { id: generate(), cantity: 1, price: 0, subtotal: 0, name: 'other' } ])
  }

  const handleRemoveCement = (id: string) => {
    setCement((currentCement) => currentCement.filter(el => el.id !== id))
  }

  const getData = (): DataForm => ({ total, brick, cement, other: otherInput })

  return (
    <Box w='100%' >
      <Box 
        w='100%'
        display='flex'
        alignItems='center'
        gap={2}
        flexWrap='wrap'
      >
        <Button rightIcon={<AddIcon />}  onClick={handleAddBrick}>Ladrillo</Button>
        <Button rightIcon={<AddIcon />}  onClick={handleAddCement}>Cemento</Button>
        <Button rightIcon={<AddIcon />}  onClick={handleAddOther}>Otros</Button>
      </Box>
      {
        brick.length === 0 && cement.length === 0 && otherInput.length === 0 &&
          <Text color='white' textAlign='center' mt={10}>No se ha seleccionado ningún producto</Text>
      }
      {
        brick.map((el) => (
          <Box 
            key={el.id} 
            w={{ base: '100%', xl: '70%' }} 
            m='0 auto' 
            pb={3}
            borderBottom='1px solid white' 
            display='flex' 
            mt={2} 
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
            w={{ base: '100%', xl: '70%' }} 
            m='0 auto'
            pb={3}
            borderBottom='1px solid white'
            display='flex'
            mt={2} 
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
      {
        otherInput.map(el => (
          <Box 
            key={el.id} 
            w={{ base: '100%', xl: '70%' }} 
            m='0 auto'
            pb={3}
            borderBottom='1px solid white'
            display='flex'
            mt={2} 
            justifyContent='center'
            alignItems='center'
          >
          <FormControl as='form' >
            <InputBill 
              setData={updateOther}
              id={el.id}
              product={otherData} 
            />
          </FormControl>
            <IconButton icon={<DeleteIcon />} aria-label='Delete product' onClick={e => handleRemoveOther(el.id)} color='red'/>
          </Box>
        ))
      }
      {
        parseFloat(total) > 0 
          ? <Text float='right' fontSize={25} color='white'>Total: {totalFormat()}</Text>
          : 
          <Alert 
            w={{ base: 'full', md: '50%' }}
            fontSize='lg'
            float='right' 
            status='error' 
          >
            <WarningIcon mr={5} />
            Verifique los datos!
          </Alert>
      }
      <BillData data={getData} isValid={isValid} />
    </Box>
  )
}
