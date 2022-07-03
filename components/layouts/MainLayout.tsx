import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'
import { Navbar } from 'components/navbar'
import style from './stylesLayout.module.css'

interface Props {
  children: ReactNode,
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box className={style.container} as='main' pb={8} display='flex' justifyContent='center' flexDir='column' >
			<Head>
        <title>Ladrillos Mocoa</title>
        <meta name='author' content="Andres Florez" />
				<meta name='description' content="Ladrillos Mocoa Website" />
			</Head>
      <Navbar />
      <Flex
        w='100%' 
        display='flex' 
        justifyContent='center' 
        h='calc(98vh - 100px)'
        mt='70px'
      >
        {children}
      </Flex>
    </Box>
  )
}
