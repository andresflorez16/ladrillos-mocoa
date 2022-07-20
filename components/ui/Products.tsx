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
import { Product } from 'interfaces'
import { ProductInfo } from './ProductInfo'

type Props = {
  productData: Product[],
  productType: string
}

type FormProps = {
  ref: typeof useRef | any,
  onCancel: typeof useDisclosure | any
}

type InputProps = {
  label: string,
  id: string,
  refInput: typeof useRef
}

const TextInput: React.FC<InputProps> = React.forwardRef(({ label, id }, refInput) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input ref={refInput as typeof useRef} />
    </FormControl>
  )
})

const FormProduct: React.FC<FormProps> = ({ ref, onCancel }) => {
  return (
    <Box>
      <TextInput label='Nombre del producto' id='name' refInput={ref}/>
      <TextInput label='Cantidad' id='cantity' refInput={ref}/>
      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel as any}>Cancelar</Button>
        <Button colorScheme='teal'>Guardar</Button>
      </ButtonGroup>
    </Box>
  )
}

export const Products: React.FC<Props> = ({ productData, productType }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const ref = useRef(null)

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
            productData.map(({ name, id }) => <ProductInfo key={id} name={name} id={id} />)
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
                <Button>Añadir otro</Button>
              </PopoverTrigger>
              <PopoverContent p={5}>
                <PopoverArrow />
                <PopoverCloseButton />
                <FormProduct ref={ref} onCancel={onClose} />
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
