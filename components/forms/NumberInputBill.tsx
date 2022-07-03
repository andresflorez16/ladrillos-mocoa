import React, { useState } from 'react'
import { 
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

export const NumberInputBill = () => {
  const [value, setValue] = useState('0.0')

  const formatValue = (val: string) => `$` + val
  const parse = (val: string) => val.replace(/^\$/, '')

  return (
    <NumberInput 
      size='sm'
      value={formatValue(value)} 
      min={0}
      onChange={value => setValue(parse(value))}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
