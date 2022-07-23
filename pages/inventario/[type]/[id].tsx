import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { 
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Loader } from 'components/ui'
import { getProductData, updateProduct } from '../../../firebase'
import { useUser, USER_STATES } from 'hooks'
import { Product } from 'interfaces'

const ProductPage: NextPage = () => {
  const [product, setProduct] = useState<Product | any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { query } = useRouter()
  const user = useUser()

  useEffect(() => {
    let unSubscriber: any
    if (user && query && query.id && query.type) {
      setLoading(true)
      unSubscriber = getProductData((data: Product) => {
        setLoading(false)
        if (data && data.name) {
          setError(false)
          setProduct(data)
        }
        else setError(true)
      }, query.id as string, query.type as string)
    } else setError(true)
    return () => unSubscriber && unSubscriber()
  }, [user])

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const { target } = e
    const productData = Object.fromEntries(new FormData(target as any))
    console.log(productData)
  }

  return (
    <Box
      m='0 auto'
      w='90%'
      h='83vh'
    >
      {
        user === USER_STATES.NOT_KNOWN || loading &&
          <Box w='100%' h='100%'>
            <Loader />
          </Box>
      }
      {
        user && error && !loading && 
          <Text color='#fff' fontSize='lg' textAlign='center'>
            El producto no existe u ocurrió un error! 😓
            Por favor, intentelo de nuevo volviendo al <NextLink href='/inventario'><Link textDecor='underline' >inventario aquí</Link></NextLink>.
          </Text>
      }
      {
        user && !loading && !error &&
          <Box
            m='0 auto'
            w={{ base: '100%', md: '80%' }}
            h={{ base: '100%', md: '80%' }}
            bg='#ddd'
            borderRadius='lg'
            p={5}
          >
            <FormControl
              as='form'
              onSubmit={handleUpdateProduct}
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDir={{ base: 'column', sm: 'row' }}
              gap={2}
            >
              <Box>
                <FormLabel fontSize='sm'>Nombre:</FormLabel>
                <Input 
                  defaultValue={product.name} 
                  name='name'
                  type='text'
                  variant='filled'
                  _focus={{ background: '#fff7' }}
                  placeholder='Nombre'
                  size='sm'
                />
              </Box>
              <Box>
                <FormLabel fontSize='sm'>Cantidad en inventario:</FormLabel>
                <Input 
                  name='cantity'
                  _focus={{ background: '#fff7' }}
                  placeholder='Cantidad' 
                  type='number'
                  variant='filled'
                  size='sm'
                />
              </Box>
              <Button mt={{ base: '0', md: '2em' }} colorScheme='green' size='sm' type='submit'>Confirmar</Button>
            </FormControl>
            <Button 
              rightIcon={<DeleteIcon />} 
              colorScheme='red'
            >Eliminar del inventario</Button>
          </Box>
      }
    </Box>
  )
}

export default ProductPage
