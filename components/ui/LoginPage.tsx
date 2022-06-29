import { FC } from 'react'
import { Container, useTheme, Card, Text, Input, Spacer } from '@nextui-org/react'

export const LoginPage: FC = () => {
	const { theme } = useTheme()

  return (
		<Container
			display='flex' 
			gap={2}
			justify='center'
			alignItems='center'
			css={{
				height: 'calc(100vh - 100px)',
				'@xsMax': {
					width: '360px'
				}
			}}
			xs
		>
			<Card css={{ backgroundColor: theme?.colors.cyan500.value }}>
					<Card.Header>
						<Text h2 weight='bold'>Iniciar sesión</Text>
					</Card.Header>
					<Card.Body>
						<Spacer y={1.5} />
						<Input
							id='email'
							clearable
							labelPlaceholder='Correo electrónico'
							size='xl'
						/>
						<Spacer y={2.5} />
						<Input.Password
							id='password'
							clearable
							labelPlaceholder='Contraseña'
							size='xl'
						/>
					</Card.Body>
				</Card>
    </Container>
  )
}
