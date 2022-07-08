import React, { useState } from 'react'
import {  
  Box,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Button
} from '@chakra-ui/react'

export const BillData: React.FC<{ isValid: boolean }> = ({ isValid }) => {

  const [checkEmail, setCheckEmail] = useState('yes')
  console.log(isValid)

  return (
    <FormControl
      color='white'
      mt={10}
      w='100%' 
      display='flex' 
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      <Box w={{ base: 'full', md: '40%' }}>
        <FormLabel>Tipo de pago:</FormLabel>
        <RadioGroup size='lg' defaultValue='cash'>
          <Radio mr={5} value='cash'>Decontado</Radio>
          <Radio value='credit'>Crédito</Radio>
        </RadioGroup>
        <FormLabel>Envio:</FormLabel>
        <RadioGroup size='lg' defaultValue='not'>
          <Radio mr={5} value='not'>No</Radio>
          <Radio mr={5} value='yes'>Sí</Radio>
          <Radio value='send'>Enviado</Radio>
        </RadioGroup>
        <RadioGroup size='lg' defaultValue='yes' onChange={setCheckEmail}>
          <FormLabel mt={5}>Correo de facturación:</FormLabel>
          <Radio mr={5} value='not'>No</Radio>
          <Radio mb={5} value='yes'>Sí</Radio>
        {
          checkEmail === 'yes' &&
          <Input 
            position={{ base: 'static', md: 'absolute' }}
            w={{ base: '100%', md: '40%' }}
            ml={5}
            type='email'
            size='lg'
            placeholder='Email de facturación'
          />
        }
        </RadioGroup>
      </Box>
      <Box 
        w={{ base: 'full', md: 'auto' }} 
        mt={{ base: '20px', md: '0' }}
        display='flex'
        justifyContent='center'
      >
        <Button type='submit' isDisabled mr={5} color='black'>Confirmar</Button>
        <Button type='submit' color='red'>Cancelar</Button>
      </Box>
    </FormControl>
  )
}
