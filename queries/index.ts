import { useMediaQuery } from '@chakra-ui/react'

export const isLargerThan1280 = () => useMediaQuery('(min-width: 1280px)')

export const isLargerThan600 = (): boolean => {
	const [ value ] = useMediaQuery('(min-width: 600px)')
	return value
}
