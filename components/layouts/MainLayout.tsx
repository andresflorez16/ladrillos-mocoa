import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Navbar } from 'components/navbar'

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
      <div style={{ padding: '0 20px', marginTop: '70px' }}>
        {children}
      </div>
    </>
  )
}
