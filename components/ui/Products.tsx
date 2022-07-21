import React, { useRef } from 'react'
import { 
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { Product, NewProduct } from 'interfaces'
import { ProductInfo } from './ProductInfo'
import { addProduct } from '../../firebase'

type Props = {
  productData: Product[],
  productType: string
}

type FormProps = {
  ref: typeof useRef | any,
  onCancel: typeof useDisclosure | any,
  handleNewProduct: (e: React.FormEvent) => void | any,
}

type InputProps = {
  label: string,
  name: string,
  placeholder: string,
  type: string,
  refInput?: typeof useRef | any
}

const TextInput: React.FC<InputProps> = React.forwardRef(({ label, name, placeholder, type }, refInput) => {
  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input placeholder={placeholder} name={name} type={type}/>
    </>
  )
})

const FormProduct: React.FC<FormProps> = React.forwardRef(({ onCancel, handleNewProduct }, ref) => {
  return (
    <FormControl as='form' onSubmit={handleNewProduct} ref={ref as any}>
      <TextInput label='Nombre del producto' name='name' placeholder='Nombre' refInput={ref} type='text'/>
      <TextInput label='Cantidad' name='cantity' placeholder='Cantidad' type='number' refInput={ref}/>
      <ButtonGroup display='flex' mt={5} justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel as any}>Cancelar</Button>
        <Button colorScheme='teal' type='submit'>Guardar</Button>
      </ButtonGroup>
    </FormControl>
  )
})

export const Products: React.FC<Props> = ({ productData, productType }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const ref = useRef<any>()

  const handleNewProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const { target }: any = e
    const data = Object.fromEntries(new FormData(target)) as unknown as NewProduct
    const { name, cantity } = data
    if (name.length > 0 && cantity.toString().length > 0) {
      addProduct(productType.toLowerCase(), data)
      .then(() => {
        if (ref.current) {
          ref.current.reset()
        }
        onClose()
      })
      .catch(err => console.log('Error adding new product', err))
    }
  }

  return (
    <Box 
      mt={5}
      borderRadius='lg'
    >
      <Text
        color='#fff'
        fontSize='1.4em'
      >{productType}</Text>
      {
        productData &&
          <Box 
            w={{ base: 'full', md: '90%' }}
            bg='#aaa3'
            m='0 auto'
            borderRadius='lg'
            p={2}
          >
          {
            productData.map(el => <ProductInfo key={el.id} name={el.name} id={el.id} />)
          }
            <Popover
              isOpen={isOpen}
              initialFocusRef={ref}
              onOpen={onOpen}
              onClose={onClose}
              placement='auto'
              closeOnBlur={true}
            >
              <PopoverTrigger>
                <Button mt={5} size='sm'>Añadir otro</Button>
              </PopoverTrigger>
              <PopoverContent p={5}>
                <PopoverArrow />
                <PopoverCloseButton />
                <FormProduct ref={ref} onCancel={onClose} handleNewProduct={handleNewProduct} />
              </PopoverContent>
            </Popover>
          </Box>
      }
      {
        !productData &&
          <Text color='#fff'>No hay productos para mostrar</Text>
      }
    </Box>
  )
}
