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
  Link,
  useToast
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Loader } from 'components/ui'
import { getProductData, updateProduct, deleteProduct } from '../../../firebase'
import { useUser, USER_STATES } from 'hooks'
import { Product, NewProduct } from 'interfaces'
import { toastInfo } from 'utils'

const ProductPage: NextPage = () => {
  const [product, setProduct] = useState<Product | any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { query, replace } = useRouter()
  const user = useUser()
  const toast = useToast()

  useEffect(() => {
    let unSubscriber: any
    if (user && query && query.id && query.type) {
      setLoading(true)
      unSubscriber = getProductData((data: Product) => {
        setLoading(false)
        if (data && data.name) {
          setError(false)
          setProduct(data)
        } else setError(true)
      }, query.id as string, query.type as string)
    } else setError(true)
    return () => unSubscriber && unSubscriber()
  }, [user])

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const { target } = e
    const productData = Object.fromEntries(new FormData(target as any))
    const { name, cantity } = productData as unknown as { name: string, cantity: string }
    if (name.length > 0 && cantity.length > 0) {
      updateProduct(query.type as string, query.id as string, { name, cantity: parseInt(cantity) })
      .then(() => toast({ ...toastInfo('success'), status: 'success' }))
      .catch(err => {
        toast({ ...toastInfo('warning'), status: 'warning' })
        console.log('Error updating product', err)
      })
    } else toast({ ...toastInfo('warning'), status: 'warning' }) 
  }

  const handleDeleteProduct = (e: React.MouseEvent) => {
    deleteProduct(query.type as string, query.id as string)
    .then(() => {
      replace('/inventario')
      toast({ ...toastInfo('delete'), status: 'error' })
    })
    .catch((err) => {
      toast({ ...toastInfo('warning'), status: 'warning' })
      console.log('Error deleting product', err)
    })
  }

  return (
    <Box
      m='0 auto'
      w='90%'
      h={{ base: '85vh', md: '83vh' }}
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
            h='80%'
            bg='#ccc'
            borderRadius='lg'
            p={5}
            position='relative'
          >
            <FormControl
              as='form'
              onSubmit={handleUpdateProduct}
              display='flex'
              justifyContent='center'
              alignItems={{ base: 'flex-start', md: 'center' }}
              flexDir={{ base: 'column', sm: 'row' }}
              gap={2}
              h={{ base: 'auto', md: '15%' }}
            >
              <Box h='100%'>
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
              <Box h='100%'>
                <FormLabel fontSize='sm'>Cantidad en inventario:</FormLabel>
                <Input 
                  name='cantity'
                  defaultValue={product.cantity}
                  _focus={{ background: '#fff7' }}
                  placeholder='Cantidad' 
                  type='number'
                  variant='filled'
                  size='sm'
                />
              </Box>
              <Box h='100%'>
                <Button 
                  position={{ base: 'static', md: 'relative' }}
                  top='7'
                  colorScheme='green'
                  size='sm'
                  type='submit'
                >
                  Actualizar
                </Button>
              </Box>
            </FormControl>
            <Button 
              position='absolute'
              bottom='0'
              left='0'
              onClick={handleDeleteProduct}
              rightIcon={<DeleteIcon />} 
              colorScheme='red'
            >
              Eliminar del inventario
            </Button>
          </Box>
      }
    </Box>
  )
}

export default ProductPage
