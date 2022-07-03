import React, { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useUser } from 'hooks'
import { Logo } from './Logo'
import { Links } from './Links'

export const Navbar: React.FC = () => {
  const user = useUser()

  useEffect(() => {
    user
  }, [user])

  return (
    <Box 
      position='fixed'
      top='0'
      as='nav'
      w='100%'
      h='10%'
      bg='#0987A099'
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
    >
      <Flex
        justifyContent='space-between'
        alignItems='center'
        m='0 auto'
        w={{ base: 'full', md: '90%' }}
        h='100%'
      >
        {
          user
            ?
            <>
              <Logo path='/home' />
              <Links />
            </>
            :
            <Logo path='/' />
        }
      </Flex>
    </Box>
  )
}
