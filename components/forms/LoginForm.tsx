import React from 'react'
import { Card, Spacer, Input, Button, Text } from '@nextui-org/react'
import { FormProps } from 'interfaces'

export const LoginForm: React.FC<FormProps> = ({ handleSubmit, handleChange }) => {
  return (
    <Card css={{ backgroundColor: 'transparent' }}>
      <Card.Header>
        <Text
          h2
          weight='bold'
          css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%" }}
        >
          Iniciar sesión
        </Text>
      </Card.Header>
      <Card.Body>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Spacer y={1.5} />
          <Input
            id='email'
            type='email'
            required
            name='email'
            clearable
            labelPlaceholder='Correo electrónico'
            size='xl'
            onChange={handleChange}
            css={{ width: '100%' }}
          />
          <Spacer y={2.5} />
          <Input.Password
            id='password'
            type='password'
            required
            name='password'
            clearable
            labelPlaceholder='Contraseña'
            size='xl'
            onChange={handleChange}
            css={{ width: '100%' }}
          />
          <Spacer y={2.5} />
          <Button
            type='submit'
            bordered
            color='gradient'
            size='md'
            ghost
            css={{
              margin: '0 auto'
            }}>
            Iniciar
          </Button>
        </form>
      </Card.Body>
    </Card>
  )
}
