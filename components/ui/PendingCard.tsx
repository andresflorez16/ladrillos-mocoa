import React, { useState } from 'react'
import { 
  Box, 
  Text, 
  FormControl, 
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  InputGroup,
  InputLeftAddon,
  Input  
} from '@chakra-ui/react'
import { PendingData } from 'interfaces'

export const PendingCard: React.FC<{ pending: PendingData }> = ({ pending }) => {

  const [payType, setPayType] = useState(pending.data.payType)
  const [shipping, setShipping] = useState(pending.data.shipping)

  const date = new Date(parseInt(pending.date)).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const total = pending.data.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  let pay: string | number = (0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  let rest: string | number = pending.data.total
  if(pending.data.pay.length > 0) {
    pay = parseFloat(pending.data.pay).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
    rest = (rest - parseFloat(pending.data.pay)).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  } else rest = rest.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { target }: any = e
    const dataForm = Object.fromEntries(new FormData(target))
  }


  return (
    <Box 
      m='10px auto'
      w={{ base: 'full', md: '50%' }}
      bg='#ddd'
      borderRadius='lg'
      boxShadow='1px 1px 3px #0007'
      p={2}
    >
      <Text fontSize='sm'>Número de factura: <strong>#{pending.data.billNumber}</strong></Text>
      <Text fontSize='sm'>Fecha de facturación: {date}</Text>
      <Text fontSize='sm' fontWeight='bold'>Total: {total}</Text>
      <Text fontSize='sm' fontWeight='bold'>Abono: {pay}</Text>
      <Text fontSize='sm' fontWeight='bold'>Saldo: {rest}</Text>
      <FormControl
        onSubmit={handleSubmit}
        as='form'
        w='100%'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        gap={5}
      >
        <Box
          bg='#2C5364'
          p={2}
          borderRadius='md'
          boxShadow='1px 1px 3px #1117'
          color='#fff'
        >
          <FormLabel>Actualizar pago:</FormLabel>
          <RadioGroup size='md' name='payType' defaultValue={payType} onChange={setPayType}>
            <Radio mr={5} value='cash'>De contado</Radio>
            <Radio value='credit'>Crédito</Radio>
            {
              payType === 'credit' &&
                <InputGroup size='sm'>
                  <InputLeftAddon color='#000' bg='#ccc' children='$' />
                  <Input 
                    name='pay'
                    type='number'
                    _focus={{ background: '#ddd' }}
                    variant='filled'
                    color='#000'
                    placeholder='Abono'
                  />
                </InputGroup>
            }
          </RadioGroup>
          <FormLabel mt={5}>Actualizar envio:</FormLabel>
          <RadioGroup size='md' name='shipping' defaultValue={shipping} onChange={setShipping}>
            <Radio mr={5} value='delivered'>Entregado</Radio>
            <Radio value='pending'>Pendiente</Radio>
          </RadioGroup>
        </Box>
        <Box>
          <Button 
            type='submit'
            _hover={{ background: '#2C536477' }}
            mr={[0, 10]} 
            variant='solid' 
            bg='#2C5364' 
            color='#fff'
          >
            Actualizar
          </Button>
        </Box>
      </FormControl>

    </Box>
  )
}
