import React from 'react'
import { Box } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
		<Box textAlign='center' w='100%' position='absolute' bottom='0' color='#aaa' fontSize='sm'>
      &copy; {new Date().getFullYear()} Andrés Florez. All Rights Reserved.
    </Box>
  )
}
