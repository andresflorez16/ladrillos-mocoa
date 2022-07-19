import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'
import { Navbar } from 'components/navbar'
import { Footer } from 'components/ui'
import style from './stylesLayout.module.css'

interface Props {
  children: ReactNode,
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box className={style.container} as='main' display='flex' justifyContent='center' flexDir='column' >
			<Head>
        <title>Ladrillos Mocoa</title>
        <meta name='author' content="Andres Florez" />
				<meta name='description' content="Ladrillos Mocoa Website" />
			</Head>
      <Navbar />
      <Box
        mt='70px'
      >
        {children}
        <Footer />
      </Box>
    </Box>
  )
}
