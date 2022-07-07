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
      <InputLeftAddon color='black' children='$' />
      <Input type='number' defaultValue='0.0' onChange={e => handleChangeValue(e)} /> : 
    </InputGroup>
  )
}
