import React, { useState } from 'react'
import NextLink from 'next/link'
import {  
  Box,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Button,
  Link,
  Alert
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { addBill } from '../../firebase'
import { DataForm, DataBillForm } from 'interfaces'

interface Props {
  isValid: boolean,
  data: () => DataForm,
}

export const BillData: React.FC<Props> = ({ isValid, data }) => {

  const [checkEmail, setCheckEmail] = useState('not')
  const [checkPay, setCheckPay] = useState('cash')
  const [checkShipping, setCheckShipping] = useState('not')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault()
    const { target }: any = e
    let dataBill: DataBillForm = { ...data(), payType: checkPay, shipping: checkShipping, isEmail: checkEmail, emailBill: '' }
    if (checkEmail === 'yes') {
      const { email } = Object.fromEntries(new FormData(target)) as unknown as { email: string }
      dataBill = { ...dataBill, emailBill: email }
    }
    addBill(dataBill)
    .then(() => console.log('Added'))
    .catch(err => console.log('Error adding bill', err))
  }

  const [inputEmail, setInputEmail] = useState(checkEmail === 'yes' ? '' : null)

  const handleChangeInput = (e: React.ChangeEvent | string) => {
    if (e === 'not') {
      setCheckEmail('not')
      setInputEmail(null)
    } else {
      setCheckEmail('yes')
    }
  }

  const handleEmail = (e: React.ChangeEvent) => {
    e.preventDefault()
    const { value } = e.target as unknown as { value: string }
    setInputEmail(value)
  }

  const emailErr = inputEmail === ''

  return (
    <FormControl
      onSubmit={handleForm}
      as='form'
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
        <RadioGroup size='lg' defaultValue={checkPay} onChange={setCheckPay}>
          <Radio mr={5} value='cash'>De contado</Radio>
          <Radio value='credit'>Crédito</Radio>
        </RadioGroup>
        <FormLabel>Envio:</FormLabel>
        <RadioGroup size='lg' defaultValue={checkShipping} onChange={setCheckShipping}>
          <Radio mr={5} value='not'>No</Radio>
          <Radio mr={5} value='yes'>Sí</Radio>
          <Radio value='sent'>Enviado</Radio>
        </RadioGroup>
        <RadioGroup size='lg' defaultValue={checkEmail} onChange={handleChangeInput}>
          <FormLabel mt={5}>Correo de facturación:</FormLabel>
          <Radio mr={5} value='not'>No</Radio>
          <Radio mb={5} value='yes'>Sí</Radio>
          {
            checkEmail === 'yes' &&
            <Input 
              id='email'
              onChange={handleEmail}
              isRequired
              name='email'
              position={{ base: 'static', md: 'absolute' }}
              w={{ base: '100%', md: '40%' }}
              ml={5}
              type='email'
              size='lg'
              placeholder='Email de facturación'
            />
          }
          {
            emailErr && 
              <Alert
                w='50%'
                status='error'
                m='5px auto'
                borderRadius='lg'
                color='black'
              >
                <WarningIcon mr={5} />
                Digite el correo
              </Alert>
          }
        </RadioGroup>
      </Box>
      <Box 
        w={{ base: 'full', md: 'auto' }} 
        mt={{ base: '20px', md: '0' }}
        display='flex'
        justifyContent='center'
      >
        <Button type='submit' isDisabled={isValid || emailErr} mr={5} color='black'>Confirmar</Button>
        <NextLink href='/home'>
          <Link>
            <Button type='submit' color='red'>Cancelar</Button>
          </Link>
        </NextLink>
      </Box>
    </FormControl>
  )
}
