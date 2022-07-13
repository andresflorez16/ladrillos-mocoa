import React from 'react'
import { Box, Text, FormControl, FormLabel, RadioGroup, Radio, Button  } from '@chakra-ui/react'
import { PendingData } from 'interfaces'

export const PendingCard: React.FC<{ pending: PendingData }> = ({ pending }) => {
  const date = new Date(parseInt(pending.date)).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const total = pending.data.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  let pay: string | number = (0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  let rest: string | number = pending.data.total
  if(pending.data.pay.length > 0) {
    pay = parseFloat(pending.data.pay).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
    rest = (rest - parseFloat(pending.data.pay)).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
  } else rest = rest.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  return (
    <Box 
      m='0 auto'
      w={{ base: 'full', md: '50%' }}
      bg='#ddd'
      borderRadius='lg'
      boxShadow='1px 1px 3px #0007'
      p={2}
    >
      <Text fontSize='sm'>Número de factura: #{pending.data.billNumber}</Text>
      <Text fontSize='sm'>Fecha de facturación: {date}</Text>
      <Text fontSize='sm' fontWeight='bold'>Total: {total}</Text>
      <Text fontSize='sm' fontWeight='bold'>Abono: {pay}</Text>
      <Text fontSize='sm' fontWeight='bold'>Saldo: {rest}</Text>
      <FormControl
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
          <RadioGroup size='md' defaultValue={pending.data.payType}>
            <Radio mr={5} value='cash'>De contado</Radio>
            <Radio value='credit'>Crédito</Radio>
          </RadioGroup>
          <FormLabel>Actualizar envio:</FormLabel>
          <RadioGroup size='md' defaultValue={pending.data.shipping}>
            <Radio mr={5} value='delivered'>Entregado</Radio>
            <Radio value='pending'>Pendiente</Radio>
          </RadioGroup>
        </Box>
        <Box>
          <Button>Confirmar</Button>
        </Box>
      </FormControl>

    </Box>
  )
}
