import React, { useState } from 'react'
import { 
  Text, 
  FormControl, 
  FormLabel, 
  InputGroup, 
  InputRightElement, 
  Input, 
  Button, 
  IconButton 
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FormProps } from 'interfaces'

export const LoginForm: React.FC<FormProps> = ({ handleSubmit, handleChange }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(!show)

  return (
    <>
      <Text 
        as='div' 
        display='flex' 
        justifyContent='start' 
        width='100%' 
        textAlign='start' 
        fontSize={['2xl', '4xl']} 
        mb={10} 
        fontWeight='bold' 
        color='white'
      >
        Iniciar Sesión
      </Text>
      <FormControl as='form' onSubmit={handleSubmit}>
        <FormLabel
          color='white'
        >Correo electrónico</FormLabel>
        <Input
          onChange={handleChange}
          id='email'
          name='email'
          m='10px 0'
          type='email'
          size='lg'
          placeholder='Email' 
          color='black' 
          variant='filled'
          _focus={{ background: '#ddd' }}
          p={5}
          borderRadius="10px"
        />
        <FormLabel
          color='white'
          mt={5}
        >Contraseña</FormLabel>
        <InputGroup size='lg'>
          <Input
            onChange={handleChange}
            id='password'
            name='password'
            m='10px 0'
            type={ show ? 'text' : 'password' }
            size='lg'
            placeholder='Contraseña' 
            color='black' 
            variant='filled'
            _focus={{ background: '#ddd' }}
            p={5}
            borderRadius="10px"
          />
          <InputRightElement w='4.5rem' mt={2.5}>
            <IconButton size='sm' bg='#0987AA99' _hover={{ background: '#0987AA66' }} aria-label='Show password' icon={ show ? <ViewOffIcon /> : <ViewIcon /> } onClick={handleShow} />
          </InputRightElement>
        </InputGroup>
        <Button
          type='submit'
          mt={5}
          size='lg'
        >Ingresar</Button>
        </FormControl>
    </>
  )
}
