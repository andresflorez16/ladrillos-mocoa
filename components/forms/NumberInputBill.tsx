import React, { useState } from 'react'
import { 
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react'

export const NumberInputBill = () => {
  const [value, setValue] = useState('0.0')

  const formatValue = (e: any) => {
    const val = e.target.value
    return val.length > 3 ? setValue(parseFloat(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) : setValue(val)
  }

  const parse = (val: any) => {
    val = val.target.value
    return parseFloat(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  return (
    <InputGroup size='sm'>
      <InputLeftAddon color='black' children='$' />
      <Input type='number'/>
    </InputGroup>
  )
}
