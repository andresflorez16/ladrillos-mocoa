import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Loading, Container, useTheme } from '@nextui-org/react'
import { MainLayout } from 'components/layouts'
import { LoginPage } from 'components/ui'
import { useUser, USER_STATES } from 'hooks'

const Home: NextPage = () => {
  const user = useUser()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  return (
    <MainLayout title='Ladrillos Mocoa'>
    <Container
			display='flex' 
			gap={2}
			justify='center'
			alignItems='center'
		  css={{
				height: 'calc(90vh - 100px)',
				margin: '0 auto',
				borderRadius: '10px',
				'@xsMax': {
					width: '360px'
				}
			}}
			xs
		>
      {
        user === USER_STATES.NOT_KNOWN && <Loading type="points" color="currentColor" size="xl"/>
      }
      {
        user === USER_STATES.NOT_LOGGED && <LoginPage /> 
      }
    </Container>
    </MainLayout>
  )
}

export default Home
