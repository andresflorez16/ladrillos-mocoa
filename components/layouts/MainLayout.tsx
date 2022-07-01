import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Navbar } from 'components/navbar'
import { Container } from '@nextui-org/react'

interface Props {
  children: ReactNode,
  title: string
}

export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
			<Head>
				<title>{title}</title>
        <meta name='author' content="Andres Florez" />
				<meta name='description' content="Ladrillos Mocoa Website" />
			</Head>
      <Navbar />
      <Container display='flex' justify='center' alignItems='center' direction='row' gap={1} css={{ padding: '0 20px', marginTop: '100px' }}>
        {children}
      </Container>
    </>
  )
}
