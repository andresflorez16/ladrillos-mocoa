import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Alert } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { signIn, authErrors } from '../../firebase'
import { Credentials } from 'interfaces'
import { LoginForm } from 'components/forms'

export const LoginPage: React.FC = () => {
	const [msg, setMsg] = useState('')
	const { push } = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { target }: any = e
		const { email, password } = Object.fromEntries(new FormData(target))
		signIn({ email, password } as Credentials)
			.then(cred => {
				setMsg('')
				push('/facturar')
			})
			.catch(err => {
				const { code } = err
				setMsg(authErrors(code))
			})
	}

	const handleChange = (e: React.ChangeEvent) => {
		const { value }: string | any = e.target
		!value && setMsg('')
	}

  return (
		<Box display='flex' w={{ base: 'full', md: 'lg' }} flexDir='column' justifyContent='flex-start' alignItems='center'>
			<LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
			{
				msg && 
				<Alert 
					w={['xs', 'sm']} 
					mt={5} 
					borderRadius={10} 
					status='error'
					css={{
						position: 'absolute',
						bottom: '50px'
					}}
				>
				<WarningIcon mr={5} />
				{msg}
				</Alert>
			}
			
    </Box>
  )
}
