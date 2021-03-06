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
import { PendingData, UpdatePendingBillData } from 'interfaces'
import { updatingPendingBill } from '../../firebase/database'

interface Props {
  pending: PendingData,
  update: (isUpdate: boolean) => React.SetStateAction<any> 
}

export const PendingCard: React.FC<Props> = ({ pending, update }) => {

  const [bricks, setBricks] = useState(pending.data.brick)
  const [cement, setCement] = useState(pending.data.cement)
  const [others, setOthers] = useState(pending.data.other)
  const [payType, setPayType] = useState(pending.data.payType)
  const [shipping, setShipping] = useState(pending.data.shipping)
  const [total, setTotal] = useState(pending.data.total)
  const [pay, setPay] = useState(pending.data.pay.length > 0 ? parseFloat(pending.data.pay) : 0)
  const [rest, setRest] = useState(total - pay)

  const date = new Date(parseInt(pending.date)).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { target }: any = e
    const dataForm = Object.fromEntries(new FormData(target))
    if (dataForm.pay && parseFloat(dataForm.pay as string) < 0) dataForm['pay'] = ''
    if (!dataForm.pay || pay === 0) dataForm['pay'] = ''
    updatingPendingBill({ ...dataForm, pay: pay.toString(), id: pending.date, collection: pending.collection } as UpdatePendingBillData)
    update(true)
  }

  const errorPay = pay > total

  const handleNewPay = (e: React.ChangeEvent) => {
    const { value } = e.target as unknown as { value: string }
    const billPay = pending.data.pay.length > 0 ? parseFloat(pending.data.pay) : 0
    const currentNewValue = parseFloat(value)
    if (currentNewValue > 0) {
      setPay(billPay + currentNewValue)
      setRest(total - (billPay + currentNewValue))
    }
    if (currentNewValue === 0 || currentNewValue < 0){
      setPay(billPay)
      setRest(total - billPay)
    } 
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
      <Text fontSize='sm'>N??mero de factura: <strong>#{pending.data.billNumber}</strong></Text>
      <Text fontSize='sm'>Fecha de facturaci??n: {date}</Text>
      <Box
        w='100%'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '0', md: '5px' }}
        borderBottom='1px solid #3337'
      >
        <Text fontSize='sm' fontWeight='bold'>Total: {total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
        <Text fontSize='sm' fontWeight='bold'>Abono: {pay.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
        <Text fontSize='sm' fontWeight='bold'>Flete: {pending.data.fleteValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
        <Text 
        fontSize='sm' 
        fontWeight='bold'
        color={errorPay ? '#f00' : 'auto'}
        >
          Saldo: {rest.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
        </Text>
      </Box>
      <Box
        w='100%'
        display='flex'
        flexWrap='wrap'
        gap={5}
        mb={2}
      >
        {
          bricks.map(el => (
            <Box key={el.id}>
              <Text fontSize='sm'>{el.name}</Text>
              <Text fontSize='sm'>Cantidad: {el.cantity}</Text>
              <Text fontSize='sm'>Subtotal: {el.subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
            </Box>
          ))
        }
        {
          cement.map(el => (
            <Box key={el.id}>
              <Text fontSize='sm'>{el.name}</Text>
              <Text fontSize='sm'>Cantidad: {el.cantity}</Text>
              <Text fontSize='sm'>Subtotal: {el.subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
            </Box>
          ))
        }
        {
          others.map(el => (
            <Box key={el.id}>
              <Text fontSize='sm'>{el.name}</Text>
              <Text fontSize='sm'>Cantidad: {el.cantity}</Text>
              <Text fontSize='sm'>Subtotal: {el.subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Text>
            </Box>
          ))
        }
      </Box>
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
            <Radio value='credit'>Cr??dito</Radio>
            {
              payType === 'credit' &&
                <InputGroup size='sm'>
                  <InputLeftAddon color='#000' bg='#ccc' children='$' />
                  <Input 
                    onChange={handleNewPay}
                    outline={errorPay ? '3px solid #f00' : 'none'}
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
            isDisabled={errorPay}
            type='submit'
            _hover={{ background: '#2C536477' }}
            mr={[0, 10]} 
            colorScheme='green'
          >
            Actualizar
          </Button>
        </Box>
      </FormControl>

    </Box>
  )
}
