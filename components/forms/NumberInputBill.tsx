import React, { useState } from 'react'
import { 
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react'

interface Props {
  handleChangeValue: React.ChangeEventHandler,
  isError: boolean
}

export const NumberInputBill: React.FC<Props> = ({ handleChangeValue, isError }) => {
  return (
    <InputGroup size='sm' border={ isError ? '1px solid red' : 'white' }>
      <InputLeftAddon color='white' bg='none' children='$' />
      <Input type='number' defaultValue='1' variant='filled' color='black' _focus={{ background: '#ddd' }} onChange={e => handleChangeValue(e)} /> : 
    </InputGroup>
  )
}
