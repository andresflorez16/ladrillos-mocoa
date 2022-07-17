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
  type: string,
  setBillNumber: (value: string) => React.SetStateAction<string> | void
}

export const SearchBar: React.FC<Props> = ({ title, type, setBillNumber }) => {
  return (
    <>
      <InputGroup w={{ base: '60%', md: '30%' }} variant='filled' >
        <InputLeftAddon children={<SearchIcon />} />
        <Input
          onChange={e => setBillNumber(e.target.value)}
          type={type}
          _focus={{ background: '#ddd' }}
          placeholder={title}
        />
      </InputGroup>
      <Button>Buscar</Button>
    </>
  )
}
