import React from 'react'
import NextLink from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'

interface Props {
  path: string
}

export const Logo: React.FC<Props> = ({ path }) => {
  return (
    <Flex align='center'  ml={{ base: '10px', md: 'none' }} >
      <Heading as='h1' size='sm' letterSpacing={'tighter'}>
        <NextLink href={path}>
          <a>
            <Text fontSize='1.5em' fontWeight={'bold'} color='white'>
              Ladrillos Mocoa MP
            </Text>
          </a>
        </NextLink>
      </Heading>
    </Flex>
  )
}
