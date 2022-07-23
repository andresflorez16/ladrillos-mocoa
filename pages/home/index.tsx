import { NextPage } from 'next'
import { Box, Text, Button } from '@chakra-ui/react'
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
						gap={5}
						h='100%'
					>
						<Box bg='#ddd' p={5} borderRadius='lg' flex='1' _hover={{ padding: '1.3em' }}>
							<Text 
								fontWeight='bold'
								fontSize='lg' 
							>Inventario</Text>
							<Text>Para ver las ventas, modificar u añadir productos</Text>
							<Button colorScheme='blue'>Ir</Button>
						</Box>
						<Box bg='#ddd' p={5} borderRadius='lg' flex='1'>
							<Text 
								fontWeight='bold'
								fontSize='lg' 
							>Facturar</Text>
							<Text>Generar nuevas facturas</Text>
							<Button colorScheme='blue'>Ir</Button>
						</Box>
						<Box bg='#ddd' p={5} borderRadius='lg' flex='1'>
							<Text 
								fontWeight='bold'
								fontSize='lg' 
							>Pendientes</Text>
							<Text>Revisar facturas pendientes</Text>
							<Button colorScheme='blue'>Ir</Button>
						</Box>
					</Box>
			}
		</Box>
	)
}

export default HomePage
