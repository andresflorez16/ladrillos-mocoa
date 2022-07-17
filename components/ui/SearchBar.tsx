import React from 'react'
import { 
  InputGroup,
  InputLeftAddon,
  Input,
  Button
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
  title: string,
  type: string
}

export const SearchBar: React.FC<Props> = ({ title, type }) => {
  return (
    <>
      <InputGroup w={{ base: '60%', md: '30%' }} variant='filled' >
        <InputLeftAddon children={<SearchIcon />} />
        <Input
          type={type}
          _focus={{ background: '#ddd' }}
          placeholder={title}
        />
      </InputGroup>
      <Button>Buscar</Button>
    </>
  )
}
