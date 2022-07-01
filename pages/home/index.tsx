import { NextPage } from 'next'
import { Container, Grid, Text, Loading } from '@nextui-org/react'
import { useUser, USER_STATES } from 'hooks'
import { MainLayout } from 'components/layouts'

const HomePage: NextPage = () => {
	const user = useUser()

  return (
		<MainLayout title='Ladrillos Mocoa | Inicio'>
			<Container
				display='flex'
				justify='center'
				alignItems='center'
				direction='row'
				xl
				css={{
					height: 'calc(90vh - 100px)',
					margin: '0 auto',
					backgroundColor: '#eee',
					borderRadius: '10px',
					boxShadow: '3px 3px 3px 3px #0004'
				}}
			>
					{
						user === USER_STATES.NOT_KNOWN && <Loading type='points' size='xl' color='currentColor' />
					}
					{
						user && <Text h1>Home</Text>
					}
			</Container>
		</MainLayout>
  )
}

export default HomePage
