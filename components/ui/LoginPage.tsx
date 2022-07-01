import React, { useState } from 'react'
import { Text } from '@nextui-org/react'
import { signIn, authErrors } from '../../firebase'
import { Credentials } from 'interfaces'
import { LoginForm } from 'components/forms'

export const LoginPage: React.FC = () => {
	const [msg, setMsg] = useState('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { target }: any = e
		const { email, password } = Object.fromEntries(new FormData(target))
		signIn({ email, password } as Credentials)
			.then(cred => setMsg(''))
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
		<>
			<LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
			<Text
				h4
				color='error'
				css={{ position: 'absolute', bottom: 20 }}
			>
				{msg}
			</Text>
    </>
  )
}
