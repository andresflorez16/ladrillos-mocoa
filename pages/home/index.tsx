import { NextPage } from 'next'
import { Box, Text } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'

const HomePage: NextPage = () => {
	const user = useUser()

  return (
		<Box
			w='100%'
			h='83vh'
		>
		</Box>
	)
}

export default HomePage
