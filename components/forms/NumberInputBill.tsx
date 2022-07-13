import React from 'react'
import { 
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react'

interface Props {
  handleChangeValue: React.ChangeEventHandler,
  isError?: boolean,
  type: string
}

export const NumberInputBill: React.FC<Props> = ({ type, handleChangeValue, isError }) => {
  return (
    <>
      {
        type === 'price' ? 
          <InputGroup size='sm' border={ isError ? '1px solid red' : 'white' }>
            <InputLeftAddon color='white' bg='none' children='$' />
            <Input type='number' defaultValue='1' variant='filled' color='black' _focus={{ background: '#ddd' }} onChange={e => handleChangeValue(e)} /> : 
          </InputGroup>
          :
          <InputGroup w='100%' size='sm' mt={2} border={ isError ? '1px solid red' : 'white' }>
            <InputLeftAddon color='white' bg='none' children='$' />
            <Input type='number' defaultValue='' placeholder='Abono' variant='filled' color='black' _focus={{ background: '#ddd' }} onChange={handleChangeValue}/> 
          </InputGroup>
      }
    </>
  )
}
