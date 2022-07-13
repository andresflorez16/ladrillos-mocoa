import React from 'react'
import { Grid, Spinner } from '@chakra-ui/react'

export const Loader: React.FC = () => {
  return (
    <Grid w='100%' m='0 auto' placeItems='center' h='100%'>
      <Spinner color='white' w={100} h={100} thickness='10px' />
    </Grid>
  )
}
