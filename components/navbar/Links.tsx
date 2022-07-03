import { FC } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { 
  Stack, 
  Box, 
  Link, 
  Button, 
  IconButton,
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem
} from '@chakra-ui/react'
import { ArrowForwardIcon, HamburgerIcon } from '@chakra-ui/icons'
import { signOutUser } from '../../firebase'

export const Links: FC = () => {
  const { asPath } = useRouter()

  const handleSignOut = () => signOutUser()

  return (
    <>
      <Stack
        display={{ base: 'none',  md: 'flex',  lg: 'flex' }}
        direction='row'
        alignItems='center'
        justifyContent='end'
        flexGrow={1}
        pl={5}
      >
        <NextLink href='/facturar'>
          <Link
            p={2}
            color='white'
            textDecor={ asPath === '/facturar' ? 'underline' : 'none' }
          >
            Facturar
          </Link>
        </NextLink>
        <Button
          onClick={handleSignOut}
          size='sm'
          rightIcon={<ArrowForwardIcon />}
        >
        Salir
        </Button>
      </Stack>
      <Box
        display={{ base: 'inline-block', md: 'none' }}
      >
        <Menu isLazy >
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant='outline'
            aria-label='Options'
            color='gray.400'
          />
          <MenuList>
            <NextLink href='/facturar' passHref>
              <MenuItem 
                as={Link} 
                p={2} 
                color='black' 
                textDecor={ asPath === '/facturar' ? 'underline' : 'none' }
              >
                Facturar
              </MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
        <Button
          onClick={handleSignOut}
          m='0 5px'
          size='sm'
          rightIcon={<ArrowForwardIcon />}
        >
        Salir
        </Button>
      </Box>
    </>
  )
}
