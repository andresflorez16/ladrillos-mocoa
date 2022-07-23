import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from '@chakra-ui/react'
import { useUser, USER_STATES } from 'hooks'
import { Loader } from 'components/ui'

const HomePage: NextPage = () => {
	const user = useUser()

  return (
		<Box
			m='0 auto'
			w='90%'
			h='83vh'
		>
			{
				user === USER_STATES.NOT_KNOWN && 
					<Box w='100%' h='100%'>
						<Loader />
					</Box>
			}
			{
				user &&
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						flexWrap='wrap'
						flexDir={{ base: 'column', md: 'row' }}
						gap={5}
						h='100%'
					>
						<NextLink href='/inventario'>
							<Link
								w={{ base: '100%', md: 'auto' }}
							>
								<Box 
									bg='#ddd'
									p={5}
									borderRadius='lg'
									flex={{ base: '0', md: '5' }} 
									transition='all .3s ease'
									_hover={{ boxShadow: '1px 5px 5px #aaa6' }}
								>
									<Text 
										fontWeight='bold'
										fontSize='lg' 
									>Inventario</Text>
									<Text>Para ver las ventas, modificar u añadir productos</Text>
								</Box>
							</Link>
						</NextLink>
						<NextLink href='/facturar'>
							<Link
								w={{ base: '100%', md: 'auto' }}
							>
								<Box 
									bg='#ddd'
									p={5}
									borderRadius='lg'
									flex={{ base: '0', md: '5' }}
									transition='all .3s ease'
									_hover={{ boxShadow: '1px 5px 5px #aaa6' }}
								>
									<Text 
										fontWeight='bold'
										fontSize='lg' 
									>Facturar</Text>
									<Text>Generar nuevas facturas</Text>
								</Box>
							</Link>
						</NextLink>
						<NextLink href='/pendientes'>
							<Link
								w={{ base: '100%', md: 'auto' }}
							>
								<Box 
									bg='#ddd'
									p={5}
									borderRadius='lg'
									flex={{ base: '0', md: '5' }}
									transition='all .3s ease'
									_hover={{ boxShadow: '1px 5px 5px #aaa6' }}
								>
									<Text 
										fontWeight='bold'
										fontSize='lg' 
									>Pendientes</Text>
									<Text>Revisar facturas pendientes</Text>
								</Box>
							</Link>
						</NextLink>
					</Box>
			}
		</Box>
	)
}

export default HomePage
