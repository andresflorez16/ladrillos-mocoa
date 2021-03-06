import React, { useState, useEffect } from 'react'
import { 
  Box,
  FormControl,
  FormLabel, 
  Select,
  Input, 
  Text
} from '@chakra-ui/react'
import { NumberInputBill } from './NumberInputBill'
import { ProductData, Product } from 'interfaces'

interface Props {
  product: Product[],
  setData: (data: ProductData) => void,
  id: string,
}

export const InputBill: React.FC<Props> = ({ product, id, setData }) => {
  const [ cantity, setCantity ] = useState('1')
  const [value, setValue] = useState('1')
  const [productClass, setProductClass] = useState<ProductData | any>(product.length > 0 ? product[0].name : '')

  const getSubtotal = () => {
    const formatCantity = parseFloat(cantity)
    const formatValue = parseFloat(value)
    if (formatCantity > 0 && formatValue > 0) return formatCantity * formatValue
    else return -1
  }

  const calcSubtotal = () => {
    const subt = getSubtotal()
    return subt > 0 ? subt.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '$0'
  }

  useEffect(() => {
    setData({ id, cantity: parseInt(cantity), price: parseFloat(value), subtotal: getSubtotal(), name: productClass })

  }, [cantity, value, productClass])

  const handleChangeValue = (e: React.ChangeEvent) => {
    e.preventDefault()
    const { value } = e.target as unknown as { value: string }
    setValue(value)
  }

  const isErrorValue = value === '0' || value === '' || parseFloat(value) < 0
  const isErrorCantity = cantity === '0' || cantity === '' || parseFloat(cantity) < 0

  const onChangeCantity = (e: React.ChangeEvent) => {
    e.preventDefault()
    const { value } = e.target as unknown as { value: string }
    setCantity(value)
  }

  const handleProductClass = (e: React.FormEvent) => {
    e.preventDefault()
    const { value } = e.target as unknown as { value: string }
    setProductClass(value)
  }

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
        <Select 
          onChange={handleProductClass}
          _focus={{ background: 'white' }}
          cursor='pointer' 
          color='black'
          variant='filled'
          size='sm'
        >
          {
            product.map(({ name, id }) => (
              <option value={name} key={id}>{name}</option>
            ))
          }
        </Select>
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormControl isInvalid={isErrorCantity}>
        <FormLabel>Cantidad:</FormLabel>
        {
          isErrorCantity
            ?
              <Input _focus={{ background: '#ddd' }} variant='filled' color='black' border='1px solid red' onChange={onChangeCantity} value={cantity} size='sm' type='number' />
            : 
            <Input _focus={{ background: '#ddd' }} variant='filled' color='black' onChange={onChangeCantity} value={cantity} size='sm' type='number' />
        }
        </FormControl>
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Precio x unidad:</FormLabel>
        <NumberInputBill type='price' isError={isErrorValue} handleChangeValue={handleChangeValue} />
      </Box>
      <Box
        color='white'
        mr={{ base: 0, md: 5 }}
        w={{ base: '80%', md: '20%' }}
      >
        <FormLabel>Subtotal:</FormLabel>
        <Text fontSize='xl'>{calcSubtotal()}</Text>
      </Box>
    </Box>
  )
}
